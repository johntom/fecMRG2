
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';

@inject(ApiService, ApplicationService, DialogService)

export class Org {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentContactItem;
    this.dialogService = dialogService
  }



  activate(params, routeConfig) {
    // this.currentItem.prevorgs = this.currentItem.prevorgs   
  }
 remove(item, index) {
    // alert('you are about to delete ' + item.address) address of currentItem.addresses
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let addresses = this.currentItem.addresses
        addresses.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  saveitem(item, index) {
    item.edit = !item.edit

  }



  selectChanged(reproid) {
    
  }
			


  
}
