import {Component, OnInit} from '@angular/core';
import {Page} from '../models/page';
import {EventService} from './service/event.service';
import {Event} from '../models/event';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

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

  warehousesMap = new Map<string, string>();
  warehouseList = new Array<string>();
  warehouseParam = new Param('warehouse_id');

  authorMap = new Map<string, string>();
  authorsList = new Array<string>();
  authorParam = new Param('author_id');

  nameMap = new Map<string, string>();
  namesList = new Array<string>();
  nameParam = new Param('name');

  typeMap = new Map<string, string>();
  typeList = new Array<string>();
  typeParam = new Param('type');

  sortBy = 'date';
  direction = 'DESC';
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  nameFilter() {
    if (this.nameParam.selected.length > 0) {
      this.typeParam.selected = [];
    }
    this.nameParam.value = this.nameParam.selected.map(x => this.nameMap.get(x));
    this.enableFilter(this.nameParam);
  }

  typeFilter() {
    this.typeParam.value = this.typeParam.selected.map(x => this.typeMap.get(x));
    this.enableFilter(this.typeParam);
  }

  warehouseFilter() {
    this.warehouseParam.value = this.warehouseParam.selected.map(x => this.warehousesMap.get(x));
    this.enableFilter(this.warehouseParam);
  }

  authorFilter() {
    this.authorParam.value = this.authorParam.selected.map(x => this.authorMap.get(x));
    this.enableFilter(this.authorParam);
  }

  enableFilter(param: Param) {
    if (param.value.length > 0) {
      this.params.set(param.label, param.value);
    } else {
      this.params.delete(param.label);
    }
    console.log(this.params);
    this.getEvents();
  }

  setPage(incremental: number) {
    this.page$.number += incremental;
    this.ngOnInit();
  }

  constructor(private eventsService: EventService) {
    this.page$.size = 15;
    this.page$.number = 0;
    this.page$.sortBy = 'date,DESC';
  }

  getEvents() {
    this.eventsService.getPage(this.page$.number, this.page$.size,
      this.sortBy.concat(',', this.direction), this.params)
      .subscribe(data => this.page$ = data);
  }

  ngOnInit() {
    this.getEvents();
    this.eventsService.getEventTypes()
      .subscribe(data => {
        this.typeList = Object.keys(data);
        Object.entries(data).forEach((key) => {
          this.typeMap.set(key[0], key[1]);
        });
      });
    this.eventsService.getEventNames()
      .subscribe(data => {
        this.namesList = Object.keys(data);
        Object.entries(data).forEach((key) => {
          this.nameMap.set(key[0], key[1]);
        });
      });
    this.eventsService.getUsernames()
      .subscribe(data => {
        this.authorsList = Object.values(data);
        Object.entries(data).forEach((key) => {
          this.authorMap.set(key[1], key[0]);
        });
      });
    this.eventsService.getWarehouses()
      .subscribe(data => {
        this.warehouseList = Object.values(data);
        Object.entries(data).forEach((key) => {
          this.warehousesMap.set(key[1], key[0]);
        });
      });
  }
}

class Param {
  label: string;
  value = new Array<string>();
  selected = new Array<string>();

  constructor(label: string) {
    this.label = label;
  }
}


