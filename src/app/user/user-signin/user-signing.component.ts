import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signing.component.html',
  styleUrls: ['./user-signing.component.css']
})
export class UserSigninComponent implements OnInit {
  public user: User = new User();

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user);
  }
}
