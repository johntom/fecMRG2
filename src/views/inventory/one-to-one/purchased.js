
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { DialogService } from 'aurelia-dialog';

import { Promptorg } from '../promptorg';


@inject(ApiService, ApplicationService, DialogService)
export class Purchased {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem// testrec;
    this.dialogService = dialogService
    console.log('this.currentItem ',this.currentItem.PurchasedPayment);
  }

  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    if ((this.currentItem.PurchasedFrom === undefined) || (this.currentItem.orgsList === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.PurchasedFrom)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.purchasedfromname = orgobj.OrgName

    }


  }
  showModal(fieldname) {
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    this.currentItem.fieldname=fieldname
   this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

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
