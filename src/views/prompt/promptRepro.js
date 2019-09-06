import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { computedFrom } from 'aurelia-framework';

export class Promptrepro {
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
    // this.item = currentmodel.item;

    this.currentItem = currentmodel.currentItem
    console.log('ex ' + this.currentItem.exhibition)
    this.item = currentmodel.item
    this.popuptype = currentmodel.popuptype;
    this.heading = "Reproduction";
    // this.heading = "Reproduction "//exhibit batchno= "+ this.item.ReproductionExhibit
    (this.popuptype === 0) ? this.showbatch = false : this.showbatch = true // from action
    //  this.popuptype = 0;// from inventory
    //     currentModel.popuptype = 1;// from action
    //     currentModel.popuptype = 2;// from actionbatch
    // 1 this.item.exhibitsel=this.item.ReproductionExhibit
  }

  get ReproductionAuthor() {
    return `${this.item.AuthorLast},  ${this.item.AuthorFirst}`;
  }
  attached() {


  }

  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }



  save() {
    this.currentItem = this.item
    // this.controller.ok('added')
    this.item.exhibitsel = this.item.ReproductionExhibit
    this.item.ReproductionAuthor = `${this.item.AuthorLast},  ${this.item.AuthorFirst}`

    this.controller.ok(this.item)
  }
}

