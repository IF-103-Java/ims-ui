import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../warehouse/service/warehouse.service";
import {ItemService} from "../item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsefulWarehouseModel} from "../../models/usefulWarehouse.model";
import {ItemTransactionRequest} from "../../models/itemTransactionRequest.model";
import {SavedItem} from "../../models/savedItem.model";

@Component({
  selector: 'app-saved-item-move',
  templateUrl: './saved-item-move.component.html',
  styleUrls: ['./saved-item-move.component.css']
})
export class SavedItemMoveComponent implements OnInit {
  done = false;
  warehouses: UsefulWarehouseModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();

  constructor( private itemService: ItemService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getItemTransactionRequest();
  }
  moveSavedItem() {
    this.done = false;
    this.itemService.moveSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;
      this.done = true;
    });
  }
  findUsefulWarehouses() {
    console.log('this.warehouses[0].name');
    const volume = this.itemTransactionRequest.quantity *
      this.itemTransactionRequest.itemDto.volume;
    console.log(volume);
    this.itemService.findUsefulWarehouses(volume).subscribe(data => {
      this.warehouses = data;

    });
    console.log(this.warehouses[0].name.toString());
  }
  getItemTransactionRequest() {
    this.itemService.getSavedItemsById(Number(this.activatedRoute.snapshot.paramMap.get('savedItemId'))).subscribe(data => {
     this.itemTransactionRequest.savedItemId = data.id;
     this.itemTransactionRequest.sourceWarehouseId = data.warehouseId;
     this.itemTransactionRequest.quantity = data.quantity;
    });
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.itemDto = data;
    });
  }
}
