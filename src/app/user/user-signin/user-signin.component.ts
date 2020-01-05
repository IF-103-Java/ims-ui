import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {LoginUser} from "../../models/loginUser.model";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css',
              '../user-style.css']
})
export class UserSigninComponent implements OnInit {
  public user: LoginUser = new LoginUser();

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user)
      .subscribe(response => {
        console.log(response)
      }, error => {
        console.error(error)
      });
  }
}
