

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

    this.inscoAdjusters = []
    this.inscoAddresses = []
  }

  activate(params, routeConfig) {

    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {

      } else {
        console.log('this.recordId ', this.recordId);

        return this.api.findclaimOne(this.recordId).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let client = jsonRes.data
          console.log('claiminv ', client);
          this.appService.currentClient = lient[0];
          this.appService.testrec = claim[0];
          this.appService.originalrec = JSON.parse(JSON.stringify(client[0]));
          console.log('data-form:activate -  this.appService.currentClient', this.appService.currentClient);
          if (client[0].adjusters !== undefined) {
            this.primary = client[0].adjusters[0].ADJUSTER_NAME
          }
          let insco = this.appService.InsurancecompanyList
          let serviceinsco = this.appService.client.INSURANCE_COMPANY_ID // * 1
          let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
          let item = insco[aid];
          this.inscoAdjusters = item.contacts
          this.inscoAddresses = item.addresses


        });

      }
    }

    // see below

  }
  // findAdjusterListOption(value) {
  //   const result = this.appService.adjusterList.find(x => x.ADJUSTER_NAME === value);
  //   if (result) {
  //     return result.ADJUSTER_ID;
  //   }
  //   return null;
  // }
  attached() {


    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];

    //   this.selectOneToOneTab(tab);
    // }
    // if (this.appService.dataFormOneToManyTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToManyTabs[0];

    //   this.selectOneToManyTab(tab);

    // }
  }

  // selectChangedIA(adjusterid) {

  //   let insadjusters = this.inscoAdjusters
  //   let aid = insadjusters.findIndex(x => x.INSURANCE_CONTACT_ID === adjusterid)
  //   let item = insadjusters[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
  //   this.currentnewItem.inscontact = item

  // }

  bind() {

  }

  // createEventListeners() {
  //   this.adjusterSelectedListener = e => {
  //     if (e && e.detail) {
  //       this.adjuster = e.detail.value;
  //       console.log('this.adjuster  createEventListeners ', this.adjuster)
  //     }
  //   };




  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  saveclient() {
    console.log(' call save ', JSON.stringify(this.appService.currentClaim) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

      this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);

      });

    }
  }
  // selectOneToOneTab(tab) {
  //   this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToOneTab = tab;
  //   // this.appService.currentItem = this.appService.currentClaim //this.currentItem
  //   return true;
  // }
  // selectOneToManyTab(tab) {
  //   this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToManyTab = tab;
  //   // this.appService.currentItem = this.appService.currentClaim //this.currentItem
  //   return true;
  // }
}

