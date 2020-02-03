import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';
import {Account} from '../models/account.model';
import {Observable} from 'rxjs';
import {AccountType} from '../models/accountType.model';
import {Page} from "../models/page";
import {Event} from "../models/event";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public view(): Observable<Account> {
    return this.http.get<Account>(this.baseUrl + '/accounts/');
  }

  getUsers(page: number, size: number, sort: string): Observable<Page<User>> {
    return this.http.get<Page<User>>(this.baseUrl + '/users/account/users?page=' + page + '&size=' + size + '&sort=' + sort);
  }

  public getAdmin() {
    return this.http.get<User>(this.baseUrl + '/users/account/admin');
  }

   public getType() {
     return this.http.get<AccountType>(this.baseUrl + '/upgrade/');
   }

   public getPossibleTypes() {
      return this.http.get<AccountType[]>(this.baseUrl + '/upgrade/all-possible');
   }

   public inviteUser(user: User) {
      return this.http.post(this.baseUrl + '/invite/', user);
   }

   public upgradeAccount(typeId: bigint): Observable<any> {
     return this.http.put(this.baseUrl + '/upgrade/' + typeId, typeId);
   }

   public deleteWorker() {}
}


