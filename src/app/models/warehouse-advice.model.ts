import {Item} from './item.model';

export class WarehouseStorageAdvice {
  item?: Item;
  clients?: Associate[];
  suppliers?: Associate[];
  warehouseAdvices?: WarehouseAdvice[];
  message?: string;
}

export enum AssociateType {
  CLIENT = 'CLIENT',
  SUPPLIER = 'SUPPLIER',
}

export class Address {
  id: number;
  country: string;
  city: string;
  address: string;
}

export class Associate {
  id: number;
  name: string;
  addressDto: Address;
  type: AssociateType;
}

export class Warehouse {
  id: number;
  name: string;
  addressDto: Address;
}

export class WarehouseAdvice {
  warehouse: Warehouse;
  totalWeightedAvgDistance: number;
}
