
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';



export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];


  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
    //  this.inv = '';
    this.currentItem = this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
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

  }

  // created(SearchResults,prompt){
  // if (this.fieldname === 'selectedids') {
  //       // we dont send a name of the list
  //       // let meds = this.appService.savedlists 
  //       // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
  //       // } else {
  //       //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
  //       //   let orgobj = this.appService.orgsList[mid]//10]
  //       //   // console.log('orgobj', orgobj)
  //       //   this.OrgName = orgobj
  //       //   this.dsaved.value = this.OrgName
  //       // }


  //       // let meds = this.appService.savedlists
  //       // let orgobj = this.appService.savedlists[0]
  //       // this.appService.selectedids = orgobj.InventoryCodes
  //       //this.myMultiSelect.kWidget.dataSource.add(this.appService.selectedids);
  //       let ss = this.appService.selectedids
  //        this.myMultiSelect.kWidget.setDataSource(ss);

  //     }
  // }
  attached() {
    // set typahead value for state MUST BE IN ATTACHED
    // this.name = {
    //   name: 'New York',
    //   value: 'NY'
    // }
    // this.dow.value = this.name
// this.appService.currentsavedlist
    this.doc = `type any characters of the ${this.fieldname} to select.`
    if (this.fieldname === 'SoldTo') {
      let meds = this.appService.orgsList
      if ((this.currentItem.SoldTo === undefined) || (this.currentItem.SoldTo === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.SoldTo)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dorg.value = this.OrgName
      }
    }



    if (this.fieldname === 'LoanTo') {
      let meds = this.appService.orgsList
      if ((this.currentItem.LoanTo === undefined) || (this.currentItem.LoanTo === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.LoanTo)
        let orgobj = this.appService.orgsList[mid]//10]
        this.OrgName = orgobj
        this.dloanto.value = this.OrgName
      }
    }


    if (this.fieldname === 'ConsignedFromID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.ConsignedFromID === undefined) || (this.currentItem.ConsignedFromID === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.ConsignedFromID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dconsignedfromid.value = this.OrgName
      }
    }

    if (this.fieldname === 'InsuredBy') {
      let meds = this.appService.orgsList
      if ((this.currentItem.InsuredBy === undefined) || (this.currentItem.InsuredBy === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.InsuredBy)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dinsuredby.value = this.OrgName
      }
    }



    if (this.fieldname === 'ConsignedTo') {
      let meds = this.appService.orgsList
      if ((this.currentItem.ConsignedTo === undefined) || (this.currentItem.ConsignedTo === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.ConsignedTo)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dconsignedto.value = this.OrgName
      }
    }

    if (this.fieldname === 'PurchasedFrom') {
      let meds = this.appService.orgsList
      if ((this.currentItem.PurchasedFrom === undefined) || (this.currentItem.PurchasedFrom === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.PurchasedFrom)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dpurchasedfrom.value = this.OrgName
      }
    }


    if (this.fieldname === 'ConsignmentShippingID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.ConsignmentShippingID === undefined) || (this.currentItem.ConsignmentShippingID === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.ConsignmentShippingID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.donsignmentshippingid.value = this.OrgName
      }
    }


    if (this.fieldname === 'OwnerID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.OwnerID === undefined) || (this.currentItem.OwnerID === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dorg.value = this.OrgName
      }
    }
    if (this.fieldname === 'SoldToID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.SoldToID === undefined) || (this.currentItem.SoldToID === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.SoldToID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dsoldtoid.value = this.OrgName
      }
    }
    if (this.fieldname === 'ConservedBy') {
      let meds = this.appService.orgsList
      if ((this.currentItem.ConservedBy === undefined) || (this.currentItem.ConservedBy === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.ConservedBy)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dconservedby.value = this.OrgName
      }
    }
    if (this.fieldname === 'PhotographerID') {
      let meds = this.appService.orgsList
      if ((this.currentItem.PhotographerID === undefined) || (this.currentItem.PhotographerID === null)) {
      } else {
        let mid = meds.findIndex(x => x._id === this.currentItem.PhotographerID)
        let orgobj = this.appService.orgsList[mid]//10]
        // console.log('orgobj', orgobj)
        this.OrgName = orgobj
        this.dphotographerid.value = this.OrgName
      }
    }



    //add DonatedBy
    if (this.fieldname === 'SavedList') {
      // we dont send a name of the list
      // let meds = this.appService.savedlists 
      // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
      // } else {
      //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
      //   let orgobj = this.appService.orgsList[mid]//10]
      //   // console.log('orgobj', orgobj)
      //   this.OrgName = orgobj
      //   this.dsaved.value = this.OrgName
      // }
    }



    if (this.fieldname === 'selectedids') {
      // this.appService.currentsavedlist
    this.doc = this.appService.currentsavedlist+` has the following Inventory codes.`

      // we dont send a name of the list
      // let meds = this.appService.savedlists 
      // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
      // } else {
      //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
      //   let orgobj = this.appService.orgsList[mid]//10]
      //   // console.log('orgobj', orgobj)
      //   this.OrgName = orgobj
      //   this.dsaved.value = this.OrgName
      // }
      // let meds = this.appService.savedlists
      // let orgobj = this.appService.savedlists[0]
      // this.appService.selectedids = orgobj.InventoryCodes
      //this.myMultiSelect.kWidget.dataSource.add(this.appService.selectedids);
      //  let ss = this.appService.selectedids
      //   this.myMultiSelect.kWidget.setDataSource(ss);

    }

  }


  //  alert(`${this.addlist} Exists in list already!`)
  addit() {
    let meds = this.appService.savedlists
    let mid = meds.findIndex(x => x.name === this.addlist)
    if (mid !== -1) {
      this.dialogService.open({ viewModel: PromptServ, model: `${this.addlist} Exists in list already!`, lock: false }).whenClosed(response => {
        let orgobj = this.appService.savedlists[mid]
        this.OrgName = orgobj
        this.dsaved.value = this.name//this.addlist
        this.appService.currentsavedlist = this.name
      });

    } else {
      // make api call
      let sl = `${this.addlist}`
      return this.api.createSavedlists(sl)
        .then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let check = jsonRes.data;
          //  this.inv = inv[0]
          if (check === 'success') {
            this.dialogService.open({ viewModel: PromptServ, model: `${this.addlist} added to list!`, lock: false }).whenClosed(response => {
              // jj 222
              this.appService.currentsavedlist = sl
              return Promise.all([
                this.dataService.loadSavedlists(),
              ]).then(values => {
                this.appService.savedlists = values[0];
              })
            })
            this.controller.cancel()
          }
        })
    }

  }
  save() {
    //var current = this.dorg.typeahead("getActive");

    // if (this.fieldname === 'SoldTo') {
    //   let orgid = `${this.OrgName._id}`
    //   let orgname = `${this.OrgName.OrgName}`
    //   this.currentItem.SoldTo = orgid
    //   this.currentItem.soldtoname = orgname
    // }
    if (this.fieldname === 'OwnerID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.OwnerID = orgid
      this.currentItem.ownername = orgname
    }
    if (this.fieldname === 'SoldToID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.SoldToID = orgid
      this.currentItem.soldtoname = orgname
    }


    if (this.fieldname === 'ConsignedFromID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignedFromID = orgid
      this.currentItem.consignedfromname = orgname
    }

    if (this.fieldname === 'ConsignmentShippingID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignmentShippingID = orgid
      this.currentItem.consignmentshippingname = orgname
    }

    if (this.fieldname === 'InsuredBy') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.InsuredBy = orgid
      this.currentItem.insuredbyname = orgname
    }

    if (this.fieldname === 'ConservedBy') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConservedBy = orgid
      this.currentItem.conservedbyname = orgname
    }


    if (this.fieldname === 'ConsignedTo') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignedTo = orgid
      this.currentItem.consignedtoname = orgname
    }

    if (this.fieldname === 'PurchasedFrom') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PurchasedFrom = orgid
      this.currentItem.purchasedfromname = orgname
    }
  
   if (this.fieldname === 'LoanTo') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.LoanTo = orgid
      this.currentItem.loantoname = orgname
    }
   if (this.fieldname === 'PhotographerID') {
      let orgid = `${this.OrgName._id}`
      let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PhotographerID = orgid
      this.currentItem.photographername = orgname
    }




    if (this.fieldname === 'Treatment') {
      this.currentItem.Treatment
    }
    if (this.fieldname === 'SavedList') {
      let name = `${this.name.name}`
      console.log(' dsaved.value', name)//, this.dsaved.value)
      // this.dsaved.value = this.name//this.addlist
      this.appService.currentsavedlist = name// dsaved.value
    }
    this.controller.cancel()
  }

}