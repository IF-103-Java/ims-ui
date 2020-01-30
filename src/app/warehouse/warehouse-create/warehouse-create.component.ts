import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../models/warehouse.model';
import {WarehouseService} from '../service/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../../models/address';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {
  warehouse: Warehouse = new Warehouse();
  private isEditAction;

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private route: ActivatedRoute
              )  {
    this.warehouse.addressDto = new Address();

  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') == null) {
      this.isEditAction = false;
    } else {
      this.isEditAction = true;
      this.warehouseService.getWarehouse(Number(this.route.snapshot.paramMap.get('id')))
        .subscribe(data => this.warehouse = data);
    }
  }

  onSubmit() {
    if (this.isEditAction) {
      this.warehouseService.updateWarehouse(this.warehouse.id, this.warehouse);
    } else {
      this.warehouseService.createWarehouse(this.warehouse);
    }
    this.gotoList();
  }

  gotoList() {
    this.router.navigate([
      'home', {
        outlets: { nav : ['warehouses']}
      }
    ]);
  }
}
