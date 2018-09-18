
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Editions {
  heading = 'DataForm HEADER...';  
  footer = 'DataForm FOOTER...';
  recordId = '';
  
  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    //  this.currentItem = this.appService.testrec;
     this.currentItem = this.appService.currentItem;
  }

  activate(params, routeConfig) {
   
  }  

}
