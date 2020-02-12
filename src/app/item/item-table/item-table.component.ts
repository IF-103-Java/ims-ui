import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {ItemService} from '../item.service';
import {Item} from '../../models/item.model';
import {Page} from '../../models/page';
import {SavedItem} from '../../models/savedItem.model';

import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {

  sortValues: string[] = ['name_item', 'unit', 'description', 'volume'];
  page = 0;
  size = 15;
  sortValue: string = this.sortValues[0];
  direction = 'asc';
  items: Page<Item>;
  savedItems: SavedItem[];

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {
  }
delete(itemId: number) {
  this.itemService.deleteItem(itemId).subscribe(data => {
    this.sort();
  });
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

}
