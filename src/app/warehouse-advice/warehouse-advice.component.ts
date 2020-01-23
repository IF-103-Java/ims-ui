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
    this.state = WarehouseAdviceComponentState.ITEMS_SEARCH;
  }

  showItemsSearch() {

  }

  showWarehouseAdvice() {

  }
}

enum WarehouseAdviceComponentState {
  LOADING,
  ITEMS_SEARCH,
  WAREHOUSE_ADVICE
}
