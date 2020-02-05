import {Component, OnDestroy} from '@angular/core';
import {LoginService} from "../services/login.service";
import {LoginUser} from "../../models/loginUser.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import AppError from "../../errors/app-error";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css',
    '../user-style.css']
})

export class UserSigninComponent implements OnDestroy {
  userErrors: Map<string, string> = new Map<string, string>();
  loginSubscription: Subscription;
  hidePassword = true;
  load = false;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  credentialSetter(response: any) {
    sessionStorage.setItem('jwt-token', response.token);
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('account_id', response.accountId);
    sessionStorage.setItem('account_type', response.accountType);
    sessionStorage.setItem('role', response.role)
  }

  signIn(data: LoginUser): void {
    this.load = true;

    const user = new LoginUser();
    user.username = data.username;
    user.password = data.password;

    this.loginSubscription = this.loginService.login(user)
      .subscribe(response => {
        if (response) {
          this.credentialSetter(response);
          this.router.navigate(['home', {outlets: {nav: ['dashboard']}}]);
        }
      }, (appError: AppError) => {
        if (appError.status === 401) {
          this.userErrors['data'] = 'User with these data not found.';
        } else {
          throw appError;
        }
        this.load = false;
      });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
