import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Beranda · Rentora',
    loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'properti',
    title: 'Kos · Rentora',
    loadComponent: () =>
      import('./features/properties/properties-page').then((m) => m.PropertiesPage),
  },
  {
    path: 'properti/baru',
    title: 'Tambah Kos · Rentora',
    loadComponent: () =>
      import('./features/properties/new-property-page').then((m) => m.NewPropertyPage),
  },
  {
    path: 'properti/:id',
    title: 'Detail Kos · Rentora',
    loadComponent: () =>
      import('./features/properties/property-detail-page').then((m) => m.PropertyDetailPage),
  },
  {
    path: 'keuangan',
    title: 'Keuangan · Rentora',
    loadComponent: () => import('./features/finance/finance-page').then((m) => m.FinancePage),
  },
  {
    path: 'lainnya',
    title: 'Lainnya · Rentora',
    loadComponent: () => import('./features/more/more-page').then((m) => m.MorePage),
  },
  { path: '**', redirectTo: '' },
];
