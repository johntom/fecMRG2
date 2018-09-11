
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';



export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];

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
  activate(currentitem) {
    this.currentItem = currentitem;
    this.fieldname = currentitem.fieldname;
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

 //   this.currentItem = this.appService.currentItem
    this.doc = `type any characters of the ${this.fieldname} to select.`
    this.heading = `Search ${this.fieldname} to select.`
    this.placeholder = `Enter any characters on ${this.fieldname} to select.`


    // if (this.fieldname === 'ArtistX') {
    //   let artists = this.appService.artistList
    //   if ((this.currentItem.artist === undefined) || (this.currentItem.artist === null)) {
    //     // this.currentItem={}// for create only
    //   } else {
    //     let artid = artists.findIndex(x => x.id === this.currentItem.artist.id)
    //     let artobj = this.appService.artistList[artid]//10]
    //     this.ArtistName = artobj
    //     this.dartist.value = this.ArtistName
    //   }
    // }

     if (this.fieldname === 'Artist') {
      //let artists = this.appService.artistList
     // if ((this.currentItem.artist === undefined) || (this.currentItem.artist === null)) {
      //  // this.currentItem={}// for create only
     // } else {
       // let artid = artists.findIndex(x => x.id === this.currentItem.artist.id)
       // let artobj = this.appService.artistList[artid]//10]
       //
       //
       // sep since artist is an object no need to find it
        this.ArtistName = this.currentItem.artist
        this.dartist.value = this.ArtistName
      }
   
    
    let opos = this.orgfields.findIndex(x => x ===  this.fieldname);
    if (opos !== -1) {
      this.fieldbase = 'ORG' 

      let orgs = this.appService.orgsList
      let origid

      if (this.fieldname === this.orgfields[opos]) {
        if ((this.currentItem[this.orgfields[opos]] === undefined) || (this.currentItem[this.orgfields[opos]] === null)) { } else {
          origid = orgs.findIndex(x => x._id === this.currentItem[this.orgfields[opos]])
          this.orgobj = orgs[origid]
        }
      }
      this.OrgName = this.orgobj
      this.dorg.value = this.OrgName
    }
    // if (this.fieldname === 'SoldTo') {
    //   let meds = this.appService.orgsList
    //   if ((this.currentItem.SoldTo === undefined) || (this.currentItem.SoldTo === null)) {
    //   } else {
    //     let mid = meds.findIndex(x => x._id === this.currentItem.SoldTo)
    //     let orgobj = this.appService.orgsList[mid]//10]
    //     // console.log('orgobj', orgobj)
    //     this.OrgName = orgobj
    //     this.dorg.value = this.OrgName
    //   }
    // }
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
      this.doc = this.appService.currentsavedlist + ` has the following Inventory codes.`

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
    if (this.fieldname === 'Artist') {
      // let orgid = `${this.ArtistName.id}`
      // let orgname = `${this.ArtistName.ArtistName}`
      //   let artist = `${this.ArtistName}`
      // this.currentItem.artistname = orgname
      //  this.currentItem.artist = this.ArtistName
      this.currentItem.artist = this.ArtistName
      this.appService.currentItem.artist = this.ArtistName
    }
    //   if (this.fieldname === 'Artist') {
    //   let orgid = `${this.lastName.id}`
    //   let orgname = `${this.lastName.lastName}`
    //   this.currentItem.Artist = orgid
    //   this.currentItem.artistname = orgname
    // }
    if (this.fieldname === 'OwnerID') {
      this.currentItem.OwnerID = this.OrgName._id
      this.currentItem.ownername = this.OrgName.OrgName 
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      // this.appService.currentItem.OwnerID = orgid
      // this.appService.currentItem.ownername = orgname
    }
    if (this.fieldname === 'SoldToID') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      // this.currentItem.SoldToID = orgid
      // this.currentItem.soldtoname = orgname
      this.currentItem.SoldToID = this.OrgName._id
      this.currentItem.soldtoname = this.OrgName.OrgName
    }
    if (this.fieldname === 'ConsignedFromID') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      // this.currentItem.ConsignedFromID = orgid
      // this.currentItem.consignedfromname = orgname
      this.currentItem.ConsignedFromID = this.OrgName._id
      this.currentItem.consignedfromname = this.OrgName.OrgName
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      // this.currentItem.ConsignmentShippingID = orgid
      // this.currentItem.consignmentshippingname = orgname
      this.currentItem.ConsignmentShippingID = this.OrgName._id
      this.currentItem.consignmentshippingname = this.OrgName.OrgName
    }

    if (this.fieldname === 'InsuredBy') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.InsuredBy = this.OrgName._id
      this.currentItem.insuredbyname = this.OrgName.OrgName
    }

    if (this.fieldname === 'ConservedBy') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConservedBy = this.OrgName._id
      this.currentItem.conservedbyname = this.OrgName.OrgName
    }


    if (this.fieldname === 'ConsignedTo') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.ConsignedTo = this.OrgName.orgid
      this.currentItem.consignedtoname = this.OrgName.OrgName
    }

    if (this.fieldname === 'PurchasedFrom') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PurchasedFrom = this.OrgName.orgid
      this.currentItem.purchasedfromname = this.OrgName.orgname
    }

    if (this.fieldname === 'LoanTo') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.LoanTo = this.OrgName.orgid
      this.currentItem.loantoname = this.OrgName.orgname
    }
    if (this.fieldname === 'PhotographerID') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      this.currentItem.PhotographerID = this.OrgName.orgid
      this.currentItem.photographername = this.OrgName.orgname
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
