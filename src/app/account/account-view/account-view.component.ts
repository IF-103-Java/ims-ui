import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.css']
})
export class AccountViewComponent implements OnInit {
  public account: Account = new Account();

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
  }

  view() {
    this.accountService.view();
  }
}
