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
  usefulWarehouses: UsefulWarehouseModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();
  volume: number;

  constructor( private itemService: ItemService, private warehouseService: WarehouseService, private activatedRoute: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {
    this.getItemTransactionRequest();
  }
  moveSavedItem() {
    this.itemService.moveSavedItem(this.itemTransactionRequest).subscribe();
    this.itemService.goToUpdateItem(this.itemTransactionRequest.itemId);
  }
  findUsefulWarehouses() {
    const volume = this.itemTransactionRequest.quantity *
      this.volume;
    this.warehouseService.findUsefulWarehouses(volume).subscribe(data => {
      this.usefulWarehouses = data;

    });
  }
  getItemTransactionRequest() {
    this.itemService.getSavedItemsById(Number(this.activatedRoute.snapshot.paramMap.get('savedItemId'))).subscribe(data => {
     this.itemTransactionRequest.savedItemId = data.id;
     this.itemTransactionRequest.sourceWarehouseId = data.warehouseId;
     this.itemTransactionRequest.quantity = data.quantity;
    });
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.itemId = data.id;
      this.volume = data.volume;
    });
  }
}
