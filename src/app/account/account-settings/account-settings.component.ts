import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public account: Account;

  public users: User[];

  public workers: User[];

  public admin: User;

  public type: AccountType;

  constructor(private accountService: AccountService) {
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
}
