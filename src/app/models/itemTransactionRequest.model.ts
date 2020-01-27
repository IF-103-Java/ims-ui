import {Item} from "./item.model";

export class ItemTransactionRequest {
  item: Item;
  savedItemId: bigint;
  quantity: bigint;
  associateId: bigint;
  sourceWarehouseId: bigint;
  destinationWarehouseId: bigint;
}
