import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
export class Promptartist {
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
    // this.item = currentmodel;
     this.artist={}
    this.artist.name = currentmodel.findvalue
    this.artist.id = 'create'
    this.heading = "Artist "+this.artist.name
    let na  = this.artist.name.split(",");
// var nameArr = names.split(',');
// console.log(nameArr);
 
// // Accessing individual values
// alert(nameArr[0]); // Outputs: Harry
    this.artist.LastName = na[0]//this.artist.name.split(" ",1);
    this.artist.FirstName =  na[1] //this.artist.name.split(" ",2);
  }


  attached() {


  }

//  async changeCallbackArtist(selectedValueA) {
//     let findvalue = this.myDatalistA.value
//   }


  async save() { 
     delete this.artist.name;
     this.artist.ArtistName=this.artist.LastName+', '+this.artist.FirstName
     let response = await this.api.updateartistAA(this.artist);
   
     this.appService.artistList.push(response.data)//this.artist)
     this.appService.addedartist=response.data
    //  .ArtistName
   
    
    this.controller.ok(response.data )


  }


}

