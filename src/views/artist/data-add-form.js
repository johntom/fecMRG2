import { Router } from 'aurelia-router';
import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";


import { EventAggregator } from 'aurelia-event-aggregator';
// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';

@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataAddForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';

  currentnewItem;
  constructor(router, api, appService, dataService, eventAggregator) {
    this.router = router;
    this.api = api;
    this.appService = appService;
    //  alert('in cons2')
    // this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;

  }

  activate() {



  }

  



  attached() {

  }

  bind() {

  }

  createEventListeners() {
  }



  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }

  // canDeactivate() {
  //    return confirm('Are you sure you want to leave this page?');
  // }
  saveclaim() {
   
  }

  // navigateToNewClaim() {
  //   let rt2 = 'claim/data/' + this.currentnewItem.CLAIM_NO;
  //   this.router.navigate(rt2);    
  // }
  closeTab(tab) {
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
  

}

