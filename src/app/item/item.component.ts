import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Item } from '../models/item.model';
import {ItemService } from '../item.service';
import {SavedItem} from '../models/savedItem.model';
export type SortDirection = 'asc' | 'desc' | '';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
  items: Item[];
  savedItems: SavedItem[];
  item: Item = new Item();
  page: number;
  size: number;
  sort: ['name_item','unit','description', 'volume', 'accountId'];
  sortValue: string;
  direction: string;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {

  }
  increment(){
   return  this.page += 1;
  }

  decrement(){
   return  this.page -= 1;
  }
  ngOnInit() {
    return  this.itemService.findSortedAndPaginatedItem(0,20, 'name_item', 'asc').subscribe( data => {
      this.items = data;
    }) ;
  }
  research() {
    return  this.itemService.findSortedAndPaginatedItem(this.page,this.size, this.sortValue, this.direction).subscribe( data => {
      this.items = data;
    }) ;
  }
  addItem(){
    this.itemService.addItem(this.item);
    console.log(this.item.name)
  }

}
