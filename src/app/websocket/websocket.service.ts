import {Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client'
import {CompatClient, Stomp} from "@stomp/stompjs";
import {environment} from "../../environments/environment";
import {Event} from "../models/event";
import {ToastService} from "./notification/toast.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  topic = "/topic/events/";
  stompClient: CompatClient;

  constructor(private toastService: ToastService) {
  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let _this = this;
    let socket = new SockJS(environment.wsEndPoint);
    _this.stompClient = Stomp.over(socket);
    _this.stompClient.connect({}, function (frame) {
      console.log('Websocket has been connected -> ' + frame);
      _this.stompClient.subscribe(_this.topic + sessionStorage.getItem('account_id'), message => {
        _this.onMessageReceived(message);
      });
      _this.stompClient.reconnect_delay = 2000;
    });
  };

  _disconnect() {
    this.toastService.removeTosts();
    let _this = this;
    if (_this.stompClient !== null) {
      _this.stompClient.disconnect();
    }
    console.log("Websocket has been disconnected");
  }

  onMessageReceived(event) {
    event = new Event(JSON.parse(event.body));
    console.log("Message Received from Server :: " + event.message);
    this.toastService.addNotification(event);
  }
}

export class Message {
  content: string;
  style: string;

  constructor(content, style?) {
    this.content = content
    this.style = style || 'info'
  }

}
