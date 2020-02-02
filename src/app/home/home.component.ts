import { Component, OnInit } from '@angular/core';
import {LoginService} from "../user/services/login.service";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {WebsocketService} from "../websocket/websocket.service";
import {ToastService} from "../websocket/notification/toast.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: NgbModalRef;
  username: string;


  constructor(private loginService: LoginService,
              private router: Router,
              private modalService: NgbModal,
              private websocketService: WebsocketService,
              public toastService: ToastService) {
  }

  openLogout(content) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.websocketService._connect();
  }

  logout(){
    this.websocketService._disconnect();
    this.modalRef.close();
    this.loginService.logout();
    this.router.navigate(['/sign-in']);
  }
}
