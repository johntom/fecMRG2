import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
export class Promptorg {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];
  @bindable searchcontact;
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
    this.allcontacts = []
  }

  async activate(currentmodel) {
    this.item = currentmodel.currentItem//.item;
    this.currentItem = currentmodel.currentItem
    this.heading = "Organization"
    // can be ID or _id or ...
    //  return this.api.findorgOne(this.currentItem.org.ID)
    //     .then((jsonRes) => {
    //      this.item = jsonRes.data[0];
    //      console.log('jsonRes ', this.item );
    //      // return inv
    //     });


    let response = await this.api.findorgOne(this.currentItem.org._id);//ID);
    this.item = response.data[0];
    console.log('this.repos ', this.item)
    // let response2 = await this.api.findorgContacts( this.item.ID)//this.currentItem.org._id);
    let response2 = await this.api.findorgContacts( this.currentItem.org._id);
    this.item.contacts = response2.data;
    console.log('this.repos contacts ', this.item.contacts)
    this.allcontacts = this.item.contacts

  }


  attached() {


  }
  searchcontactChanged(value) {

    this.item.contacts = this.allcontacts.filter((item) => {
      // for (let i in this.metacars) {
      //   let md = this.metacars[i]
      //   console.log('item ', item[md])//.toLowerCase() )
      //   if (item[md] !== undefined) {
      //     if (md === 'filename') {
      //     } else
      //       if (item[md].search(value) != -1) return true
      //   }
      // }
    if (item.LastName.toLowerCase().search(value.toLowerCase()) != -1) return true
 


    });
    // console.log('item originalScans', this.scans.length, this.originalScans.length)

  }
  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }


  save() {
    this.controller.ok('added')
  }


}

