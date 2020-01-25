import {Injectable, TemplateRef} from '@angular/core';
import * as SockJS from 'sockjs-client'
import {CompatClient, Stomp} from "@stomp/stompjs";
import {environment} from "../../environments/environment";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  topic = "/topic/notification";
  stompClient: CompatClient;
  toasts: any = [];
  constructor() {
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let _this = this;
    let socket = new SockJS(environment.wsEndPoint);
    _this.stompClient = Stomp.over(socket);
    _this.stompClient.connect({}, function (frame) {
      console.log('Websocket has been connected -> ' + frame);
      _this.stompClient.subscribe(_this.topic,  message => {
        _this.onMessageReceived(message);
      });
      _this.stompClient.reconnect_delay = 2000;
    });
  };

  _disconnect() {
    let _this = this;
    if (_this.stompClient !== null) {
      _this.stompClient.disconnect();
    }
    console.log("Websocket has been disconnected");
  }

  onMessageReceived(event) {
    event = new Event(JSON.parse(event.body));
    console.log("Message Received from Server :: " + event.message);
    this.show(event.message,  { classname: 'bg-success text-light', delay: 10000 });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
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
