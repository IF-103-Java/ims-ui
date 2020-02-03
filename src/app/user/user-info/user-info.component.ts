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

  userForm: User = new User();
  firstName: string;



  constructor(private userService: UserService,
              private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getCurrentUserSubscription = this.userService.getCurrentUser()
      .subscribe((response: HttpResponse<any>) => {
        if (response) {
          this.user = response.body;
          this.user.role = response.body.role. substr(5);
          this.userForm.firstName = this.user.firstName;
          this.userForm.lastName = this.user.lastName;
        }
      }, (appError: AppError) => {
        throw appError;
      });
  }


  deleteUser() {
    this.deleteUserSubscription = this.userService.delete(this.user.id).subscribe(
      resp => {
        this.loginService.logout();
        this.router.navigate(['/sign-up']);
      },
      (appError: AppError) => {
        console.log(appError);
        throw appError;
      });
  }

  openDeleteModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  clickEditBtn() {
    this.editForm = true;
  }

  clickCancelBtn() {
    this.userForm.firstName = this.user.firstName;
    this.editForm = false;
  }

  update(data: any): any {
    const user = new User;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    this.updateUserSubscription = this.userService.update(user)
      .subscribe((response: HttpResponse<any>) => {
          if (response) {
            this.user = response.body;
            this.editForm = false;
          }
        }, (appError: AppError) => {
          throw appError;
        }
      )

  }

  isFormDisable() {
    if (this.editForm) {
      return false;
    }
    return true;
  }

  changePassword(data: any) {
    this.changePasswordSubscription = this.userService.updatePassword(data.password)
      .subscribe(
        response => {
          this.done = true;
        }, (appError: AppError) => {
          throw appError;
        }
      )


  }

  ngOnDestroy(): void {
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
