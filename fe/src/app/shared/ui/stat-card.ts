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
        --accent: #3e655f;
        --tint: #eaf0e9;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 20px 22px 0;
        border: 1px solid #dce2d8;
        border-radius: 14px;
        background: #fffefa;
        color: var(--ink);
        text-decoration: none;
        box-shadow: 0 3px 12px #25372e04;
        transition:
          border-color 0.18s,
          box-shadow 0.18s;
      }
      .card.green {
        --accent: #486c46;
        --tint: #e3eddc;
        background: #f0f4e9;
        border-color: #d8e1cf;
      }
      .card.amber {
        --accent: #92612b;
        --tint: #f4e3c6;
        background: #fcf5e9;
        border-color: #ebdfcb;
      }
      .card:hover {
        border-color: var(--accent);
        box-shadow: 0 5px 18px #25372e0b;
      }
      .card-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }
      .icon {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        flex: none;
        border-radius: 10px;
        background: var(--tint);
        color: var(--accent);
      }
      .icon app-icon {
        width: 19px;
        height: 19px;
      }
      p {
        margin: 0;
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
      }
      .card-body {
        flex: 1;
        min-height: 100px;
        padding-bottom: 16px;
      }
      .metric {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 7px;
      }
      strong {
        font-size: 42px;
        font-weight: 750;
        letter-spacing: -0.05em;
        line-height: 1.15;
      }
      .metric span {
        color: var(--muted);
        font-size: 12px;
      }
      small {
        display: block;
        margin-top: 7px;
        color: var(--muted);
        font-size: 11px;
      }
      .progress-track {
        height: 5px;
        margin-top: 12px;
        background: #dce5d3;
        border-radius: 8px;
        overflow: hidden;
      }
      .progress-track span {
        display: block;
        height: 100%;
        background: #62816a;
        border-radius: inherit;
      }
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        min-height: 42px;
        border-top: 1px solid var(--tint);
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
      }
      .card-footer app-icon {
        width: 14px;
        height: 14px;
      }
      @media (max-width: 767px) {
        .card {
          padding: 16px 16px 0;
        }
        strong {
          font-size: 36px;
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
