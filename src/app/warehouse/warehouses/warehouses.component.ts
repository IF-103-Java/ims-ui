import {Component, OnInit} from '@angular/core';
import {Warehouse} from "../../models/warehouse.model";
import {WarehouseService} from "../service/warehouse.service";

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  page: number =0;
  size: number =5;
  sortValue: string[]=['Id', 'name', 'info', 'capacity', 'parentId', 'isBottom', 'topWarehouseId', 'active']
  sort: {value: string, direction: string};
  warehouses: Warehouse[];
  constructor(private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.warehouseService.findAllWarehouses(this.page,this.size, this.sortValue[0], 'asc').subscribe(data=>{
      this.warehouses = data;
    })
  }

  findAll(){
    this.warehouseService.findAllWarehouses(this.page,this.size, this.sort.value, this.sort.direction).subscribe(data=>{
      this.warehouses = data;
    })
  }
  increment(){
    return  this.page += 1;
  }

  decrement(){
    return  this.page -= 1;
  }


}
