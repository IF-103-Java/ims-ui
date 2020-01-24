import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {
  public account: Account;

  public users: User[];

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
  }
}
