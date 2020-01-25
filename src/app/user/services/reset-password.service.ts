import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import AppError from "../../errors/app-error";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public sendResetPasswordToken(email: string) {
    const body = {email: email};
    return this.http.post(this.baseUrl + '/forgot-password', body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      )
  }

  public resetPassword(token: string, newPassword: string) {
    return this.http.post(this.baseUrl + '/reset-password?emailUUID=' + token, newPassword)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      )
  }
}
