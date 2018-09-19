import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { Prompt } from '../../../services/prompt';
 import { DialogService } from 'aurelia-dialog';
@inject(ApiService, ApplicationService, DialogService)

export class Exhibition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;
    console.log('this.currentItem  Exhibition', this.appService.currentItem);
    this.dialogService = dialogService
  }


    
  activate(params, routeConfig) {
    this.exhibition = this.appService.currentItem.exhibition   // this.currentItem.exhibition
  }
  // remove(item) {
  //   alert('you are about to delete ' + item.ProvMemo)
  // }
  saveitem(item,index) {
    item.edit = !item.edit
   
  }
 
  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';
 
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let exhibition = this.currentItem.exhibition
        exhibition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }


  selectChanged(reproid) {
    //  let insco = this.appService.InsurancecompanyList
    let aid = this.repro.findIndex(x => x._id === reproid)
    // let item = this.repro[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.currentItem.exhibition[aid].ExhibitRepro = reproid
  }

  addExhibit() {
    // addExhibit ExhibitSponser  ExhibitLocation ExhibitRepro ExhibitDates ExhibitSortDate Traveled ExhibitMemo
    let exhibition = this.currentItem.exhibition
    let flag = false
    let item
        if (exhibition === undefined) {
      flag = true
      exhibition = []
    }
    item = {
      addExhibit: '', ExhibitSponser: '', ExhibitLocation: '', ExhibitRepro: '',
      ExhibitDates: '', ExhibitSortDate: '',
      Traveled: '', ExhibitMemo: '', edit: true
    }


    exhibition.unshift(item)
    if (flag) this.currentItem.exhibition = exhibition
  }

}
