import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { DialogService } from 'aurelia-dialog';

import { Prompt } from '../prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Soldto {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  showModal(fieldname) {
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      this.currentItem.fieldname = fieldname
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

     
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
