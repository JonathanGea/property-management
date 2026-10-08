import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from './icon';

@Component({
  selector: 'app-stat-card',
  imports: [Icon, RouterLink],
  template: `
    <a class="card" [class]="tone()" [routerLink]="link()">
      <div class="card-heading">
        <p>{{ label() }}</p>
        <span class="icon"><app-icon [name]="icon()" /></span>
      </div>
      <div class="card-body">
        <div class="metric">
          <strong>{{ value() }}</strong
          ><span>{{ suffix() }}</span>
        </div>
        <small>{{ detail() }}</small>
        @if (progress() !== null) {
          <div class="progress-track" aria-hidden="true">
            <span [style.width.%]="progress()"></span>
          </div>
        }
      </div>
      <div class="card-footer">
        <span>{{ action() }}</span
        ><app-icon name="chevron" />
      </div>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }
      .card {
        --accent: var(--color-brand);
        --stat-tint: var(--color-brand-subtle);
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--space-14) var(--space-14) 0;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-card);
        background: var(--color-surface);
        color: var(--color-text);
        text-decoration: none;
        box-shadow: var(--shadow-card);
        transition:
          border-color var(--motion-duration-fast),
          box-shadow var(--motion-duration-fast);
      }
      .card.green {
        --accent: var(--color-success-accent);
        --stat-tint: var(--color-success-tint);
        background: var(--color-success-surface);
        border-color: var(--color-success-border);
      }
      .card.amber {
        --accent: var(--color-warning-card-accent);
        --stat-tint: var(--color-warning-tint);
        background: var(--color-warning-surface);
        border-color: var(--color-warning-card-border);
      }
      .card:hover {
        border-color: var(--accent);
        box-shadow: var(--shadow-card-hover);
      }
      .card-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
        margin-bottom: var(--space-12);
      }
      .icon {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        flex: none;
        border-radius: var(--radius-control);
        background: var(--stat-tint);
        color: var(--accent);
      }
      .icon app-icon {
        width: 19px;
        height: 19px;
      }
      p {
        margin: 0;
        color: var(--accent);
        font-size: var(--font-size-12);
        font-weight: 700;
      }
      .card-body {
        flex: 1;
        min-height: 72px;
        padding-bottom: var(--space-12);
      }
      .metric {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 7px;
      }
      strong {
        font-size: var(--font-size-42);
        font-weight: 750;
        letter-spacing: -0.05em;
        line-height: 1.15;
      }
      .metric span {
        color: var(--color-text-muted);
        font-size: var(--font-size-12);
      }
      small {
        display: block;
        margin-top: 7px;
        color: var(--color-text-muted);
        font-size: var(--font-size-11);
      }
      .progress-track {
        height: 5px;
        margin-top: var(--space-12);
        background: var(--stat-tint);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .progress-track span {
        display: block;
        height: 100%;
        background: var(--accent);
        border-radius: inherit;
      }
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-8);
        min-height: 44px;
        border-top: 1px solid var(--stat-tint);
        color: var(--accent);
        font-size: var(--font-size-11);
        font-weight: 700;
      }
      .card-footer app-icon {
        width: 14px;
        height: 14px;
      }
      @media (prefers-reduced-motion: reduce) {
        .card {
          transition: none;
        }
      }
      @media (max-width: 767px) {
        .card-heading {
          margin-bottom: var(--space-8);
        }
        .card-footer {
          font-size: var(--font-size-11);
        }
        .card-body {
          min-height: 64px;
        }
        .card.amber .card-body {
          min-height: 0;
        }
        .card {
          padding: var(--space-14) var(--space-14) 0;
        }
        strong {
          font-size: var(--font-size-30);
        }
      }
    `,
  ],
})
export class StatCard {
  readonly icon = input.required<IconName>();
  readonly tone = input.required<'blue' | 'green' | 'amber'>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly detail = input.required<string>();
  readonly suffix = input('');
  readonly progress = input<number | null>(null);
  readonly link = input('/properti');
  readonly action = input('Lihat properti');
}
