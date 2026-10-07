import { Component, input } from '@angular/core';
import { Property } from '../../core/property.store';

@Component({
  selector: 'app-property-card',
  template: `
    <article class="property">
      <div class="thumbnail">{{ initials() }}</div>
      <div class="description">
        <h3>{{ property().name }}</h3>
        <p>{{ property().location }} · {{ property().rooms.length }} kamar</p>
        <span class="mobile-meta"
          >{{ occupied() }} terisi · {{ property().rooms.length - occupied() }} kosong</span
        >
      </div>
      <div class="desktop-meta">
        <strong>{{ occupied() }}/{{ property().rooms.length }}</strong
        ><span>kamar terisi</span>
      </div>
      <span class="chevron" aria-hidden="true">›</span>
    </article>
  `,
  styles: [
    `
      .property {
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr) 18px;
        align-items: center;
        gap: 12px;
        padding: 14px 0;
        border-top: 1px solid var(--line);
      }
      .thumbnail {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        border-radius: 4px;
        color: var(--blue);
        background: #e7efe8;
        font-size: 12px;
        font-weight: 800;
      }
      .description {
        min-width: 0;
      }
      .description h3 {
        margin: 0 0 4px;
        font-size: 14px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .description p {
        margin: 0;
        color: var(--muted);
        font-size: 12px;
      }
      .mobile-meta {
        display: block;
        margin-top: 7px;
        font-size: 12px;
        color: var(--blue);
        font-weight: 700;
      }
      .desktop-meta {
        display: none;
      }
      .chevron {
        color: #809086;
        font-size: 22px;
      }
      @media (min-width: 768px) {
        .property {
          grid-template-columns: 44px minmax(0, 1fr) 90px 18px;
        }
        .mobile-meta {
          display: none;
        }
        .desktop-meta {
          display: block;
        }
        .desktop-meta strong,
        .desktop-meta span {
          display: block;
        }
        .desktop-meta strong {
          font-size: 13px;
        }
        .desktop-meta span {
          font-size: 11px;
          color: var(--muted);
          margin-top: 3px;
        }
      }
    `,
  ],
})
export class PropertyCard {
  readonly property = input.required<Property>();
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
