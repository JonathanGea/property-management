import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';
import { PaymentOverview } from './payment-overview';
import { PropertyCard } from '../../shared/ui/property-card';
import { PropertyVisual } from '../../shared/ui/property-visual';

export function paymentDue(dueDay: number, now: Date) {
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const date = new Date(now.getFullYear(), now.getMonth(), Math.min(dueDay, lastDay));
  const days = date.getDate() - now.getDate();
  return {
    date: new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(date),
    status: days < 0 ? 'overdue' : days === 0 ? 'today' : 'upcoming',
    label:
      days < 0 ? `Lewat ${-days} hari` : days === 0 ? 'Jatuh tempo hari ini' : `${days} hari lagi`,
  };
}

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, Icon, PropertyVisual, PropertyCard, PaymentOverview],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css', './dashboard-portfolio.css', './dashboard-overview.css'],
})
export class DashboardPage {
  readonly store = inject(PropertyStore);
  readonly statisticsOpen = signal(false);
  readonly today = new Date();
  readonly dateLabel = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(this.today);
  readonly monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(this.today);
  readonly paidUnits = computed(() => this.store.occupiedUnits() - this.store.unpaidRooms().length);
  readonly paymentRate = computed(() =>
    this.store.occupiedUnits()
      ? Math.round((this.paidUnits() / this.store.occupiedUnits()) * 100)
      : 0,
  );
  readonly unpaid = computed(() =>
    this.store
      .unpaidRooms()
      .map((item) => ({ ...item, due: paymentDue(item.room.dueDay, this.today) })),
  );
}
