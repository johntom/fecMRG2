
////////////////////////////////////////////////
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';

@inject(ApiService, ApplicationService, DialogService)

export class Catalogssentto {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentCatalogItem;
    console.log('this.currentCatalogItem', this.appService.currentCatalogItem);
    this.dialogService = dialogService

  }



  async activate(params, routeConfig) {

    console.log('this.Catalogssentto ', this.appService.currentCatalogItem)
    let response = await this.api.getcatalogsenttocontact(this.appService.currentCatalogItem.CatalogID)// ID )//CatalogID)//'78');
    this.compcatalogssent = response.data

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





}
