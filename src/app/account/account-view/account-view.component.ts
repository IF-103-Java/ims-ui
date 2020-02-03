import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';
import {Page} from "../../models/page";

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {
  public account: Account;

  page = new Page<User>();

  pageSizeOptions = [10, 15, 20];

  public admin: User;

  public type: AccountType;

  pageNumber: number = 1;

  sort = 'first_name,Desc';

  constructor(private accountService: AccountService) {
    this.page.size=10;
  }

  getUsers() {
    this.accountService.getUsers(this.pageNumber - 1, this.page.size, this.sort).subscribe(data => {
      this.page = data;
    });
  }
  ngOnInit() {
    this.accountService.view().subscribe(data => {
      this.account = data;
    });
    this.accountService.getType().subscribe(data => {
      this.type = data;
    });
    this.getUsers();
    this.accountService.getAdmin().subscribe(data => {
      this.admin = data;
    });
  }
}
