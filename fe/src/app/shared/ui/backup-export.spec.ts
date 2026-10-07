import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PropertyStore } from '../../core/property.store';
import { BackupExport } from './backup-export';

describe('BackupExport', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('downloads all property and payment data as JSON and releases the download URL', async () => {
    localStorage.removeItem('rentora-owner-mvp-v1');
    await TestBed.configureTestingModule({ imports: [BackupExport] }).compileComponents();
    const fixture = TestBed.createComponent(BackupExport);
    const store = TestBed.inject(PropertyStore);
    const id = store.addProperty('Melati', 'Bandung', 1);
    store.updateRoom(id, 1, { tenantName: 'Sari', monthlyRent: 1000000 });
    store.markPaid(id, 1);
    const createObjectURL = vi.fn((_blob: Blob | MediaSource) => 'blob:rentora-backup');
    const revokeObjectURL = vi.fn();
    const NativeURL = URL;
    vi.stubGlobal(
      'URL',
      class extends NativeURL {
        static override createObjectURL = createObjectURL;
        static override revokeObjectURL = revokeObjectURL;
      },
    );
    let filename = '';
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      filename = this.download;
      expect(this.isConnected).toBe(true);
    });
    fixture.componentInstance.download();
    fixture.detectChanges();
    const blob = createObjectURL.mock.calls[0][0] as Blob;
    const raw = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(blob);
    });
    expect(JSON.parse(raw)).toEqual(JSON.parse(store.exportData()));
    expect(blob.type).toBe('application/json');
    expect(filename).toMatch(/^rentora-cadangan-\d{4}-\d{2}-\d{2}\.json$/);
    expect(document.querySelector('a[download]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Unduhan dimulai',
    );
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:rentora-backup');
  });

  it('shows an error when the browser cannot create a download', async () => {
    await TestBed.configureTestingModule({ imports: [BackupExport] }).compileComponents();
    const fixture = TestBed.createComponent(BackupExport);
    const NativeURL = URL;
    vi.stubGlobal(
      'URL',
      class extends NativeURL {
        static override createObjectURL(): string {
          throw new Error('Download unavailable');
        }
      },
    );
    fixture.componentInstance.download();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'Ekspor data gagal',
    );
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });
});
