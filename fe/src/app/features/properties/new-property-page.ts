import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';

@Component({
  selector: 'app-new-property-page',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page form-page">
      <a routerLink="/properti" class="back-link">← Kembali ke daftar kos</a>
      <header>
        <p class="eyebrow">Kos baru</p>
        <h1>Tambah kos</h1>
        <p class="subtitle">Isi nama, lokasi, dan jumlah kamar awal.</p>
      </header>
      <form class="panel" #propertyForm="ngForm" (ngSubmit)="save(propertyForm)">
        <label for="name">Nama kos</label
        ><input
          id="name"
          name="name"
          [(ngModel)]="name"
          required
          minlength="3"
          #nameField="ngModel"
          placeholder="Contoh: Kos Taman Raya"
        />
        @if (nameField.invalid && nameField.touched) {
          <p class="error">Nama kos minimal 3 karakter.</p>
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
        <label for="units">Jumlah kamar</label
        ><input
          id="units"
          type="number"
          name="units"
          [(ngModel)]="units"
          required
          min="1"
          max="200"
          step="1"
          #unitsField="ngModel"
        />
        @if (unitsField.invalid && unitsField.touched) {
          <p class="error">Jumlah kamar harus antara 1 dan 200.</p>
        }
        <div class="actions">
          <a routerLink="/properti" class="button button-secondary">Batal</a
          ><button type="submit" class="button button-primary">Simpan kos</button>
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
        display: inline-block;
        margin-bottom: 24px;
        color: var(--blue);
        text-decoration: none;
        font-size: 12px;
        font-weight: 700;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--blue);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0;
      }
      h1 {
        font-size: clamp(26px, 5vw, 32px);
        letter-spacing: -0.04em;
        margin: 0;
      }
      .subtitle {
        margin: 8px 0 22px;
        color: var(--muted);
        font-size: 13px;
      }
      .panel {
        display: grid;
        padding: 22px;
        background: #fffefa;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
      }
      label {
        font-size: 12px;
        font-weight: 700;
        margin: 0 0 8px;
      }
      input {
        width: 100%;
        height: 45px;
        padding: 0 13px;
        margin-bottom: 18px;
        border: 1px solid #cbd5ca;
        border-radius: 4px;
        font: inherit;
        font-size: 13px;
        color: var(--ink);
        outline: 0;
      }
      input:focus {
        border-color: var(--blue);
        box-shadow: 0 0 0 3px #2f625122;
      }
      .error {
        margin: -12px 0 16px;
        color: #c44846;
        font-size: 11px;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 7px;
      }
      .hint {
        color: var(--muted);
        font-size: 11px;
        margin: 15px 0;
      }
    `,
  ],
})
export class NewPropertyPage {
  private readonly store = inject(PropertyStore);
  private readonly router = inject(Router);
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
    this.router.navigateByUrl(`/properti/${id}`);
  }
}
