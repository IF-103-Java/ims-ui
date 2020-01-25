import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Warehouse} from "../../models/warehouse.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public createWarehouse(warehouse: Warehouse) {
    this.http.post(this.baseUrl + '/warehouses/', warehouse);
  }

  public getWarehouseById(warehouseId: bigint) {
    return this.http.get<Warehouse[]>(this.baseUrl + '/warehouses/warehouseId/' + warehouseId);
  }

  public findAllWarehouses(page: number, size: number, sort: string, direction: string) {
    return this.http.get<Warehouse[]>(this.baseUrl + '/warehouses?page=' + page + '&size=' + size + '&sort=' + sort + '&direction=' + direction + '');
  }

}
