import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'app-tenants-page',
  imports: [RouterLink, Icon],
  template: `
    <div class="page">
      <header class="heading">
        <p class="eyebrow">Daftar penghuni</p>
        <h1>Penghuni</h1>
        <p class="subtitle">Penghuni yang saat ini tercatat pada unit properti Anda.</p>
      </header>
      <section class="panel" aria-label="Penghuni aktif">
        @for (item of store.occupiedRooms(); track item.property.id + '-' + item.room.id) {
          <a
            class="tenant-link"
            [routerLink]="['/properti', item.property.id]"
            [fragment]="'unit-' + item.room.id"
          >
            <span class="tenant-avatar" aria-hidden="true">{{
              item.room.tenantName.charAt(0).toUpperCase()
            }}</span>
            <span class="tenant-info">
              <strong>{{ item.room.tenantName }}</strong>
              <small>{{ item.property.name }} · Unit {{ item.room.number }}</small>
              @if (item.room.tenantPhone) {
                <small>{{ item.room.tenantPhone }}</small>
              }
            </span>
            <app-icon name="chevron" />
          </a>
        } @empty {
          <div class="empty">
            <p>Belum ada penghuni yang tercatat pada unit.</p>
            <a routerLink="/properti" class="button button-primary">Lihat properti</a>
          </div>
        }
      </section>
    </div>
  `,
  styles: `
    .heading {
      margin-bottom: var(--space-16);
    }
    .eyebrow {
      margin: 0 0 var(--space-8);
      color: var(--color-brand);
      font-size: var(--font-size-11);
      font-weight: 800;
    }
    h1 {
      margin: 0;
      font-size: var(--font-size-page-title);
      letter-spacing: -0.04em;
    }
    .subtitle {
      margin: var(--space-8) 0 0;
      color: var(--color-text-muted);
      font-size: var(--font-size-13);
    }
    .panel {
      padding: var(--space-16);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-panel);
      box-shadow: var(--shadow-panel);
    }
    .tenant-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-12);
      min-height: 72px;
      padding: var(--space-10) 0;
      color: var(--color-text);
      text-decoration: none;
    }
    .tenant-link + .tenant-link {
      border-top: 1px solid var(--color-border);
    }
    .tenant-link:hover {
      color: var(--color-brand);
    }
    .tenant-link strong,
    .tenant-link small {
      display: block;
    }
    .tenant-link small {
      color: var(--color-text-muted);
      font-size: var(--font-size-12);
    }
    .tenant-avatar {
      width: 40px;
      height: 40px;
      flex: none;
      display: grid;
      place-items: center;
      border-radius: var(--radius-round);
      background: var(--color-surface-muted);
      color: var(--color-text-muted);
      font-weight: 700;
    }
    .tenant-info {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .tenant-link strong {
      font-size: var(--font-size-14);
      margin-bottom: var(--space-4);
    }
    .tenant-link app-icon {
      color: var(--color-text-muted);
    }
    .empty {
      padding: var(--space-20) 0;
      text-align: center;
      color: var(--color-text-muted);
      font-size: var(--font-size-13);
    }
    .empty p {
      margin: 0 0 var(--space-16);
    }
  `,
})
export class TenantsPage {
  readonly store = inject(PropertyStore);
}
