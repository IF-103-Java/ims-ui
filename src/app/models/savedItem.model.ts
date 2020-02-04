import {Item} from './item.model';
import {Warehouse} from './warehouse.model';

export class SavedItem {
  id: number;
  itemId: number;
  item: Item;
  quantity: number;
  warehouseId: number;
  warehouse: Warehouse;

}
