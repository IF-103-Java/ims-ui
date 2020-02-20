import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';
import {HttpResponse} from '@angular/common/http';
import AppError from '../../errors/app-error';
import {Router} from '@angular/router';
import {Page} from '../../models/page';
import {ToastService} from '../../websocket/notification/toast.service';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {
  deleteErrors: Map<string, string> = new Map<string, string>();
  public account: Account;

  page = new Page<User>();

  pageSizeOptions = [10, 15, 20];

  pageNumber = 1;

  sort = 'first_name,Desc';

  public admin: User;

  public type: AccountType;

  constructor(private accountService: AccountService, public router: Router, private toastService: ToastService, private userService: UserService) {
    this.page.size = 10;
  }

  ngOnInit() {
    this.accountService.view().subscribe(data => {
      this.account = data;
    });
    this.accountService.getType().subscribe(data => {
      this.type = data;
    });
    this.accountService.getAdmin().subscribe(data => {
      this.admin = data;
    });
    this.getWorkers();
  }

  deleteWorker(userId: bigint) {
    this.userService.delete(userId).subscribe(response => {
      this.toastService.show('User was deleted.',{classname: 'bg-success text-light', delay: 5000});
      this.getWorkers();
    });
  }

  onSubmit() {
    this.accountService.updateAccountName(this.account.name).subscribe(data => {
      if (data.name != null) {
          this.toastService.show('Account name was successfully changed.',{classname: 'bg-success text-light', delay: 5000});
      }
    });
  }

  getWorkers() {
    this.accountService.getWorkers(this.pageNumber - 1, this.page.size, this.sort).subscribe(data => {
      this.page = data;
    });
  }
}
