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
  public account: Account = new Account();

  users: User[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.view();
    this.accountService.getUsers().subscribe(data => {
      this.users = data;
  });
}
}
