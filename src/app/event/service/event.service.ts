import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';
import {Event} from '../../models/event';
import {Transaction} from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  URL = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {
  }


  getPage(page: number, size: number, sort: string, params: Map<string, any>): Observable<Page<Event>> {
    const body = {};
    params.forEach((val: string, key: string) => {
      body[key] = val;
    });
    return this.http.post<Page<Event>>(this.URL + '?page=' + page + '&size=' + size + '&sort=' + sort, body);
  }

  getEventNames(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.URL + '/names');
  }

  getEventTypes(): Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.URL + '/types');
  }

  getUsernames(): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>('http://localhost:8080/users/usernames');
  }

  getWarehouses(): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>('http://localhost:8080/warehouses/warehousenames');
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>('http://localhost:8080/transactions/' + id);
  }

}
