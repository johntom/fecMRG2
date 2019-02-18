import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';

// import { Prompt } from '../../../services/prompt';
// import { Promptcontact } from '../prompt';
// @inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
@inject(ApiService, ApplicationService)//, DialogService)

export class Offering {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  // adjusters: Adjuster[] = []
  newNoteWorkDate = '';
  newNote = '';
  typeList = [
    "Primary",
    "Assistant"
  ];

  // constructor(taskQueue, signaler, api, appService, dialogService) {
  constructor(api, appService) {
    // this.taskQueue = taskQueue;
    // this.signaler = signaler;
  //  alert('Offering')
    this.api = api;
    this.appService = appService;
    this.inv = '';
     this.currentItem = this.appService.currentContactItem;
    this.mode = 0;
    this.editrec = '';

    this.isDisableEdit = true
    this.currentnote = '';
    // this.dialogService = dialogService
  }




  async activate(params, routeConfig) {
    // let oid
    // let orgobj
    // let orgs = this.appService.orgsList
    // //InsuredBy
    // if ((this.currentItem.LoanTo === undefined) || (this.currentItem.LoanTo === null)) {
    // } else {
    //   oid = orgs.findIndex(x => x._id === this.currentItem.LoanTo)
    //   orgobj = this.appService.orgsList[oid]//10]
    //   if (orgobj !== undefined) this.currentItem.conservedbyname = orgobj.OrgName
    // }
    //  alert('Offering 2')
 let response = await  this.api.findofferings(this.currentItem.id);
 this.appService.offerings = response.data
 console.log('this.repos ',this.appService.offerings)


// find offersings

// { method: ['get'], path: '/api/v1/findofferings/:id', handler: 'InventoryController.findofferings' },




  }

  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
}
