import {Injectable, TemplateRef} from '@angular/core';
import {Event} from "../../models/event";


@Injectable({providedIn: 'root'})

export class ToastService {
  toasts: any[] = [];
  notifications: Event[] = [];
  unreadCount: number = 0;

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  openCenter() {
    this.unreadCount = 0;
  }


  addNotification(event: Event) {
    this.notifications.unshift(event);
    this.unreadCount++;
    this.show(event.message, {classname: 'bg-info text-light', delay: 10000})
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  removeAllToasts() {
    this.toasts = [];
  }
}
