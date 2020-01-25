import {Component, OnInit} from '@angular/core';
import {Warehouse} from "../../models/warehouse.model";
import {WarehouseService} from "../service/warehouse.service";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {
  public warehouse: Warehouse = new Warehouse();

  constructor(private warehouseService: WarehouseService) {
  }

  ngOnInit() {
  }

  addWarehouse() {
    this.warehouseService.addWarehouse(this.warehouse)
  }
}
