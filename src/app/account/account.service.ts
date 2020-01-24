import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';
import {Account} from '../models/account.model';
import {Observable} from 'rxjs';
import {AccountType} from '../models/accountType.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  public view(): Observable<Account> {
    return this.http.get<Account>('http://localhost:8080/accounts/');
  }

  public getUsers() {
    return this.http.get<User[]>('http://localhost:8080/users/account/users');
  }

   public getType() {
     return this.http.get<AccountType>('http://localhost:8080/upgrade/');
   }

   public getPossibleTypes() {
      return this.http.get<AccountType[]>('http://localhost:8080/upgrade/all-possible');
   }
}


