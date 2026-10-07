import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { PaymentOverview } from './payment-overview';

describe('PaymentOverview', () => {
  beforeEach(() => {
    localStorage.removeItem('rentora-owner-mvp-v1');
    TestBed.configureTestingModule({
      imports: [PaymentOverview],
      providers: [provideRouter([])],
    });
  });

  it('shows an empty state without invalid percentages', () => {
    const fixture = TestBed.createComponent(PaymentOverview);
    fixture.detectChanges();
    expect(fixture.componentInstance.paymentRate()).toBe(0);
    expect(fixture.nativeElement.querySelector('.chart-empty')).toBeTruthy();
  });

  it('updates the chart when payment is recorded, cancelled, or the tenant changes', () => {
    const fixture = TestBed.createComponent(PaymentOverview);
    const store = TestBed.inject(PropertyStore);
    const id = store.addProperty('Taman Raya', 'Bandung', 3);
    store.updateRoom(id, 1, { tenantName: 'Ayu', monthlyRent: 1000000 });
    store.updateRoom(id, 2, { tenantName: 'Budi', monthlyRent: 1000000 });
    store.markPaid(id, 1);
    fixture.detectChanges();
    expect(fixture.componentInstance.paymentRate()).toBe(50);
    expect(fixture.nativeElement.querySelector('.chart-track').getAttribute('aria-label')).toBe(
      'Taman Raya: 1 unit lunas, 1 belum lunas, 1 kosong',
    );

    store.cancelPayment(store.payments()[0].id);
    fixture.detectChanges();
    expect(fixture.componentInstance.paymentRate()).toBe(0);

    store.markPaid(id, 1);
    store.updateRoom(id, 1, { tenantName: '' });
    store.updateRoom(id, 1, { tenantName: 'Citra' });
    fixture.detectChanges();
    expect(fixture.componentInstance.paymentOverview()[0]).toMatchObject({
      paid: 0,
      unpaid: 2,
      vacant: 1,
    });
  });
});
