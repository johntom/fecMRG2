import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
export class Prompttransport {
  static inject = [DialogController, ApplicationService,  DialogService, ApiService];
  @bindable searchcontact;
  constructor(controller, appService,  dialogService, api) {
    this.controller = controller;
    this.answer = null;
    this.appService = appService; 
   
    
    controller.settings.lock = false;
    // this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
    this.allcontacts = []
  }


  async activate(currentmodel) {
   this.item = currentmodel.item;
    this.currentItem = currentmodel.currentItem
    this.heading = "transport "//+this.artist.name
    


  }


  attached() {


  }

//  async changeCallbackArtist(selectedValueA) {
//     let findvalue = this.myDatalistA.value
//   }


  async save() { 
    //  delete this.artist.name;
    //  this.artist.ArtistName=this.artist.LastName+', '+this.artist.FirstName
    //  let response = await this.api.updateartistAA(this.artist);
   
    //  this.appService.artistList.push(this.artist)
    //  this.appService.addedartist=this.artist 
    // //  .ArtistName
   
    
    this.controller.ok('added')


  }


}

