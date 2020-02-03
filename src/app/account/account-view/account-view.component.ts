import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';
import {HttpResponse} from '@angular/common/http';
import AppError from '../../errors/app-error';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {
  deleteErrors: Map<string, string> = new Map<string, string>();
  public account: Account;

  public users: User[];

  public workers: User[];

  public admin: User;

  public type: AccountType;

  constructor(private accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
    this.accountService.view().subscribe(data => {
      this.account = data;
    });
    this.accountService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.accountService.getType().subscribe(data => {
      this.type = data;
    });
    this.accountService.getWorkers().subscribe(data => {
      this.workers = data;
    });
    this.accountService.getAdmin().subscribe(data => {
      this.admin = data;
    });
  }

  deleteWorker(userId: bigint) {
    this.accountService.deleteWorker(userId);
  }

  updateAccountName(name: string) {
    this.accountService.updateAccountName(name);
  }

  onSubmit() {
    this.accountService.updateAccountName(this.account.name);
  }
}
