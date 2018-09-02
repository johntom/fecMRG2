
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';

import 'bootstrap-select/css/bootstrap-select.min.css';
import { bindable, inject } from 'aurelia-framework';
// @inject()

@inject(DialogController, ApplicationService, MyDataService, DialogService, ApiService)

export class Prompt {
  @bindable picker;

  @bindable orgItem;
  @bindable orgValue;

  @bindable condimentItem;
  @bindable condimentValue;



  // static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];
  mappingDataStructure = {
    class: 'class',
    option: 'name',
    style: 'style',
    title: 'title',
    tokens: 'tokens'
  }
  mappingorgDataStructure = {
    class: 'class',
    option: 'OrgName'
    // style: 'style',
    // title: 'title',
    // tokens: 'tokens'
  }
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3',
    actionsBox: true
  };
  allCampingStuffObject = [
    { id: 1, name: 'Tent', company: 'Sweet' },
    { id: 2, name: 'Flashlight', company: 'Sour' },
    { id: 3, name: 'Sleeping Bag', company: 'Spice' },
    { id: 4, name: 'Rum', company: 'Mt Gay' }

  ];
  orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID', 'PhotographerID', 'PurchasedFrom', 'ConservedBy', 'PurchasedFrom', 'ConservedBy', 'SoldToID', 'SoldTo']

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


  // getStates(filter, limit) {
  //   let filterlc = filter.toLowerCase()
  //   let states
  //   let Promise = this.dataService.loadStates()
  //     .then(response => {
  //       states = response
  //       console.log('states', states)
  //       return states //response // .json();
  //     })
  //     .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
  //     .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

  //   return Promise
  // }

  // activate(question) {
  //    this.question = question;
  //} person
  activate(fieldname) {
    this.fieldname = fieldname;
    this.fieldbase = ''


    // if (this.fieldname === 'ConsignedTo') {
    //PhotographerID PurchasedFrom ConsignedTo ConsignedTo ConsignedFromID ConsignmentShippingID OwnerID 
    //  LoanTo ConsignedFromID InsuredBy PurchasedFrom 
    // OwnerID SoldTo or SoldToID
    // if (this.fieldname === 'ConsignedTo' || this.fieldname === 'ConsignedFromID'
    //   || this.fieldname === 'ConsignmentShippingID' || this.fieldname === 'OwnerID'
    //   || this.fieldname === 'PhotographerID' || this.fieldname === 'PurchasedFrom'
    //   || this.fieldname === 'ConservedBy' || this.fieldname === 'SoldToID'
    //   || this.fieldname === 'SoldTo'
    // )

    let opos = this.orgfields.findIndex(x => x === fieldname);
    if (opos !== -1) {
      this.fieldbase = 'ORG'

      let orgcbs = this.appService.orgsList
      let origid
      this.orgobj = {}
      //  origid = this.appService.orgsList.findIndex(x => x._id === this.currentItem.ConservedBy)
      //  this.orgobj = this.appService.orgsList[origid]
      if (this.fieldname === this.orgfields[opos]) {

        if ((this.currentItem[this.orgfields[opos]] === undefined) || (this.currentItem[this.orgfields[opos]] === null)) {



        } else {
          origid = orgcbs.findIndex(x => x._id === this.currentItem[this.orgfields[opos]])
          this.orgobj = orgcbs[origid]
        }

      }

      this.orgSelection = {
        selectedOrgItem: this.orgobj,
        selectedOrgValue: this.orgobj._id
        
      };
       alert('act ' + fieldname+ this.orgobj)
    }
   
    this.doc = `Search ${this.fieldname} to select.`

  }

  //attached() {

  // this.doc = `type any characters of the ${this.fieldname} to select.`



  //add DonatedBy
  // if (this.fieldname === 'SavedList') {
  //   // we dont send a name of the list
  //   // let meds = this.appService.savedlists 
  //   // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
  //   // } else {
  //   //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
  //   //   let orgobj = this.appService.orgsList[mid]//10]
  //   //   // console.log('orgobj', orgobj)
  //   //   this.OrgName = orgobj
  //   //   this.dsaved.value = this.OrgName
  //   // }
  // }


  // }


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
    if (this.fieldbase === 'ORG') {
      //   let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      let orgid = this.orgSelection.selectedOrgItem._id//`${this.OrgName.id}`
      let orgname = this.orgSelection.selectedOrgItem.OrgName// `${this.OrgName.OrgName}`
      if (this.fieldname === 'ConservedBy') {
        this.currentItem.ConservedBy = orgid
        this.currentItem.conservedbyname = orgname
      }
      if (this.fieldname === 'OwnerID') {
        this.currentItem.OwnerID = orgid
        this.currentItem.ownername = orgname
      }
      if (this.fieldname === 'SoldToID') {
        this.currentItem.SoldToID = orgid
        this.currentItem.soldtoname = orgname
      }
      if (this.fieldname === 'SoldTo') {
        this.currentItem.SoldTo = orgid
        this.currentItem.soldtoname = orgname
      }
      if (this.fieldname === 'ConsignedFromID') {
        this.currentItem.ConsignedFromID = orgid
        this.currentItem.consignedfromname = orgname
      }
      if (this.fieldname === 'ConsignmentShippingID') {
        this.currentItem.ConsignmentShippingID = orgid
        this.currentItem.consignmentshippingname = orgname
      }

      if (this.fieldname === 'InsuredBy') {
        this.currentItem.InsuredBy = orgid
        this.currentItem.insuredbyname = orgname
      }

      if (this.fieldname === 'ConservedBy') {
        this.currentItem.ConservedBy = orgid
        this.currentItem.conservedbyname = orgname
      }

      if (this.fieldname === 'ConsignedTo') {
        this.currentItem.ConsignedTo = orgid
        this.currentItem.consignedtoname = orgname
      }

      if (this.fieldname === 'PurchasedFrom') {
        this.currentItem.PurchasedFrom = orgid
        this.currentItem.purchasedfromname = orgname
      }

      if (this.fieldname === 'LoanTo') {
        this.currentItem.LoanTo = orgid
        this.currentItem.loantoname = orgname
      }
      if (this.fieldname === 'PhotographerID') {
        this.currentItem.PhotographerID = orgid
        this.currentItem.photographername = orgname
      }
    } else {


      if (this.fieldname === 'SavedList') {
        let name = `${this.name.name}`
        console.log(' dsaved.value', name)//, this.dsaved.value)
        // this.dsaved.value = this.name//this.addlist
        this.appService.currentsavedlist = name// dsaved.value
      }
    }
    this.controller.cancel()
  }
  detached() {
    //  this.businessesSubscription.dispose();
  }
}


// <div show.bind="fieldname==='Description'">
      // 			<textarea rows="8" cols="100" id="Description" class="form-control input-sm" value.bind="currentItem.Description"></textarea>
      // 		</div>
      // 		<div show.bind="fieldname==='Comment'">
      // 			<textarea rows="8" cols="100" id="Comment" class="form-control input-sm" value.bind="currentItem.Comment"></textarea>
      // 		</div>
      // 		<div show.bind="fieldname==='Inscribed'">
      // 			<textarea rows="8" cols="100" id="Inscribed" class="form-control input-sm" value.bind="currentItem.Inscribed"></textarea>
      // 		</div>


      //			<div show.bind="fieldname==='Treatment'">


      // if (this.fieldname === 'Treatment') {
      //   this.currentItem.Treatment
      // }
// if (this.fieldname === 'ConservedBy') {

      //   if ((this.currentItem.ConservedBy === undefined) || (this.currentItem.ConservedBy === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.ConservedBy)
      //     this.orgobj = orgcbs[origid]
      //   }

      // }

      // if (this.fieldname === 'ConsignedTo') {

      //   if ((this.currentItem.ConsignedTo === undefined) || (this.currentItem.ConsignedTo === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.ConsignedTo)
      //     this.orgobj = orgcbs[origid]
      //   }

      // }

      // if (this.fieldname === 'ConsignmentShippingID') {

      //   if ((this.currentItem.ConsignmentShippingID === undefined) || (this.currentItem.ConsignmentShippingID === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.ConsignmentShippingID)
      //     this.orgobj = orgcbs[origid]
      //   }
      // }

      //   if (this.fieldname === 'SoldTo') {

      //   if ((this.currentItem.SoldTo === undefined) || (this.currentItem.SoldTo === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.SoldTo)
      //     this.orgobj = orgcbs[origid]
      //   }

      // } if (this.fieldname === 'SoldToID') {

      //   if ((this.currentItem.SoldToID === undefined) || (this.currentItem.SoldToID === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.SoldToID)
      //     this.orgobj = orgcbs[origid]
      //   }
      // }
      // if (this.fieldname === 'OwnerID') {
      //   if ((this.currentItem.OwnerID === undefined) || (this.currentItem.OwnerID === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.OwnerID)
      //     this.orgobj = orgcbs[origid]
      //   }
      // }
      // if (this.fieldname === 'PhotographerID') {
      //   if ((this.currentItem.PhotographerID === undefined) || (this.currentItem.PhotographerID === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.PhotographerID)
      //     this.orgobj = orgcbs[origid]
      //   }
      // }
      // if (this.fieldname === 'PurchasedFrom') {
      //   if ((this.currentItem.PurchasedFrom === undefined) || (this.currentItem.PurchasedFrom === null)) {
      //   } else {
      //     origid = orgcbs.findIndex(x => x._id === this.currentItem.PurchasedFrom)
      //     this.orgobj = orgcbs[origid]
      //   }
      // }


    // if (this.fieldname === 'selectedids') {
    //   // this.appService.currentsavedlist
    //   this.doc = this.appService.currentsavedlist + ` has the following Inventory codes.`

    //   // we dont send a name of the list
    //   // let meds = this.appService.savedlists 
    //   // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
    //   // } else {
    //   //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
    //   //   let orgobj = this.appService.orgsList[mid]//10]
    //   //   // console.log('orgobj', orgobj)
    //   //   this.OrgName = orgobj
    //   //   this.dsaved.value = this.OrgName
    //   // }
    //   // let meds = this.appService.savedlists
    //   // let orgobj = this.appService.savedlists[0]
    //   // this.appService.selectedids = orgobj.InventoryCodes
    //   //this.myMultiSelect.kWidget.dataSource.add(this.appService.selectedids);
    //   //  let ss = this.appService.selectedids
    //   //   this.myMultiSelect.kWidget.setDataSource(ss);

    // }
