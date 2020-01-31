import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {ItemTransactionRequest} from '../../models/itemTransactionRequest.model';
import {SavedItem} from '../../models/savedItem.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-saved-item-create',
  templateUrl: './saved-item-create.component.html',
  styleUrls: ['./saved-item-create.component.css']
})
export class SavedItemCreateComponent implements OnInit {
  itemTransactionRequest: ItemTransactionRequest;
  savedItem: SavedItem;
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService) {
       }

addSavedItem() {
  this.itemService.addSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;

    });
}

  ngOnInit() {
   const params = this.activatedRoute.snapshot.queryParamMap;
   this.itemTransactionRequest.item.id = +params.get('id');
   this.itemTransactionRequest.item.name = params.get('name');
   this.itemTransactionRequest.item.unit = params.get('unit');
   this.itemTransactionRequest.item.description = params.get('description');
   this.itemTransactionRequest.item.volume = +params.get('volume');
   this.itemTransactionRequest.item.accountId = +params.get('accountId');
  }}
