import {Component, OnInit} from '@angular/core';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account-upgrade',
  templateUrl: './account-upgrade.component.html',
  styleUrls: ['./account-upgrade.component.css']
})
export class AccountUpgradeComponent implements OnInit {

   public currentType: AccountType;

   public possibleToUpgradeTypes: AccountType[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getType().subscribe(data => {
      this.currentType = data;
    });
    this.accountService.getPossibleTypes().subscribe(data => {
      this.possibleToUpgradeTypes = data;
    });
  }
}
