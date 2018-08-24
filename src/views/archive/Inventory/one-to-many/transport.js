import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Transport {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  done = false;
  edit = false;
  
  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
  }

  activate(params, routeConfig) {
    // if (params.id) {
    //   this.recordId = params.id; 
    //   this.heading = `DataForm for record ${this.recordId}`;

    //   console.log('this.recordId ', this.recordId);
    //   return this.api.findInventoryOne(this.recordId)
    //     .then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);          
    //       let inv = jsonRes.data;
    //       this.currentItem = inv[0];
    //       console.log('data-form:activate - currentItem', this.currentItem);
    //       this.inv = inv[0]
    //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
    //       return inv
    //     });
    // }
  }
  remove(item) {
   // alert('you are about to delete ' + item.ProvMemo)
  }

  selectChanged(transport, transportid) {
    // Find the selected adjuster object
    // let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
    // // Update the current adjuster with the new values
    // selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    // // We don't need to change the TYPE as it is bound correctly from the UI
    // selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }
}
