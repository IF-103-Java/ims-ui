import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../models/warehouse.model';
import {WarehouseService} from '../service/warehouse.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Address} from '../../models/address';
import {ToastService} from '../../websocket/notification/toast.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {
  warehouse: Warehouse = new Warehouse();
  topWarehouses: Warehouse[];

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private location: Location
  ) {
    this.warehouse.addressDto = new Address();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse).subscribe(data => {
      console.log(data.message);
      if (data.message != null) {
        this.toastService.show('Warehouse' +  data.message + ' was created!', {classname: 'bg-danger text-light', delay: 5000});
      }
    });
  }

  back() {
    this.location.back();
  }

}
