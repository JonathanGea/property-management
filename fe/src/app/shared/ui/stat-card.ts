import { Component, input } from '@angular/core';
import { Icon, IconName } from './icon';

@Component({
  selector: 'app-stat-card',
  imports: [Icon],
  template: `
    <article class="card">
      <div class="card-heading">
        <span class="icon" [class]="tone()"><app-icon [name]="icon()" /></span>
        <p>{{ label() }}</p>
      </div>
      <strong>{{ value() }}</strong
      ><small>{{ detail() }}</small>
    </article>
  `,
  styles: [
    `
      .card {
        height: 100%;
        padding: 15px 2px 13px;
        border-top: 2px solid var(--line);
      }
      .card-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 11px;
      }
      .icon {
        width: 19px;
        height: 19px;
        display: grid;
        place-items: center;
        color: var(--blue);
      }
      .icon app-icon {
        width: 17px;
        height: 17px;
      }
      .icon.amber {
        color: #99521f;
      }
      p {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
      }
      strong {
        display: block;
        color: var(--ink);
        font-size: 27px;
        letter-spacing: -0.04em;
        line-height: 1.2;
      }
      small {
        display: block;
        margin-top: 7px;
        color: var(--muted);
        font-size: 12px;
      }
      @media (min-width: 768px) {
        .card {
          padding: 17px 2px 15px;
        }
        strong {
          font-size: 31px;
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
}
