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
  modalRef: NgbModalRef;

  dateFormatter = changeDateFormat;
  timeFormatter = changeTimeFormat;
  user: User = new User();

  editForm = false;


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
          this.user.role = response.body.role.substr(5);
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
      }
    );
  }

  openDeleteModal(content) {
    this.modalRef = this.modalService.open(content);
  }

  clickEditBtn() {
    this.editForm = true;
  }

  clickCancelBtn() {
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
  }
}
