import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from '../../models/warehouse.model';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public createWarehouse(warehouse: Warehouse) {
    console.log(warehouse.name);
    this.http.post(this.baseUrl + '/warehouses/add', warehouse);

  }

  public getWarehouse(warehouseId: number): Observable<Warehouse> {
    return this.http.get<Warehouse>(this.baseUrl + `/warehouses/` + warehouseId);
  }


  public getWarehousesPage(page: number, size: number, sort: string) {
    return this.http.get<Page<Warehouse>>(this.baseUrl + '/warehouses?page=' + page + '&size='
      + size + '&sort=' + sort);
  }

  public updateWarehouse(warehouseId: number, warehouse: Warehouse): Observable<Warehouse>{
    return this.http.put<Warehouse>( this.baseUrl + `/warehouses/update/` + warehouseId, warehouse);
  }

  public deleteWarehouse(warehouseId: number) {
    return this.http.delete(this.baseUrl + `/warehouses/` + warehouseId);

  }

  public getChildren(warehouseId: number): Observable<Array<Warehouse>> {
      return this.http.get<Array<Warehouse>>(this.baseUrl + `/warehouses/children/` + warehouseId);
  }

}
