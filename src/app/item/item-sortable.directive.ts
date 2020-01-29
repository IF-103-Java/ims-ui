import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[sortable]'
})
export class ItemSortableDirective {
  @Input() sortValue: string;
  @Output() sortEvent = new EventEmitter<{value: string, direction: string}>();
  direction: string='asc';
  @HostBinding('class') classValue: string;

  constructor() { }
  @HostListener("click") onSort(){
    this.sortEvent.emit({value: this.sortValue, direction: this.direction})
this.sort();
  }
  sort(){
    if (this.direction==='asc'){
      this.direction='desc';
      console.log(this.direction)
      this.classValue='glyphicon glyphicon-arrow-up'
      return this.direction;

    }else {
      this.direction='asc';
      console.log(this.direction)
      this.classValue='glyphicon glyphicon-arrow-down'
      return this.direction;
    }
  }

}
