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
    // console.log('ex ' + this.currentItem.exhibition)
    this.item = currentmodel.item
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
    this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
     
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  save() {
    this.currentItem = this.item

    this.controller.ok(this.item)
  }
}

