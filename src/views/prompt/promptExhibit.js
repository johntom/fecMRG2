import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';

export class Promptexhibit {
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
  }


  activate(currentmodel) {
    this.item = currentmodel.item;
    this.currentItem = currentmodel.currentItem
    this.heading = "Inventory Exhibit"
  }


  attached() {


  }

  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }



  save() {
    this.controller.ok('added')
  }
}

