import { Component, input } from '@angular/core';
import { Property } from '../../core/property.store';
import { PropertyVisual } from './property-visual';

@Component({
  selector: 'app-property-card',
  imports: [PropertyVisual],
  template: `
    <article class="property" [class.featured]="featured()">
      <div class="thumbnail" aria-hidden="true">
        <app-property-visual [identity]="property().name" />
        <span class="initials">{{ initials() }}</span>
      </div>
      <div class="description">
        <h3>{{ property().name }}</h3>
        <p>{{ property().location }} · {{ property().rooms.length }} unit</p>
        <span class="mobile-meta"
          >{{ occupied() }} terisi · {{ property().rooms.length - occupied() }} kosong</span
        >
      </div>
      <div class="desktop-meta">
        <strong>{{ occupied() }}/{{ property().rooms.length }}</strong
        ><span>unit terisi</span>
      </div>
      <span class="chevron" aria-hidden="true">›</span>
    </article>
  `,
  styles: [
    `
      .property {
        display: grid;
        grid-template-columns: 64px minmax(0, 1fr) 18px;
        align-items: center;
        gap: var(--space-12);
        padding: var(--space-14) 0;
        border-top: 1px solid var(--color-border);
      }
      .thumbnail {
        position: relative;
        width: 64px;
        height: 64px;
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
      .initials {
        position: absolute;
        right: 4px;
        bottom: 4px;
        padding: 2px 4px;
        border-radius: var(--radius-xs);
        background: var(--color-surface);
        color: var(--color-brand-strong);
        font-size: var(--font-size-10);
      }
      .featured {
        display: block;
        padding: 0;
        overflow: hidden;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-panel);
        background: var(--color-surface);
      }
      .featured .thumbnail {
        width: 100%;
        height: 144px;
        border-radius: 0;
      }
      .featured .initials {
        right: 12px;
        bottom: 12px;
        padding: 5px 8px;
        font-size: var(--font-size-12);
      }
      .featured .description {
        padding: var(--space-16);
      }
      .featured .description h3 {
        font-size: var(--font-size-16);
      }
      .featured .mobile-meta {
        display: block;
        margin-top: var(--space-12);
        color: var(--color-text);
        font-size: var(--font-size-12);
      }
      .featured .desktop-meta,
      .featured .chevron {
        display: none;
      }
      @media (min-width: 768px) {
        .property {
          grid-template-columns: 64px minmax(0, 1fr) 90px 18px;
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
  initials(): string {
    return this.property()
      .name.split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('');
  }
  occupied(): number {
    return this.property().rooms.filter((room) => !!room.tenantName).length;
  }
}
