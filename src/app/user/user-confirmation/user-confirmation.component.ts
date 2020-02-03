import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-confirmation',
  templateUrl: './user-confirmation.component.html',
  styleUrls: ['./user-confirmation.component.css']
})
export class UserConfirmationComponent implements OnInit {
  token: string;
  activateUserSubscription: Subscription;
  messages: Map<string, string> = new Map<string, string>();

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
          this.messages['data'] = 'Your account has been successfully activated! Follow login to start work!';
        } else {
          this.messages['data'] = 'Something went wrong! Your account hasn\'t been activated!';
        }

      }
    )

  }
}
