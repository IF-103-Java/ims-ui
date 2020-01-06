import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ResetPasswordService} from "../services/reset-password.service";

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css',
              '../user-style.css']
})
export class UserForgotPasswordComponent implements OnInit {
  private await: boolean;
  private done: boolean;
  private forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private resetPasswordService: ResetPasswordService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(email: string) {
    this.await = true;
    this.resetPasswordService.sendResetPasswordToken(email).subscribe(response => {
        this.done = true;
        this.await = false;
      }, error => {
        this.await = false;
      }
    );
  }
}
