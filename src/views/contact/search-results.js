import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';

import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service'
import { MyDataService } from "../../services/my-data-service"

@inject(Router, ApiService, UtilService, ApplicationService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  // footer = 'Search Results FOOTER...';
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
    pageSize: 20,

    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })

  constructor(router, api, utilService, appService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.appService.refreshcontactLoaded = false;
    this.busy = {}
    this.busy.active = true
  }

  activate(params, routeConfig) {

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    // not needed this.datasource.read()
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
    // let gid = this.invdata.findIndex(x => x.id === dataItem.id)

    let gid = this.appService.contactsearchresults.findIndex(x => x.id === dataItem.id)
    // 2nd time in we loose this.invdata
    let rt2 = '#/contact/data/' + dataItem.id + '?' + dataItem.LastName + ',' + dataItem.FirstName + '-' + gid///+' '+dataItem.ID
    // let rt2 = '#/contact/data/' + dataItem.id + '?' + dataItem.LastName + ',' + dataItem.FirstName 


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
    let inv;
    let notmailinglist = 0;
    if (this.appService.contactsearchresults && !this.appService.refreshcontactLoaded) {
      // this.spinner.remove()
        
        this.busy.active = false
        this.recct =this.appService.contactsearchresults.length
 return this.appService.contactsearchresults;

    } else { 

      return this.api.findContact(this.queryParams, notmailinglist)//searchrec)

        .then((jsonRes) => {
          inv = jsonRes.data;
          this.invdata = inv;
          this.recct = inv.length;
          // this.spinner.remove()
          this.busy.active = false
          if (this.recct === 1) {
            let rt2 = '#/contact/data/' + inv[0].id + '?' + inv[0].LastName + ',' + inv[0].FirstName
            this.router.navigate(rt2);
            let tab = this.appService.tabs.find(f => f.isSelected);
            this.closeTab(tab);
          } else
            if (inv === 0 || this.recct === 0) {
              this.message = ' no records found '
              let tab = this.appService.tabs.find(f => f.isSelected);
              this.busy.active = false
            } else {
              this.appService.contactsearchresults = inv;

            }
          return inv
        });
    }
  }

  performAction1Refresh() {
    this.appService.refreshcontactLoaded = true;
    this.datasource.read()
  }

  addcontact() {
    this.router.navigate(`#/contact/data/create`);

  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/contact/data/' + dataItem._id
    this.router.navigate(rt2);
  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
}