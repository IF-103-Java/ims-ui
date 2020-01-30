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
  pageSizeValue = [5, 10];
  page: 0;
  page$ = new Page<Warehouse>();
  sortBy: 'id';
  direction: 'asc';

  constructor(private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private router: Router) { }

  ngOnInit() {
    this.warehouseService.getWarehousesPage(this.page$.number, this.page$.size, this.page$.sortBy)
      .subscribe(data => this.page$ = data);
  }

  getWarehouses(){
    this.warehouseService.getWarehousesPage(this.page, this.page$.size, this.sortBy)
      .subscribe(data => this.page$ = data);
    }

  editWarehouse(id: number) {
    this.router.navigate([
      'home', {
        outlets: {nav: ['warehouse-update/:id']}
      }
    ]);
  }

  deleteWarehouse(id: number) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(data => { this.getWarehouses();
    });
  }
}
