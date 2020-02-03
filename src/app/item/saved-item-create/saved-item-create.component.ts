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

@Component({
  selector: 'app-saved-item-create',
  templateUrl: './saved-item-create.component.html',
  styleUrls: ['./saved-item-create.component.css']
})
export class SavedItemCreateComponent implements OnInit {
  done = false;
  warehouses: UsefulWarehouseModel[];
  associates: SavedItemAssociateModel[];
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService,  private associateService: AssociateService) {}

  findUsefulWarehouses() {
    console.log('this.warehouses[0].name');
    const volume = this.itemTransactionRequest.quantity *
      this.itemTransactionRequest.itemDto.volume;
    console.log(volume);
    this.itemService.findUsefulWarehouses(volume).subscribe(data => {
      this.warehouses = data;

    });
    console.log(this.warehouses[0].name.toString());
  }

addSavedItem() {
  console.log('si');
  console.log('this.itemTransactionRequest.associateId');
  console.log(this.itemTransactionRequest.associateId);
  this.done = false;
  this.itemService.addSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;
      this.done = true;
    });
}
  findSupplier() {
    this.itemService.findSuppliersByName().subscribe(data => this.associates = data);
    console.log(this.associates[0].name);
  }
  ngOnInit() {
    console.log('home');
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.itemDto = data;
    });
    this.findSupplier();
  }
}
