import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../websocket.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private websocketService: WebsocketService) {
  }
  ngOnInit() {
  }

  showStandard() {
    this.websocketService.show('I am a standard toast');
  }

  showSuccess() {
    this.websocketService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl) {
    this.websocketService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
  connect(){
    this.websocketService._connect();
  }

  disconnect(){
    this.websocketService._disconnect();
  }

}

