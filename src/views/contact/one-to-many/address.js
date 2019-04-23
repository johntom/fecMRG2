
////////////////////////////////////////////////
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';

@inject(ApiService, ApplicationService, DialogService)

export class Address {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentContactItem;
    console.log('this.currentItem  Exhibition', this.appService.currentContactItem);
    this.dialogService = dialogService
  }



  activate(params, routeConfig) {
    this.exhibition = this.appService.currentItem.exhibition   // this.currentItem.exhibition
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

  build(item, index) {
    //   "Notes" : "111\n222\n333", 
    let addr = this.currentItem.addresses[index]
    this.currentItem.address = `\n${addr.address}\n${addr.city} ${addr.state} ${addr.zip}`
  }




  saveitem(item, index) {
    item.edit = !item.edit

  }



  selectChanged(reproid) {
    // //  let insco = this.appService.InsurancecompanyList
    // let aid = this.repro.findIndex(x => x._id === reproid)
    // // let item = this.repro[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.currentItem.exhibition[aid].ExhibitRepro = reproid
  }

  addAddress() {

    let addresses = this.currentItem.addresses
    let flag = false
    let item
    if (addresses === undefined) {
      flag = true
      addresses = []
    }
    item = {
      address: '', city: '', state: '',
      zip: '', country: '',
      letter: '', notes: '', edit: true
    }
    addresses.unshift(item)
    if (flag) this.currentItem.addresses = addresses
    this.newAddress = '';


  }





  //  modal(item, index) {

  //     // this.currentItem.recordId = this.recordId model:this.currentItem
  //     let currentModel = {}
  //     currentModel.currentItem = this.currentItem
  //     currentModel.item = item

  //     // currentModel.currentItem.hide1 = false


  //     // this.dialogService.open({ viewModel: PromptForm, model: currentModel, lock: false }).whenClosed(response => {
  //     this.dialogService.open({ viewModel: Promptexhibit, model: currentModel, lock: false }).whenClosed(response => {

  //       if (!response.wasCancelled) {
  //         console.log('item', item);
  //       item.edit = false//this.saveitem(item, index)
  //       } else {

  //         console.log('cancel');
  //       }
  //       console.log(response)//.output);
  //     });
  //   }



}
