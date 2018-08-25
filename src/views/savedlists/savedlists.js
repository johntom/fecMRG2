// import {EventAggregator} from 'aurelia-event-aggregator';
// import {WebAPI} from './web-api';
// import {ContactUpdated, ContactViewed} from './messages';

import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';

import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';

import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
// import { DialogService } from 'aurelia-dialog';
// import { Prompt } from './prompt';

@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)

export class Savedlists {
 // static inject = [WebAPI, EventAggregator];
  // constructor(api, ea){
  //   this.api = api;
  //   this.contacts = [];

  //   ea.subscribe(ContactViewed, msg => this.select(msg.contact));
  //   ea.subscribe(ContactUpdated, msg => {
  //     let id = msg.contact.id;
  //     let found = this.contacts.filter(x => x.id == id)[0];
  //     Object.assign(found, msg.contact);
  //   });
  // , DialogService , dialogService }
constructor(router, api, utilService, appService, dataService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    //this.ImageID = '20150921_153441_resized_2'  //4;
    this.selectedids = [];
    this.allselectedids = [];

    this.checkedIds = {};
     this.router = router
    //this.dialogService = dialogService
   
  }

activate(params, routeConfig) {
   
  }


  created(){
    // this.api.getContactList().then(contacts => {
    //   this.contacts = contacts;
    // });
  }

  // select(contact){
  //   // this.selectedId = contact.id;
  //   // return true;
  // }
}