import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ResetPasswordService} from "../services/reset-password.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css',
    '../user-style.css']
})
export class UserResetPasswordComponent implements OnInit {
  private await: boolean;
  private done: boolean;
  private token: string;
  private resetPasswordForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private resetPasswordService: ResetPasswordService) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: '',
      repeatedPassword: ''
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onSubmit(newPassword: string) {
    this.await = true;
    this.resetPasswordService.resetPassword(this.token, newPassword).subscribe(response => {
        this.done = true;
        this.await = false;
      }, error => {
        this.await = false;
      }
    );
  }

}
