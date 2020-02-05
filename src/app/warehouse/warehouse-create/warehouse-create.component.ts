import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../models/warehouse.model';
import {WarehouseService} from '../service/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../../models/address';
import {ToastService} from '../../websocket/notification/toast.service';
import {Location} from '@angular/common';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  dropdownSettings: IDropdownSettings = {

    singleSelection: true,
    itemsShowLimit: 1,
    allowSearchFilter: true
  };

  warehouse: Warehouse = new Warehouse();

  topMap = new Map<string, number>();
  topList = new Array<string>();
  selectedTopWarehouse: string;
  childrenMap = new Map<string, number>();
  childrenList = new Array<string>();
  selectedParentWarehouse: string;

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private location: Location) {

    this.warehouse.addressDto = new Address();

  }

  ngOnInit() {
    this.getTopWarehouses();
  }

  getTopWarehouses() {
    this.warehouseService.getWarehousesPage(0, 100, 'id,Acs')
      .subscribe(data => {
        data.content.forEach((warehouse) => {
          this.topMap.set(warehouse.name, warehouse.id);
          this.topList.push(warehouse.name);
        });
      });
  }

  getChildrenWarehouses(topWarehouseId: number) {
    this.childrenList = new Array<string>();
    this.warehouseService.getSubWarehouses(topWarehouseId)
      .subscribe(data => {
        data.forEach((warehouse) => {
          this.childrenMap.set(warehouse.name, warehouse.id);
          this.childrenList.push(warehouse.name);
        });
      });
  }

  setTopWarehouse(warehouse: string) {
    this.warehouse.topWarehouseID = this.topMap.get(warehouse);
    this.selectedTopWarehouse = warehouse;
    this.warehouse.parentID = null;
    this.getChildrenWarehouses(this.warehouse.topWarehouseID);
  }

  setParentWarehouse(warehouse: string) {
    this.warehouse.parentID = this.childrenMap.get(warehouse);
    this.selectedParentWarehouse = warehouse;
  }

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse).subscribe(data => {
      if (data.message != null) {
        this.toastService.show(data.message, {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }
  back() {
    this.location.back();
  }

}
