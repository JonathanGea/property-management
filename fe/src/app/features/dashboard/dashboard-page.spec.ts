import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { DashboardPage, paymentDue } from './dashboard-page';

describe('DashboardPage', () => {
  beforeEach(() => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    TestBed.configureTestingModule({ imports: [DashboardPage], providers: [provideRouter([])] });
  });
  it('distinguishes due statuses and clamps to the end of the month', () => {
    const today = new Date(2026, 9, 8);
    expect(paymentDue(5, today)).toMatchObject({ status: 'overdue', label: 'Lewat 3 hari' });
    expect(paymentDue(8, today).status).toBe('today');
    expect(paymentDue(10, today)).toMatchObject({ status: 'upcoming', label: '2 hari lagi' });
    expect(paymentDue(31, new Date(2026, 1, 28)).status).toBe('today');
    expect(paymentDue(31, new Date(2028, 1, 28)).label).toBe('1 hari lagi');
  });
  it('shows every property in the compact row while limiting action units', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    const store = TestBed.inject(PropertyStore);
    for (const name of ['Melati', 'Mawar', 'Anggrek', 'Kenanga']) {
      const id = store.addProperty(name, 'Bandung', 1);
      store.updateRoom(id, 1, { tenantName: `Penyewa ${name}`, monthlyRent: 1000000 });
    }
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('.property-list .property-link');
    expect(cards).toHaveLength(4);
    expect(cards[3].textContent).toContain('Kenanga');
    expect(cards[0].textContent).not.toContain('Unit');
    expect(fixture.nativeElement.querySelectorAll('.activity-row')).toHaveLength(3);
    expect(fixture.nativeElement.querySelector('.activity + .properties')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.add-property')).toBeNull();
  });

  it('guides setup before showing payments and updates after recording payment', () => {
    const fixture = TestBed.createComponent(DashboardPage);
    const store = TestBed.inject(PropertyStore);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.portfolio-empty')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.activity')).toBeNull();
    const id = store.addProperty('Melati', 'Bandung', 2);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.setup-panel')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.payment-snapshot')).toBeNull();
    store.updateRoom(id, 1, { tenantName: 'Sari', monthlyRent: 1500000, dueDay: 5 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.payment-alert').textContent).toContain(
      '1 pembayaran',
    );
    expect(fixture.nativeElement.querySelector('.activity-row').getAttribute('href')).toBe(
      `/properti/${id}?from=beranda#unit-1`,
    );
    const statistics = fixture.nativeElement.querySelector('.statistics') as HTMLElement;
    const toggle = statistics.querySelector('button')!;
    const content = statistics.querySelector('.statistics-content')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(content.hasAttribute('inert')).toBe(true);
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(content.hasAttribute('inert')).toBe(false);
    expect(statistics.querySelector('.chart-row')?.getAttribute('aria-label')).toContain(
      '1 belum lunas',
    );
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(content.hasAttribute('inert')).toBe(true);
    store.markPaid(id, 1);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.activity')).toBeNull();
    expect(fixture.nativeElement.querySelector('.payment-alert')).toBeNull();
    expect(fixture.nativeElement.querySelector('.payment-total').textContent).toContain('100%');
    expect(
      fixture.nativeElement.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'),
    ).toBe('1');
  });
});
