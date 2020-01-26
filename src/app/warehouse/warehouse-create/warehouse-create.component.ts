import {Component, OnInit} from '@angular/core';
import {Warehouse} from "../../models/warehouse.model";
import {WarehouseService} from "../service/warehouse.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {
  public warehouse: Warehouse = new Warehouse();
  submitted = false;

  constructor(private warehouseService: WarehouseService,
              private router: Router)  {

  }


  ngOnInit() {
    this.submitted = false;
  }

  // warehouseAddForm = new FormGroup({
  //   warehouse_name: new FormControl('', [Validators.required]),
  //   warehouse_info: new FormControl('',),
  //   warehouse_capacity: new FormControl('',),
  //   warehouse_parentId: new FormControl('',),
  //   warehouse_bottom: new FormControl('',),
  //   warehouse_accountId: new FormControl('', [Validators.required]),
  //   warehouse_topWarehouseId: new FormControl('',),
  //   warehouse_active: new FormControl('',)
  //
  // });
  //
  // saveWarehouse(saveWarehouse) {
  //   this.warehouse = new Warehouse();
  //   this.warehouse.name = this.WarehouseName.value;
  //   this.warehouse.info = this.WarehouseInfo.value;
  //   this.warehouse.capacity = this.WarehouseCapacity.value;
  //   this.warehouse.parentId = this.WarehouseParentID.value;
  //   this.warehouse.accountId = this.WarehouseAccountID.value;
  //   this.warehouse.isBottom = this.WarehouseIsBottom.value;
  //   this.warehouse.topWarehouseID = this.WarehouseTopWarehouseId.value;
  //   this.warehouse.active = this.WarehouseActive.value;
  //   this.submitted = true;
  //   this.save();
  // }
  //
  // get WarehouseName() {
  //   return this.warehouseAddForm.get('warehouse_name');
  // }
  //
  // get WarehouseInfo() {
  //   return this.warehouseAddForm.get('warehouse_info');
  // }
  //
  // get WarehouseCapacity() {
  //   return this.warehouseAddForm.get('warehouse_capacity');
  // }
  //
  // get WarehouseParentID() {
  //   return this.warehouseAddForm.get('warehouse_parentId');
  // }
  //
  // get WarehouseAccountID() {
  //   return this.warehouseAddForm.get('warehouse_accountId');
  // }
  //
  // get WarehouseIsBottom() {
  //   return this.warehouseAddForm.get('warehouse_isBottom');
  // }
  //
  // get WarehouseTopWarehouseId() {
  //   return this.warehouseAddForm.get('warehouse_topWarehouseId');
  // }
  //
  // get WarehouseActive() {
  //   return this.warehouseAddForm.get('warehouse_active');
  // }
  //
  // addWarehouseForm() {
  //   this.submitted = false;
  //   this.warehouseAddForm.reset();
  // }

  newWarehouse(): void {
    this.submitted = false;
    this.warehouse = new Warehouse();
  }

  save() {
    this.warehouseService.createWarehouse(this.warehouse)
      .subscribe(data => console.log(data), error => console.log(error));
    this.warehouse = new Warehouse();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(["/home/(nav:warehouses)"]);
  }
}
