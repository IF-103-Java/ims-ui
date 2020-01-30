import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Associate} from "../models/associate";
import {AssociateService} from "./service/associate.service";
import {Page} from "../models/page";
import {ActivatedRoute, Router} from "@angular/router";
import {AssociateType} from "../models/associate-type.enum";
import {NgbdSortableHeader, SortEvent} from "./ngbd-sortable-header.directive";

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  pageSizeOptions = [10, 15, 20];

  page$ = new Page<Associate>();

  direction = 'asc';
  sortBy = 'id';
  page = 1;

  associateTypes = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService) {
    this.page$.size = 15;
    this.page$.number = 0;
    this.page$.sortBy = 'id,DESC';

    this.associateTypes = Object.keys(AssociateType);

    this.associateService.getAssociatePage(this.page$.number, this.page$.size, this.sortBy + "," + this.direction)
      .subscribe(data => {
        this.page$ = data
      });

  }

  ngOnInit() {
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortBy = column;
    this.direction = direction;

    this.associateService.getAssociatePage(this.page$.number, this.page$.size, this.sortBy + "," + this.direction)
      .subscribe(data => {
        this.page$ = data
      });

    console.log(this.page$)
  }


  setPage(incremental: number) {
    this.page$.number += incremental;
    this.ngOnInit();
  }

  getAssociates() {
    this.associateService.getAssociatePage(this.page - 1, this.page$.size, this.sortBy)
      .subscribe(data => this.page$ = data);
  }

  updateAssociate(id: number) {
    this.router.navigate([
      'home', {
        outlets: {nav: ['edit-associate', id]}
      }
    ]);
  }

  deleteAssociate(id: number) {
    this.associateService.deleteAssociate(id).subscribe(data => {
      this.getAssociates();
    });
  }

}
