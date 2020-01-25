import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResetPasswordService} from "../services/reset-password.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import AppError from "../../errors/app-error";

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css',
    '../user-style.css']
})
export class UserResetPasswordComponent implements OnInit, OnDestroy {
  done: boolean;
  token: string;
  resetSubscription: Subscription;
  userErrors: Map<string, string> = new Map<string, string>();
  hidePassword: boolean;


  constructor(private route: ActivatedRoute,
              private resetPasswordService: ResetPasswordService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['emailUUID'];
    });
  }


  resetPassword(data: any) {
    if (!this.isButtonDisable(data)) {
      this.resetSubscription = this.resetPasswordService.resetPassword(this.token, data.password).subscribe(
        response => {
          this.done = true;
        }, (appError: AppError) => {
          if (appError.status === 404) {
            this.userErrors['data'] = 'Incorrect data or token is expired. Try to send a password reset message again! ';
          } else {
            throw appError;
          }
        }
      )

    }

  }

  isButtonDisable(data: any) {
    if (data.password !== data.repeatedPassword || !data.password) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }

}
