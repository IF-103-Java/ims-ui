import {Component, OnInit} from '@angular/core';
import {AccountType} from '../../models/accountType.model';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import AppError from '../../errors/app-error';

@Component({
  selector: 'app-account-upgrade',
  templateUrl: './account-upgrade.component.html',
  styleUrls: ['./account-upgrade.component.css']
})
export class AccountUpgradeComponent implements OnInit {
  upgradeErrors: Map<string, string> = new Map<string, string>();

   public currentType: AccountType;

   public possibleToUpgradeTypes: AccountType[];

  constructor(private accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
    this.accountService.getType().subscribe(data => {
      this.currentType = data;
    });
    this.accountService.getPossibleTypes().subscribe(data => {
      this.possibleToUpgradeTypes = data;
    });
  }

  upgradeAccount(newTypeId: bigint) {
    this.accountService.upgradeAccount(newTypeId).subscribe((response: HttpResponse<any>) => {
      this.getData();
    });
  }

  getData() {
    this.accountService.getType().subscribe(data => {
      this.currentType = data;
    });
    this.accountService.getPossibleTypes().subscribe(data => {
      this.possibleToUpgradeTypes = data;
    });
  }
}
