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

selectedValue = null;
  findOption = value => this.appService.codesProvenanceLocation.find(x => x.Description === value)

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

changeCallbackLocation(selectedvalue) {
    console.log('selectedvalue has undefined ', selectedvalue, "myDatalist this.myDatalist.value has the value", this.myDatalist.value);
 let oid 
 let codeobj 
    let findvalue = this.myDatalist.value
       oid = this.appService.codesProvenanceLocation.findIndex(x => x.Description === findvalue)
       codeobj = this.appService.codesProvenanceLocation[oid]
  let bod = {
      "CodeType": 14,
      "Description": findvalue,
      "CodeTypeDesc": "Provenance Location"
    }  
 if (this.selectedValue === undefined || this.selectedValue === null) {
 
      let obj = {}
      obj.type = 2
      obj.name = `Add ${findvalue} to Location List or Cancel?`
      this.dialogService.open({ viewModel: Promptyn, model: obj, lock: false }).whenClosed(response => {


        if (!response.wasCancelled) {
          // this.addnewms(findvalue)
           this.api.addmediumsupport(bod)
      .then((jsonRes) => {
        this.appService.codesProvenanceLocation = jsonRes.data;
         oid = this.appService.codesProvenanceLocation.findIndex(x => x.Description === findvalue)
         codeobj = this.appService.codesProvenanceLocation[oid]
        let rec = {
          "CodeType": 14,
          "Description": codeobj.Description,
          "CodeTypeDesc": "Provenance Location",
          id: codeobj.id
        }
      //  this.currentItem.codesGenre.push(rec)
       // this.dataSource.add(rec)
         this.item.ReproductionLocationDesc=codeobj.Description
         this.item.ReproductionLocation=codeobj.id
      });
        } else {
          console.log('cancel');
        }
        
        console.log(response.output);
      });
    } else {
      //ReproductionLocationDesc
 this.item.ReproductionLocationDesc=codeobj.Description
         this.item.ReproductionLocation=codeobj.id

    }
   



   

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

    // this.myDatalist.value = this.currentItem MedSup.Description

  }

  get ReproductionAuthor() {
    return `${this.item.AuthorLast},  ${this.item.AuthorFirst}`;
  }
  attached() {


  }

  // changeCallbackArtist(selectedValueA) {
  //   let findvalue = this.myDatalistA.value
  // }



  save() {
    this.currentItem = this.item
    // this.controller.ok('added')
    this.item.exhibitsel = this.item.ReproductionExhibit
    this.item.ReproductionAuthor = `${this.item.AuthorLast},  ${this.item.AuthorFirst}`

    this.controller.ok(this.item)
  }
}

