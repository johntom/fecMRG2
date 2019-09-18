import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';

export class Promptprovenance {
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
    this.heading = "Provenance"
    

  } 

changeLocation(changedValue){
  //  console.log('selectedvalue has undefined ', selectedvalue, "myDatalist this.myDatalist.value has the value", this.myDatalist.value);
  // "provenance" : [
  //       {
  //           "id" : "5d7f702df014d204727549a9", 
  //           "legacyid" : NumberInt(24080), 
  //           "ProvOwner" : "Jackson Pollock", 
  //           "ProvLoc" : "5d7e64337a045b4475619454", 
  //           "ProvLocDesc" : "The Springs, NY", 
  //           "ProvDate" : "", 
  //           "ProvMemo" : "", 
  //           "Sequence" : NumberInt(1)
  //       }, 
 let oid 
 let codeobj 
    //let findvalue = this.myDatalist.value
    
       oid = this.appService.codesProvenanceLocation.findIndex(x => x.id ===this.item.ProvLoc); 
       codeobj = this.appService.codesProvenanceLocation[oid]
 

  //  this.item.ProvLoc =codeobj.Description

   this.item.ProvLocDesc = codeobj.Description

  // "ProvLoc" : "5d7e64337a045b4475619454", 
  //           "ProvLocDesc" : "The Springs, NY", 


}
  



  save() {
    // this.controller.ok('added')
  this.controller.ok('added')


  }
}
