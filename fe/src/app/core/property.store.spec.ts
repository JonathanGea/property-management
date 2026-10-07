import { TestBed } from '@angular/core/testing';
import { PropertyStore } from './property.store';

describe('PropertyStore', () => {
  beforeEach(() => localStorage.removeItem('rentora-owner-mvp-v1'));

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

  it('exports and restores valid data while rejecting invalid backups', () => {
    const store = TestBed.inject(PropertyStore);
    store.addProperty('Kos Melati', 'Depok', 3);
    const backup = store.exportData();
    store.addProperty('Kos Mawar', 'Bogor', 1);
    expect(store.importData('{"properties":"wrong","payments":[]}')).toBe(false);
    expect(store.properties()).toHaveLength(2);
    expect(store.importData(backup)).toBe(true);
    expect(store.properties()).toHaveLength(1);
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
