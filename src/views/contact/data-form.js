import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
//import { Prompt } from '../../../services/prompt';
import { Prompt } from './prompt';
import moment from 'moment';
import { Promptorg } from '../prompt/promptOrg';

@inject(Router, ApiService, ApplicationService, MyDataService, DialogService)
export class DataForm {
  controller = null;
  MediumSupportobj = '';
  Title = '';
  InvYear = '';
  InventoryCode = '';
  
  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
 
 
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

modal(item) {

    // this.currentItem.recordId = this.recordId model:this.currentItem
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item
    currentModel.currentItem.hide1 = false

    // this.dialogService.open({ viewModel: PromptForm, model: currentModel, lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptorg, model: currentModel, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('item', item);
      item.edit = false//this.saveitem(item, index)
      } else {

        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }

  showModal(fieldname) {
    this.currentItem.fieldname = fieldname
    this.currentItem.recordId = this.recordId
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {
    
      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)

      } else {
        if (this.currentItem.org === null) {
          alert(currentItem.org.OrgName)
          //// this.currentItem.artist.ArtistName=undefined
          //  this.controller.validate()
        }
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }



 
  saveRecord() {
    window.alert("Save successful!");
  }

  deleteRecord() {
    window.alert("Delete successful!");
  }

  showKeywords() {
    alert(`GenreTypes: ${this.currentItem.keywords}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }

 
  selectChangedMS(MediumSupport) {
  //  alert('in selectChangedMS  ', MediumSupport, this.MediumSupport1)
  
  }
  DropdownChanged(changedVal) {
  //  alert(changedVal);
  }
  activate(params, routeConfig) {
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
     
      if (this.recordId === 'create') {

        this.currentContactItem = {}
        this.currentItem.id = 'create'
        this.appService.testrec = {}
        this.appService.originalrec = {}
// address
// artists
// catsold
// compcatsent
// genre
// offering
// phone
// type

        // this.currentContactItem.artist = undefined//{} 
        // this.currentContactItem.provenance = []
        // this.currentItem.notes = []
        // this.currentItem.exhibitions = []
        // this.currentItem.reproductions = []
        // this.currentItem.transport = []
        // this.currentItem.conservation = []
        // this.currentItem.condition = []
        // this.currentItem.purchased = []
        // this.currentItem.soldto = []
        // this.currentItem.museumloan = []
        // this.currentItem.consignedto = []
        // this.currentItem.offering = []
        // this.currentItem.consigned = []
        // this.currentItem.photo = []
        // this.currentItem.docs = []


      } else {
        console.log('this.recordId ', this.recordId);
        this.mrubuild()
       

        return this.api.findContactOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            this.currentItem = inv[0]
            // never been saved from view
//  this.currentContactItem = inv[0]
           

            this.appService.currentContactItem = this.currentItem//inv[0]
            this.currentItem.isDirty = () => {
              return JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalContactrec)
            };
            this.currentItem.reset = () => {
              // this.appService.originalrec =   this.currentItem;
              this.appService.originalContactrec = JSON.parse(JSON.stringify(this.currentItem))
            }
            this.appService.currentContactView = this.currentItem; // must set on every view
            this.appService.originalContactrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));




            console.log('finihed active1')
            // return inv
          });
        console.log('finihed activ2')
      }
      console.log('finihed active3')
    }
    console.log('finihed active4')
  }
  mrubuild() {
    let mruget = localStorage.getItem('mru-mrgc');
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
      localStorage.setItem('mru-mrgc', JSON.stringify(mruinfo));
    }
  }


  // // using fat arrow
  //ES5
  // array.map(function(item) {
  //   return item * 2;
  // }
  // //ES6
  // array.map(item => item * 2);
  // this.mainimage.onload = function () {
  // async  loadimage() {
  //   let imageWidth, imageHeight

  //   //  this.mainimage.onload(() => {
  //   return new Promise((resolve, reject) => {
  //     this.mainimage.onload = function () { // alert alert("Height: " + this.height+' '+ this.width); 
  //       imageHeight = this.height
  //       imageWidth = this.width
  //       resolve()
  //       // resolve(imageWidth);
  //     }
  //     //    this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
  //   })
  //   this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
  //   return await (imageHeight)
  // }


  
  
  attached() {
    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];
    //   this.selectOneToOneTab(tab);
    // }

    // move to attach
    // bypass save if in create mode
    if (this.recordId !== 'create') {

      if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
        // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
        // force it all the time
        this.currentItem.savedonce = true
        this.saveinventory(0)
      }

      let tabinfo, tabindex
      // tabinfo = localStorage.getItem('tabinfo');

      tabinfo = localStorage.getItem('tabinfoC' + this.currentItem.id);
      if (tabinfo === null) {
        tabindex = 0
      } else {
        tabinfo = JSON.parse(tabinfo)
        tabindex = tabinfo.tabindex
      }

      if (this.appService.dataFormOneToManyTabs3.length > 0) {
        let tab = this.appService.dataFormOneToManyTabs3[tabindex];
        this.selectOneToManyTab(tab);
      }
      // this.getimageinfo()
    }
  }


  saveinventory(option) {
    //this.controller.validate();
    let savetime = moment().format('MM/DD/YY h:mm:ss a')

    if (this.recordId === 'create') {
      // console.log(  this.currentItem, this.currentItem)
      if (this.currentItem.Title === undefined || this.currentItem.InventoryCode === undefined
        || this.currentItem.MediumSupportobj === undefined
        || this.currentItem.artist === undefined) {
        alert('Please fix  contact ')
      } else {
        // delete this.currentItem.artist;
        // delete this.currentItem.catalog;
        this.api.createcontact(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          this.recordId = jsonRes.id
          //let tab = this.appService.tabs.find(f => f.isSelected);
          if (this.currentItem.id === 'create') {
            this.currentItem.id = ''
            this.message = "Save successful. contact added @ " + savetime
          }
          //this.mrubuild() it will add if when opening
          this.requestclose()
          this.router.navigate(`#/contact/data/${this.currentItem.id}`)
        });
      }
    } else {

      if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalContactrec)) {
        // SAVE WITH IMAGE INFO IN CASE ITS MISSING
        // nsure if needed this.getimageinfo()
        delete this.currentItem.artist;
        delete this.currentItem.catalog;
        this.api.savecontact(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes)
          let tab = this.appService.tabs.find(f => f.isSelected);
          // window.alert("Save successful!");
          this.message = "Save successful. Inventory updated @ " + savetime
         // this.appService.testrec = this.currentItem
          this.appService.currentContactView = this.currentItem
          this.appService.originalContactrec = JSON.parse(JSON.stringify(this.currentItem))
          this.skippromt = true
          if (option === 1) {
            this.requestclose()
          } else {

          }
        });
      }
    }
  }

  // checkData(images, formData) {
  //   let promises = []
  //   return new Promise((resolve, reject) => {
  //     let i = 0;
  //     let docs = this.currentItem.docs
  //     if (docs === undefined) docs = []
  //     let imagelen = images.length
  //     for (i = 0; i < images.length; i++) {
  //       let ext = images[i].name.split('.').pop();
  //       let fname = images[i].name
  //       let mid = -100// not needed
  //       let ival = i
  //       mid = docs.findIndex(x => x.FILE_NAME === fname)
  //       if (mid > -1) {
  //         // if we find file in array pass all values so we can evaluate later
  //         let obj = { name: fname, val: ival, ext: ext }
  //         var promise = this.promiseDialog(obj)
  //         promises.push(promise);
  //       } else {
  //         var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
  //         docs.unshift(item)
  //         formData.append('file', images[ival]);
  //       }
  //     }
  //     return Promise.all(promises).then(values => {
  //       for (i = 0; i < values.length; i++) {
  //         //console.log(' this.response values[i] ',i,values[i].name,values[i].val,values[i].resp)
  //         if (!values[i].resp) {
  //           //true=wasCancelled
  //           var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext, OVERWRITE: 'Y' }
  //           // dont add to data docs.unshift(item)
  //           formData.append('file', images[values[i].val]);
  //         }
  //       }
  //       resolve(formData)
  //     })
  //   })
  // }

  
  canDeactivate() {
    return new Promise((resolve, reject) => {
      console.log('canDeactivate ')
      if (this.appService.currentContactView !== undefined && this.appService.originalContactrec !== {} &&
        this.currentItem.id !== 'create' &&
        this.appService.currentContactView && this.appService.currentContactView.isDirty &&
        this.appService.currentContactView.isDirty()) {

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

    const resetFunc = () => { this.appService.originalContactrec = this.currentItem; };
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/contact/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentContactView, tab, newTab.href);


  }


  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);

  }
  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs3.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    let tabindex = this.appService.dataFormOneToManyTabs3.findIndex(f => f.isSelected)
    function tabinfo(temp) {
      this.recid = temp[0];
      this.tabindex = temp[1];

    }
    var temp = [this.currentItem.id, tabindex];
    tabinfo = new tabinfo(temp);
    // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
    localStorage.setItem('tabinfoC' + this.currentItem.id, JSON.stringify(tabinfo));
    return true;
  }


}
