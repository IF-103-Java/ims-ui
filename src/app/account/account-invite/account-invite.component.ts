import {Component, OnInit} from '@angular/core';
import {AccountService} from '../account.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-account-invite',
  templateUrl: './account-invite.component.html',
  styleUrls: ['./account-invite.component.css']
})
export class UserInviteComponent implements OnInit {

  public newUser: User = new User();

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {

  }

  inviteUser() {
    this.accountService.inviteUser(this.newUser);
  }
}
