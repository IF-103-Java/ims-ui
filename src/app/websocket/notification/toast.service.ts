import {Injectable, TemplateRef} from '@angular/core';
import {Event} from "../../models/event";


@Injectable({providedIn: 'root'})

export class ToastService {
  toasts: any[] = [];
  notifications: Event[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options});
  }

  addNotification(event: Event) {
    this.notifications.unshift(event);
    this.show(event.message, {classname: 'bg-info text-light', delay: 10000})
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  removeTosts() {
    this.toasts = [];
  }
}
