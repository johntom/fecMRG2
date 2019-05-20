import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';

import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
// import { DialogImage } from '../inventory/dialogImage'
import { DialogService } from 'aurelia-dialog'
import { Promptexhibit } from '../prompt/promptExhibit';
import { Promptrepro } from '../prompt/promptRepro';
import { Prompttransport } from '../prompt/promptTransport';
import { Promptprov } from '../prompt/promptProv';
import { Promptmerge } from '../prompt/promptMerge';

import { Promptmess } from '../../services/promptmess';
import { Promptyn } from '../../services/promptyn';

// jrt
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService)
export class SearchResults {
  heading = 'Search Results...';
  footer = 'Search Results...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  hide1 = true
  hide2 = true

  hide9 = true
  item = {}

  message = ''//Hello Inventory 101- a!';
  // artists

  // dataSourceArtist = new kendo.data.DataSource({
  //     transport: {
  //       read: (options) => {
  //         options.success(this.appService.artistList);
  //       },

  //       parameterMap: function (options, operation) {
  //         if (operation !== "read" && options.models) {
  //           return { models: kendo.stringify(options.models) };
  //         }
  //       }

  //     },
  //     schema: {
  //       model: {
  //         id: "id",
  //         fields: {
  //           "ArtistName": { type: "string" },
  //           "Died": { type: "string" },
  //           "YearofBirth": { type: "string" },
  //         }


  //       }
  //     }
  //   });
  // this is keywords
  // dataSource = new kendo.data.DataSource({
  //   transport: {
  //     read: (options) => {
  //       options.success(this.appService.codesGenre);
  //     },
  //     // create: {
  //     //     url: "https://demos.telerik.com/kendo-ui/service/Products/Create",
  //     //     dataType: "jsonp"
  //     // },
  //     parameterMap: function (options, operation) {
  //       if (operation !== "read" && options.models) {
  //         return { models: kendo.stringify(options.models) };
  //       }
  //     }

  //   },
  //   schema: {
  //     model: {
  //       id: "id",
  //       fields: {
  //         "CodeType": { type: "number" },
  //         "Description": { type: "string" },
  //         "CodeTypeDesc": { type: "string" },
  //       }
  //     }
  //   }
  // });


  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((inv) => {
            console.log(' inv datasource ', inv[0]);
            options.success(inv);
          });
      },
      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        console.log('   updatedItem ', updatedItem)
        this.updateData(updatedItem)
          .then((scans) => {
            options.success(scans)
            this.datasource.read()
          })

        options.success(updatedItem)
      },
      destroy: (options) => {

        let updatedItem = options.data;
        // alert(`delete ${updatedItem.LastName}, ${updatedItem.LastName} `)
        // console.log('   updatedItem ', updatedItem)
        this.deleteData(updatedItem)
          .then((scans) => {
            options.success(scans)
            this.dataSource.read()
          })
        options.success()
      },
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          offeramount: { type: "number" }, // scan template
          // Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          listName: { type: "string", editable: false },
          FirstName: { type: "string", editable: false },
          LastName: { type: "string", editable: false },
          contactid: { type: "string", editable: false },

          //       "listName" : "test", 
          // "contactid" : "5c146faed2c10b602e3515fa", 
          // "FirstName" : "Dennis", 
          // "LastName" : "Gleason", 
          // "createdAt" : ISODate("2019-05-20T06:53:07.972+0700"), 
          // "updatedAt" : ISODate("2019-05-20T06:53:07.972+0700")
        }
      }
    },
    pageSize: 12,

  })

  constructor(router, api, utilService, appService, dataService, dialogService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.ImageID = '20150921_153441_resized_2'
    this.dialogService = dialogService
    this.appService.rfreshLoaded = false;
    this.search = {}
    this.search.deceased = true
    this.search.nomailings = true
    this.search.noinfo = true
    this.search.keywords = []

  }


async deleteData(updatedItem){

   let response = await this.api.deletemlrow(updatedItem);
     this.datasource.read()
}
  updateData(e) {
    console.log('updateData ', e)
    return this.api.saveinventory(e).then((jsonRes) => {
      // console.log('jsonRes ', jsonRes);
      // window.alert("Save successful!");
      return jsonRes

    });
  }
  onEdit(e) {
    // let grid = e.sender;
    // var targetRow = $(e.container);
    // grid.select(targetRow)
    let flag = false
    let datasource = this.datasource
    e.container.find(".k-grid-cancel").bind("click", function () {
      flag = true
      datasource.read()

    })
  }

  activate(params, routeConfig) {
    // //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 
    this.queryParams = this.utilService.parseQueryStringUrl();
    const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
    const pairs = qs.split('&')
    const queryParams = {}
    let slname
    let ct = 0
    pairs.forEach(p => {
      const kv = p.split('=')
      if (ct === 0) slname = kv[1]
      ct++
    });
    this.mailinglist = slname// this.item.savedlist 
    // this.datasource.read()

  }
  performSearch() {
    // let keyword = `${this.keywordDescription}`//.Description}` //aubs-typeahead 
    // let medsupport = `${this.DescriptionMS}`
    // let currentlocation = `${this.DescriptionLoc}`
    // let multikeys = `${this.multikeywords}`
    // let sold = this.search.sold// `${this.search.sold}`

    if (this.search) {
      let ds = `?artists=${this.search.artists}`

      let qs = this.utilService.generateQueryString(this.search);
      console.log('this.search ', this.search)
      let counter = this.utilService.counter++
      // let path = `Search${counter}${qs}`;
      // this.router.navigate(`#/inventory/${path}`);


      // let path = `searchInv${qs}&tabname=searchInv${this.utilService.counter++}`;
      // let rt2 = `#/inventory/${path}`
      // this.router.navigate(rt2);
      let path = `Mailinglist-${qs}`
      this.router.navigate(`#/mailinglist/${path}`);
      this.appService.currentSearch = path

      // see authorize-step.js on how I make this a singleton with saving the result set
      this.appService.actionsearchresults = '';// reset 
      // this.router.navigate(`#/mailinglist/${path}

      this.queryParams = this.utilService.parseQueryStringUrl();


      console.log('this.search.keywords', this.search.keywords)
      return this.api.findContact(this.queryParams, this.listname)

        // return this.api.findContact(ds, this.listname)

        .then((jsonRes) => {
          // inv = jsonRes.data;
          this.invdata = jsonRes.data//inv;
          this.recct = this.invdata.length;
          this.datasource.read()
        });


      //   //  if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`

      //   if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      //   if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      //   if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`
      //   if (sold !== 'undefined') this.search.sold = sold
      //   if (selecteddate !== 'undefined') this.search.selectedDateId = selecteddate
      //   if (owndedby !== 'undefined') this.search.owndedby = owndedby //search.owndedby

      //   let qs = this.utilService.generateQueryString(this.search);
      //   console.log('this.search ', this.search)
      //   let counter = this.utilService.counter++
      //   // let path = `Search${counter}${qs}`;
      //   // this.router.navigate(`#/inventory/${path}`);


      //   let path = `searchInv${qs}&tabname=searchInv${this.utilService.counter++}`;
      //   let rt2 = `#/inventory/${path}`
      //   this.router.navigate(rt2);

      //   this.appService.currentSearch = path //`Search${counter}`
    }
  }


  loadGrid() {
    let options = localStorage["kendo-grid-mail"]
    if (options) {
      this.grid.setOptions(JSON.parse(options))
    }
  }

  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    this.listname = 'test'
    return this.api.findmailinglist(this.listname).then((jsonRes) => {
      inv = jsonRes.data;
      this.invdata = inv;
      this.recct = inv.length;
      // this.datasource.read()
      return inv
    });

    // return this.api.findContact(this.queryParams, listname)//searchrec)
    //   .then((jsonRes) => {
    //     inv = jsonRes.data;
    //     this.invdata = inv;
    //     this.recct = inv.length;

    //   });
  }
  detached() {
    //  this.appService.actionsearchresults='';
  }

  closeTab(tab) {
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }


  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }
  performAction1Refresh() {
    //console.log('performRefresh ')
    alert('You have selected performRefresh')
    this.appService.rfreshLoaded = true;
    this.datasource.read()
  }



  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    // if (this.datasource._data.length === 1) {
    //   let tab = this.appService.tabs.find(f => f.isSelected);
    //   this.closeTab(tab);
    // }
    // find index
    //  let garray = this.datasource._data;
    let gid = this.invdata.findIndex(x => x.id === dataItem.id)
    let rt2 = '#/contact/data/' + dataItem.contactid + '?' + dataItem.LastName + ',' + dataItem.FirstName + '-' + gid///+' '+dataItem.ID

    // let rt2 = '#/contact/data/' + dataItem.id;
    this.router.navigate(rt2);

  }


  saveMerge() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    console.log('this.editor.value()', this.savedlist, this.editor.value())
    this.api.saveMerge(this.savedlist, this.editor.value())
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.message = "Save successful. merge added @ " + savetime
        } else this.message = "Save Failed  @ " + savetime
      })

  }

  setInitialValue(edt) {


  }


  changeCallbackOrg(selectedValue) {

    let values = this.myDatalistO.value
    var res = values.split(";");

    this.OrgName = res[0].trim();
    this.BusIndivid = res[1].trim();
    this.orgId = res[2].trim();
    this.orgObject = { OrgName: this.OrgName, BusIndivid: this.BusIndivid, _id: this.orgId }

    console.log('this.orgId this.OrgName', this.OrgName, this.orgId, this.BusIndivid)// this.orgObject)
    // let findvalue = this.myDatalistO.value //this.selectedValueO.value
  }


}

