import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Warehouse} from "../../models/warehouse.model";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public createWarehouse(warehouse: Object): Observable<Object> {
    return this.http.post(this.baseUrl + '/warehouses/add', warehouse);
  }

  public getWarehouse(warehouseId: bigint):Observable<any> {
    return this.http.get<Warehouse[]>(`${this.baseUrl}/warehouses/${warehouseId}`);}


  public findAllWarehouses(page: number, size: number, sort: string, direction: string) {
    return this.http.get<Warehouse[]>(this.baseUrl + '/warehouses?page=' + page + '&size=' + size + '&sort=' + sort + '&direction=' + direction + '');
  }

  public updateWarehouse(warehouseId: bigint, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/warehouses/update/${warehouseId}`, value);
  }

  public deleteWarehouse(warehouseId: bigint): Observable<any> {
    return this.http.delete(`${this.baseUrl}/warehouses/delete/${warehouseId}`, { responseType: 'text' });

  }
}
