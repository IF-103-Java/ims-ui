import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {LoginUser} from "../../models/loginUser.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {tokenSetter} from "../../helpers/http-request-helper";
import AppError from "../../errors/app-error";
import ValidationError from "../../models/validationError";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css',
    '../user-style.css']
})

export class UserSigninComponent implements OnDestroy {
  userErrors: Map<string, string> = new Map<string, string>();
  hidePassword = true;
  loginSubscription: Subscription;

  constructor(private authService: LoginService, private router: Router) {
  }

  signIn(data: any): void {
    const user = new LoginUser();
    user.username = data.username;
    user.password = data.password;
    this.loginSubscription = this.authService.login(user)
      .subscribe((response: HttpResponse<any>) => {
        if (response) {
          tokenSetter(response);
          this.router.navigate(['/']);
        }
      }, (appError: AppError) => {
        if (appError.status === 422) {
          this.userErrors = (<ValidationError>appError.error).validationErrors;
        } else if (appError.status === 401) {
          this.userErrors['username'] = 'User with these data not found.';
          this.userErrors['password'] = 'User with these data not found.';
        } else {
          throw appError;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
