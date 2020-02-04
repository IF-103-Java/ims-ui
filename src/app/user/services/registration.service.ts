import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import AppError from "../../errors/app-error";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public regUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/signup', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

}
