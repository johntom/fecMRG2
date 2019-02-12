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
 types = [
    
{ id: 0, name: 'Inv Search Screen' },
{ id: 0, name: 'Inv Search Results Grid' },
{ id: 0, name: 'Inv Form' },
{ id: 0, name: 'Inv Tab: Text ' },
{ id: 0, name: 'Inv Tab: Note' },
{ id: 0, name: 'Inv Tab: Provenance' },
{ id: 0, name: 'Inv Tab: Exhibitions' },
{ id: 0, name: 'Inv Tab: Reproductions' },
{ id: 0, name: 'Inv Tab: Transport' },
{ id: 0, name: 'Inv Tab: Conservation' },
{ id: 0, name: 'Inv Tab: Condition' },
{ id: 0, name: 'Inv Tab: Purchased From' },
{ id: 0, name: 'Inv Tab: Sold To' },
{ id: 0, name: 'Inv Tab: Museum Loan' },
{ id: 0, name: 'Inv Tab: Consigned To' },
{ id: 0, name: 'Inv Tab: Offering' },
{ id: 0, name: 'Inv Tab: Consigned From' },
{ id: 0, name: 'Inv Tab: Photo' },
{ id: 0, name: 'Inv Tab: Docs' },
{ id: 0, name: 'Inv Tab: Edition' },
{ id: 0, name: 'Inv Tab: VAT' },
{ id: 0, name: 'Inv Add New' },
{ id: 0, name: 'Inv Issues/Questions' },
{ id: 0, name: 'Artist Select Screen' },
{ id: 0, name: 'Artist Form' },
{ id: 0, name: 'Artist Add New' },
{ id: 0, name: 'Artist Issues/Questions' }, 
{ id: 0, name: 'Action Select Screen' },
{ id: 0, name: 'Action Form: Left panel' },
{ id: 0, name: 'Action Form: Right Panel' },
{ id: 0, name: 'Batch Form' },
{ id: 0, name: 'Actions/Batch Issues/Questions' },
{ id: 0, name: 'Contact Search Screen' },
{ id: 0, name: 'Contact Search Results Grid' },
{ id: 0, name: 'Contact Form' },
{ id: 0, name: 'Contact Tab: Address' },
{ id: 0, name: 'Contact Tab: Artists' },
{ id: 0, name: 'Contact Tab: Cat Sold' },
{ id: 0, name: 'Contact Tab: Comp Cat Sent' },
{ id: 0, name: 'Contact Tab: Offering' },
{ id: 0, name: 'Contact Tab: Phone' },
{ id: 0, name: 'Contact Tab: Previous Orgs' },
{ id: 0, name: 'Contact Tab: Works Bought' },
{ id: 0, name: 'Contact Add New' },
{ id: 0, name: 'Contact Issues/Questions' },
{ id: 0, name: 'Org Search Screen' },
{ id: 0, name: 'Org Search Results Grid' },
{ id: 0, name: 'Org Form' },
{ id: 0, name: 'Org Issues/Questions' },
{ id: 0, name: 'Catalog Search Form' },
{ id: 0, name: 'Catalog Search Results Grid' },
{ id: 0, name: 'Catalog Form' },
{ id: 0, name: 'Catalog Issues/Questions' },
{ id: 0, name: 'Conversion Issues/Questions' },
{ id: 0, name: 'Global Issues/Questions' },
{ id: 0, name: 'Other Issues/Questions' },
  ];
   
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