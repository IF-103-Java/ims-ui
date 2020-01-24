import {Component, OnInit} from '@angular/core';
import {Item} from '../models/item.model';
import {WarehouseAdvice} from '../models/warehouse-advice.model';
import {ItemService} from '../item/item.service';
import {WarehouseAdviceService} from './warehouse-advice.service';
import {delay, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-warehouse-advice',
  templateUrl: './warehouse-advice.component.html',
  styleUrls: ['./warehouse-advice.component.css']
})
export class WarehouseAdviceComponent implements OnInit {
  state: WarehouseAdviceComponentState;
  items: Item[];
  warehouseAdvice: WarehouseAdvice;

  constructor(private itemService: ItemService,
              private warehouseAdviceService: WarehouseAdviceService) {
  }

  ngOnInit() {
    this.searchItems('wine');
  }

  searchItems(query: string) {
    this.state = WarehouseAdviceComponentState.LOADING;
    return this.itemService.searchItemsByNameQuery(query)
      .pipe(
        delay(3000),
        finalize(() => (this.state = WarehouseAdviceComponentState.FILTERED_ITEMS))
      )
      .subscribe(x => this.items = x);
  }

  hideSubComponent(sub: string): boolean {
    if (this.isLoading()) {
      return true;
    }
    switch (sub) {
      case 'items-area':
        return this.state !== WarehouseAdviceComponentState.FILTERED_ITEMS;
      case 'warehouse-advice-area':
        return this.state !== WarehouseAdviceComponentState.WAREHOUSE_ADVICE;
      case 'no-items-found':
        return this.state !== WarehouseAdviceComponentState.ITEMS_NOT_FOUND;
    }
    return false;
  }

  isLoading(): boolean {
    return this.state === WarehouseAdviceComponentState.LOADING;
  }
}

enum WarehouseAdviceComponentState {
  LOADING,
  FILTERED_ITEMS,
  WAREHOUSE_ADVICE,
  ITEMS_NOT_FOUND,
}
