import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastService} from "../websocket/notification/toast.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector,
              private ngZone: NgZone,
              private toastService: ToastService) {
  }

  handleError(appError: HttpErrorResponse): void {
    const router = this.injector.get(Router);
    switch (appError.status) {
      case 0: {
        this.toastService.show('No Network access or Server not work', {classname: 'bg-danger text-light', delay: 3000});
        break;
      }
      case 500: {
        this.toastService.show(appError.message, {classname: 'bg-success text-light', delay: 3000});
        this.ngZone.run(() => router.navigate(['/'])).then();
        break;
      }
      default: {
        break;
      }
    }
  }

}
