import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';

import { ynPrompt } from '../../../services/prompt';
import { Prompt } from '../prompt';

// @inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
@inject(ApiService, ApplicationService, DialogService)

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
  constructor(api, appService, dialogService) {
    // this.taskQueue = taskQueue;
    // this.signaler = signaler;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
    // alert('this.currentItem ' + this.currentItem.offerings)
    this.mode = 0;
    this.editrec = '';

    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }




  activate(params, routeConfig) {
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
  }

  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
     attached() {

  }
}
