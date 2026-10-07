import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'app-payment-overview',
  imports: [RouterLink, Icon],
  templateUrl: './payment-overview.html',
  styleUrl: './payment-overview.css',
})
export class PaymentOverview {
  readonly store = inject(PropertyStore);
  readonly paymentOverview = computed(() => {
    const rows = this.store.properties().map((property) => {
      const occupied = property.rooms.filter((room) => !!room.tenantName);
      const paid = occupied.filter((room) => this.store.isPaid(property.id, room.id)).length;
      return {
        id: property.id,
        name: property.name,
        total: property.rooms.length,
        paid,
        unpaid: occupied.length - paid,
        vacant: property.rooms.length - occupied.length,
      };
    });
    const max = Math.max(1, ...rows.map((row) => row.total));
    return rows.map((row) => ({ ...row, width: (row.total / max) * 100 }));
  });
  readonly paidUnits = computed(() => this.store.occupiedUnits() - this.store.unpaidRooms().length);
  readonly paymentRate = computed(() =>
    this.store.occupiedUnits()
      ? Math.round((this.paidUnits() / this.store.occupiedUnits()) * 100)
      : 0,
  );
}
