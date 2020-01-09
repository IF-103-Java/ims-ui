import {Component, OnInit} from '@angular/core';
import {Page} from '../models/page';
import {EventService} from './service/event.service';
import {Event} from '../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  headElements = ['ID', 'Message', 'Author', 'Date', 'Name', 'Warehouse', 'Transaction'];
  pageSizeOptions = [10, 15, 20];
  page$ = new Page<Event>();
  params = new Map<string, any>();
  beforeParam = new Param('before');
  afterParam = new Param('after');
  warehousesList = new Set<number>();
  warehouseParam = new Param('warehouse');
  namesList = ['Login', 'Logout', 'Sign up', 'Password changed', 'Profile info changed', 'Account created',
    'Account info edited', 'Account deleted', 'New worker invited', 'Worker joined', 'Account upgraded',
    'Warehouse created', 'Warehouse removed', 'Warehouse info edited', 'Item is ended', 'Low space in capacity',
    'Item came', 'Item shipped', 'Item moved', 'New supplier', 'New client', 'Supplier removed', 'Client removed',
    'Supplier info edited', 'Client info edited'];
  nameParam = new Param('name');
  authorsList = new Set<number>();
  authorParam = new Param('author');
  paramsList = new Set<Param>();

  filter() {
    this.params.clear();
    this.paramsList.forEach(param => {
        if (param.isActive) {
          this.params.set(param.label, param.value);
        }
      }
    )
    console.log(this.params);
    this.getEvents();
  }

  setPage(incremental: number) {
    this.page$.number += incremental;
    this.ngOnInit();
  }

  setWarehousesList() {
    this.page$.content.forEach((x: Event) => {
      this.warehousesList.add(x.warehouseId);
    });
  }

  setAuthorsList() {
    this.page$.content.forEach((x: Event) => {
      this.authorsList.add(x.authorId);
    });
  }

  constructor(private eventsService: EventService) {
    this.page$.size = 15;
    this.page$.number = 0;
    this.paramsList.add(this.afterParam);
    this.paramsList.add(this.beforeParam);
    this.paramsList.add(this.nameParam);
    this.paramsList.add(this.warehouseParam);
    this.paramsList.add(this.authorParam);
  }

  getEvents() {
    this.eventsService.getPage(this.page$.number, this.page$.size, this.params)
      .subscribe(data => this.page$ = data);
  }

  ngOnInit() {
    this.getEvents();
  }

}

class Param {
  isActive = false;
  label: string;
  value: string;

  constructor(label: string) {
    this.label = label;
  }
}
