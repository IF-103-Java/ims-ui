import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Item } from '../models/item.model';
import {ItemService } from '../item.service';
import {SavedItem} from '../models/savedItem.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[];
  savedItems: SavedItem[];
  item: Item = new Item();

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {

  }
findAllItems() {
  return  this.itemService.findAllItems().subscribe( data => {
    this.items = data;
  }) ;
}
  ngOnInit() {
   return  this.itemService.findAllItems().subscribe( data => {
      this.items = data;
    }) ;
   }
  createItem(): void {
    this.itemService.addItem(this.item).subscribe() ;
    console.log(this.item.name);
     }
     findSavedItemByItem(item: Item) {

   return  this.itemService.findSavedItemByItem(this.items[1]).subscribe( data => {

    });
   console.log(item.name); }
}
