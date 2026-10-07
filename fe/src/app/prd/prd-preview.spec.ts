import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { App } from '../app';
import { routes } from '../app.routes';
import { PropertyStore } from '../core/property.store';

describe('Development documentation preview', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders source Markdown safely with anchors and cross-document links without the app store', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(
          '# PRD\n\n<a id="fitur-1"></a>\n\n## Fitur 1\n\n[Peta](PAGES.md#h-8)\n\n| Nama | Isi |\n| --- | --- |\n| Unit | Kos |\n\n<script>alert(1)</script>',
        ),
      );
    vi.stubGlobal('fetch', fetchMock);
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        {
          provide: PropertyStore,
          useFactory: () => {
            throw new Error('Preview must not create the app store');
          },
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/prd');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(String(fetchMock.mock.calls[0][0])).toContain('/prd-docs/PRD.md');
    expect(root.querySelector('article h1')?.textContent).toBe('PRD');
    expect(root.querySelector('article #fitur-1')).not.toBeNull();
    expect(root.querySelector('article a[href="/prd/pages#h-8"]')).not.toBeNull();
    expect(root.querySelector('article table')).not.toBeNull();
    expect(root.querySelector('article script')).toBeNull();
    expect(root.querySelector('.shell')).toBeNull();
    await TestBed.inject(Router).navigateByUrl('/prd/pages#h-8');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(String(fetchMock.mock.calls[1][0])).toContain('/prd-docs/PAGES.md');
  });

  it('opens the preview from the prototype warning and explains a missing document', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 404 })));
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/lainnya');
    fixture.detectChanges();
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('.prototype-warning a[href="/prd"]');
    expect(button.textContent).toContain('Preview dokumen');
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/prd');
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'Tidak dapat memuat PRD.md',
    );
  });
});
