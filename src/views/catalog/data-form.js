import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';


@inject(ApiService, ApplicationService)
export class DataForm {
  heading = 'Catalog';// HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService) {
    this.api = api;
    this.inv = '';
    this.appService = appService;
    this.epoch = moment().unix();
  }

  async activate(params, routeConfig) {
    this.recordId = params.id;
    if (params.id) {
      if (this.recordId === 'create') {
        this.currentItem = {}
       this.currentItem.CatalogTitle='';
      this.currentItem.CatalogID=this.epoch
      //  this.appService.testcontactrec = {}
      //  this.appService.originalontactrec = {}

      } else {
        console.log('this.recordId ', this.recordId);
        this.heading = `DataForm for record ${this.recordId}`;
        console.log('this.recordId ', this.recordId);
        let response = await this.api.findCatalogone(this.recordId);
        this.currentItem = response.data[0]
        this.appService.currentCatalogItem = this.currentItem;
       // return this.currentItem
      }
    }
    // alert('finished activate')
       console.log('finished activate')
  }

  attached() {
    if (this.appService.dataFormOneToManyTabs5.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs5[0];
      this.selectOneToManyTab(tab);
    }
   // console.log('attache3d')
   // alert('finished attached')
  }

  async savecatalog(option) {
    if (this.recordId === 'create') {
      // this.currentItem = {}
        // this.currentContactItem = {}
      this.currentItem.id = 'create'
      this.recordId = '';
      // this.currentItem.CatalogTitle='';
      this.currentItem.CatalogID=this.epoch
      let response = await this.api.createcatalog(this.currentItem);
      this.requestclose()
    } else {
      let response = await this.api.updatecatalog(this.currentItem);

    }
    // if (option === 1) this.requestclose()
  }

  requestclose() {

    // const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/catalog/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


  }



  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs5.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    //   this.appService.currentItem = this.currentItem
    return true;
  }
}