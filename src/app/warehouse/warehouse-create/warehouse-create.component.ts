import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../models/warehouse.model';
import {WarehouseService} from '../service/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../../models/address';
import {ToastService} from '../../websocket/notification/toast.service';
import {IDropdownSettings} from "ng-multiselect-dropdown";

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
  childrenList = new Map<string, number>();

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService

  ) {
    this.warehouse.addressDto = new Address();
  }

  ngOnInit() {
    this.warehouseService.getWarehousesPage(0, 100, 'id,Acs')
      .subscribe(data => {
        data.content.forEach((warehouse) => {
          this.topMap.set(warehouse.name, warehouse.id);
          this.topList.push(warehouse.name);
          console.log(this.topList);
        });
      });
  }

  getParentsList() {
    this.topList = new Array<string>();


  }

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse).subscribe(data => {
      console.log(data.message);
      if (data.message != null) {
        this.toastService.show(data.message, {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }

}
