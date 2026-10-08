import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { PropertyStore } from './core/property.store';

describe('App', () => {
  it('renders the owner dashboard and routes to the properti list', async () => {
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
    expect(fixture.nativeElement.textContent).toContain('Mulai dari properti pertama Anda');
    expect(fixture.nativeElement.querySelector('.payment-snapshot')).toBeNull();

    await router.navigateByUrl('/properti');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('properti ditemukan');
  });

  it('keeps the property search when returning from a detail page', async () => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const store = TestBed.inject(PropertyStore);
    const id = store.addProperty('Melati', 'Bandung', 1);
    store.addProperty('Mawar', 'Jakarta', 1);
    await router.navigateByUrl('/properti?q=Melati');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.property-link')).toHaveLength(1);
    fixture.nativeElement.querySelector('.property-link').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe(`/properti/${id}?from=properti&q=Melati`);
    expect(fixture.nativeElement.querySelector('.bottom-nav a.active').textContent).toContain(
      'Properti',
    );
    expect(
      fixture.nativeElement.querySelector('.bottom-nav a.active').getAttribute('aria-current'),
    ).toBe('page');
    fixture.nativeElement.querySelector('.back-link').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/properti?q=Melati');
    expect(fixture.nativeElement.querySelector('input[type="search"]').value).toBe('Melati');
    expect(fixture.nativeElement.querySelectorAll('.property-link')).toHaveLength(1);
  });

  it('opens the selected unit from finance and returns to finance after recording payment', async () => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const store = TestBed.inject(PropertyStore);
    const id = store.addProperty('Melati', 'Bandung', 2);
    store.updateRoom(id, 2, { tenantName: 'Sari', monthlyRent: 1000000, dueDay: 10 });
    await router.navigateByUrl('/keuangan');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.bottom-nav .nav-badge').textContent).toBe('1');
    fixture.nativeElement.querySelector('.link-row').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe(`/properti/${id}?from=keuangan#unit-2`);
    expect(fixture.nativeElement.querySelector('.back-link').textContent).toContain(
      'Kembali ke Keuangan',
    );
    expect(fixture.nativeElement.querySelector('.breadcrumbs').textContent).toContain('Unit 02');
    fixture.nativeElement.querySelector('#unit-2 .payment-row button').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.back-link').click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/keuangan');
    expect(fixture.nativeElement.querySelectorAll('.link-row')).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.bottom-nav .nav-badge')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('1 pembayaran dicatat');
  });
});
