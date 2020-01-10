
import {HttpErrorResponse} from '@angular/common/http';

export default class AppError extends HttpErrorResponse {
  constructor(error?: any) {
    super(error);
  }
}
