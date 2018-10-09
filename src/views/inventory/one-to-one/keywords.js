


import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Keywords {
  heading = 'DataForm HEADER...';  
  footer = 'DataForm FOOTER...';
  recordId = '';
  
  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
     this.currentItem = this.appService.currentItem//testrec;
  }
  showAttendees() {
    alert(`GenreTypes: ${this.currentItem.genretypes}`);
      //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }   
  activate(params, routeConfig) {

  }  

}
