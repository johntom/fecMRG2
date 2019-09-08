import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { Promptorg } from '../inventory/promptorg';

export class Promptconsignedto {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];


  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;
    this.appService = appService;
    this.currentItem = {} // make it com this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    // this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
    this.showbatch = false
  }


  activate(currentmodel) {

    this.currentItem = currentmodel.currentItem
    this.item = currentmodel.item;  /////.consignedtoname// item
    this.popuptype = currentmodel.popuptype;
    this.heading = "Consigned To";
    // (this.popuptype === 0) ? this.showbatch = false : this.showbatch = true // from action

  }


  attached() {


  }

  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }

  showModal(fieldname) {
    this.currentItem.fieldname = fieldname
    this.currentItem.item = this.item.consignedtoname
     this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {

      } else {
        console.log('cancel');
      }
      console.log(response.output);
      //this.item.consignedtoname=  {"_id" : response.output.ConsignedTo,"OrgName" :response.output.consignedtoname} 
    this.item.consignedtoname=  {"_id" : response.output.orgObject._id,
    "OrgName" :response.output.orgObject.OrgName,"BusIndivid": response.output.orgObject.BusIndivid} 
   delete   this.currentItem.ConsignedTo
   delete this.currentItem.orgObject


      
    });
  }

  save() {
    this.currentItem = this.item

    this.controller.ok(this.item)
  }
}

