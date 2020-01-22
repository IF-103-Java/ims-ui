import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Warehouse} from "../../models/warehouse.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class WarehouseService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public addWarehouse(warehouse: Warehouse) {
    this.http.post(this.baseUrl + '/warehouses/', warehouse);
  }

  public getWarehouseById(warehouseId: bigint) {
    return this.http.get<Warehouse[]>(this.baseUrl + '/warehouses/warehouseId/' + warehouseId);
  }
}
