import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';

@Component({
  selector: 'app-new-property-page',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page form-page">
      <a routerLink="/properti" [queryParams]="returnParams" class="back-link"
        >← Kembali ke daftar properti</a
      >
      <header>
        <p class="eyebrow">Properti baru</p>
        <h1>Tambah properti</h1>
        <p class="subtitle">Isi nama, lokasi, dan jumlah unit awal.</p>
      </header>
      <form class="panel" #propertyForm="ngForm" (ngSubmit)="save(propertyForm)">
        <label for="name">Nama properti</label
        ><input
          id="name"
          name="name"
          [(ngModel)]="name"
          required
          minlength="3"
          #nameField="ngModel"
          placeholder="Contoh: Properti Taman Raya"
        />
        @if (nameField.invalid && nameField.touched) {
          <p class="error">Nama properti minimal 3 karakter.</p>
        }
        <label for="location">Lokasi</label
        ><input
          id="location"
          name="location"
          [(ngModel)]="location"
          required
          #locationField="ngModel"
          placeholder="Contoh: Jakarta Selatan"
        />
        @if (locationField.invalid && locationField.touched) {
          <p class="error">Lokasi wajib diisi.</p>
        }
        <label for="units">Jumlah unit</label
        ><input
          id="units"
          type="number"
          inputmode="numeric"
          name="units"
          [(ngModel)]="units"
          required
          min="1"
          max="200"
          step="1"
          #unitsField="ngModel"
        />
        @if (unitsField.invalid && unitsField.touched) {
          <p class="error">Jumlah unit harus antara 1 dan 200.</p>
        }
        <div class="actions">
          <a routerLink="/properti" [queryParams]="returnParams" class="button button-secondary"
            >Batal</a
          ><button type="submit" class="button button-primary">Simpan properti</button>
        </div>
      </form>
      <p class="hint">Data disimpan di browser perangkat ini. Simpan cadangan secara berkala.</p>
    </div>
  `,
  styles: [
    `
      .form-page {
        max-width: 720px;
      }
      .back-link {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        margin-bottom: var(--space-8);
        color: var(--color-brand);
        text-decoration: none;
        font-size: var(--font-size-12);
        font-weight: 700;
      }
      .eyebrow {
        margin: 0 0 var(--space-8);
        color: var(--color-brand);
        font-size: var(--font-size-11);
        font-weight: 800;
        letter-spacing: 0;
      }
      h1 {
        font-size: var(--font-size-page-title);
        letter-spacing: -0.04em;
        margin: 0;
      }
      .subtitle {
        margin: var(--space-8) 0 22px;
        color: var(--color-text-muted);
        font-size: var(--font-size-13);
      }
      .panel {
        display: grid;
        padding: var(--space-16);
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-panel);
        box-shadow: var(--shadow-panel);
      }
      label {
        font-size: var(--font-size-12);
        font-weight: 700;
        margin: 0 0 var(--space-8);
      }
      input {
        width: 100%;
        height: 48px;
        padding: 0 13px;
        margin-bottom: var(--space-18);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-control);
        font: inherit;
        font-size: var(--font-size-16);
        color: var(--color-text);
        background: var(--color-surface);
      }
      input:focus {
        border-color: var(--color-brand);
        box-shadow: 0 0 0 3px var(--color-focus-subtle);
      }
      .error {
        margin: calc(-1 * var(--space-12)) 0 var(--space-16);
        color: var(--color-danger);
        font-size: var(--font-size-11);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-10);
        flex-wrap: wrap;
        margin-top: 7px;
      }
      .hint {
        color: var(--color-text-muted);
        font-size: var(--font-size-11);
        margin: 15px 0;
      }
    `,
  ],
})
export class NewPropertyPage {
  private readonly store = inject(PropertyStore);
  private readonly router = inject(Router);
  readonly returnParams = { q: inject(ActivatedRoute).snapshot.queryParamMap.get('q') };
  name = '';
  location = '';
  units = 1;

  save(form: NgForm): void {
    if (
      form.invalid ||
      !this.name.trim() ||
      !this.location.trim() ||
      !Number.isInteger(this.units) ||
      this.units < 1 ||
      this.units > 200
    ) {
      form.control.markAllAsTouched();
      return;
    }
    const id = this.store.addProperty(this.name, this.location, this.units);
    void this.router.navigate(['/properti', id], {
      queryParams: { from: 'properti', ...this.returnParams },
    });
  }
}
