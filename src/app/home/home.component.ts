import {Component, OnInit} from '@angular/core';
import {LoginService} from "../user/services/login.service";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {WebsocketService} from "../websocket/websocket.service";
import {ToastService} from "../websocket/notification/toast.service";
import {UserService} from "../user/services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: NgbModalRef;
  username: string;
  role: string;


  constructor(public toastService: ToastService,
              private loginService: LoginService,
              private router: Router,
              private modalService: NgbModal,
              private websocketService: WebsocketService,
              private userService: UserService) {
  }

  openLogout(content) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.role = sessionStorage.getItem('role');
    this.websocketService._connect();

    // Change nav after update
    this.userService.change.subscribe(user => {
      this.username = user.firstName + ' ' + user.lastName;
    });
  }

  logout() {
    this.websocketService._disconnect();
    this.modalRef.close();
    this.loginService.logout();
    this.router.navigate(['/sign-in']);
  }
}

