import {Component, OnInit} from '@angular/core';
import {Item} from '../models/item.model';

@Component({
  selector: 'app-warehouse-advice',
  templateUrl: './warehouse-advice.component.html',
  styleUrls: ['./warehouse-advice.component.css']
})
export class WarehouseAdviceComponent implements OnInit {
  WarehouseAdviceComponentState = WarehouseAdviceComponentState;
  state: WarehouseAdviceComponentState;
  items: Item[] = [
    {id: 1, unit: 'box', name: 'Item 1', accountId: 2, active: true, description: '', volume: 10},
    {id: 2, unit: 'kg', name: 'Item 2', accountId: 2, active: true, description: '', volume: 10},
    {id: 3, unit: 'box', name: 'Item 3', accountId: 2, active: true, description: '', volume: 10},
    {id: 4, unit: 'ml', name: 'Item 4', accountId: 2, active: true, description: '', volume: 10},
    {id: 5, unit: 'box', name: 'Item 5', accountId: 2, active: true, description: '', volume: 10},
  ];

  constructor() {
  }

  ngOnInit() {
    this.state = WarehouseAdviceComponentState.ITEMS_NOT_FOUND;
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
