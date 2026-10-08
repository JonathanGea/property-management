import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';

@Component({
  selector: 'app-payment-overview',
  imports: [RouterLink],
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
    return rows;
  });
}
