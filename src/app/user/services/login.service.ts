import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user.model";
import {LoginUser} from "../../models/loginUser.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  public login(user: LoginUser) {
    return this.http.post('http://localhost:8080/signin', user);
  }
}
