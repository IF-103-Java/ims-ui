import {Component, OnInit} from '@angular/core';
import {Item} from '../models/item.model';
import {WarehouseStorageAdvice} from '../models/warehouse-advice.model';
import {ItemService} from '../item/item.service';
import {WarehouseAdviceService} from './warehouse-advice.service';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-warehouse-advice',
  templateUrl: './warehouse-advice.component.html',
  styleUrls: ['./warehouse-advice.component.css']
})
export class WarehouseAdviceComponent implements OnInit {
  searchInput = new FormControl();
  message: string;
  state: WarehouseAdviceComponentState;
  items: Item[];
  warehouseStorageAdvice: WarehouseStorageAdvice;

  constructor(private itemService: ItemService,
              private warehouseAdviceService: WarehouseAdviceService) {
  }

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        filter((x: string) => x.length > 1),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(query => this.searchItems(query));
  }

  onSearchButtonClick() {
    const query = this.searchInput.value;
    if (query.length > 1) {
      this.searchItems(query);
    }
  }

  searchItems(query: string) {
    this.state = WarehouseAdviceComponentState.LOADING;
    return this.itemService.searchItemsByNameQuery(query)
      .subscribe(x => {
        if (x.length > 0) {
          this.items = x;
          this.state = WarehouseAdviceComponentState.FILTERED_ITEMS;
        } else {
          this.message = 'No items found';
          this.state = WarehouseAdviceComponentState.MESSAGE;
        }
      });
  }

  showWarehouseAdvice(itemId: bigint) {
    this.state = WarehouseAdviceComponentState.LOADING;
    this.warehouseAdviceService.getAdvice(itemId)
      .subscribe(x => {
        if (x.message != null) {
          this.message = x.message;
          this.state = WarehouseAdviceComponentState.MESSAGE;
        } else {
          this.warehouseStorageAdvice = x;
          this.searchInput.setValue(x.item.name, {emitEvent: false});
          this.state = WarehouseAdviceComponentState.WAREHOUSE_ADVICE;
        }
      });
  }

  hideArea(sub: string): boolean {
    switch (sub) {
      case 'loading-area':
        return this.state !== WarehouseAdviceComponentState.LOADING;
      case 'items-area':
        return this.state !== WarehouseAdviceComponentState.FILTERED_ITEMS;
      case 'warehouse-storage-advice-area':
        return this.state !== WarehouseAdviceComponentState.WAREHOUSE_ADVICE;
      case 'message-area':
        return this.state !== WarehouseAdviceComponentState.MESSAGE;
    }
    return false;
  }
}

enum WarehouseAdviceComponentState {
  LOADING,
  FILTERED_ITEMS,
  WAREHOUSE_ADVICE,
  MESSAGE,
}
