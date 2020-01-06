import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {
  }

  public sendResetPasswordToken(email: string) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/forgot-password/', email, {headers});
  }

  public resetPassword(token: string, newPassword: string) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:8080/reset-password?emailUUID=' + token, newPassword, {headers});
  }
}
