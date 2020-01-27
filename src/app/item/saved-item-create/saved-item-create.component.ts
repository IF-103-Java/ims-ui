import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ItemService} from "../item.service";
import {ItemTransactionRequest} from "../../models/itemTransactionRequest.model";
import {Item} from "../../models/item.model";
import {SavedItem} from "../../models/savedItem.model";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-saved-item-create',
  templateUrl: './saved-item-create.component.html',
  styleUrls: ['./saved-item-create.component.css']
})
export class SavedItemCreateComponent implements OnInit {
  itemTransactionRequest: ItemTransactionRequest;
  savedItem: SavedItem;
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService) {
    this.activatedRoute.queryParams.subscribe(data=>{
    })
  }

addSavedItem(){
    this.itemService.addSavedItem(this.itemTransactionRequest).subscribe(data=>{
      this.savedItem = data;

    })
}

  ngOnInit() {
  }

}
