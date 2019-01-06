import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { DialogService } from 'aurelia-dialog';

import { Prompt } from '../prompt';
 

@inject(ApiService, ApplicationService,DialogService)
export class Consigned {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;


  // consignedTo: ConsignedTo[] = []
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
     this.dialogService = dialogService
  }
  // constructor(router, api, appService, dataService, dialogService) {

  //   this.dataService = dataService
  //   this.router = router
  //   this.dialogService = dialogService
  //   this.skippromt = false
  // }
  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList 
    //InsuredBy
    if ((this.currentItem.ConsignedFromID === undefined) || (this.currentItem.orgsList === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.ConsignedFromID)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.consignedfromname = orgobj.OrgName

    }

 if ((this.currentItem.ConsignmentShippingID === undefined) || (this.currentItem.orgsList === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.ConsignmentShippingID)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.consignmentshippingname = orgobj.OrgName

    }


  }
  showModal(fieldname) {
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    this.currentItem.fieldname=fieldname
    // this.currentItem.ConsignedTo = this.currentItem.ConsignedTo
    // this.currentItem.loantoname = this.currentItem.museumloan[index].loantoname
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: true }).whenClosed(response => {



      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
}
