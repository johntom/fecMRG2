import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { Promptcontact } from './prompt';
import { Promptorg } from '../prompt/promptOrg';
import { computedFrom } from 'aurelia-framework';
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
  FirstName = '';
  LastName = '';
  division = {
    div_id: 1,
    div_code: "S",
    div_name: "Secondary"
  };
  mailingstatus = [
    { id: 1, name: 'Mailing list' },
    { id: 2, name: 'No Mailings' },
    { id: 3, name: 'Unsubscribed' }
  ]
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
  // @computedFrom('FirstName', 'LastName') currentItem.Salutation  currentItem.Suffix
  @computedFrom('currentItem.Salutation', 'currentItem.FirstName', 'currentItem.LastName', 'currentItem.Suffix', 'currentItem.address')
  get fullName() {
    // let sal =  this.currentItem.Salutation
    // let suf =  this.currentItem.Suffix
    //  If a single person: 
    // [Salutation] (if not null) [FirstName] [LastName}

    // married couple traditional: no LastName2 should get entered: 
    // [Salutation] (if not null) [FirstName] [LastName]

    // (if null salutation) [FirstName] and [FirstName2] [LastName]

    // partners: [FirstName2] & [LastName2] are entered, use salutations if available
    //  2 line entry

    // if there is data in “address as “ field, this overrides everything

    if (this.currentItem.Salutation === null) this.currentItem.Salutation = ''
    if (this.currentItem.Suffix === null) this.currentItem.Suffix = ''

    return `${this.currentItem.Salutation} ${this.currentItem.FirstName} ${this.currentItem.LastName} ${this.currentItem.Suffix} ${this.currentItem.address}`;
  }
  modal() {

    // IF B then use this
    let currentModel = {}
    // currentModel.currentItem = this.currentItem
    currentModel.currentItem = JSON.parse(JSON.stringify(this.currentItem))

    // currentModel.item = item
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


  editorg() {
    // let rt2 = '#/org/data/' + dataItem.id + '?' + name
    // let rt2 = '#/org/data/' + dataItem.id + '?' + name
    // alert(this.currentItem )
    let rt2 = '#/org/data/' + this.currentItem.org._id + '?' + this.currentItem.org.OrgName
    this.router.navigate(rt2);

  }

  showModal(fieldname) {
    this.currentItem.fieldname = fieldname
    this.currentItem.recordId = this.recordId
    let prevorgid; let prevorg
    if (this.currentItem.org !== undefined) {
      prevorgid = this.currentItem.org._id;
      prevorg = this.currentItem.org
    }
    else {
      prevorgid = ""
      prevorg = ""
    }

    this.dialogService.open({ viewModel: Promptcontact, model: this.currentItem, lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        if (this.currentItem.prevorgs !== undefined) {
          // see if it exists in the array (only one for now)
          if (this.currentItem.prevorgs[0]._id !== prevorgid) {
            this.currentItem.prevorgs.push(prevorg);
          }
        } else {
          this.currentItem.prevorgs = []
          this.currentItem.prevorgs.push(prevorg);
        }
      }
      console.log(response)
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
    let pp = JSON.stringify(params);
    this.cname = pp.substring(2, pp.indexOf(':') - 3);// params.indexOf(':')


    if (params.id) {
      //this.cname = pp.substring(0, pp.indexOf(':'));// params.indexOf(':')
      this.recordId = params.id;
      this.heading = `DataForm for record  ${this.cname} `;

      if (this.recordId === 'create') {
        this.currentItem = {}
        this.currentContactItem = {}
        this.currentContactItem.id = 'create'

         this.currentItem.BusIndivid = 'I'
        this.currentItem.contacttypes = []
        this.currentItem.international = false
        this.currentItem.deceased = false
        this.currentItem.mailingStatus = 2;
        this.appService.testcontactrec = {}
        this.appService.originalontactrec = {}

        this.currentItem.addresses = []

        this.currentItem.addresses = []
        this.currentItem.artists = []
        this.currentItem.catalogsold = []
        this.currentItem.phones = []
        this.currentItem.emails = []
        this.currentItem.addresses = []

        // let checkbox
        // let checkbox = document.getElementById("mailings");
        // checkbox.indeterminate = true;//-->
        // <div class="Rtable-cell-100 Rtable-cell--highlight">
        // 	<strong> 	<span if.bind="currentItem.mailings===undefined">null</span>&nbsp;announcements</strong>
        // 	<input type="checkbox" ref = "mailings" id="mailings" checked.bind="currentItem.mailings">

      } else {
        console.log('this.recordId ', this.recordId);
        // this.mrubuild()
        return this.api.findContactOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            this.currentItem = inv[0]
            // let  checkbox2 = document.getElementById("test");
            //             checkbox2.indeterminate = true;//-->


            // if (this.currentItemmailings === undefined) {
            // let  checkbox = document.getElementById("mailings");
            //   checkbox.indeterminate = true;//-->
            // }

            // never been saved from view
            //  this.currentContactItem = inv[0]
            this.appService.currentContactItem = this.currentItem//inv[0]
            this.mrubuild()

            this.currentItem.isDirty = () => {
              const currentJSON = JSON.stringify(this.currentItem);
              const originalJSON = JSON.stringify(this.appService.originalContactrec);
              console.log('currentJSON', currentJSON);
              console.log('originalJSON', originalJSON);
              return currentJSON !== originalJSON;
            };
            // http://www.jsondiff.com/

            this.appService.currentContactView = this.currentItem; // must set on every view
            this.appService.originalContactrec = JSON.parse(JSON.stringify(this.currentItem))//

            console.log('finihed active1')
            // return inv
          });
        console.log('finihed activ2')
      }
      console.log('finihed active3')
    }
    console.log('finihed active4')
  }
  mrucheck(newrec, prevtemp) {
    this.skip = false

    if (prevtemp[0] != undefined && newrec.id === prevtemp[0].id) this.skip = true;
    if (prevtemp[1] != undefined && newrec.id === prevtemp[1].id) this.skip = true;
    if (prevtemp[2] != undefined && newrec.id === prevtemp[2].id) this.skip = true;
    if (prevtemp[3] != undefined && newrec.id === prevtemp[3].id) this.skip = true;
    if (prevtemp[4] != undefined && newrec.id === prevtemp[4].id) this.skip = true;
      if (prevtemp[5] != undefined && newrec.id === prevtemp[5].id) this.skip = true;
    if (prevtemp[6] != undefined && newrec.id === prevtemp[6].id) this.skip = true;
    if (prevtemp[7] != undefined && newrec.id === prevtemp[7].id) this.skip = true;
    if (prevtemp[8] != undefined && newrec.id === prevtemp[8].id) this.skip = true;
    if (prevtemp[9] != undefined && newrec.id === prevtemp[9].id) this.skip = true;

    console.log('   this.skip ', this.skip)
  }
  mrubuild() {
    let mruget = localStorage.getItem('mru-mrgc');
    if (mruget === null) {
      // tabindex = 0
      mruget = 0
    } else {
      mruget = JSON.parse(mruget)
    }


    function mruinfo(temp) {
      if (temp[0] != undefined) this.mru1 = temp[0];
      if (temp[1] != undefined) this.mru2 = temp[1];
      if (temp[2] != undefined) this.mru3 = temp[2];
      if (temp[3] != undefined) this.mru4 = temp[3];
      if (temp[4] != undefined) this.mru5 = temp[4];
      if (temp[5] != undefined) this.mru6 = temp[5];
      if (temp[6] != undefined) this.mru7 = temp[6];
      if (temp[7] != undefined) this.mru8 = temp[7];
      if (temp[8] != undefined) this.mru9 = temp[8];
      if (temp[9] != undefined) this.mru10 = temp[9];
      //  this.tabindex = temp[1];
    }

    const prevtemp = [mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const temp = [{ id: this.recordId, name: this.cname, bori: this.currentItem.BusIndivid }, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const newrec = { id: this.recordId, name: this.cname, bori: this.currentItem.BusIndivid }

    this.mrucheck(newrec, prevtemp);
    if (!this.skip) {
      if (this.recordId === mruget.mru1 || this.recordId === mruget.mru2 || this.recordId === mruget.mru3 ||
        this.recordId === mruget.mru4 || this.recordId === mruget.mru5 || this.recordId === mruget.mru6 || this.recordId === mruget.mru7 || this.recordId === mruget.mru8 || this.recordId === mruget.mru9 || this.recordId === mruget.mru10) { } else {
        if (!this.skip) {
          mruinfo = new mruinfo(temp);
          localStorage.setItem('mru-mrgc', JSON.stringify(mruinfo));
        }
      }
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
        this.savecontact(0)
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


  savecontact(option) {
    //this.controller.validate();
    let savetime = moment().format('MM/DD/YY h:mm:ss a')

    if (this.recordId === 'create') {
      this.currentItem.BusIndivid === 'I' // support legacy
      // if (this.currentItem.Title === undefined || this.currentItem.InventoryCode === undefined
      //   || this.currentItem.MediumSupportobj === undefined
      //   || this.currentItem.artist === undefined) {
      //   alert('Please fix  contact ')
      // } else {

      this.api.createcontact(this.currentItem).then((jsonRes) => {
        console.log('jsonRes ', jsonRes);
        this.recordId = jsonRes.id

        // if (this.currentItem.id === 'create') {
        // this.currentItem.id = ''
        this.currentItem.id = this.recordId
        this.message = `Save successful. contact ${this.recordId} added @ ${savetime} `
        // }
        //this.mrubuild() it will add if when opening
        this.requestclose()
        let rte = `#/contact/data/${this.currentItem.id}?${this.currentItem.LastName},${this.currentItem.FirstName}-1`
        this.router.navigate(rte)

        // https://johntom.github.io/fecMRG2/#/contact/data/5d4f579024e043d0084f7a60?Tomaselli,Janet-1
        //https://johntom.github.io/fecMRG2/#/contact/data/5d4f5de224e043d0084f7a6a?Tomaselli,Way
        // this.router.navigate(`#/contact/data/${this.currentItem.id}`)
      });
      // }
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
    console.log(this.appService.originalContactrec, this.currentItem)
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