import {Component, OnDestroy, OnInit} from '@angular/core';
import AppError from "../../errors/app-error";
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";
import {User} from "../../models/user.model";
import {changeDateFormat, changeTimeFormat} from "../../helpers/date-format-helper";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../websocket/notification/toast.service";
import {ResetPassword} from "../../models/resetPassword.model";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  getCurrentUserSubscription: Subscription;
  deleteUserSubscription: Subscription;
  updateUserSubscription: Subscription;
  changePasswordSubscription: Subscription;
  modalRef: NgbModalRef;

  dateFormatter = changeDateFormat;
  timeFormatter = changeTimeFormat;
  user: User = new User();
  hidePassword = true;
  done: true;
  editForm = false;
  userErrors: Map<string, string> = new Map<string, string>();

  firstName: String;
  lastName: String;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getCurrentUserSubscription = this.userService.getCurrentUser()
      .subscribe((response: HttpResponse<any>) => {
          if (response) {
            this.initUser(response);
          }
        }, (appError: AppError) => {
          throw appError;
        }
      );
  }

  initUser(response: HttpResponse<any>) {
    this.user = response.body;

    this.firstName = new String(this.user.firstName);
    this.lastName = new String(this.user.lastName);
  }

  deleteUser() {
    this.deleteUserSubscription = this.userService.delete(this.user.id).subscribe(
      response => {
        if (response) {
          this.modalRef.close();
          this.loginService.logout();
          this.router.navigate(['/sign-up']);
        }
      },
      (appError: AppError) => {
        if (appError.status === 404) {
          this.toastService.show('User not found.', {classname: 'bg-danger text-light', delay: 3000});
        } else {
          throw appError;
        }
      });

  }

  openDeleteModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  clickEditBtn() {
    this.editForm = true;
  }

  clickCancelBtn() {
    this.firstName = new String(this.user.firstName);
    this.lastName = new String(this.user.lastName);
    this.editForm = false;
  }

  isFormDisable() {
    if (this.editForm) {
      return false;
    }
    return true;
  }

  update(data: any): any {
    const user = new User;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    this.updateUserSubscription = this.userService.update(user)
      .subscribe((response: HttpResponse<any>) => {
        if (response) {
          this.user = response.body;
          this.userService.refreshUsername(this.user);
          this.editForm = false;
          this.toastService.show('User was successfully updated.',
            {classname: 'bg-success text-light', delay: 3000});
        }
      }, (appError: AppError) => {
        throw appError;
      });
  }

  changePassword(data: any) {
    const resetPassword = new ResetPassword();
    resetPassword.currentPassword = data.currentPassword;
    resetPassword.newPassword = data.newPassword;
    this.changePasswordSubscription = this.userService.updatePassword(resetPassword)
      .subscribe(
        response => {
          this.done = true;
        }, (appError: AppError) => {
          if (appError.status === 400) {
            this.toastService.show('An incorrect password was provided.',
              {classname: 'bg-danger text-light', delay: 3000});
          } else {
            throw appError;
          }
        });
  }

  ngOnDestroy(): void {
    this.userService.change.unsubscribe();

    if (this.getCurrentUserSubscription) {
      this.getCurrentUserSubscription.unsubscribe()
    }
    if (this.deleteUserSubscription) {
      this.deleteUserSubscription.unsubscribe()
    }
    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe()
    }
    if (this.changePasswordSubscription) {
      this.changePasswordSubscription.unsubscribe()
    }
  }
}
