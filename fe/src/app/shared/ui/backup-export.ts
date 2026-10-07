import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PropertyStore } from '../../core/property.store';
import { Icon } from './icon';

@Component({
  selector: 'app-backup-export',
  imports: [Icon],
  template: `
    <button class="button button-secondary" type="button" (click)="download()">
      <app-icon name="download" />Ekspor data
    </button>
    @if (error()) {
      <p class="export-error" role="alert">{{ error() }}</p>
    } @else if (message()) {
      <p class="export-message" role="status">{{ message() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .export-error,
    .export-message {
      margin: 8px 0 0;
      max-width: 280px;
      font-size: 11px;
    }
    .export-error {
      color: #b94444;
    }
    .export-message {
      color: var(--blue);
    }
  `,
})
export class BackupExport {
  private readonly store = inject(PropertyStore);
  private readonly document = inject(DOCUMENT);
  readonly error = signal('');
  readonly message = signal('');

  download(): void {
    this.error.set('');
    this.message.set('');
    let url: string | undefined;
    let link: HTMLAnchorElement | undefined;
    try {
      const blob = new Blob([this.store.exportData()], { type: 'application/json' });
      url = URL.createObjectURL(blob);
      link = this.document.createElement('a');
      link.href = url;
      link.download = `rentora-cadangan-${new Date().toISOString().slice(0, 10)}.json`;
      link.hidden = true;
      this.document.body.appendChild(link);
      link.click();
      this.message.set('Unduhan dimulai. Simpan berkas sebagai cadangan.');
    } catch {
      this.error.set('Ekspor data gagal. Coba unduh kembali.');
    } finally {
      link?.remove();
      if (url) {
        const downloadUrl = url;
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      }
    }
  }
}
