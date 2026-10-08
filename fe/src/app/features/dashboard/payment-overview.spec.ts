import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { PaymentOverview } from './payment-overview';

describe('PaymentOverview', () => {
  beforeEach(() => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
    TestBed.configureTestingModule({
      imports: [PaymentOverview],
      providers: [provideRouter([])],
    });
  });

  it('shows an empty state', () => {
    const fixture = TestBed.createComponent(PaymentOverview);
    fixture.detectChanges();
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
    expect(fixture.componentInstance.paymentOverview()[0].paid).toBe(1);
    expect(fixture.nativeElement.querySelector('.chart-row').getAttribute('aria-label')).toContain(
      '1 lunas, 1 belum lunas, 1 kosong',
    );
    expect(fixture.nativeElement.querySelectorAll('.chart-row-counts .chart-count')).toHaveLength(
      3,
    );

    const metrics = fixture.nativeElement.querySelectorAll('.metric-label');
    expect(metrics[0].textContent).toContain('1 / 2 unit terisi lunas');
    expect(metrics[1].textContent).toContain('2 / 3 unit terisi');
    expect(fixture.nativeElement.querySelector('.metric-fill.paid').style.width).toBe('50%');

    store.cancelPayment(store.payments()[0].id);
    fixture.detectChanges();
    expect(fixture.componentInstance.paymentOverview()[0].paid).toBe(0);

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
