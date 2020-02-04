import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[sortable]'
})
export class ItemSortableDirective {
  @Input() sortValue: string;
  @Output() sortEvent = new EventEmitter<{ value: string, direction: string }>();
  direction: string = 'asc';
  @HostBinding('class') classValue: string;

  constructor() {
  }

  @HostListener("click") onSort() {
    this.sort();
    this.sortEvent.emit({value: this.sortValue, direction: this.direction})
  }

  sort() {
    if (this.direction === 'asc') {
      this.direction = 'desc';
      this.classValue = 'fas fa-arrow-down'
      return this.direction;

    } else {
      this.direction = 'asc';
      this.classValue = 'fas fa-arrow-up'
      return this.direction;
    }
  }

}
