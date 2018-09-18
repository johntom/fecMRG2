import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
//import { Prompt } from '../../../services/prompt';
import { Prompt } from './prompt';
import moment from 'moment';
import { DialogImage } from './dialogImage';
// import {
//   ValidationControllerFactory,
//   ValidationController,
//   ValidationRules,
//   validateTrigger
// } from 'aurelia-validation';
// import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';

// @inject(Router, ApiService, ApplicationService, MyDataService, DialogService, ValidationControllerFactory)
@inject(Router, ApiService, ApplicationService, MyDataService, DialogService)
export class DataForm {
  controller = null;
  MediumSupportobj = '';
  Title = '';
  InvYear = '';
  InventoryCode = '';
  // user = new User();
  
  // currentItem = new currentItem(); // for validate
  
  
  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
  // people = ['Nancy King', 'Nancy Davolio', 'Robert Davolio' ]
  measuresOld = [
    { id: 0, name: '1/16' },
    { id: 1, name: '2/16' },
    { id: 3, name: '3/16' },
    { id: 4, name: '4/16' },
    { id: 5, name: '5/16' },
    { id: 6, name: '6/16' },
    { id: 7, name: '7/16' },
    { id: 8, name: '8/16' },
    { id: 9, name: '9/16' },
    { id: 10, name: '10/16' },
    { id: 11, name: '11/16' },
    { id: 12, name: '12/16' },
    { id: 13, name: '13/16' },
    { id: 14, name: '14/16' },
    { id: 15, name: '15/16' },
  ];
  measures = [
    { id: 0, name: '1/8' },
    { id: 1, name: '1/4' },
    { id: 3, name: '3/8' },
    { id: 4, name: '1/2' },
    { id: 5, name: '5/8' },
    { id: 6, name: '3/4' },
    { id: 7, name: '7/8' }
  ];

  searchsold = [
    { id: 0, name: 'Y' },
    { id: 1, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];
  // person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };
  fieldname = ''
  error = "";
  division = {
    div_id: 1,
    div_code: "S",
    div_name: "Secondary"
  };

  constructor(router, api, appService, dataService, dialogService, controllerFactory) {
    this.api = api
    this.appService = appService
    this.inv = ''
    this.dataService = dataService
    this.router = router
    this.dialogService = dialogService
    this.skippromt = false
    // this.controller = controllerFactory.createForCurrentScope();
    // this.controller.addRenderer(new BootstrapFormRenderer());
    // this.controller.addObject(this);
    // this.controller.addObject(this.currentItem);
// this.currentItem={}
  }
  showModal(fieldname) {
    this.appService.currentItem.fieldname = fieldname

    this.appService.currentItem.recordId = this.recordId
    this.dialogService.open({ viewModel: Prompt, model: this.appService.currentItem, lock: false }).whenClosed(response => {

      // if (fieldname === 'Artist') {
      //   let artistsel = this.appService.currentItem.artist;
      //    if (artistsel===undefined){
      //      artistsel=null
      //  //    this.currentItem.ArtistName=null
      //    }
      //   this.currentItem.artist = artistsel 
      //  //  this.currentItem.ArtistName=this.appService.currentItem.artistname
      //  //(this.currentItem.artist); 

      // }
      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)

      } else {
        if (this.appService.currentItem.artist === null) {
          //// this.currentItem.artist.ArtistName=undefined
        //  this.controller.validate()
        }
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }

  showModalBS() {
    $('#myModal').modal()    // this works
    // this.myModal.modal()    
    // `${this.myModal}`.modal()   

  }

  showModalBS2(id) {
    this.division.div_id = id;
    if (id) {
      this.error = "";
    } else {
      this.error = "Incomplete form...";
    }
    $("#my-input").val("JQuery is working" + Date.now());
    // this.myauinput = "JQuery is working" + Date.now()
    $(this.edit_division).find(".modal").modal();
  }

  showModalBS3(id) {
    this.division.div_id = id;
    if (id) {
      this.error = "";
    } else {
      this.error = "Incomplete form...";
    }
    // $("#my-input").val("JQuery is working" + Date.now());
    this.myauinput = "JQuery is working" + Date.now()
    $(this.edit_division).find(".modal").modal();
  }
  showModalImg() {
    // alert('in m')
    this.dialogService.open({ viewModel: DialogImage, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  saveRecord() {
    window.alert("Save successful!");
  }

  deleteRecord() {
    window.alert("Delete successful!");
  }

  closeModal() {
    $(this.edit_division).modal('hide');
  }
  // findOption = value => {
  //   console.log('value', value)
  //   this.options.find(x => x.name === value);
  // }
  // onChange(selectedartist) {
  //   alert('artist: ' + selectedartist)
  // }

  showKeywords() {
    alert(`GenreTypes: ${this.appService.currentItem.keywords}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }

  factsheet() {
    let rt2 = this.appService.currentItem.InventoryCode;
    this.api.createFactSheet(rt2)
      .then((jsonRes) => {
        let success = jsonRes.data;
        // alert('success',success)
        if (success === 'success') {
          alert(' factsheet  created ')

        } else alert(' factsheet  failed ')
      });
  }


  selectChange(GenreID) {
    alert('in c ' + opt + GenreID)
    // let genres = this.appService.codesGenre
    // let gid = genres.findIndex(x => x.id === genreid)
    // let item = genres[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.currentItem.GenreID = item.id
    // this.currentItem.GenreID = this.GenreID
  }

  showAttendees() {
    alert(`GenreTypes: ${this.appService.currentItem.genretypes}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }
  // (MediumSupport,currentItem.MediumSupport)
  selectChangedMS(MediumSupport) {
    alert('in selectChangedMS  ', MediumSupport, this.MediumSupport1)
    // this.MediumText=''
    // let genres = this.appService.codesGenre
    // let gid = genres.findIndex(x => x.id === genreid)
    // let item = genres[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.currentItem.GenreID = item.id

  }
  DropdownChanged(changedVal) {
    alert(changedVal);
  }
  activate(params, routeConfig) {
    //12  this.tabname = this.appService.currentSearch
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      //console.log('finihed heading', this.heading)
      if (this.recordId === 'create') {

        this.appService.currentItem = {}
        this.appService.currentItem.id = 'create'
        this.appService.testrec = {}
        this.appService.originalrec = {}
        // this.appService.currentItem.STATUS = 1
        // this.appService.currentItem.insured = {}
        // this.appService.currentItem.claimant = {}
        // this.appService.currentItem.insco = {}
        // this.appService.currentItem.insaddress = {}
        // this.appService.currentItem.inscontact = {}
        this.appService.currentItem.provenance = []
        this.appService.currentItem.notes = []
        this.appService.currentItem.exhibitions = []
        this.appService.currentItem.reproductions = []
        this.appService.currentItem.transport = []
        this.appService.currentItem.conservation = []
        this.appService.currentItem.condition = []
        this.appService.currentItem.purchased = []
        this.appService.currentItem.soldto = []
        this.appService.currentItem.museumloan = []
        this.appService.currentItem.consignedto = []
        this.appService.currentItem.offering = []
        this.appService.currentItem.consigned = []
        this.appService.currentItem.photo = []
        this.appService.currentItem.docs = []


      } else {
        console.log('this.recordId ', this.recordId);
        // if (!this.appService.currentClaim) { // not sure about this condition
        // need return for promise
        return this.api.findInventoryOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            //  this.inv = inv[0]
            this.currentItem = inv[0]
            this.appService.currentItem = inv[0]
            this.appService.testrec = inv[0]
            this.appService.currentItem.isDirty = () => {
              return JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)
            };
            this.appService.currentItem.reset = () => {
              this.appService.originalrec = this.appService.currentItem;
            }
            this.appService.currentView = this.appService.currentItem; // must set on every view
            this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))// inv[0]));


         
          this.appService.currentView = this.appService.currentItem
          this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))

///2

            // still needed if obj 		  value.two-way="currentItem.MediumSupportobj"   vs value.bind > 
            let meds = this.appService.codesListMediumSupport
            if ((this.appService.currentItem.MediumSupportobj === undefined) || (this.currentItem.MediumSupportobj === null)) {
            } else {
              // if( this.currentItem.MediumSupportobj!==undefined){
              let mid = meds.findIndex(x => x.id === this.appService.currentItem.MediumSupportobj.id)
              this.appService.currentItem.MediumSupportobj = this.appService.codesListMediumSupport[mid]//10]// test
            }

            let oid
            let orgobj
            let orgs = this.appService.orgsList
            if ((this.appService.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
            } else {
              oid = orgs.findIndex(x => x._id === this.currentItem.SoldTo)
              orgobj = this.appService.orgsList[oid]//10]
              if (orgobj !== undefined) this.appService.currentItem.soldtoname = orgobj.OrgName
            }

            if ((this.appService.currentItem.OwnerID === undefined) || (this.appService.orgsList === null)) {
            } else {
              oid = orgs.findIndex(x => x._id === this.appService.currentItem.OwnerID)
              orgobj = this.appService.orgsList[oid]//10]
              if (orgobj !== undefined) this.appService.currentItem.ownername = orgobj.OrgName
              // this.OrgName = orgobj
              // this.dorg.value = this.OrgName  this.currentItem.ownername this.currentItem.soldtoname
            }



            if ((this.appService.currentItem.SoldToID === undefined) || (this.appService.orgsList === null)) {
            } else {
              oid = orgs.findIndex(x => x._id === this.appService.currentItem.SoldToID)
              orgobj = this.appService.orgsList[oid]//10]
              if (orgobj !== undefined) this.appService.currentItem.soldtoname = orgobj.OrgName
            }



            if ((this.appService.currentItem.artist === undefined) || (this.appService.currentItem.artist === null)) {
              // this.currentItem={}// for create only
            } else {
              let arts = this.appService.artistList
              let aid = arts.findIndex(x => x.id === this.appService.currentItem.artist.id)
              let artistobj = this.appService.artistList[aid]//10]
              if (artistobj !== undefined) this.appService.currentItem.artist = artistobj//.OrgName
            }
            console.log('finihed active1')
            // return inv
          });
        console.log('finihed activ2')
      }
      console.log('finihed active3')
    }
    console.log('finihed active4')
  }

  attached() {
    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];
    //   this.selectOneToOneTab(tab);
    // }
    if (this.appService.dataFormOneToManyTabs.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs[0];
      this.selectOneToManyTab(tab);
    }
  }

  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    return true;
  }

  saveinventory(option) {
    //this.controller.validate();
    let savetime = moment().format('MM/DD/YY h:mm:ss a')

    if (this.recordId === 'create') {
      // console.log(this.appService.currentItem, this.currentItem)
      this.api.createinventory(this.appService.currentItem).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);
        this.recordId = jsonRes.id
        //let tab = this.appService.tabs.find(f => f.isSelected);
        if (this.appService.currentItem.id === 'create') {
          this.appService.currentItem.id = ''

          this.message = "Save successful. Claim added @ " + savetime
        }
        //  this.skippromt = true

        // let inv = jsonRes
        // this.currentItem = inv
        // this.appService.currentItem = inv
        // this.appService.testrec = inv
        // this.appService.currentView = this.currentItem; // must set on every view
        // this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
        // //  this.appService.currentView = this.appService.currentItem; // must set on every view
        // //  this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))// inv[0]));
        // ///

        if (option === 1) {
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          this.close()
        } else {
          this.appService.originalrec = this.appService.currentItem
        }
      });
    } else {
      // console.log(' call save ', JSON.stringify(this.appService.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
      //return 
      // if (JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)) {
      if (JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)) {
        this.api.saveinventory(this.appService.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);
          // window.alert("Save successful!");
          this.message = "Save successful. Inventory updated @ " + savetime

          this.appService.testrec = this.appService.currentItem
          this.appService.currentView = this.appService.currentItem
          this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))
          this.skippromt = true

          if (option === 1) {
            let tab = this.appService.tabs.find(f => f.isSelected);
            this.closeTab(tab);
            this.close()
          } else {

            // this.api.findInventoryOne(this.currentItem.InventoryCode)
            //   .then((jsonRes) => {
            //     console.log('jsonRes ', jsonRes);
            //     let inv = jsonRes.data;
            //     this.currentItem = inv[0]
            //     this.appService.currentItem = inv[0]
            //     this.appService.testrec = inv[0]
            //     this.appService.currentItem.isDirty = () => {
            //       return JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)
            //     };
            //     this.appService.currentItem.reset = () => {
            //       this.appService.originalrec = this.appService.currentItem;
            //     }
            //     this.appService.currentView = this.currentItem
            //     this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))
            //   })

          }
        });
      }
    }
  }

  // canDeactivate() {
  //   return new Promise((resolve, reject) => {
  //     if (this.appService.currentItem &&
  //       this.appService.currentItem.isDirty &&
  //       this.appService.currentItem.isDirty()) {
  //       // Now, we need to query the user... result => makes it a closure
  //       this.appService.asyncHandleDirty().then(result => {
  //         if (!result.wasCancelled) {
  //           resolve(true);
  //         } else {
  //           resolve(false);
  //         }
  //       });
  //     } else {
  //       resolve(true);
  //     }
  //   });
  // }

    canDeactivate() {
    return new Promise((resolve, reject) => {
     
      console.log('canDeactivate ')
      if (this.appService.currentView !== undefined && this.appService.originalrec !== {} &&
        this.appService.currentItem.id !== 'create' &&
        this.appService.currentView && this.appService.currentView.isDirty &&
        this.appService.currentView.isDirty()) {

        // Now, we need to query the user... result => makes it a closure
        this.appService.asyncHandleDirty().then(result => {
          if (!result.wasCancelled) {
            // need whenu have multi claims opened
            // this.appService.currentClaim = this.appService.originalrec
            resolve(true); // ok to leave
          } else {

            resolve(false); // cancel to stay

          }
        });
      } else {
        resolve(true);
      }
    });
    }
  requestclose() {
   
    // let tab = this.appService.tabs.find(f => f.isSelected);
    // let index = this.appService.tabs.findIndex(f => f.isSelected)
    // let rt2 = '#/claim/' + this.tabname

    // let newIndex = (index > 0) ? index - 1 : 0;
    // let newTab = this.appService.tabs[newIndex];
    // const resetFunc = () => { this.appService.originalrec = this.appService.currentItem; };
 const resetFunc = () => { this.appService.originalrec = this.appService.currentItem; };
    // let cand = this.canDeactivate()
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/inventory/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


  }
  // close() {
  //   let tab = this.appService.tabs.find(f => f.isSelected);
  //   // Next, we navigate to the newly created claim
  //   // Finally, we close out this tab
  //   this.closeTab(tab);
  //   let rt2 = '#/inventory/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //   console.log('this.tabname ', this.tabname)
  //   this.router.navigate(rt2);
  // }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);

  }


}

// export class currentItem {
//   MediumSupportobj;
//   Title;
//   InvYear;
//   InventoryCode;
//   artist;

// }
// ValidationRules
//   .ensure(a => a.MediumSupportobj).required()
//   .ensure(a => a.Title).required()
//   .ensure(a => a.InvYear).required()
//   .ensure(a => a.InventoryCode).required()
//   .ensure(a => a.artist).required()

//   // .ensure(a => a.email).required().email()
//   // .on(DataForm);
//   .on(currentItem);

