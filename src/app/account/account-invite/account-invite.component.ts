import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';
import {HttpResponse} from '@angular/common/http';
import AppError from '../../errors/app-error';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-invite',
  templateUrl: './account-invite.component.html',
  styleUrls: ['./account-invite.component.css']
})
export class UserInviteComponent implements OnInit {
  inviteErrors: Map<string, string> = new Map<string, string>();

  constructor(private accountService: AccountService, public router: Router) {
  }

  ngOnInit() {

  }

  inviteUser(data: any) {
    const user = new User;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    this.accountService.inviteUser(user) .subscribe((response: HttpResponse<any>) => {
      if (response) {
        this.router.navigate(['account']);
      }
    }, (appError: AppError) => {
      if (appError.status === 500) {
        this.inviteErrors['invite'] = 'Invite is not successful';
      } else {
        throw appError;
      }
    });
  }
}
