import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';
import { PropertyCard } from '../../shared/ui/property-card';
import { PaymentOverview } from './payment-overview';
import { PropertyVisual } from '../../shared/ui/property-visual';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, Icon, PropertyCard, PropertyVisual, PaymentOverview],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css', './dashboard-portfolio.css'],
})
export class DashboardPage {
  readonly store = inject(PropertyStore);
}
