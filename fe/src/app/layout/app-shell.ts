import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PropertyStore } from '../core/property.store';
import { Icon, IconName } from '../shared/ui/icon';

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
  exact?: boolean;
}

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './app-shell.html',
  styleUrls: ['./bottom-navigation.css', './app-shell.css'],
})
export class AppShell {
  readonly store = inject(PropertyStore);
  readonly year = new Date().getFullYear();
  readonly navigation: NavItem[] = [
    { label: 'Beranda', path: '/', icon: 'home', exact: true },
    { label: 'Properti', path: '/properti', icon: 'building' },
    { label: 'Keuangan', path: '/keuangan', icon: 'wallet' },
    { label: 'Penghuni', path: '/penghuni', icon: 'contacts' },
  ];
}
