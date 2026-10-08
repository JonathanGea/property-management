import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from '../app';
import { routes } from '../app.routes';

describe('AppShell navigation', () => {
  it('shows four main destinations and opens Lainnya from the header', async () => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const bottomLinks = Array.from(
      fixture.nativeElement.querySelectorAll('.bottom-nav a') as NodeListOf<HTMLAnchorElement>,
    );
    expect(bottomLinks.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Beranda',
      'Properti',
      'Keuangan',
      'Penghuni',
    ]);
    expect(
      Array.from(
        fixture.nativeElement.querySelectorAll('.desktop-nav a') as NodeListOf<HTMLAnchorElement>,
      ).map((link) => link.textContent?.trim()),
    ).toEqual(['Beranda', 'Properti', 'Keuangan', 'Penghuni']);

    bottomLinks[3].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/penghuni');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe('Penghuni');

    const moreLink = fixture.nativeElement.querySelector('.topbar .more-link') as HTMLAnchorElement;
    expect(moreLink.getAttribute('aria-label')).toBe('Lainnya');
    expect(moreLink.textContent?.trim()).toBe('');
    moreLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/lainnya');
    expect(moreLink.getAttribute('aria-current')).toBe('page');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toBe('Lainnya');
  });
});
