import { Component, OnInit } from '@angular/core';
import {AssociateService} from "../service/associate.service";
import {Associate} from "../../models/associate";
import {ActivatedRoute, Router} from "@angular/router";
import {AssociateType} from "../../models/associate-type.enum";
import {Address} from "../../models/address";
import {ToastService} from "../../websocket/notification/toast.service";

@Component({
  selector: 'app-add-associate',
  templateUrl: './form-associate.component.html',
  styleUrls: ['./form-associate.component.css']
})
export class FormAssociateComponent implements OnInit {

  associate: Associate = new Associate();
  associateType = [];

  isLimitReached:boolean = false;
  errorMessage : string;

  isEditAction: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService,
              private  toastService: ToastService) {

    this.associateType = Object.keys(AssociateType);
    this.associate.addressDto = new Address();

  }


  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') == null) {
      this.isEditAction = false;
    } else {
      this.isEditAction = true;
      this.associateService.getAssociate(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => this.associate = data);
    }
  }

  onSubmit() {
    if(this.isEditAction) {
      this.associateService.updateAssociate(this.associate.id, this.associate);
    } else {
      this.associateService.addAssociate(this.associate).subscribe(data => {
        if (data.message != null) {

          this.errorMessage = data.message;
          console.log(this.errorMessage);

          this.toastService.show(this.errorMessage, { classname: 'bg-danger text-light', delay: 5000 })
        }
       });

    }
    this.gotoAssociatesList();
  }

  gotoAssociatesList() {
    this.router.navigate([
      'home', {
        outlets: { nav : ['associates']}
      }
    ]);
  }
}
