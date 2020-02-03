import { Component, OnInit } from '@angular/core';
import {WarehouseService} from "../../warehouse/service/warehouse.service";
import {ItemService} from "../item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsefulWarehouseModel} from "../../models/usefulWarehouse.model";
import {Associate} from "../../models/associate";
import {ItemTransactionRequest} from "../../models/itemTransactionRequest.model";
import {SavedItem} from "../../models/savedItem.model";

@Component({
  selector: 'app-saved-item-move',
  templateUrl: './saved-item-move.component.html',
  styleUrls: ['./saved-item-move.component.css']
})
export class SavedItemMoveComponent implements OnInit {
  warehouses: UsefulWarehouseModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();

  constructor( private itemService: ItemService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getItem();
  }
  getItem() {
    this.itemTransactionRequest.savedItemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
    //   this.itemTransactionRequest.savedItemId = data;
    //   console.log(this.item.name);
    // });
  }
}
