import {Item} from "./item.model";

export class ItemTransactionRequest {
  itemDto: Item;
  savedItemId: number;
  quantity: number;
  associateId: number;
  sourceWarehouseId: number;
  destinationWarehouseId: number;
}
