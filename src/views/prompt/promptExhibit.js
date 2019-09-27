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
    this.heading = "Exhibition"
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
              this.item.ExhibitLocationDesc = codeobj.Description
              this.item.ExhibitLocation = codeobj.id
            });
        } else {
          console.log('cancel');
        }

        console.log(response.output);
      });
    } else {
      //ReproductionLocationDesc
      this.item.ExhibitLocationDesc = codeobj.Description
      this.item.ExhibitLocation = codeobj.id

    }

  }
  populate() {
    this.item.ExhibitTitle = 'test '
    this.item.ExhibitSponser = 'test spn'
    this.item.ExhibitDates = '01-12'
    this.item.Traveled = true
    this.item.ExhibitMemo = 'test memp'
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

