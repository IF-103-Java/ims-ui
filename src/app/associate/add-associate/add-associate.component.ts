import { Component, OnInit } from '@angular/core';
import {AssociateService} from "../service/associate.service";
import {Associate} from "../../models/associate";
import {ActivatedRoute, Router} from "@angular/router";
import {AssociateType} from "../../models/associate-type.enum";
import {Address} from "../../models/address";

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {

  associate: Associate = new Associate();
  associateType = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService) {

    this.associateType = Object.keys(AssociateType);
    this.associate.addressDto = new Address();
  }

  ngOnInit() {

  }

  onSubmit() {
    this.associateService.addAssociate(this.associate);
    this.gotoAssociatesList();
  }

  gotoAssociatesList() {
    this.router.navigate(['/home/associates']);
  }
}
