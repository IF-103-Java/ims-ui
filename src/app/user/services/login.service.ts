import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  public login(user: User) {
    this.http.post('http://localhost:8080/signin', user);
  }

  public sendResetPasswordToken(email: string ){
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/forgot-password/', email, {headers});
  }

  public resetPassword(token: string, newPassword: string){
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/reset-password?emailUUID='+token, newPassword, {headers});
  }
}
