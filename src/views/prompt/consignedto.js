import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import {computedFrom} from 'aurelia-framework';
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
  }
 

  activate(currentmodel) {
    // this.item = currentmodel.item;
    this.currentItem = currentmodel.currentItem
    this.item = currentmodel.item
    this.heading = "Consigned to "//exhibit batchno= "+ this.item.ReproductionExhibit
 //(currentModel.popuptype === 0) ? this.showbatch = false :this.showbatch = true // from action
    
  }

  get ReproductionAuthor(){
    return `${this.AuthorLast},  ${this.AuthorFirst}`;
  }
  attached() {


  }

  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }



  save() {
    this.currentItem = this.item
    // this.controller.ok('added')
     this.controller.ok(this.item)
  }
}

