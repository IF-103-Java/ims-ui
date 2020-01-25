import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../websocket.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  websocketService: WebsocketService;
  greeting: any;
  name: string;
  ngOnInit() {
    this.websocketService = new WebsocketService(new NotificationComponent());
  }

  connect(){
    this.websocketService._connect();
  }

  disconnect(){
    this.websocketService._disconnect();
  }

  sendMessage(){
    this.websocketService._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }

}
