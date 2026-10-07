import { Component, input } from '@angular/core';

export type IconName =
  | 'home'
  | 'building'
  | 'wallet'
  | 'menu'
  | 'bell'
  | 'plus'
  | 'arrow'
  | 'check'
  | 'clock'
  | 'chevron'
  | 'search'
  | 'chart'
  | 'warning'
  | 'settings'
  | 'download';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('download') {
          <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
        }
        @case ('home') {
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        }
        @case ('building') {
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h2m4 0h2M8 11h2m4 0h2M9 21v-5h6v5" />
        }
        @case ('wallet') {
          <rect x="3" y="5" width="18" height="15" rx="2" />
          <path d="M3 9h18m-5 5h2" />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('bell') {
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        }
        @case ('plus') {
          <path d="M12 5v14M5 12h14" />
        }
        @case ('arrow') {
          <path d="m5 16 6-6 4 4 4-7m-5 0h5v5" />
        }
        @case ('check') {
          <path d="m5 12 4 4L19 6" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('chevron') {
          <path d="m9 18 6-6-6-6" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 5 5" />
        }
        @case ('chart') {
          <path d="M4 20V4m0 16h16M8 16v-5m5 5V7m5 9v-9" />
        }
        @case ('warning') {
          <path d="M10.3 3.8 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v5m0 3h.01" />
        }
        @case ('settings') {
          <path d="M4 7h16M4 17h16M8 4v6m8 4v6" />
          <circle cx="8" cy="7" r="2" />
          <circle cx="16" cy="17" r="2" />
        }
      }
    </svg>
  `,
  styles: [
    ':host{display:inline-flex;width:1.25rem;height:1.25rem;flex:none}svg{width:100%;height:100%}',
  ],
})
export class Icon {
  readonly name = input.required<IconName>();
}
