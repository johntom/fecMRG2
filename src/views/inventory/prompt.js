
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';

import { Promptartist } from '../prompt/promptArtist';



export class Prompt {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];
  // ConsignmentShippingID=ConservedFrom
  orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID',
    'PhotographerID', 'PurchasedFrom', 'ConservedBy',
    'ConservedBy', 'SoldToID', 'SoldTo', 'LoanTo','ProvOwner']
  orgfielddesc = ['Consigned To', 'Consigned From', 'Consignment From (Shipping)', 'Owner',
    'Photographer', 'Purchased From', 'Conserved By',
    'Conserved By', 'Sold To', 'Sold To', 'Museum Loan To','Provenance Owner']


  textfields = ['Description', 'Comment', 'Inscribed', 'Treatment','EditionComment']
  // textfielddesc = ['Enter Alt ID', 'Enter Comment', 'Enter Inscribed with left of ":" as reg text right as ialtics till "; repeat', 'Enter Treatment']
  textfielddesc = ['Enter Alt ID', 'Enter Comment', 'All text to right of ":" will be in italics, use ";" to desginate a line break', 'Enter Treatment','All text to right of ":" will be in italics, use ";" to desginate a line break']
  // 
  // for the datalist with medium support
  selectedValue = null;
  findOption = value => this.appService.codesListMediumSupport.find(x => x.Description === value)

  // arists
  selectedValueA = null;
  findOptionA = value => this.appService.artistList.find(x => x.ArtistName === value)

  // orgs
  selectedValueO = null;
  findOptionO = value => this.appService.artistList.find(x => x.ArtistName === value)
  // catalogs
  myDatalistC = null;
  findOptionC = value => this.appService.catalogList.find(x => x.CatalogTitle === value)

  //  this.ArtistName = this.currentItem.artist
  //       if (this.ArtistName.ArtistName === undefined) this.ArtistName.ArtistName = this.currentItem.artist.lastName + ', ' + this.currentItem.artist.firstName
  //       this.dartist.value = this.ArtistName
  // <div show.bind="fieldname==='Artist'">
  // 				<div class="form-group flex-column-1">
  // 					<aubs-typeahead ref='dartist' data.bind="appService.artistList" value.bind="ArtistName" debounce.bind="350" placeholder="${placeholder}"
  // 					 open-on-focus.bind="true" key="ArtistName" results-limit.bind="22" select-single-result.bind="true">
  // 					</aubs-typeahead>
  // 					<!-- <div> Artist: ${ArtistName | stringify}</div> -->
  // 					<div> born: ${ArtistName.yearofBirth } died: ${ArtistName.died} </div>
  // 				</div>
  // 			</div>
  //   this.ArtistName = this.currentItem.artist
  //   if (this.ArtistName.ArtistName === undefined) this.ArtistName.ArtistName = this.currentItem.artist.lastName + ', ' + this.currentItem.artist.firstName

  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;
    this.appService = appService;
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

  addnewms(newvalue) {

    let bod = {
      "CodeType": 12,
      "Description": newvalue,//this.currentItem.newms,
      "CodeTypeDesc": "Medium/Support"
    }
    this.api.addmediumsupport(bod).then((jsonRes) => {
      let ms = jsonRes.data;
      this.appService.codesListMediumSupport = ms

      let codeobj = this.appService.codesListMediumSupport.find(x => x.Description === newvalue)

      console.log('codeobj ', codeobj);

      this.currentItem.MediumSupportobj.id = codeobj.id
      this.currentItem.MediumSupportobj.Description = codeobj.Description
      this.appService.codesListMediumSupport.push(this.selectedValue)
      this.controller.cancel()

      return
    })
  }
  changeCallbackMedSup(selectedvalue) {
    console.log('selectedvalue has undefined ', selectedvalue, "myDatalist this.myDatalist.value has the value", this.myDatalist.value);
    let findvalue = this.myDatalist.value
    // let  findIndex = this.appService.codesListMediumSupport.findIndex(x => x.Description === findvalue)
    // let  findObject  = this.appService.codesListMediumSupport[findIndex] 
    // let findObject = this.appService.codesListMediumSupport.find(x => x.Description === findvalue)
    // alert(`you are about to add ${findvalue} to medium support`)
    if (this.selectedValue === undefined || this.selectedValue === null) {
      //     alert(`you are about to add ${findvalue} to Insured`)
      //  this.dialogService.open({ viewModel: Promptyn, model: 'Add or Cancel?', lock: false }).whenClosed(response => {
      let obj = {}
      obj.type = 2
      obj.name = `Add ${findvalue} to Medium Support List or Cancel?`
      this.dialogService.open({ viewModel: Promptyn, model: obj, lock: false }).whenClosed(response => {


        if (!response.wasCancelled) {
          this.addnewms(findvalue)
        } else {
          console.log('cancel');
        }
        console.log(response.output);
      });
    }

  }
  attached() {
    //  this.currentItem
    let findOptiono = this.appService.orgsList.find(x => x._id === this.currentItem.OwnerID)
    console.log('appService.orgsList', findOptiono, this.appService.orgsList)
    let findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.SoldToID)
    console.log('appService.orgsList', findOptions, this.appService.orgsList)
    let opos = this.orgfields.findIndex(x => x === this.fieldname);
    if (opos !== -1) {
      this.orgfielddescription = this.orgfielddesc[opos]

    } else {
      this.orgfielddescription = this.fieldname
    }
    let topos = this.textfields.findIndex(x => x === this.fieldname);
    if (topos !== -1) {
      this.textfielddescription = this.textfielddesc[topos]
      this.doc = ` ${this.textfielddescription} .`
      this.heading = ` ${this.textfielddescription} .`
      this.placeholder = `${this.textfielddescription}`
    } else {
      this.doc = `type any characters of the ${this.orgfielddescription} to select.`
      this.heading = `Select ${this.orgfielddescription}`
      this.placeholder = `Enter any characters on ${this.orgfielddescription} to select.`

    }


    if (this.fieldname === 'Artist') {
      // if (this.currentItem.artist === undefined) {
      //   } else {
      //     this.ArtistName = this.currentItem.artist
      //     if (this.ArtistName.ArtistName === undefined) this.ArtistName.ArtistName = this.currentItem.artist.lastName + ', ' + this.currentItem.artist.firstName
      //     this.dartist.value = this.ArtistName
      //   }
      this.doc = `Select Artist `
      //  this.doc2 = `Select Artist or add new if not in list.`
     this.heading = `ARTIST SEARCH `
      this.placeholder = `Select Artist or add new if not in list.`
      if (this.currentItem.artist === undefined || this.currentItem.artist === '') {
      } else {
        //  this.insuredobj = this.currentItem.insured
        this.myDatalistA.value = this.currentItem.artist.ArtistName
        this.selectedValueA = this.currentItem.artist;
      this.origartist = this.currentItem.artist;
      }

    }


    if (this.fieldname === 'Catalog') {

      this.doc = `Select Catalog or add new if not in list.`
      this.heading = `Select Catalog or add new if not in list.`
      this.placeholder = `Select Catalog or add new if not in list.`
      if (this.currentItem.catalog === undefined || this.currentItem.catalog === '') {
      } else {
        //  this.insuredobj = this.currentItem.insured
        this.myDatalistC.value = this.currentItem.catalog.CatalogTitle
      }

    }

    if (this.fieldname === 'MediumSupportobj') {
      this.doc = `type any characters of the   "Medium/Support: select or add new."`
      this.heading = `Select Medium/Suppor or add new.`
      this.placeholder = `Enter any characters on Medium/Support or add new.`
      if (this.currentItem.MediumSupportobj === undefined) {
      } else {
        this.MedSup = this.currentItem.MediumSupportobj
        this.myDatalist.value = this.MedSup.Description
      }

    }

    // let opos = this.orgfields.findIndex(x => x === this.fieldname);
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
    // }
    //add DonatedBy
    if (this.fieldname === 'SavedList') {
      this.heading ="Select an Existing Saved List or Create New"
       this.doc = "Select an Existing Saved List "
 this.doc2 = "Enter name of new Saved List"

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
    this.hasFocus = true;
  }

  async changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
    let findArtist = this.appService.artistList.find(x => x.ArtistName === findvalue)

    if (findArtist === undefined) {
      //     alert(`you are about to add ${findvalue} to Insured`)
      // this.dialogService.open({ viewModel: Promptorg, model: currentModel, lock: true }).whenClosed(response => {

      this.dialogService.open({ viewModel: Promptartist, model: { findvalue }, lock: true }).whenClosed(response => {

        if (!response.wasCancelled) {
          // this.addArtist(findvalue)
       
        // this.myDatalistA = this.appService.addedartist;
        this.myDatalistA.value = this.appService.addedartist.ArtistName;
        this.selectedValueA = this.appService.addedartist;
          this.appService.addedartist = '';
          //this.controller.cancel()
        } else {
          console.log('cancel');
        }
        console.log(response.output);
      });

    }
  }

  // addArtist(findvalue) {
  //   let ibod = { 'LastName': findvalue }
  //   this.api.insertartist(ibod).then((jsonRes) => {
  //     let art = jsonRes.data;
  //     let newartist = {}
  //     newartist.id = art.id
  //     newartist.lastName = art.lastName
  //     newartist.firstName = art.firstName
  //     newartist.yearofBirth = art.yearofBirth
  //     newartist.died = art.died
  //     newartist.ArtistName = art.lastName + ', ' + art.firstName


  //     this.appService.artistList.push(newartist)
  //     this.controller.cancel()
  //     // return Promise.resolve(this.dataService.loadInsured()) //.then(values => {})
  //   })
  // }
  changeCallbackCatalog(selectedValueC) {
    let findvalue = this.myDatalistC.value
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
    // let orgid = `${this.OrgName._id}`
    // let orgname = `${this.OrgName.OrgName}`
    // this.appService.currentItem.OwnerID = orgid
    // this.appService.currentItem.ownername = orgname
    // }
    // let orgid = `${this.ArtistName.id}`
    // let orgname = `${this.ArtistName.ArtistName}`
    //   let artist = `${this.ArtistName}`
    // this.currentItem.artistname = orgname
    //  this.currentItem.artist = this.ArtistName
    if (this.fieldname === 'Artist') {
      if (this.selectedValueA !== null &&  this.origartist!==this.selectedValueA) {
        if (this.currentItem.artist === undefined) this.currentItem.artist = {}

        this.currentItem.artist.ArtistName = this.selectedValueA.ArtistName
        this.currentItem.artist.died = this.selectedValueA.Died
        this.currentItem.artist.firstName = this.selectedValueA.FirstName
        this.currentItem.artist.id = this.selectedValueA.id
        this.currentItem.artist.lastName = this.selectedValueA.LastName
        this.currentItem.artist.yearofBirth = this.selectedValueA.YearofBirth


        // this.currentItem.artist = this.selectedValueA// ArtistName
      }
      // this.appService.currentItem.artist = this.ArtistName
    }
    if (this.fieldname === 'MediumSupportobj') { 
      // this.currentItem.MediumSupportobj.id = this.MedSup.id

      // if (this.MedSup !== this.currentItem.MediumSupportobj)
      //   this.currentItem.MediumSupportobj = this.MedSup
      this.currentItem.MediumSupportobj = this.selectedValue
    }
    if (this.fieldname === 'OwnerID') {
      if (this.currentItem.ownername === undefined) this.currentItem.ownername = ''
      // if (this.OrgName.OrgName !== this.currentItem.ownername) {

      this.currentItem.OwnerID = this.OrgName._id
      this.currentItem.ownername = this.OrgName.OrgName 
      // }

    }

     if (this.fieldname === 'ProvOwner') {
      if (this.OrgName.OrgName !== this.currentItem.provownername) {

        this.currentItem.ProvOwnerID = this.OrgName._id
         this.currentItem.ProvOwner =this.OrgName
        this.currentItem.provownername = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'SoldToID') {
      if (this.OrgName.OrgName !== this.currentItem.soldtoname) {

        this.currentItem.SoldToID = this.OrgName._id
        this.currentItem.soldtoname = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'ConsignedFromID') {
      if (this.OrgName.OrgName !== this.currentItem.consignedfromname) {

        this.currentItem.ConsignedFromID = this.OrgName._id
        this.currentItem.consignedfromname = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      if (this.OrgName.OrgName !== this.currentItem.consignmentshippingname) {

        this.currentItem.ConsignmentShippingID = this.OrgName._id
        this.currentItem.consignmentshippingname = this.OrgName.OrgName
      }

    }
    if (this.fieldname === 'ConservedBy') {
      // let orgid = `${this.OrgName._id}`
      // let orgname = `${this.OrgName.OrgName}`
      if (this.OrgName.OrgName !== this.currentItem.conservedbyname) {

        this.currentItem.ConservedBy = this.OrgName._id
        this.currentItem.conservedbyname = this.OrgName.OrgName
      }

    }
    if (this.fieldname === 'ConsignedTo') {
      if (this.OrgName.OrgName !== this.currentItem.consignedtoname) {

        this.currentItem.ConsignedTo = this.OrgName._id
        this.currentItem.consignedtoname = this.OrgName.OrgName
      }
    }

    if (this.fieldname === 'PurchasedFrom') {
      if (this.OrgName.OrgName !== this.currentItem.purchasedfromname) {

        this.currentItem.PurchasedFrom = this.OrgName._id
        this.currentItem.purchasedfromname = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'LoanTo') {
      if (this.OrgName.OrgName !== this.currentItem.loantoname) {

        this.currentItem.LoanTo = this.OrgName._id
        this.currentItem.loantoname = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'PhotographerID') {
      if (this.OrgName.OrgName !== this.currentItem.photographername) {

        this.currentItem.PhotographerID = this.OrgName._id
        this.currentItem.photographername = this.OrgName.OrgName
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      if (this.OrgName.OrgName !== this.currentItem.consignmentshippingname) {

        this.currentItem.ConsignmentShippingID = this.OrgName._id
        this.currentItem.consignmentshippingname = this.OrgName.OrgName
      }
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
    this.controller.ok('saved')//cancel()
  }
}


      // Promise.resolve(this.dataService.MediumSupportobj()) //.then(values => {})
      //       let rec = {
      //         "CodeType": 3,
      //         "Description": value,
      //         "CodeTypeDesc": "Genre",
      //         id: codeobj.id
      //       }

// if (this.fieldname === 'MediumSupportobj') {

//       this.doc = `type any characters of the   "Medium/Support: select or add new."`
//       this.heading = `Search Medium/Support: select or add new.`
//       this.placeholder = `Enter any characters on Medium/Support: select or add new.`

//       if (this.currentItem.MediumSupportobj === undefined) {

//         // this.MedSup = this.appService.codesListMediumSupport[1]
//       } else {
//          this.MedSup = this.currentItem.MediumSupportobj
//       // if (this.MedSup.Description === undefined) this.MedSup.Description = this.currentItem.MediumSupportobj.Description
//       // this.dmediumsupport.value = this.MedSup

//       //  if (this.MedSup.Description === undefined) {

//       //  }
//       // this.dmediumsupport.value = this.MedSup

// // datlist
// this.myDatalist.value=this.MedSup.Description

//       }



//     }

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