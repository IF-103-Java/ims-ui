import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private ngZone: NgZone) {
  }

  handleError(appError: HttpErrorResponse): void {
    const router = this.injector.get(Router);
    switch (appError.status) {
      case 0: {
        alert('No Network access or Server not work');
        break;
      }
      case 500: {
        alert(appError.message);
        this.ngZone.run(() => router.navigate(['/'])).then();
        break;
      }
      default: {
        break;
      }
    }
  }

}
