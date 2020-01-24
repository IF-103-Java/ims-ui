import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseAdvice} from '../models/warehouse-advice.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseAdviceService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  getAdvice(id: number): Observable<WarehouseAdvice> {
    return this.http.get<WarehouseAdvice>(`${this.baseUrl}/warehouse-advice/${id}`);
  }
}
