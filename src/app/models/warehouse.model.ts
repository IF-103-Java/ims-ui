export class Warehouse {
  id: bigint;
  name: string;
  capacity: number;
  isBottom: boolean;
  parentId: bigint;
  accountId: bigint;
  topWarehouseID: bigint;
  active: boolean;
}
