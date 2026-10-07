import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { AppShell } from './layout/app-shell';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppShell],
  template:
    '@if (preview() !== null) { @if (preview()) { <router-outlet /> } @else { <app-shell><router-outlet /></app-shell> } }',
})
export class App {
  private readonly router = inject(Router);
  readonly preview = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => /^\/prd(?:\/|\?|#|$)/.test(event.urlAfterRedirects)),
    ),
    {
      initialValue: null,
    },
  );
}
