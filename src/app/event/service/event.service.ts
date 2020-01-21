import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';
import {Event} from '../../models/event';
import {Transaction} from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  getPage(page: number, size: number, sort: string, params: Map<string, any>): Observable<Page<Event>> {
    const body = {};
    params.forEach((val: string, key: string) => {
      body[key] = val;
    });
    return this.http.post<Page<Event>>(this.baseUrl + '/events?page=' + page + '&size=' + size + '&sort=' + sort, body);
  }

  getEventNames(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.baseUrl + '/events/names');
  }

  getEventTypes(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.baseUrl + '/events/types');
  }

  getUsernames(): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>(this.baseUrl + '/users/usernames');
  }

  getWarehouses(): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>(this.baseUrl + '/warehouses/warehousenames');
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseUrl + '/transactions/' + id);
  }

}
