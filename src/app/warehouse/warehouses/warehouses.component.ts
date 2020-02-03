import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../models/warehouse.model';
import {WarehouseService} from '../service/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../models/page';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  pageSizeValue = [3, 5, 7, 10];
  page: 0;
  page$ = new Page<Warehouse>();
  sortBy: 'id';
  direction: 'asc';

  constructor(private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private router: Router) {
    this.page$.size = 5;
    this.page$.number = 0;
    this.page$.sortBy = 'id,ASC';
  }

  ngOnInit() {
    this.warehouseService.getWarehousesPage(this.page$.number, this.page$.size, this.page$.sortBy)
      .subscribe(data => this.page$ = data);
  }

  getWarehouses() {
    this.warehouseService.getWarehousesPage(this.page - 1, this.page$.size, this.sortBy)
      .subscribe(data => this.page$ = data);
  }

  editWarehouse(id: number) {
    this.router.navigate([
      'home', {
        outlets: {nav: ['warehouse-update', id]}
      }
    ]);
  }

  deleteWarehouse(id: number) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(data => {
        this.getWarehouses();
      });
  }


}
