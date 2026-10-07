import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

const STORAGE_KEY = 'rentora-owner-mvp-v1';

export interface Room {
  id: number;
  number: string;
  tenantName: string;
  tenantPhone: string;
  tenancyId: string;
  monthlyRent: number;
  dueDay: number;
}

export interface Property {
  id: number;
  name: string;
  location: string;
  rooms: Room[];
}

export interface Payment {
  id: string;
  propertyId: number;
  roomId: number;
  roomNumber: string;
  tenantName: string;
  tenancyId: string;
  period: string;
  amount: number;
  paidAt: string;
}

interface OwnerData {
  properties: Property[];
  payments: Payment[];
}

function validBackup(value: unknown): value is OwnerData {
  if (!value || typeof value !== 'object') return false;
  const data = value as OwnerData;
  return (
    Array.isArray(data.properties) &&
    Array.isArray(data.payments) &&
    data.properties.every(
      (property) =>
        Number.isInteger(property.id) &&
        typeof property.name === 'string' &&
        typeof property.location === 'string' &&
        Array.isArray(property.rooms) &&
        property.rooms.every(
          (room) =>
            Number.isInteger(room.id) &&
            typeof room.number === 'string' &&
            typeof room.tenantName === 'string' &&
            typeof room.tenantPhone === 'string' &&
            typeof room.tenancyId === 'string' &&
            Number.isInteger(room.monthlyRent) &&
            Number.isInteger(room.dueDay),
        ),
    ) &&
    data.payments.every(
      (payment) =>
        typeof payment.id === 'string' &&
        Number.isInteger(payment.propertyId) &&
        Number.isInteger(payment.roomId) &&
        typeof payment.roomNumber === 'string' &&
        typeof payment.tenantName === 'string' &&
        typeof payment.tenancyId === 'string' &&
        typeof payment.period === 'string' &&
        Number.isInteger(payment.amount) &&
        typeof payment.paidAt === 'string',
    )
  );
}

export function currentPeriod(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

@Injectable({ providedIn: 'root' })
export class PropertyStore {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly initial = this.readData();
  readonly properties = signal<Property[]>(this.initial.properties);
  readonly payments = signal<Payment[]>(this.initial.payments);
  readonly storageError = signal(false);
  readonly period = currentPeriod();
  readonly totalUnits = computed(() =>
    this.properties().reduce((sum, property) => sum + property.rooms.length, 0),
  );
  readonly occupiedUnits = computed(() =>
    this.properties().reduce(
      (sum, property) => sum + property.rooms.filter((room) => !!room.tenantName).length,
      0,
    ),
  );
  readonly occupancyRate = computed(() =>
    this.totalUnits() ? Math.round((this.occupiedUnits() / this.totalUnits()) * 100) : 0,
  );
  readonly occupiedRooms = computed(() =>
    this.properties().flatMap((property) =>
      property.rooms.filter((room) => !!room.tenantName).map((room) => ({ property, room })),
    ),
  );
  readonly paidThisMonth = computed(() =>
    this.payments().filter((payment) => payment.period === this.period),
  );
  readonly unpaidRooms = computed(() =>
    this.occupiedRooms()
      .filter(({ property, room }) => !this.isPaid(property.id, room.id))
      .sort((a, b) => a.room.dueDay - b.room.dueDay),
  );
  readonly incomeThisMonth = computed(() =>
    this.paidThisMonth().reduce((sum, payment) => sum + payment.amount, 0),
  );

  constructor() {
    effect(() => {
      const data: OwnerData = { properties: this.properties(), payments: this.payments() };
      if (!this.isBrowser) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        this.storageError.set(false);
      } catch {
        this.storageError.set(true);
      }
    });
  }

  private readData(): OwnerData {
    if (!this.isBrowser) return { properties: [], payments: [] };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { properties: [], payments: [] };
      const parsed: unknown = JSON.parse(raw);
      return validBackup(parsed) ? parsed : { properties: [], payments: [] };
    } catch {
      return { properties: [], payments: [] };
    }
  }

  addProperty(name: string, location: string, roomCount: number): number {
    const id = Math.max(0, ...this.properties().map((property) => property.id)) + 1;
    const rooms: Room[] = Array.from({ length: roomCount }, (_, index) => ({
      id: index + 1,
      number: String(index + 1).padStart(2, '0'),
      tenantName: '',
      tenantPhone: '',
      tenancyId: '',
      monthlyRent: 0,
      dueDay: 1,
    }));
    this.properties.update((items) => [
      ...items,
      { id, name: name.trim(), location: location.trim(), rooms },
    ]);
    return id;
  }

  property(id: number): Property | undefined {
    return this.properties().find((property) => property.id === id);
  }

  updateProperty(id: number, name: string, location: string): void {
    this.properties.update((items) =>
      items.map((property) =>
        property.id === id
          ? {
              ...property,
              name: name.trim(),
              location: location.trim(),
            }
          : property,
      ),
    );
  }

  addRoom(propertyId: number): void {
    const property = this.property(propertyId);
    if (!property) return;
    const id = Math.max(0, ...property.rooms.map((room) => room.id)) + 1;
    this.properties.update((items) =>
      items.map((item) =>
        item.id === propertyId
          ? {
              ...item,
              rooms: [
                ...item.rooms,
                {
                  id,
                  number: String(id).padStart(2, '0'),
                  tenantName: '',
                  tenantPhone: '',
                  tenancyId: '',
                  monthlyRent: 0,
                  dueDay: 1,
                },
              ],
            }
          : item,
      ),
    );
  }

  updateRoom(propertyId: number, roomId: number, changes: Partial<Room>): void {
    this.properties.update((items) =>
      items.map((property) =>
        property.id !== propertyId
          ? property
          : {
              ...property,
              rooms: property.rooms.map((room) => {
                if (room.id !== roomId) return room;
                const tenancyId =
                  changes.tenantName === ''
                    ? ''
                    : !room.tenantName && changes.tenantName
                      ? `${Date.now()}-${Math.random().toString(36).slice(2)}`
                      : room.tenancyId;
                return { ...room, ...changes, tenancyId };
              }),
            },
      ),
    );
  }

  isPaid(propertyId: number, roomId: number): boolean {
    const tenancyId = this.property(propertyId)?.rooms.find(
      (room) => room.id === roomId,
    )?.tenancyId;
    return (
      !!tenancyId &&
      this.payments().some(
        (payment) =>
          payment.propertyId === propertyId &&
          payment.roomId === roomId &&
          payment.period === this.period &&
          payment.tenancyId === tenancyId,
      )
    );
  }

  markPaid(propertyId: number, roomId: number): void {
    const property = this.property(propertyId);
    const room = property?.rooms.find((item) => item.id === roomId);
    if (!room?.tenantName || this.isPaid(propertyId, roomId)) return;
    this.payments.update((items) => [
      ...items,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        propertyId,
        roomId,
        roomNumber: room.number,
        tenantName: room.tenantName,
        tenancyId: room.tenancyId,
        period: this.period,
        amount: room.monthlyRent,
        paidAt: new Date().toISOString(),
      },
    ]);
  }

  cancelPayment(paymentId: string): void {
    this.payments.update((items) => items.filter((payment) => payment.id !== paymentId));
  }

  exportData(): string {
    return JSON.stringify(
      { version: 1, properties: this.properties(), payments: this.payments() },
      null,
      2,
    );
  }

  importData(raw: string): boolean {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!validBackup(parsed)) return false;
      this.properties.set(parsed.properties);
      this.payments.set(parsed.payments);
      return true;
    } catch {
      return false;
    }
  }
}
