import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../websocket.service";
import {ToastService} from "./toast.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

