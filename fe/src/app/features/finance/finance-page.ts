import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PropertyStore } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'app-finance-page',
  imports: [RouterLink, Icon],
  templateUrl: './finance-page.html',
  styleUrl: './finance-page.css',
})
export class FinancePage {
  readonly store = inject(PropertyStore);
  readonly monthLabel = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(
    new Date(),
  );

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));
  }

  cancelPayment(id: string): void {
    if (confirm('Batalkan catatan pembayaran ini?')) this.store.cancelPayment(id);
  }
}
