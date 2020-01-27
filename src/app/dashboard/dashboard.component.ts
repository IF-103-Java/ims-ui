import {Component, OnInit} from '@angular/core';
import {WarehouseLoad} from '../models/warehouseLoad';
import {PopularItemsRequestDto} from '../models/popularItemRequest';
import {DashboardService} from './service/dashboard.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {EndingItems} from '../models/endingItems';
import {PopularItems} from '../models/popularItems';
import {WarehousePremiumList} from '../models/warehousePremiumList';

interface State {
  page: number;
  pageSize: number;
  collectionSize: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService, NgbProgressbarConfig]
})
export class DashboardComponent implements OnInit {
  warehouseLoad$: WarehouseLoad[];

  endingState: State = {
    page: 1,
    pageSize: 4,
    collectionSize: 10
  };
  minQuantity = 5;
  endingItems$: EndingItems[];

  popularState: State = {
    page: 1,
    pageSize: 4,
    collectionSize: 10
  };
  popularItems$: PopularItems[];
  popularRequest: PopularItemsRequestDto = new PopularItemsRequestDto();
  month = '01';
  year = '2020';

  premiumLoad$: WarehousePremiumList;
  // @ts-ignore
  premiumId: bigint;

  constructor(private dashboardService: DashboardService,
              config: NgbProgressbarConfig) {
    config.height = '25px';
    config.striped = true;
    config.showValue = false;
    config.type = 'value > 25 ? su';

    this.popularRequest.dateType = 'ALL';
    this.popularRequest.popType = 'TOP';
    this.popularRequest.quantity = 5;
    this.popularRequest.date = new Date(this.year + '-' + this.month + '-' + '01');
  }

  ngOnInit() {
    this.dashboardService.getWarehouseLoad()
      .subscribe(data => this.warehouseLoad$ = data);

    this.getEndingItems();

    this.getPopularItems();
  }

  getEndingItems() {
    this.dashboardService.getEndingItems(this.minQuantity)
      .subscribe(data => {
        this.endingState.collectionSize = data.length;
        this.endingItems$ = data.slice( (this.endingState.page - 1) * (this.endingState.pageSize),
          (this.endingState.page - 1) * (this.endingState.pageSize) + this.endingState.pageSize);
      });
  }

  getPopularItems() {
    return this.dashboardService.getPopularItems(this.popularRequest)
      .subscribe(data => {
        if (data == null) {
          this.popularState.collectionSize = 0;
          this.popularItems$ = null;
        } else {
          this.popularState.collectionSize = data.length;
          this.popularItems$ = data.slice( (this.popularState.page - 1) * (this.popularState.pageSize),
            (this.popularState.page - 1) * (this.popularState.pageSize) + this.popularState.pageSize);
        }
      });
  }
  setDate() {
    this.popularRequest.date = new Date(this.year + '-' + this.month + '-' + '01');
  }

  getPremiumLoad(premiumId) {
    return this.dashboardService.getWarehousePremiumList(premiumId).subscribe(data => {
      this.premiumLoad$ = data;
    });
  }
}
