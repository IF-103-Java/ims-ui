import {Component, OnInit} from '@angular/core';
import {WarehouseLoad} from '../models/warehouseLoad';
import {PopularItemsRequestDto} from '../models/popularItemRequest';
import {DashboardService} from './service/dashboard.service';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {EndingItems} from '../models/endingItems';
import {PopularItems} from '../models/popularItems';
import {WarehousePremiumList} from '../models/warehousePremiumList';
import {Page} from '../models/page';


interface State {
  page: number;
  pageSize: number;
  collectionSize: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, NgbProgressbarConfig]
})
export class DashboardComponent implements OnInit {
  pageSizeOptions = [2, 4, 6];
  load1: boolean;
  load2: boolean;
  load3: boolean;
  load4: boolean;
  loadPremium: boolean;
  warehouseLoad$: WarehouseLoad[];

  page$ = new Page<EndingItems>();
  minQuantity = 5;
  direction = 'asc';
  sortBy = 'quantity,DESC';
  page = 1;
  arrow = '↑';

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

  isPremium: boolean;
  constructor(private dashboardService: DashboardService,
              config: NgbProgressbarConfig) {
    config.height = '25px';
    config.striped = true;
    config.showValue = false;

    this.page$.size = 4;
    this.page$.number = 0;

    this.popularRequest.dateType = 'ALL';
    this.popularRequest.popType = 'TOP';
    this.popularRequest.quantity = 5;
    this.popularRequest.date = new Date(this.year + '-' + this.month + '-' + '01');

    this.load1 = false;
    this.load2 = false;
    this.load3 = false;
    this.load4 = false;
    this.loadPremium = true;
  }

  ngOnInit() {
    this.getWarehouseLoad();

    this.getEndingItemsPage();

    this.getPopularItems();

    this.getType();
  }

  getWarehouseLoad() {
    this.dashboardService.getWarehouseLoad()
      .subscribe(data => {
        this.warehouseLoad$ = data;
        this.load1 = true;
      });
  }

  getEndingItemsPage() {
    this.dashboardService.getEndingItemsPage(this.page - 1, this.page$.size, this.sortBy, this.minQuantity)
      .subscribe(data => {
        this.page$ = data;
        this.load2 = true;
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
        this.load3 = true;
      });
  }
  getType() {
      this.isPremium = sessionStorage.getItem('account_type') === '2';
      this.load4 = true;
  }
  setDate() {
    this.popularRequest.date = new Date(this.year + '-' + this.month + '-' + '01');
  }

  getPremiumLoad(premiumId) {
    this.loadPremium = false;
    return this.dashboardService.getWarehousePremiumList(premiumId).subscribe(data => {
      this.premiumLoad$ = data;
      this.loadPremium = true;
    });
  }
  isZero(num: bigint) {
    return num.toString() === '0';
  }
  toNum(num: string) {
    return Number(num);
  }
  lessThan25(num: number | bigint) {
    return num <= 25;
  }
  lessThan50(num: number | bigint) {
    return num <= 50;
  }
  lessThan75(num: number | bigint) {
    return num <= 75;
  }
  change() {
    if (this.sortBy === 'quantity,DESC') {
      this.sortBy = 'quantity,ASC';
      this.arrow = '↓';
    } else {
      this.sortBy = 'quantity,DESC';
      this.arrow = '↑';
    }
  }
}
