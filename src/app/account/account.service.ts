import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  public view() {
    return this.http.get<Account>('http://localhost:8080/account-view');
  }

  public getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users/account/users');
  }

}

