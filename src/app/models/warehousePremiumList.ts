export class WarehousePremiumList {
  id: bigint;
  name: string;
  level: number;
  charge: bigint;
  capacity: bigint;
  childs: WarehousePremiumList[];
}
