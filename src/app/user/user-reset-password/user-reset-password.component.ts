import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ResetPasswordService} from "../services/reset-password.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css',
    '../user-style.css']
})
export class UserResetPasswordComponent implements OnInit {
  await: boolean;
  done: boolean;
  token: string;
  resetSubscription: Subscription;
  userErrors: Map<string, string> = new Map<string, string>();


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private resetPasswordService: ResetPasswordService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['emailUUID'];
    });
  }


  resetPassword(data: any) {
    console.log(data);
    if (!this.isButtonDisable(data)) {
      console.log("isButtonDisable");
      this.resetSubscription = this.resetPasswordService.resetPassword(this.token, data.password).subscribe(
        response => {
          this.done = true;
          this.await = false;
        }, error => {
          this.await = false;
        }
      )

    }

  }

  isButtonDisable(data: any) {
    console.log(data);
    if (data.password !== data.repeatedPassword || !data.password) {
      return true;
    }
    return false;
  }

}
