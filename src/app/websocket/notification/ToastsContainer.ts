import {Component, TemplateRef} from '@angular/core';

import {WebsocketService} from "../websocket.service";


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of websocketService.toasts"
      [class]="toast.style"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hide)="websocketService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})

export class ToastsContainer {
  constructor(public websocketService: WebsocketService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
