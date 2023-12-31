import { Collection, Lot, Role, Shipment, User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
  roles: Role[];
}

export interface LotsQuery {
  lots: Lot[];
}

export interface CollectionsQuery {
  collections: Collection[];
}

export interface ShipmentsQuery {
  shipments: Shipment[];
}

export interface CollectionsIndicator {
  year: number;
  month: number;
  lote: string;
  total: number;
}

export interface IndicatorsQuery {
  indicadores: CollectionsIndicator[];
}

export interface ProfileQuery {
  userProfile: {
    email: string;
    image: string;
    profile: {
      document: string;
      phoneNumber: string;
      image: string;
    };
  };
}
