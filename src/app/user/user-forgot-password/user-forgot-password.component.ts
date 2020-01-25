import {Component, OnInit} from '@angular/core';
import {ResetPasswordService} from "../services/reset-password.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import AppError from "../../errors/app-error";

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css',
    '../user-style.css']
})
export class UserForgotPasswordComponent implements OnInit {
  done: boolean;
  forgotSubscription: Subscription;
  userErrors: Map<string, string> = new Map<string, string>();

  constructor(private resetPasswordService: ResetPasswordService,
              public router: Router) {
  }

  ngOnInit() {
  }

  forgotPassword(data: any) {

    this.forgotSubscription = this.resetPasswordService.sendResetPasswordToken(data.email)
      .subscribe(response => {
        this.done = true;
      }, (appError: AppError) => {
        if (appError.status === 404) {
          this.userErrors['email'] = 'User with this email doesn\'t exist';
        } else {
          throw appError;
        }
      });
  }

}
