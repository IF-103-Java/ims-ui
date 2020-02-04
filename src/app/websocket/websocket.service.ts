import {Inject, Injectable} from '@angular/core';
import * as SockJS from 'sockjs-client'
import {CompatClient, Stomp} from "@stomp/stompjs";
import {Event} from "../models/event";
import {ToastService} from "./notification/toast.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  wsEndPoint = '/ims-websocket'
  topic = "/topic/events/";
  stompClient: CompatClient;

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private toastService: ToastService) {
  }

  _connect() {
    let _this = this;
    let socket = new SockJS(_this.baseUrl + _this.wsEndPoint);
    _this.stompClient = Stomp.over(socket);
    _this.stompClient.debug = function (message) {
    }
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic + sessionStorage.getItem('account_id'), message => {
        _this.onMessageReceived(message);
      });
      _this.stompClient.reconnect_delay = 2000;
    });
  };

  _disconnect() {
    this.toastService.removeAllToasts();
    let _this = this;
    if (_this.stompClient !== null) {
      _this.stompClient.disconnect();
    }
  }

  onMessageReceived(event) {
    event = new Event(JSON.parse(event.body));
    this.toastService.addNotification(event);
  }
}

