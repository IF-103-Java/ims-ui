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

  connect(){
    this.websocketService._connect();
  }

  disconnect(){
    this.websocketService._disconnect();
  }

}
