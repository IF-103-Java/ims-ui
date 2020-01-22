import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Account} from '../../models/account.model';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  public view(): Observable<Account> {
    return this.http.get<Account>('http://localhost:8080/account-view');
  }

}

