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
  warehouses: UsefulWarehouseModel[];
  associate: Associate = new Associate();
  itemTransactionRequest: ItemTransactionRequest  = new ItemTransactionRequest();
  savedItem: SavedItem = new SavedItem();
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService,  private associateService: AssociateService) {}

  findUsefulWarehouses() {
    console.log('this.warehouses[0].name');
    const volume = this.itemTransactionRequest.quantity *
      this.itemTransactionRequest.item.volume;
    console.log(volume);
    this.itemService.findUsefulWarehouses(volume).subscribe(data => {
      this.warehouses = data;

    });
    console.log(this.warehouses[0].name.toString());
  }
//   findUsefulWarehouses() {
//    let warehouses: UsefulWarehouseModel[];
//    const volume = this.itemTransactionRequest.quantity *
//         this.itemTransactionRequest.item.volume;
//    this.itemService.findUsefulWarehouses(volume).subscribe(data => {
//   warehouses = data;
// });
//    return warehouses;
//   }
addSavedItem() {
  console.log('si');
  console.log(this.associate.name)
  this.findSuppliers().subscribe(data => {
    this.itemTransactionRequest.associateId = data.id;
    console.log(data.email);
  });
  console.log('this.itemTransactionRequest.associateId');
  console.log(this.itemTransactionRequest.associateId);
  this.itemService.addSavedItem(this.itemTransactionRequest).subscribe(data => {
      this.savedItem = data;

    });
}
findSuppliers(): Observable<SavedItemAssociateModel> {
 return this.itemService.findSuppliersByName(this.associate.name)[0];
}
  ngOnInit() {
    console.log('home')
    this.itemService.getItemById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(data => {
      this.itemTransactionRequest.item = data;
    });
  }
}
