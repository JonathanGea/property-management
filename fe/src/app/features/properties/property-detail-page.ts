import { Component, inject, signal } from '@angular/core';
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
  readonly id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
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
    if (!confirm(`Kosongkan kamar ${room.number}? Riwayat pembayaran tetap tersimpan.`)) return;
    this.store.updateRoom(this.id, room.id, {
      tenantName: '',
      tenantPhone: '',
      monthlyRent: 0,
      dueDay: 1,
    });
    this.editing.set(null);
  }
}
