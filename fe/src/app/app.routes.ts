import { Routes } from '@angular/router';
import { isDevMode } from '@angular/core';

export const routes: Routes = [
  ...(isDevMode()
    ? [
        {
          path: 'prd',
          title: 'Preview PRD · Rentora',
          loadChildren: () => import('./prd/prd.routes').then((m) => m.PRD_ROUTES),
        },
      ]
    : []),
  {
    path: '',
    title: 'Beranda · Rentora',
    loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'properti',
    title: 'Properti · Rentora',
    loadComponent: () =>
      import('./features/properties/properties-page').then((m) => m.PropertiesPage),
  },
  {
    path: 'properti/baru',
    title: 'Tambah Properti · Rentora',
    loadComponent: () =>
      import('./features/properties/new-property-page').then((m) => m.NewPropertyPage),
  },
  {
    path: 'properti/:id',
    title: 'Detail Properti · Rentora',
    loadComponent: () =>
      import('./features/properties/property-detail-page').then((m) => m.PropertyDetailPage),
  },
  {
    path: 'keuangan',
    title: 'Keuangan · Rentora',
    loadComponent: () => import('./features/finance/finance-page').then((m) => m.FinancePage),
  },
  {
    path: 'penghuni',
    title: 'Penghuni · Rentora',
    loadComponent: () => import('./features/tenants/tenants-page').then((m) => m.TenantsPage),
  },
  {
    path: 'lainnya',
    title: 'Lainnya · Rentora',
    loadComponent: () => import('./features/more/more-page').then((m) => m.MorePage),
  },
  { path: '**', redirectTo: '' },
];
