import { TestBed } from '@angular/core/testing';
import { PropertyStore } from './property.store';

describe('PropertyStore', () => {
  beforeEach(() => {
    localStorage.setItem('rentora-initialized-v1', '1');
    localStorage.setItem('rentora-owner-mvp-v1', '{"properties":[],"payments":[]}');
  });

  it('loads example data once for a new or previously untouched empty workspace', () => {
    localStorage.removeItem('rentora-initialized-v1');
    localStorage.removeItem('rentora-owner-mvp-v1');
    const store = TestBed.inject(PropertyStore);
    expect(store.properties().map((item) => item.name)).toEqual([
      'Foresta',
      'Casa Melati',
      'Taman Raya',
    ]);
    expect(store.occupiedUnits()).toBe(3);
    expect(store.paidThisMonth()).toHaveLength(1);
    expect(store.unpaidRooms()).toHaveLength(2);
    TestBed.tick();
    expect(localStorage.getItem('rentora-initialized-v1')).toBe('1');
    expect(
      JSON.parse(localStorage.getItem('rentora-owner-mvp-v1') ?? '{}').properties,
    ).toHaveLength(3);
  });

  it('migrates an old empty workspace once and respects a later empty import', () => {
    localStorage.removeItem('rentora-initialized-v1');
    const store = TestBed.inject(PropertyStore);
    expect(store.properties()).toHaveLength(3);
    store.properties.set([]);
    store.payments.set([]);
    TestBed.tick();
    const reopened = TestBed.runInInjectionContext(() => new PropertyStore());
    expect(reopened.properties()).toHaveLength(0);
  });

  it('keeps a deliberately empty workspace empty after initialization', () => {
    const store = TestBed.inject(PropertyStore);
    expect(store.properties()).toHaveLength(0);
    expect(store.payments()).toHaveLength(0);
  });

  it('preserves existing property data without adding examples', () => {
    localStorage.removeItem('rentora-initialized-v1');
    localStorage.setItem(
      'rentora-owner-mvp-v1',
      JSON.stringify({
        properties: [{ id: 42, name: 'Milik Saya', location: 'Bogor', rooms: [] }],
        payments: [],
      }),
    );
    const store = TestBed.inject(PropertyStore);
    expect(store.properties().map((item) => item.name)).toEqual(['Milik Saya']);
    TestBed.tick();
    expect(localStorage.getItem('rentora-initialized-v1')).toBe('1');
  });

  it('tracks rooms, occupancy, payments, and vacancy without losing payment history', () => {
    const store = TestBed.inject(PropertyStore);
    expect(store.properties()).toHaveLength(0);
    const kosId = store.addProperty('Kos Taman Raya', 'Bandung', 2);
    store.updateProperty(kosId, 'Kos Taman Baru', 'Cimahi');
    expect(store.property(kosId)?.name).toBe('Kos Taman Baru');
    expect(store.totalUnits()).toBe(2);
    expect(store.occupiedUnits()).toBe(0);

    store.updateRoom(kosId, 1, { tenantName: 'Maya', monthlyRent: 900000, dueDay: 5 });
    expect(store.occupiedUnits()).toBe(1);
    expect(store.occupancyRate()).toBe(50);
    expect(store.unpaidRooms()).toHaveLength(1);

    store.markPaid(kosId, 1);
    store.markPaid(kosId, 1);
    expect(store.payments()).toHaveLength(1);
    expect(store.incomeThisMonth()).toBe(900000);
    expect(store.unpaidRooms()).toHaveLength(0);

    store.updateRoom(kosId, 1, { tenantName: '', monthlyRent: 0 });
    expect(store.occupiedUnits()).toBe(0);
    expect(store.payments()).toHaveLength(1);

    store.updateRoom(kosId, 1, { tenantName: 'Maya', monthlyRent: 950000 });
    expect(store.isPaid(kosId, 1)).toBe(false);
    expect(store.unpaidRooms()).toHaveLength(1);
  });

  it('persists kos data in the current browser', () => {
    const store = TestBed.inject(PropertyStore);
    store.addProperty('Kos Cempaka', 'Jakarta', 1);
    TestBed.tick();
    expect(
      JSON.parse(localStorage.getItem('rentora-owner-mvp-v1') ?? '{}').properties[0].name,
    ).toBe('Kos Cempaka');
    const restored = TestBed.runInInjectionContext(() => new PropertyStore());
    expect(restored.properties()[0].name).toBe('Kos Cempaka');
  });
});
