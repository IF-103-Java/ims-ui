import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ItemService} from "../item.service";
import {Item} from "../../models/item.model";
import {Page} from "../../models/page";
import {SavedItem} from "../../models/savedItem.model";

import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {

  sortValues: string[] = ['name_item', 'unit', 'description', 'volume'];
  page: number = 0;
  size: number = 15;
  sortValue: string = this.sortValues[0];
  direction: string = 'asc';
  items: Page<Item>;
  savedItems: SavedItem[];

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {
  }

  goToUpdateItem(itemId: number) {
this.router.navigate(['home', { outlets: { nav: ['update-item', itemId]}}]);
  }
delete(itemId: number) {
  let del = false;
  this.itemService.deleteItem(itemId).subscribe(data => del = data);
  this.sort();
}
  ngOnInit() {
    this.itemService.findSortedAndPaginatedItems(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data;
    });

  }

  onSort(sort: { value: string, direction: string }) {
    this.sortValue = sort.value;
    this.direction = sort.direction;
    this.sort();
  }

  onPaginate() { this.sort(); }
sort() {
  this.itemService.findSortedAndPaginatedItems(this.page - 1, this.size, this.sortValue, this.direction).subscribe(data => {
    this.items = data;
  });
}
  // getSavedItemsByItemId(itemId: m) {
  //   this.itemService.getSavedItemsByItemId(itemId).subscribe(data => {
  //     this.savedItems = data;
  //   })
  // }
}
