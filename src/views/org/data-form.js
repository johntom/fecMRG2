import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(api, appService, dataService, eventAggregator) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();

  }

  async activate(params, routeConfig) {
    let pp = JSON.stringify(params);
    this.cname = pp.substring(2, pp.indexOf(':') - 3);// params.indexOf(':')
    this.heading = `DataForm for record  ${this.cname} `;



    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {

      } else {
        let response = await this.api.findorgOnemongo(this.recordId);
        this.org = response.data[0];
        console.log('this.org ', this.org)

    let response2 = await this.api.findorgContacts(this.org.ID);
    this.contacts = response2.data;
    // console.log('this.repos contacts ', this.contacts)
    // this.allcontacts = this.contacts

      }
    }


  }

  attached() {


    if (this.appService.dataFormOneToManyTabs3.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs3[0];
      this.selectOneToManyTab(tab);
    }
  }


  bind() {
    // this.adjusters = this.appService.adjusterList
    // console.log('adjusters ', this.adjusters);

    // this.bookApi.getGenres().then(genres => {
    //   this.adjusters = genres;
    // });
  }

  createEventListeners() {
    // this.adjusterSelectedListener = e => {
    //   if (e && e.detail) {
    //     this.adjuster = e.detail.value;
    //     console.log('this.adjuster  createEventListeners ', this.adjuster)
    //   }
    // };

  }



  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  saveclaim() {

  }
  //  if (this.appService.dataFormOneToManyTabs3.length > 0) {
  //       let tab = this.appService.dataFormOneToManyTabs3[0];
  //       this.selectOneToManyTab(tab);
  //     }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs3.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    //   this.appService.currentItem = this.currentItem
    return true;
  }
}

