import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import AppError from "../../errors/app-error";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  update(user: User): Observable<any> {
    return this.http.put<User>(this.baseUrl + '/users/me', user,
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  updatePassword(password: string): Observable<any> {
    return this.http.post<User>(this.baseUrl + '/users/update-password', password,
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<User>(this.baseUrl + '/users/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(
      this.baseUrl + '/users/account/users',
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<User>(
      this.baseUrl + '/users/me',
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  public activateUser(token: string): Observable<any>  {
    return this.http.post(this.baseUrl + '/users/confirmation?emailUUID=' + token,
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      )
  }
}
