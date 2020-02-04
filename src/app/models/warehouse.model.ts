import {Address} from './address';

export class Warehouse {
  id: number;
  name: string;
  info: string;
  capacity: number;
  isBottom: boolean;
  parentID: number;
  accountId: number;
  topWarehouseID: number;
  active: boolean;
  addressDto: Address;
  path: string[];
}
