import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';

import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service'
import { MyDataService } from "../../services/my-data-service"

@inject(Router, ApiService, UtilService, ApplicationService)
export class Contactdups {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  //  console.log(' inv SearchResults ');
  // message = 'Hello Contact 101!';
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
      // update: (options) => {
      //   let updatedItem = options.data;
      //   console.log('   updatedItem ', updatedItem)
      //   this.updateData(updatedItem)
      //     .then((scans) => {
      //       options.success(scans)
      //     })
      //   options.success()
      // }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        // fields: {

        //   // LegacyID: { type: "number" }, // scan template
        //   Artist: { type: "string" }, // barcode insured
        //   //  ArtistRegistra: { type: "string" },
        //   InventoryCode: { type: "string" },
        //   Title: { type: "string" },
        //   MediumSupport: { type: "string" },
        //   CurrentLocation: { type: "string" },
        //   Bin: { type: "string" }, // barcode insured
        //   Owner: { type: "string" },
        //   InvYear: { type: "string" },
        //   UnframedHeight: { type: "string" },
        // }
      }
    },
    pageSize: 12,

    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })



  constructor(router, api, utilService, appService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
  }

  activate(params, routeConfig) {
   
    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }
  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    if (this.datasource._data.length === 1) {
      let tab = this.appService.tabs.find(f => f.isSelected);
      this.closeTab(tab);
    }
    // find index
    //  let garray = this.datasource._data;
    let gid = this.invdata.findIndex(x => x.id === dataItem.id)
    let rt2 = '#/contact/data/' + dataItem.id + '?' + dataItem.LastName + ',' + dataItem.FirstName + '-' + gid///+' '+dataItem.ID

    // let rt2 = '#/contact/data/' + dataItem.id;
    this.router.navigate(rt2);

  }
  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }

  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    let notmailinglist=0;

 let response = await this.api.findContactdups();
    // this.appService.catalogList = response.data
    // console.log('this.catalogList ', this.api.catalogList)
   inv = response.data;
   return inv
    
  }
 addcontact() {
     this.router.navigate(`#/contact/data/create`);

  }

  // details(e) {
  //   let grid = this.grid;
  //   let targetRow = $(e.target).closest("tr");
  //   grid.select(targetRow);
  //   let selectedRow = grid.select();
  //   let dataItem = grid.dataItem(selectedRow);
  //   let rt2 = '#/contact/data/' + dataItem._id
  //   this.router.navigate(rt2);
  // }
  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.dataItem=dataItem;
    this.queryParams=`?contactl=${dataItem.LastName}&contactf=${dataItem.FirstName}`
    let notmailinglist=0
    return this.api.findContact(this.queryParams,notmailinglist)//searchrec)
      .then((jsonRes) => {
        this.dups = jsonRes.data;
        
      })
  
}

async savedups() {
   let response = await this.api.savedups(this.dups);
  //  thi.appService.catalogList = response.data
  alert (` save the dups ${response}`)
  

}

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
}

