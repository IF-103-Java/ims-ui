import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {RegistrationService} from "../services/registration-service.service";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  public user: User = new User();

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

  createUser() {
    this.registrationService.regUser(this.user)
      .subscribe(response=>{console.log(response)}, error => {console.error(error)})
  }
}
