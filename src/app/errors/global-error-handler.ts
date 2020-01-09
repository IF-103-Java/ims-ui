import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import AppError from './app-error';
import ErrorInfo from "../models/errorInfo.model";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  errorInfo: ErrorInfo;

  constructor(private injector: Injector, private ngZone: NgZone) {
  }

  handleError(appError: HttpErrorResponse): void {
    const router = this.injector.get(Router);
    switch (appError.status) {
      case 0:
        alert('No Network access or Server not work');
        break;
      case 401:
        this.errorInfo = <AppError>appError.error;
        alert(this.errorInfo.message);
        this.ngZone.run(() => router.navigate(['home'])).then();
        break;
      case 403:
        this.errorInfo = <AppError>appError.error;
        alert(this.errorInfo.message);
        this.ngZone.run(() => router.navigate(['home'])).then();
        break;
      case 404:
        this.errorInfo = <AppError>appError.error;
        alert(this.errorInfo.message);
        this.ngZone.run(() => router.navigate(['home'])).then();
        break;
      case 500:
        alert(appError.message);
        this.ngZone.run(() => router.navigate(['home'])).then();
        break;
      default:
        alert(appError.message);
    }
  }
}
