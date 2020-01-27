import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseStorageAdvice} from '../models/warehouse-advice.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseAdviceService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  getAdvice(id: bigint): Observable<WarehouseStorageAdvice> {
    return this.http.get<WarehouseStorageAdvice>(`${this.baseUrl}/warehouse-advice/${id}`);
  }
}
