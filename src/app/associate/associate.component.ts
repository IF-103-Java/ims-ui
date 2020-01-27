import {Component, OnInit} from '@angular/core';
import {Associate} from "../models/associate";
import {AssociateService} from "./service/associate.service";
import {Page} from "../models/page";
import {ActivatedRoute, Router} from "@angular/router";
import {FormAssociateComponent} from "./form-associate/form-associate.component";
import {AssociateType} from "../models/associate-type.enum";

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  sortValues: string[] = ['id', 'name', 'type'];
  pageSizeOptions = [10, 15, 20];

  page$ = new Page<Associate>();

  direction = 'asc';
  sortBy = 'id';
  page = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService) {
    this.page$.size = 15;
    this.page$.number = 0;
    this.page$.sortBy = 'id,DESC';

  }

  ngOnInit() {
    this.associateService.getAssociatePage(this.page$.number, this.page$.size, this.sortBy)
      .subscribe(data => {
        this.page$ = data
      });

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
        outlets: { nav : ['edit-associate', id]}
      }
    ]);
  }

  deleteAssociate(id: number) {
    this.associateService.deleteAssociate(id).subscribe(data => {
      this.getAssociates();
    });
  }

}
