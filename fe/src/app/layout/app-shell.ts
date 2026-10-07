import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PropertyStore } from '../core/property.store';
import { Icon, IconName } from '../shared/ui/icon';
import { BackupExport } from '../shared/ui/backup-export';

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  exact?: boolean;
}

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, Icon, BackupExport],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  readonly store = inject(PropertyStore);
  readonly year = new Date().getFullYear();
  readonly navigation: NavItem[] = [
    { label: 'Beranda', path: '/', icon: 'home', exact: true },
    { label: 'Properti', path: '/properti', icon: 'building' },
    { label: 'Keuangan', path: '/keuangan', icon: 'wallet' },
    { label: 'Lainnya', path: '/lainnya', icon: 'menu' },
  ];
}