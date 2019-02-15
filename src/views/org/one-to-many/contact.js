
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';
import { Router, Redirect } from 'aurelia-router';
@inject(Router,ApiService, ApplicationService, DialogService)

export class Org {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(router,api, appService, dialogService) {
     this.router = router;
      this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentOrgItem;
    this.dialogService = dialogService
  }



  async activate(params, routeConfig) {
    // this.currentItem.prevorgs = this.currentItem.prevorgs
    let response = await this.api.findorgContacts(this.currentItem.id)//ID);
    this.contacts = response.data;
    console.log('this.repos contacts ', this.contacts)
    this.allcontacts = this.contacts  
  }
 
opencontact(index) {
    // this.currentItem.fieldname = fieldname
    // this.currentItem.ConservedBy = this.currentItem.conservation[index].ConservedBy // mongoid
  
    // let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/contact/data/' +  this.allcontacts[index].id+'?'+this.allcontacts[index].LastName+','+this.allcontacts[index].FirstName
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }







}
