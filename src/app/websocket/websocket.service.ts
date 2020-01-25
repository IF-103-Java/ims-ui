import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client'
import {CompatClient, Stomp} from "@stomp/stompjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  topic = "/topic/notification";
  stompClient: CompatClient;
  constructor(){
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let _this = this;
    let socket = new SockJS(environment.wsEndPoint);
    _this.stompClient = Stomp.over(socket);
    _this.stompClient.connect({}, function (frame) {
      console.log('Websocket has been connected -> ' + frame);
      _this.stompClient.subscribe(_this.topic,  message => {
        _this.onMessageReceived(message.body);
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

  onMessageReceived(message) {
    console.log("Message Received from Server :: " + message);
  }
}
