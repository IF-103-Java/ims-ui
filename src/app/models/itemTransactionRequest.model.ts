import {Item} from "./item.model";

export class ItemTransactionRequest {
  itemId: number;
  savedItemId: number;
  quantity: number;
  associateId: number;
  sourceWarehouseId: number;
  destinationWarehouseId: number;
}
