import { Component, OnInit } from '@angular/core';
import {AssociateService} from "../service/associate.service";
import {Associate} from "../../models/associate";
import {ActivatedRoute, Router} from "@angular/router";
import {AssociateType} from "../../models/associate-type.enum";

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {

  associate: Associate = new Associate();
  associateType: AssociateType;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.associate);
    this.associateService.addAssociate(this.associate);
    this.gotoAssociatesList();
  }

  gotoAssociatesList() {
    this.router.navigate(['/associates']);
  }
}
