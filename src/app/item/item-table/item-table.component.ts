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
  size: number = 10;
  sortValue: string = this.sortValues[0];
  direction: string = 'asc';
  items: Page<Item>;
  savedItems: SavedItem[];

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {
  }

  goToAddSavedItem(item: Item) {
this.router.navigate([{outlets: { nav: ['create-savedItem']}}], {relativeTo: this.route.parent, queryParams:
    {  id: item.id, name: item.name, unit: item.unit, description: item.description, volume:
      item.volume, accountId: item.accountId, active: item.active}});
  }

  ngOnInit() {
    this.itemService.findSortedAndPaginatedItems(this.page, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data;
    });

  }

  sort(sort: { value: string, direction: string }) {
    this.sortValue = sort.value;
    this.direction = sort.direction;
    this.itemService.findSortedAndPaginatedItems(this.page - 1, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data;
    })
  }

  onPaginate() {
    this.itemService.findSortedAndPaginatedItems(this.page - 1, this.size, this.sortValue, this.direction).subscribe(data => {
      this.items = data;
    })
  }

  getSavedItemsByItemId(itemId: bigint) {
    this.itemService.getSavedItemsByItemId(itemId).subscribe(data => {
      this.savedItems = data;
    })
  }
}
