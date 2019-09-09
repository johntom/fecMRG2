
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";


export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService];
  constructor(controller, appService, dataService) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
    //  this.inv = '';
    this.currentItem = this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;

  }


  getStates(filter, limit) {
    let filterlc = filter.toLowerCase()
    let states
    let Promise = this.dataService.loadStates()
      .then(response => {
        states = response
        console.log('states', states)
        return states //response // .json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

    return Promise
  }

  // activate(question) {
  //    this.question = question;
  //} person
  activate(fieldname) {
    this.fieldname = fieldname;
    // if (fieldname === 'SoldTo') {



    // }
  }

  attached() {
    // set typahead value for state MUST BE IN ATTACHED
    // this.name = {
    //   name: 'New York',
    //   value: 'NY'
    // }
    // this.dow.value = this.name

    this.doc = 'type any characters of the SoldTo to select.'
    if (this.fieldname === 'SoldTo') {
      let meds = this.appService.orgsList
      if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.SoldTo)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dorg.value = this.OrgName
      }
    }

    if (this.fieldname === 'OwnerID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dorg.value = this.OrgName
      }
    }
  }
  save() { 
    let orgid = `${this.OrgName._id}`
    let orgname = `${this.OrgName.OrgName}`
    if (this.fieldname === 'SoldTo') {
      this.currentItem.SoldTo = orgid
      this.currentItem.soldtoname = orgname
    }
    if (this.fieldname === 'OwnerID') {
      this.currentItem.OwnerID = orgid
         this.currentItem.ownername = orgname
    }
    this.controller.cancel()
  }

}