import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WarehouseLoad} from '../../models/warehouseLoad';
import {EndingItems} from '../../models/endingItems';
import {PopularItemsRequestDto} from '../../models/popularItemRequest';
import {PopularItems} from '../../models/popularItems';
import {WarehousePremiumList} from '../../models/warehousePremiumList';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {}

  getWarehouseLoad() {
    return this.http.get<WarehouseLoad[]>(this.baseUrl + '/dashboard/warehouseLoad');
  }
  getEndingItems(minQuantity: number) {
    if (minQuantity < 1) {
      return null;
    }
    return this.http.get<EndingItems[]>(this.baseUrl + '/dashboard/endingItems?minQuantity=' + minQuantity);
  }
  getPopularItems(popularItemsRequestDto: PopularItemsRequestDto) {
    return this.http.post<PopularItems[]>(this.baseUrl + '/dashboard/popularityItems', popularItemsRequestDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
  getWarehousePremiumList(id: bigint) {
    return this.http.get<WarehousePremiumList>( this.baseUrl + '/dashboard/premiumLoad/' + id);
  }
}
