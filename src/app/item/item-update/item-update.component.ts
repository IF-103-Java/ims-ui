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
  warehouse: Warehouse;
  savedItems: Array<SavedItem> =   new Array<SavedItem>();
  item: Item = new Item();
  path: Array<string>;

 constructor(private warehouseService: WarehouseService, private itemService: ItemService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getItem();

     }
     getItem() {
       this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
         this.item = data;
         console.log(this.item.name);
       });
     }
getSavedItems() {
  this.itemService.getSavedItemsByItemId(this.item.id).subscribe(data => {
    console.log(this.item.name.toString());
    this.savedItems = data;
  });
  console.log(this.savedItems[0].quantity);

}
getWarehouse(id: bigint): string {
   this.warehouseService.getWarehouse(id).subscribe(data => {
    console.log(data.name);
    this.warehouse = data;
  });

   return this.warehouse.name;
}
  updateItem() {
    console.log(this.item.name.toString());
    console.log(this.item.name);
    this.itemService.updateItem(this.item).subscribe(data => {
  console.log(this.item.name.toString());
  this.item = data;
});
  }
  goToCreateSavedItem(itemId: number) {
    this.router.navigate(['home', { outlets: { nav: ['create-savedItem', itemId]}}]);
  }
  goToMoveSavedItem(itemId: number) {
    this.router.navigate(['home', { outlets: { nav: ['move-savedItem', itemId]}}]);
  }
  goToOutSavedItem(itemId: number) {
    this.router.navigate(['home', { outlets: { nav: ['out-savedItem', itemId]}}]);
  }
}
