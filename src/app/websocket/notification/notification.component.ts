import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../websocket.service";
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private websocketService: WebsocketService, private toastService: ToastService) {
  }

  ngOnInit() {
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {classname: 'bg-success text-light', delay: 10000});
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, {classname: 'bg-danger text-light', delay: 15000});
  }

  connect() {
    this.websocketService._connect();
  }

  disconnect() {
    this.websocketService._disconnect();
  }

}

