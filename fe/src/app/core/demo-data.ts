import type { Payment, Property, Room } from './property.store';

function room(id: number, tenantName = '', monthlyRent = 0, dueDay = 1): Room {
  return {
    id,
    number: String(id).padStart(2, '0'),
    tenantName,
    tenantPhone: '',
    tenancyId: tenantName ? `contoh-${id}-${tenantName.toLowerCase().replace(/\s+/g, '-')}` : '',
    monthlyRent,
    dueDay,
  };
}

/** Sample records for a first visit. They use the same schema as user-created data. */
export function createDemoData(
  period: string,
  now = new Date(),
): {
  properties: Property[];
  payments: Payment[];
} {
  const properties: Property[] = [
    {
      id: 1,
      name: 'Foresta',
      location: 'Jakarta Selatan',
      rooms: [
        room(1, 'Ayu Larasati', 1_200_000, 5),
        room(2, 'Bima Pratama', 1_350_000, 10),
        room(3),
        room(4),
      ],
    },
    {
      id: 2,
      name: 'Casa Melati',
      location: 'Bandung',
      rooms: [room(1, 'Nadia Putri', 1_100_000, 12), room(2), room(3)],
    },
    {
      id: 3,
      name: 'Taman Raya',
      location: 'Depok',
      rooms: [room(1), room(2), room(3)],
    },
  ];
  const paidRoom = properties[0].rooms[1];
  const payments: Payment[] = [
    {
      id: `contoh-pembayaran-${period}`,
      propertyId: properties[0].id,
      roomId: paidRoom.id,
      roomNumber: paidRoom.number,
      tenantName: paidRoom.tenantName,
      tenancyId: paidRoom.tenancyId,
      period,
      amount: paidRoom.monthlyRent,
      paidAt: now.toISOString(),
    },
  ];
  return { properties, payments };
}
