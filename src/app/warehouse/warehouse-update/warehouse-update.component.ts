import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../service/warehouse.service';
import {Warehouse} from '../../models/warehouse.model';
import {ToastService} from '../../websocket/notification/toast.service';

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {
  id: number;
  warehouse: Warehouse;
  warehouses: Warehouse[];
  submitted = false;
  message: string = "";

  constructor(private route: ActivatedRoute, private router: Router,
              private warehouseService: WarehouseService,
              private toastService: ToastService,
              @Inject('BASE_API_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.warehouse = new Warehouse();
    this.id = this.route.snapshot.params.id;

    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        console.log(data);
        this.warehouse = data;
      }, error => console.log(error));
    this.getChildren(this.id);
  }

  onSubmit() {
    if (this.submitted) {
      this.warehouseService.updateWarehouse(this.warehouse.id, this.warehouse);
    }
  }

  gotoList() {
    this.router.navigate([
      'home', {
        outlets: {nav: ['warehouses']}
      }
    ]);
  }

  gotoEditPage(id: number) {
    console.log(id);
    this.router.navigate([
      'home', {
        outlets: {nav: ['warehouses']}

      }
    ]);
  }

  updateWarehouse(warehouseId: number, warehouse: Warehouse) {
    this.toastService.show('warehpuse updated',  { classname: 'bg-success text-light', delay: 10000 });

    this.warehouseService.updateWarehouse(warehouseId, warehouse);

  }
  getChildren(id: number) {
    this.warehouseService.getChildren(id)
      .subscribe(data => this.warehouses = data);
  }

}
