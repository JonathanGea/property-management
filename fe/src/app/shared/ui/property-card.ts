import { Component, input } from '@angular/core';
import { Property } from '../../core/property.store';
import { Icon } from './icon';

@Component({
  selector: 'app-property-card',
  imports: [Icon],
  template: `
    <article class="property" [class.featured]="featured()">
      <div class="thumbnail">
        @if (featured()) {
          <img [src]="examplePhoto()" alt="Foto contoh bangunan" loading="lazy" />
          <span class="photo-label">Foto contoh</span>
        } @else {
          <app-icon name="building" aria-hidden="true" />
        }
      </div>
      <div class="description">
        <h3>{{ property().name }}</h3>
        @if (featured()) {
          <p>{{ property().rooms.length }} unit · {{ occupied() }} terisi</p>
        } @else {
          <p>{{ property().location }} · {{ property().rooms.length }} unit</p>
          <span class="mobile-meta"
            >{{ occupied() }} terisi · {{ property().rooms.length - occupied() }} kosong</span
          >
        }
      </div>
      <div class="desktop-meta">
        <strong>{{ occupied() }}/{{ property().rooms.length }}</strong
        ><span>unit terisi</span>
      </div>
      <span class="chevron" aria-hidden="true"><app-icon name="chevron" /></span>
    </article>
  `,
  styles: [
    `
      .property {
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr) 18px;
        align-items: center;
        gap: var(--space-12);
        padding: var(--space-14) 0;
        border-top: 1px solid var(--color-border);
      }
      .thumbnail {
        position: relative;
        width: 44px;
        height: 44px;
        overflow: hidden;
        display: grid;
        place-items: center;
        border-radius: var(--radius-lg);
        color: var(--color-brand);
        background: var(--color-property-sky);
        font-size: var(--font-size-12);
        font-weight: 800;
      }
      .description {
        min-width: 0;
      }
      .description h3 {
        margin: 0 0 var(--space-4);
        font-size: var(--font-size-14);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .description p {
        margin: 0;
        color: var(--color-text-muted);
        font-size: var(--font-size-12);
      }
      .mobile-meta {
        display: block;
        margin-top: var(--space-4);
        font-size: var(--font-size-12);
        color: var(--color-brand);
        font-weight: 700;
      }
      .desktop-meta {
        display: none;
      }
      .chevron {
        color: var(--color-text-muted);
        font-size: var(--font-size-22);
      }
      .featured {
        display: block;
        height: 100%;
        padding: 0;
        overflow: hidden;
        border: 0;
        border-radius: var(--radius-panel);
        background: var(--color-surface);
        box-shadow: var(--shadow-card);
      }
      .featured .thumbnail {
        width: 100%;
        height: 128px;
        border-radius: 0;
        background: var(--color-surface-muted);
      }
      .featured .thumbnail img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .photo-label {
        position: absolute;
        bottom: var(--space-8);
        left: var(--space-8);
        padding: 3px 7px;
        border-radius: var(--radius-xs);
        background: color-mix(in srgb, var(--color-text) 70%, transparent);
        color: var(--color-on-brand);
        font-size: var(--font-size-10);
        font-weight: 650;
      }
      .featured .description {
        padding: var(--space-12);
      }
      .featured .description h3 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--font-size-14);
      }
      .featured .description p {
        font-size: var(--font-size-12);
      }
      .featured .desktop-meta,
      .featured .chevron {
        display: none;
      }
      @media (min-width: 768px) {
        .property:not(.featured) {
          grid-template-columns: 44px minmax(0, 1fr) 90px 18px;
        }
        .property:not(.featured) .mobile-meta {
          display: none;
        }
        .property:not(.featured) .desktop-meta {
          display: block;
        }
        .desktop-meta strong,
        .desktop-meta span {
          display: block;
        }
        .desktop-meta strong {
          font-size: var(--font-size-13);
        }
        .desktop-meta span {
          font-size: var(--font-size-11);
          color: var(--color-text-muted);
          margin-top: 3px;
        }
      }
    `,
  ],
})
export class PropertyCard {
  readonly property = input.required<Property>();
  readonly featured = input(false);
  examplePhoto(): string {
    const number = (Math.abs(this.property().id - 1) % 3) + 1;
    return `/images/property-examples/residence-${number}.jpg`;
  }
  occupied(): number {
    return this.property().rooms.filter((room) => !!room.tenantName).length;
  }
}
