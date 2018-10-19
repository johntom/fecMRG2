
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
//
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';



export class PromptForm {
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];
  // // ConsignmentShippingID=ConservedFrom
  // orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID',
  //   'PhotographerID', 'PurchasedFrom', 'ConservedBy',
  //   'ConservedBy', 'SoldToID', 'SoldTo', 'LoanTo']
  // orgfielddesc = ['Consigned To', 'Consigned From', 'Consignment From (Shipping)', 'Owner',
  //   'Photographer', 'Purchased From', 'Conserved By',
  //   'Conserved By', 'Sold To', 'Sold To', 'Museum Loan To']

  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
     this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
  }


 

  activate(currentModel) {
    // this.item = currentitem;
    this.item = currentModel.item// currentModel.currentItem = this.currentItem
 this.currentItem =currentModel.currentItem


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
   
    // let opos = this.orgfields.findIndex(x => x === this.fieldname);
    // if (opos !== -1) {
    //   this.orgfielddescription = this.orgfielddesc[opos]

    // } else {
    //   this.orgfielddescription = this.fieldname
    // }
    this.doc = `Reproduction`
    this.heading = `Enter Reproduction`
    // this.placeholder = `Enter any characters on ${this.orgfielddescription} to select.`
    // if (this.currentItem.recordId !== 'create') {
     

    //   if (this.fieldname === 'Artist') {
      
    //     this.ArtistName = this.currentItem.artist
    //     if (this.ArtistName.ArtistName === undefined) this.ArtistName.ArtistName = this.currentItem.artist.lastName + ', ' + this.currentItem.artist.firstName
    //     this.dartist.value = this.ArtistName
    //   }

    //   if (this.fieldname === 'MediumSupportobj') {
        
      
    // this.doc = `type any characters of the   "Medium/Support: select or add new."`
    // this.heading = `Search Medium/Support: select or add new.`
    // this.placeholder = `Enter any characters on Medium/Support: select or add new.`
        
    //       if (this.currentItem.MediumSupportobj === undefined) {

    //       this.MedSup = this.appService.codesListMediumSupport[1]
    //     } else this.MedSup = this.currentItem.MediumSupportobj
  
    //     this.dmediumsupport.value = this.MedSup


    //   }


    //   if (opos !== -1) {
    //     this.fieldbase = 'ORG'

    //     let orgs = this.appService.orgsList
    //     let origid

    //     if (this.fieldname === this.orgfields[opos]) {
    //       if ((this.currentItem[this.orgfields[opos]] === undefined) || (this.currentItem[this.orgfields[opos]] === null)) { } else {
    //         origid = orgs.findIndex(x => x._id === this.currentItem[this.orgfields[opos]])
    //         this.orgobj = orgs[origid]
    //       }
    //     }
    //     this.OrgName = this.orgobj
    //     this.dorg.value = this.OrgName
    //   }
    // }
    // if (this.fieldname === 'SavedList') {
    
    // }



    // if (this.fieldname === 'selectedids') {
    //   this.doc = this.appService.currentsavedlist + ` has the following Inventory codes.`

     

    // }

  }

 
  save() {
   
    // if (this.fieldname === 'Artist') {

    //   this.currentItem.artist = this.ArtistName
    //   this.appService.currentItem.artist = this.ArtistName
    // }
    // if (this.fieldname === 'MediumSupportobj') {
    //   // this.currentItem.MediumSupportobj.id = this.MedSup.id

    //   if (this.MedSup !== this.currentItem.MediumSupportobj)
    //     this.currentItem.MediumSupportobj = this.MedSup

    // }
    // if (this.fieldname === 'OwnerID') {
    //   if (this.OrgName.OrgName !== this.currentItem.ownername) {
    //     this.currentItem.OwnerID = this.OrgName._id
    //     this.currentItem.ownername = this.OrgName.OrgName
    //   }

    // }
    // if (this.fieldname === 'SoldToID') {
    //   if (this.OrgName.OrgName !== this.currentItem.soldtoname) {

    //     this.currentItem.SoldToID = this.OrgName._id
    //     this.currentItem.soldtoname = this.OrgName.OrgName
    //   }
    // }
    // if (this.fieldname === 'ConsignedFromID') {
    //   if (this.OrgName.OrgName !== this.currentItem.consignedfromname) {

    //     this.currentItem.ConsignedFromID = this.OrgName._id
    //     this.currentItem.consignedfromname = this.OrgName.OrgName
    //   }
    // }
    // if (this.fieldname === 'ConsignmentShippingID') {
    //   if (this.OrgName.OrgName !== this.currentItem.consignmentshippingname) {

    //     this.currentItem.ConsignmentShippingID = this.OrgName._id
    //     this.currentItem.consignmentshippingname = this.OrgName.OrgName
    //   }

    // }
    // if (this.fieldname === 'ConservedBy') {
    //   // let orgid = `${this.OrgName._id}`
    //   // let orgname = `${this.OrgName.OrgName}`
    //   if (this.OrgName.OrgName !== this.currentItem.conservedbyname) {

    //     this.currentItem.ConservedBy = this.OrgName._id
    //     this.currentItem.conservedbyname = this.OrgName.OrgName
    //   }

    // }
    // if (this.fieldname === 'ConsignedTo') {
    //   if (this.OrgName.OrgName !== this.currentItem.consignedtoname) {

    //     this.currentItem.ConsignedTo = this.OrgName._id
    //     this.currentItem.consignedtoname = this.OrgName.OrgName
    //   }
    // }

    // if (this.fieldname === 'PurchasedFrom') {
    //   if (this.OrgName.OrgName !== this.currentItem.purchasedfromname) {

    //     this.currentItem.PurchasedFrom = this.OrgName._id
    //     this.currentItem.purchasedfromname = this.OrgName.OrgName
    //   }
    // }
    // if (this.fieldname === 'LoanTo') {
    //   if (this.OrgName.OrgName !== this.currentItem.loantoname) {

    //     this.currentItem.LoanTo = this.OrgName._id
    //     this.currentItem.loantoname = this.OrgName.OrgName
    //   }
    // }
    // if (this.fieldname === 'PhotographerID') {
    //   if (this.OrgName.OrgName !== this.currentItem.photographername) {

    //     this.currentItem.PhotographerID = this.OrgName._id
    //     this.currentItem.photographername = this.OrgName.OrgName
    //   }
    // }
    // if (this.fieldname === 'ConsignmentShippingID') {
    //   if (this.OrgName.OrgName !== this.currentItem.consignmentshippingname) {

    //     this.currentItem.ConsignmentShippingID = this.OrgName._id
    //     this.currentItem.consignmentshippingname = this.OrgName.OrgName
    //   }

    // }



    // if (this.fieldname === 'Treatment') {
    //   this.currentItem.Treatment
    // }
    // if (this.fieldname === 'SavedList') {
    //   let name = `${this.name.name}`
    //   console.log(' dsaved.value', name)//, this.dsaved.value)
    //   // this.dsaved.value = this.name//this.addlist
    //   this.appService.currentsavedlist = name// dsaved.value
    // }
    this.controller.cancel()
  }
}
