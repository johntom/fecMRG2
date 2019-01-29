import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';


@inject(ApiService, ApplicationService)
export class DataForm {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService) {
    this.api = api;
    this.inv = '';
    this.appService = appService;
  }

  async activate(params, routeConfig) {
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      console.log('this.recordId ', this.recordId);
      let response = await this.api.findCatalogone(this.recordId);
      this.currentItem = response.data[0]
      this.appService.currentCatalogItem = this.currentItem;
      return this.currentItem
      // return this.api.findInventoryOne(this.recordId)
      //   .then((jsonRes) => {
      //     console.log('jsonRes ', jsonRes);          
      //     let inv = jsonRes.data;
      //     this.currentItem = inv[0];
      //     console.log('data-form:activate - currentItem', this.currentItem);
      //     this.inv = inv[0]
      //     // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
      //     return inv
      //   });
    }
  }
  
  attached() {


    if (this.appService.dataFormOneToManyTabs5.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs5[0];
      this.selectOneToManyTab(tab);
    }
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs5.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    //   this.appService.currentItem = this.currentItem
    return true;
  }
}