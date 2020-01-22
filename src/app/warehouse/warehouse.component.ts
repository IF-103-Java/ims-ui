import { Component, OnInit } from '@angular/core';
import {Warehouse} from "../models/warehouse.model";
import {WarehouseService} from "./service/warehouse.service";



@Component({
  selector: 'warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  public warehouse: Warehouse = new Warehouse();

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit() {
  }
  createWarehouse(){
    this.warehouseService.addWarehouse(this.warehouse);
  }
}
