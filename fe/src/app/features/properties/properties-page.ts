import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';
import { PropertyCard } from '../../shared/ui/property-card';

@Component({
  selector: 'app-properties-page',
  imports: [RouterLink, Icon, PropertyCard],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">Daftar properti</p>
          <h1>Properti Anda</h1>
          <p class="subtitle">
            Kelola {{ store.properties().length }} properti dan seluruh unitnya.
          </p>
        </div>
        <a
          routerLink="/properti/baru"
          [queryParams]="{ q: query() || null }"
          class="button button-primary"
          ><app-icon name="plus" />Tambah properti</a
        >
      </header>
      <div class="panel">
        <label class="search"
          ><app-icon name="search" /><input
            type="search"
            placeholder="Cari nama atau lokasi properti"
            aria-label="Cari properti"
            [value]="query()"
            (input)="search($any($event.target).value)"
        /></label>
        <div class="count">{{ filtered().length }} properti ditemukan</div>
        @for (property of filtered(); track property.id) {
          <a
            class="property-link"
            [routerLink]="['/properti', property.id]"
            [queryParams]="{ from: 'properti', q: query() || null }"
            ><app-property-card [property]="property"
          /></a>
        } @empty {
          <div class="empty">
            @if (store.properties().length) {
              Tidak ada properti yang cocok dengan pencarian.
            } @else {
              Belum ada properti. Tambahkan properti pertama Anda untuk mulai melacak unit.
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .page-header {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        justify-content: space-between;
        gap: var(--space-12);
        margin-bottom: var(--space-16);
      }
      .eyebrow {
        margin: 0 0 var(--space-8);
        color: var(--color-brand);
        font-size: var(--font-size-11);
        font-weight: 800;
        letter-spacing: 0;
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
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-panel);
        padding: var(--space-16);
        box-shadow: var(--shadow-panel);
      }
      .search {
        display: flex;
        align-items: center;
        gap: var(--space-10);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-control);
        padding: 0 13px;
        color: var(--color-text-muted);
      }
      .search input {
        width: 100%;
        min-width: 0;
        height: 44px;
        border: 0;
        background: transparent;
        color: var(--color-text);
        font: inherit;
        font-size: var(--font-size-16);
      }
      .count {
        margin: var(--space-12) 0 var(--space-8);
        font-size: var(--font-size-11);
        font-weight: 700;
        color: var(--color-text-muted);
      }
      .empty {
        padding: var(--space-30) 0;
        text-align: center;
        color: var(--color-text-muted);
        font-size: var(--font-size-13);
      }
      .property-link {
        display: block;
        color: inherit;
        text-decoration: none;
      }
      @media (min-width: 768px) {
        .panel {
          padding: var(--space-24);
        }
        .search {
          max-width: 420px;
        }
      }
    `,
  ],
})
export class PropertiesPage {
  readonly store = inject(PropertyStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  readonly query = computed(() => this.params().get('q') ?? '');

  search(value: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: value || null },
      replaceUrl: true,
    });
  }
  readonly filtered = computed(() => {
    const value = this.query().toLocaleLowerCase('id').trim();
    return this.store
      .properties()
      .filter((item) => (item.name + ' ' + item.location).toLocaleLowerCase('id').includes(value));
  });
}
