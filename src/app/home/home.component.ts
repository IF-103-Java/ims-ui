import { Component, OnInit } from '@angular/core';
import {LoginService} from "../user/services/login.service";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

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
              private modalService: NgbModal) {
  }

  openLogout(content) {
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  logout(){
    this.modalRef.close();
    this.loginService.logout();
    this.router.navigate(['/sign-in']);
  }
}
