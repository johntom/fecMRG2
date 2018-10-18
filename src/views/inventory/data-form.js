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
  // this is keywords
  dataSource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        options.success(this.appService.codesGenre);
      },
      // create: {
      //     url: "https://demos.telerik.com/kendo-ui/service/Products/Create",
      //     dataType: "jsonp"
      // },
      parameterMap: function (options, operation) {
        if (operation !== "read" && options.models) {
          return { models: kendo.stringify(options.models) };
        }
      }

    },
    schema: {
      model: {
        id: "id",
        fields: {
          "CodeType": { type: "number" },
          "Description": { type: "string" },
          "CodeTypeDesc": { type: "string" },
        }
      }
    }
  });
  /*
    "CodeType" : NumberInt(3), 
     "CodeTypeDesc" : "Genre"
      */
  // addNew(ctx) {
  addNew() {
    var value = this.multiselect.input.val();
    var dataSource = this.multiselect.dataSource;
    var widget = this.multiselect

    //  if (confirm("Are you sure?")) {
    let bod = {
      "CodeType": 3,
      "Description": value,
      "CodeTypeDesc": "Genre"
    }

    this.api.addmediumsupport(bod)
      .then((jsonRes) => {
        this.appService.codesGenre = jsonRes.data;
        let oid = this.appService.codesGenre.findIndex(x => x.Description === value)
        let codeobj = this.appService.codesGenre[oid]
        let rec = {
          "CodeType": 3,
          "Description": value,
          "CodeTypeDesc": "Genre",
          id: codeobj.id
        }
        this.currentItem.keywords.push(value)
        dataSource.add(rec)
      });



    dataSource.sync();
    widget.refresh();// keep the focus
  }

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
    this.currentItem.fieldname = fieldname
    this.currentItem.recordId = this.recordId
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

      // if (fieldname === 'Artist') {
      //   let artistsel =   this.currentItem.artist;
      //    if (artistsel===undefined){
      //      artistsel=null
      //  //    this.currentItem.ArtistName=null
      //    }
      //   this.currentItem.artist = artistsel 
      //  //  this.currentItem.ArtistName=  this.currentItem.artistname
      //  //(this.currentItem.artist); 

      // }
      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)

      } else {
        if (this.currentItem.artist === null) {
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
    // this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

    // this.dialogService.open({ viewModel: DialogImage, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: DialogImage, model: this.currentItem, lock: false }).whenClosed(response => {



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
    alert(`GenreTypes: ${this.currentItem.keywords}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }

  factsheet() {
    let rt2 = this.currentItem.InventoryCode;
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
    alert(`GenreTypes: ${this.currentItem.genretypes}`);
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

        this.currentItem = {}
        this.currentItem.id = 'create'
        this.appService.testrec = {}
        this.appService.originalrec = {}
        //   this.currentItem.STATUS = 1
        //   this.currentItem.insured = {}
        //   this.currentItem.claimant = {}
        //   this.currentItem.insco = {}
        //   this.currentItem.insaddress = {}
        //   this.currentItem.inscontact = {}
        this.currentItem.provenance = []
        this.currentItem.notes = []
        this.currentItem.exhibitions = []
        this.currentItem.reproductions = []
        this.currentItem.transport = []
        this.currentItem.conservation = []
        this.currentItem.condition = []
        this.currentItem.purchased = []
        this.currentItem.soldto = []
        this.currentItem.museumloan = []
        this.currentItem.consignedto = []
        this.currentItem.offering = []
        this.currentItem.consigned = []
        this.currentItem.photo = []
        this.currentItem.docs = []


      } else {
        console.log('this.recordId ', this.recordId);
        let mruget = localStorage.getItem('mru-mrg');
        if (mruget === null) {
          // tabindex = 0
          mruget = 0
        } else {
          mruget = JSON.parse(mruget)
        }

        // let get the mru list and bump it
        function mruinfo(temp) {
          this.mru1 = temp[0];
          this.mru2 = temp[1];
          this.mru3 = temp[2];
          this.mru4 = temp[3];
          this.mru5 = temp[4];
          //  this.tabindex = temp[1];
        }
        var temp = [this.recordId, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4];

        if (this.recordId === mruget.mru1 || this.recordId === mruget.mru2 || this.recordId === mruget.mru3 ||
          this.recordId === mruget.mru4 || this.recordId === mruget.mru5) { } else {
          mruinfo = new mruinfo(temp);
          // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
          localStorage.setItem('mru-mrg', JSON.stringify(mruinfo));
        }
        //////////////////// end mru


        return this.api.findInventoryOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            this.currentItem = inv[0]
            // never been saved from view

            // // move to attach
            // if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
            //   // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
            //   // force it all the time
            //   this.currentItem.savedonce = true
            //   this.saveinventory(0)
            // }


            //      this.appService.onlyonce=1
            // clientWidth: 404

            // naturalHeight: 1112
            // naturalWidth: 1499
            this.appService.currentItem = this.currentItem//inv[0]
            this.currentItem.isDirty = () => {
              return JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)
            };
            this.currentItem.reset = () => {
              // this.appService.originalrec =   this.currentItem;
              this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
            }
            this.appService.currentView = this.currentItem; // must set on every view
            this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));

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

    // move to attach
    if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
      // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
      // force it all the time
      this.currentItem.savedonce = true
      this.saveinventory(0)
    }
    this.appService.clientHeight = this.mainimage.clientHeight
    this.appService.clientWidth = this.mainimage.clientWidth
    let tabinfo, tabindex
    // tabinfo = localStorage.getItem('tabinfo');

    tabinfo = localStorage.getItem('tabinfo' + this.currentItem.InventoryCode);
    if (tabinfo === null) {
      tabindex = 0
    } else {
      tabinfo = JSON.parse(tabinfo)
      tabindex = tabinfo.tabindex
    }

    if (this.appService.dataFormOneToManyTabs.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs[tabindex];
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
    let tabindex = this.appService.dataFormOneToManyTabs.findIndex(f => f.isSelected)
    function tabinfo(temp) {
      this.recid = temp[0];
      this.tabindex = temp[1];

    }
    var temp = [this.currentItem.InventoryCode, tabindex];
    tabinfo = new tabinfo(temp);
    // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
    localStorage.setItem('tabinfo' + this.currentItem.InventoryCode, JSON.stringify(tabinfo));
    return true;
  }

  // addKeyword() {
  //   if (this.currentItem.addkeyword === undefined || this.currentItem.addkeyword === undefined) {
  //     alert('Must enter keyword')
  //   } else {
  //     //   "Description" : "photography", 
  //     // "Integer Value" : "", 
  //     // "String Value" : "", 
  //     // "Sort Order" : NumberInt(0), 
  //     // "Security Level" : "", 
  //     // "Protected" : "N", 
  //     // "Currency Value" : "", 
  //     // "CodeType" : NumberInt(3), 
  //     // "CodeTypeDesc" : "Genre"
  //     let newword = this.currentItem.addkeyword
  //     let ibod = {
  //       'Description': newword,
  //       'CodeType': 3,
  //       'CodeTypeDesc': "Genre"
  //     }
  //     this.currentItem.addkeyword = ''
  //     // "keywords" : [
  //     //     "Painting", 
  //     //     "American Surrealism", 
  //     //     "Abstract Art"
  //     // ], 
  //     // let codesGenre = []//3, change to keyword
  //     //       codesGenre.push(newi)
  //     if (this.currentItem.keywords === undefined) this.currentItem.keywords = []

  //     // this.appService.codesGenre = codesGenre//3,
  //     //   this.currentItem.inscontact = {
  //     //   'NAME_LAST':   this.currentItem.INS_NAME_LAST,
  //     //   'NAME_FIRST':   this.currentItem.INS_NAME_FIRST,
  //     //   'NAME_PREFIX':   this.currentItem.INS_NAME_PREFIX
  //     // }
  //     // <ak-multiselect k-value.two-way="appService.currentItem.keywords ">
  //     // 							<select multiple="multiple " data-placeholder="Select keywords... ">
  //     // 								<option repeat.for="opt of appService.codesGenre" model.bind="opt.Description ">
  //     // 									${opt.Description}
  //     // 								</option>
  //     // 							</select>
  //     //       <ak-multiselect ak-multiselect.ref="myMultiSelect" k-data-source.bind="allFunctions"> 
  //     // </ak-multiselect>
  //     // view-model.js

  //     this.api.addcodegenre(ibod).then((jsonRes) => {
  //       //return Promise.resolve(this.dataService.loadInsurancecompany()).then(value => {
  //       this.appService.codesGenre = jsonRes.data// return new codes
  //       // var multiselect = $("#multiselect").data("kendoMultiSelect");
  //       // let multiselect = this.multiselect.data("kendoMultiSelect");
  //       // multiselect.refresh();
  //       this.multiselect.refresh()

  //       // this.multiselect.kWidget.dataSource.add( newword );

  //       // you can also set the datasource again if you want to refresh all options
  //       //this.multiselect.kWidget.setDataSource(this.appService.codesGenre);

  //       this.currentItem.keywords.push(newword)

  //     })
  //   }

  // }
  getmainimage() {
    //alert ('im')
    console.log(this.mainimage)
    // clientHeight: 300
    //      this.appService.onlyonce=1
    // clientWidth: 404

    // naturalHeight: 1112
    // naturalWidth: 1499
  }
  saveinventory(option) {
    //this.controller.validate();
    let savetime = moment().format('MM/DD/YY h:mm:ss a')

    if (this.recordId === 'create') {
      // console.log(  this.currentItem, this.currentItem)
      this.api.createinventory(this.currentItem).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);
        this.recordId = jsonRes.id
        //let tab = this.appService.tabs.find(f => f.isSelected);
        if (this.currentItem.id === 'create') {
          this.currentItem.id = ''

          this.message = "Save successful. Inventory added @ " + savetime
        }
        //  this.skippromt = true

        // let inv = jsonRes
        // this.currentItem = inv
        //   this.currentItem = inv
        // this.appService.testrec = inv
        // this.appService.currentView = this.currentItem; // must set on every view
        // this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
        // //  this.appService.currentView =   this.currentItem; // must set on every view
        // //  this.appService.originalrec = JSON.parse(JSON.stringify(  this.currentItem))// inv[0]));
        // ///

        if (option === 1) {
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          this.close()
        } else {
          this.appService.originalrec = this.currentItem
        }
      });
    } else {
      // console.log(' call save ', JSON.stringify(  this.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
      //return 
      // if (JSON.stringify(  this.currentItem) !== JSON.stringify(this.appService.originalrec)) {
      if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)) {


        // calc ratio of image
        let imgh, imgw
        let imageHeight, imageWidth

        if (this.mainimage.clientHeight === undefined) {
          // no image
          imageWidth = 1
          imageHeight = 1
        } else {
          imgw = this.mainimage.clientWidth
          imgh = this.mainimage.clientHeight
          if (imgh === imgw) {
            imageHeight = 1
            imageWidth = 1
          } else if (imgh > imgw) {
            imageHeight = 1
            imageWidth =  (imgw / imgh).toPrecision(2)  //Math.round(imgw / imgh)
          } if (imgw > imgh) {
            imageWidth = 1
            imageHeight =  (imgh / imgw).toPrecision(2) //Math.round(imgh / imgw)
          }
        }
        this.currentItem.clientHeightRatio = imageHeight
        this.currentItem.clientWidthRatio = imageWidth
        //  this.currentItem.clientHeightRatio  = his.mainimage.clientHeight
        //     this.currentItem.clientWidthRatio  =  this.mainimage.clientWidth

        // end of calc ratio

        this.api.saveinventory(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);
          // window.alert("Save successful!");
          this.message = "Save successful. Inventory updated @ " + savetime

          this.appService.testrec = this.currentItem
          this.appService.currentView = this.currentItem
          this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
          this.skippromt = true
          //  if (!fail) {
          //           if (option === 1) {
          //             let tab = this.appService.tabs.find(f => f.isSelected);
          //             this.closeTab(tab);
          //             this.close()
          //             this.requestclose()
          if (option === 1) {
            // let tab = this.appService.tabs.find(f => f.isSelected);
            // this.closeTab(tab);
            // this.close()
            this.requestclose()
          } else {

            // this.api.findInventoryOne(this.currentItem.InventoryCode)
            //   .then((jsonRes) => {
            //     console.log('jsonRes ', jsonRes);
            //     let inv = jsonRes.data;
            //     this.currentItem = inv[0]
            //       this.currentItem = inv[0]
            //     this.appService.testrec = inv[0]
            //       this.currentItem.isDirty = () => {
            //       return JSON.stringify(  this.currentItem) !== JSON.stringify(this.appService.originalrec)
            //     };
            //       this.currentItem.reset = () => {
            //       this.appService.originalrec =   this.currentItem;
            //     }
            //     this.appService.currentView = this.currentItem
            //     this.appService.originalrec = JSON.parse(JSON.stringify(  this.currentItem))
            //   })

          }
        });
      }
    }
  }
// addexistingSelection(){
//   let sels
// 		if (this.selectedids === undefined) {
// 			sels = []
		
// 		} else sels = this.selectedids

// 		var grid = this.grid;
// 		var selectedRows = grid.select();
// 		if (selectedRows.length === 0) {
// 			alert('please select a row to add'
// 			)
// 		} else {
// 			var maxRows = selectedRows.length / 2;
// 			selectedRows.each(function (idx, el) {
// 				let dataItem = grid.dataItem(el);
// 			});
// 			var i;
// 			var a1;
// 			for (i = 0; i < maxRows; i++) {
// 				a1 = selectedRows[i];
// 				let dataItem = grid.dataItem(a1);
// 				let mid = sels.findIndex(x => x === dataItem.InventoryCode)
// 				if (mid === -1) {
// 					sels.push(dataItem.InventoryCode);
// 				}
// 				if (i === maxRows - 1) {
// 					this.selectedids = sels;
// 					alert('addexistingSelection')
// 					this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {
// 						console.log('jsonRes ', jsonRes);
// 					});
// 				}
// 			}
			
// 		}
// }

  canDeactivate() {
    return new Promise((resolve, reject) => {

      console.log('canDeactivate ')
      if (this.appService.currentView !== undefined && this.appService.originalrec !== {} &&
        this.currentItem.id !== 'create' &&
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
    // const resetFunc = () => { this.appService.originalrec =   this.currentItem; };
    const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    // let cand = this.canDeactivate()
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/inventory/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


  }


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

/////////////////////////////////////////////////////////////////////////
// close() {
  //   let tab = this.appService.tabs.find(f => f.isSelected);
  //   // Next, we navigate to the newly created claim
  //   // Finally, we close out this tab
  //   this.closeTab(tab);
  //   let rt2 = '#/inventory/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //   console.log('this.tabname ', this.tabname)
  //   this.router.navigate(rt2);
  // }
// canDeactivate() {
  //   return new Promise((resolve, reject) => {
  //     if (  this.currentItem &&
  //         this.currentItem.isDirty &&
  //         this.currentItem.isDirty()) {
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



 // 09/30/2018 Converted data has all the lookups
            // let meds = this.appService.codesListMediumSupport
            // if ((this.currentItem.MediumSupportobj === undefined) || (this.currentItem.MediumSupportobj === null)) {
            // } else {
            //   // if( this.currentItem.MediumSupportobj!==undefined){
            //   let mid = meds.findIndex(x => x.id === this.currentItem.MediumSupportobj.id)
            //   this.currentItem.MediumSupportobj = this.appService.codesListMediumSupport[mid]//10]// test
            // }

            // let oid
            // let orgobj
            // let orgs = this.appService.orgsList
            // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.SoldTo)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.soldtoname = orgobj.OrgName
            // }

            // if ((this.currentItem.OwnerID === undefined) || (this.appService.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.OwnerID)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.ownername = orgobj.OrgName
            // }

            // if ((this.currentItem.SoldToID === undefined) || (this.appService.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.SoldToID)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.soldtoname = orgobj.OrgName
            // }

            // if ((this.currentItem.artist === undefined) || (this.currentItem.artist === null)) {
            //   // this.currentItem={}// for create only
            // } else {
            //   let arts = this.appService.artistList
            //   let aid = arts.findIndex(x => x.id === this.currentItem.artist.id)
            //   let artistobj = this.appService.artistList[aid]//10]
            //   if (artistobj !== undefined) this.currentItem.artist = artistobj//.OrgName
            // }