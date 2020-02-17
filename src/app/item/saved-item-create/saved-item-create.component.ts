import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {ItemTransactionRequest} from '../../models/itemTransactionRequest.model';
import {SavedItem} from '../../models/savedItem.model';
import {ActivatedRoute} from '@angular/router';
import {AssociateService} from '../../associate/service/associate.service';
import {Observable} from 'rxjs';
import {SavedItemAssociateModel} from '../../models/savedItemAssociate.model';
import {UsefulWarehouseModel} from '../../models/usefulWarehouse.model';
import {Item} from "../../models/item.model";
import {Associate} from "../../models/associate";
import {WarehouseService} from "../../warehouse/service/warehouse.service";

@Component({
  selector: 'app-saved-item-create',
  templateUrl: './saved-item-create.component.html',
  styleUrls: ['./saved-item-create.component.css']
})
export class SavedItemCreateComponent implements OnInit {
  usefulWarehouses: UsefulWarehouseModel[];
  associates: SavedItemAssociateModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();
  volume: number;
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService, private warehouseService: WarehouseService,
              private associateService: AssociateService) {}

  findUsefulWarehouses() {
    const volume = this.itemTransactionRequest.quantity *
      this.volume;
    this.warehouseService.findUsefulWarehouses(volume).subscribe(data => {
      this.usefulWarehouses = data;
    });
  }

addSavedItem() {
  this.itemService.addSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;
      this.itemService.goToUpdateItem(this.savedItem.itemId);
    });
}
  findSupplier() {
    this.itemService.findSuppliersByName().subscribe(data => this.associates = data);
  }
  ngOnInit() {
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.itemId = data.id;
      this.volume = data.volume;
      this.findSupplier();
    });

  }
}
