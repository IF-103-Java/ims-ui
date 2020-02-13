import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../../models/item.model';
import {SavedItem} from '../../models/savedItem.model';
import {WarehouseService} from '../../warehouse/service/warehouse.service';
import {Warehouse} from "../../models/warehouse.model";

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {
  warehouses: Array<Warehouse> = new Array<Warehouse>();
  savedItems: SavedItem[];
  item: Item = new Item();


 constructor(private warehouseService: WarehouseService, private itemService: ItemService,
             private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getItem();

 }
     getItem() {
       this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
         this.item = data;
         this.getSavedItems();
       });
     }
getSavedItems() {
  this.warehouses = [];
  this.itemService.getSavedItemsByItemId(this.item.id).subscribe(data => {
    this.savedItems = data;
    this.savedItems.forEach( x => {
      this.getWarehouse(x.warehouseId);
    });

  });

}
getWarehouse(id: number) {
  this.warehouseService.getWarehouse(id).subscribe(data => {
    data.path = data.path.reverse();
    this.warehouses.push(data);
  });

}
  updateItem() {
  this.itemService.updateItem(this.item).subscribe(data => {
  this.item = data;
});
  }

}
