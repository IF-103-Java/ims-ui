import {Component, OnInit} from '@angular/core';
import {Warehouse} from "../../models/warehouse.model";
import {WarehouseService} from "../service/warehouse.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  sortValue: string[]=['id', 'name', 'info', 'capacity', 'parentId', 'isBottom', 'topWarehouseId', 'active']
  sort: {value: string, direction: string};
  warehouses: Warehouse[];

  constructor(private warehouseService: WarehouseService, private router: Router) { }

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

  reloadData() {
    this.findAll();
  }

  deleteEmployee(id: bigint) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  warehouseDetails(id: bigint){
    this.router.navigate(['/home/(nav:warehouses/details', id]);
  }

  warehouseUpdate(id: bigint){
    this.router.navigate(['/home/(nav:warehouses/update', id]);
  }
}
