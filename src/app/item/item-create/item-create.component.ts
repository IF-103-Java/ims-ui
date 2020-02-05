import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";
import {Item} from "../../models/item.model";


@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  public item: Item = new Item();
  public itemResult: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit()  {
  }
createItem() {
  this.itemService.addItem(this.item).subscribe(data => {
  this.itemResult = data;
   });
}
}
