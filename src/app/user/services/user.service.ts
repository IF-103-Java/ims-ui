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


  getUserById(id: number): Observable<any> {
    return this.http.get<User>(
      this.baseUrl + '/users/' + id,
      {observe: 'response'}
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(new AppError(error));
      })
    );
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<User>(
      this.baseUrl + '/users?email=' + email,
      {observe: 'response'}
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(new AppError(error));
      })
    );
  }

  getUsersByAccountId(id: number): Observable<any> {
    return this.http.get<User[]>(
      this.baseUrl + '/users/account/users?accountId' + id,
      {observe: 'response'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/users/me', user,
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
      this.baseUrl + '/users',
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

}
