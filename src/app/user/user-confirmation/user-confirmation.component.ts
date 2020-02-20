import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import AppError from "../../errors/app-error";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  token: string;
  activateUserSubscription: Subscription;
  isSuccess: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['emailUUID'];
    });
    this.activateUser();
  }

  activateUser() {
    this.activateUserSubscription = this.userService.activateUser(this.token).subscribe(
      response => {
        if (response) {
          this.isSuccess = true;
        }
      }, (appError: AppError) => {
        if (appError.status === 404) {
          this.isSuccess = false;
        } else {
          throw appError;
        }
      }
    )

  }
}
