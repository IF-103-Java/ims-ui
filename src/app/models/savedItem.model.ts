import {Item} from './item.model';
import {Warehouse} from './warehouse.model';

export class SavedItem {
  id: bigint;
  itemId: bigint;
  item: Item;
  quantity: number;
  warehouseId: bigint;
  warehouse: Warehouse;

}
