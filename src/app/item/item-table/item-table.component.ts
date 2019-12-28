import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";
import {Item} from "../../models/item.model";


@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {
  page: number =0;
  size: number =10;
sortValue: string[]=['name_item', 'unit', 'description', 'volume']
  sort: {value: string, direction: string};
items: Item[];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  this.itemService.findSortedAndPaginatedItems(this.page,this.size, this.sortValue[0], 'asc').subscribe(data=>{
    this.items = data;
  })
  }
  getSortedAndPaginatedItems(){
    this.itemService.findSortedAndPaginatedItems(this.page,this.size, this.sort.value, this.sort.direction).subscribe(data=>{
      this.items = data;
    })
  }
  increment(){
    return  this.page += 1;
  }

  decrement(){
    return  this.page -= 1;
  }

}
