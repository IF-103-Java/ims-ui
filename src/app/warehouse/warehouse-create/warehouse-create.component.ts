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
