import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';
import { PropertyCard } from '../../shared/ui/property-card';
import { PaymentOverview } from './payment-overview';
import { StatCard } from '../../shared/ui/stat-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, Icon, PropertyCard, StatCard, PaymentOverview],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  readonly store = inject(PropertyStore);
}
