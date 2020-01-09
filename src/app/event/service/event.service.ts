import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';
import {Event} from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  URL = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {
  }


  getPage(page: number, size: number, params: Map<string, any>): Observable<Page<Event>> {
    const body = {};
    params.forEach((val: string, key: string) => {
      body[key] = val;
    });
    return this.http.post<Page<Event>>(this.URL + '/test?page=' + page + '&size=' + size + '&sort=id,DESC',
      body);
  }
}
