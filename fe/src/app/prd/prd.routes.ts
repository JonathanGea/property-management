import { Routes } from '@angular/router';
import { PrdPreview } from './prd-preview';

export const PRD_ROUTES: Routes = [
  { path: '', component: PrdPreview },
  { path: 'pages', component: PrdPreview },
];
