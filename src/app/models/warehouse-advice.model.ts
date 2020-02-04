export class WarehouseStorageAdvice {
  itemId?: bigint;
  warehouseAdvices?: WarehouseAdvice[];
  bestAssociates?: BestAssociates;
  message?: string;
}

export class BestAssociates {
  clients?: Associate[];
  suppliers?: Associate[];
}

export enum AssociateType {
  CLIENT = 'CLIENT',
  SUPPLIER = 'SUPPLIER',
}

export class Address {
  country: string;
  city: string;
  street: string;
  geo: Geo;
}

export class Geo {
  latitude: number;
  longitude: number;
}

export class Associate {
  id: number;
  name: string;
  address: Address;
  type: AssociateType;
  totalTransactionQuantity: number;
  weight: number;
  reverseWeight: number;
}

export class Warehouse {
  id: number;
  name: string;
  address: Address;
}

export class WarehouseAdvice {
  warehouse: Warehouse;
  totalWeightedAvgDistance: number;
}
