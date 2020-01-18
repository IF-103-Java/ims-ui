import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public sendResetPasswordToken(email: string) {
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl + '/forgot-password/', email, {headers});
  }

  public resetPassword(token: string, newPassword: string) {
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl + '/reset-password?emailUUID=' + token, newPassword, {headers});
  }
}
