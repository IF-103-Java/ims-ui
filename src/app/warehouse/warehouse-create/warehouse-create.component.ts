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

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.warehouse.addressDto = new Address();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse);
  }

}
