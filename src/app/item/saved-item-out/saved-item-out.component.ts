import { Component, OnInit } from '@angular/core';
import {UsefulWarehouseModel} from '../../models/usefulWarehouse.model';
import {ItemTransactionRequest} from '../../models/itemTransactionRequest.model';
import {SavedItem} from '../../models/savedItem.model';
import {Associate} from '../../models/associate';
import {ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssociateService} from '../../associate/service/associate.service';
import {SavedItemAssociateModel} from '../../models/savedItemAssociate.model';

@Component({
  selector: 'app-saved-item-out',
  templateUrl: './saved-item-out.component.html',
  styleUrls: ['./saved-item-out.component.css']
})
export class SavedItemOutComponent implements OnInit {
  warehouses: UsefulWarehouseModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  associates: SavedItemAssociateModel[];
  savedItem: SavedItem = new SavedItem();
  constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getItemTransactionRequest();
    this.findClient() ;
  }
  findClient() {
    this.itemService.findClientByName().subscribe(data => this.associates = data);
  }
  outSavedItem() {
    this.itemService.outSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;
      this.itemService.goToUpdateItem(this.savedItem.itemId);
    });
  }
getItemTransactionRequest() {
    this.itemService.getSavedItemsById(Number(this.activatedRoute.snapshot.paramMap.get('savedItemId'))).subscribe(data => {
      this.itemTransactionRequest.savedItemId = data.id;
      this.itemTransactionRequest.sourceWarehouseId = data.warehouseId;
      this.itemTransactionRequest.quantity = data.quantity;
    });
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.itemId = data.id;
    });
}
}
