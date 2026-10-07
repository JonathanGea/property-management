import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PropertyStore, Room } from '../../core/property.store';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'app-property-detail-page',
  imports: [FormsModule, RouterLink, Icon],
  templateUrl: './property-detail-page.html',
  styleUrl: './property-detail-page.css',
})
export class PropertyDetailPage {
  readonly store = inject(PropertyStore);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  private readonly fragment = toSignal(this.route.fragment, {
    initialValue: this.route.snapshot.fragment,
  });
  get id(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }
  readonly returnPath = computed(() => {
    switch (this.params().get('from')) {
      case 'keuangan':
        return '/keuangan';
      case 'beranda':
        return '/';
      default:
        return '/properti';
    }
  });
  readonly returnLabel = computed(() => {
    switch (this.returnPath()) {
      case '/keuangan':
        return 'Kembali ke Keuangan';
      case '/':
        return 'Kembali ke Beranda';
      default:
        return 'Kembali ke daftar properti';
    }
  });
  readonly returnParams = computed(() => ({
    q: this.returnPath() === '/properti' ? this.params().get('q') : null,
  }));
  selectedRoom(): Room | undefined {
    return this.property()?.rooms.find((room) => this.fragment() === 'unit-' + room.id);
  }
  readonly editing = signal<number | null>(null);
  readonly editingProperty = signal(false);
  propertyName = '';
  propertyLocation = '';
  tenantName = '';
  tenantPhone = '';
  monthlyRent = 0;
  dueDay = 1;

  property() {
    return this.store.property(this.id);
  }

  openProperty(): void {
    const property = this.property();
    if (!property) return;
    this.propertyName = property.name;
    this.propertyLocation = property.location;
    this.editingProperty.set(true);
  }

  saveProperty(form: NgForm): void {
    if (form.invalid || !this.propertyName.trim() || !this.propertyLocation.trim()) {
      form.control.markAllAsTouched();
      return;
    }
    this.store.updateProperty(this.id, this.propertyName, this.propertyLocation);
    this.editingProperty.set(false);
  }

  openRoom(room: Room): void {
    this.editing.set(room.id);
    this.tenantName = room.tenantName;
    this.tenantPhone = room.tenantPhone;
    this.monthlyRent = room.monthlyRent;
    this.dueDay = room.dueDay;
  }

  saveRoom(form: NgForm, roomId: number): void {
    if (
      form.invalid ||
      !this.tenantName.trim() ||
      !Number.isInteger(this.monthlyRent) ||
      this.monthlyRent < 1 ||
      !Number.isInteger(this.dueDay)
    ) {
      form.control.markAllAsTouched();
      return;
    }
    this.store.updateRoom(this.id, roomId, {
      tenantName: this.tenantName.trim(),
      tenantPhone: this.tenantPhone.trim(),
      monthlyRent: this.monthlyRent,
      dueDay: this.dueDay,
    });
    this.editing.set(null);
  }

  vacate(room: Room): void {
    if (!confirm(`Kosongkan unit ${room.number}? Riwayat pembayaran tetap tersimpan.`)) return;
    this.store.updateRoom(this.id, room.id, {
      tenantName: '',
      tenantPhone: '',
      monthlyRent: 0,
      dueDay: 1,
    });
    this.editing.set(null);
  }
}
