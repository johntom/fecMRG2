import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service'
import { MyDataService } from "../../services/my-data-service"
// import moment from 'moment';
/*
 "_id" : ObjectId("5c146fafd2c10b602e351e05"), 
    "ID" : NumberInt(9319), 
    "OrgID" : NumberInt(1030), 
    "ysnPrimaryContact" : "N", 
    "ysnLetter" : "N", 
    "LocationID" : " ", 
    "Salutation" : NumberInt(1433), 
    "FirstName" : "Mark", 
    "MI" : " ", 
    "LastName" : "Cole", 
    "Assistant" : "JUne DePhilips", 
    "Dept" : " ", 
    "Spouse" : " ", 
    "MailCode" : " ", 
    "Title" : NumberInt(1313), 
    "Suffix" : " ", 
    "Inactive" : "N", 
    "ContactNotes" : " ", 
    "createdAt" : ISODate("2018-12-15T03:06:23.779+0000"), 
    "updatedAt" : ISODate("2018-12-15T03:06:23.779+0000"), 
    "unsubscribed" : false, 
    "email" : true, 
    "contacttypes" : [
        "curator", 
        "Museum Professional"
    ], 
    "mailings" : true, 
     "org" : {
        "_id" : ObjectId("5c14695ba3e3847c0f5a4c99"), 
        "ID" : 1030.0, 
        "OrgName" : "Cleveland Museum of Art", 
        "Address" : "11150 East Boulevard", 
        "City" : "Cleveland", 
        "State" : "44106-1797"
    }
    "catalogsent" : [
        {
            "_id" : ObjectId("5c15781de20ab6202185fb9b"), 
            "ID" : NumberInt(9437), 
            "CatalogID" : NumberInt(150), 
            "ContactID" : NumberInt(9319), 
            "SendType" : NumberInt(3929), 
            "DateSent" : ISODate("2005-03-16T04:00:00.000+0000"), 
            "InvoiceID" : " ", 
            "DateModified" : " ", 
            "Qty" : " ", 
            "Update" : "N", 
            "createdAt" : ISODate("2018-12-15T21:54:37.017+0000"), 
            "updatedAt" : ISODate("2018-12-15T21:54:37.017+0000")
        }, ]
        artists" : [
        {
            "_id" : ObjectId("5c158134d1ce1404366cf044"), 
            "ID" : NumberInt(8589), 
            "ContactID" : NumberInt(9319), 
            "OrgID" : " ", 
            "ArtistID" : NumberInt(246), 
            "createdAt" : ISODate("2018-12-15T22:33:24.033+0000"), 
            "updatedAt" : ISODate("2018-12-15T22:33:24.033+0000")
        }, 
"genres" : [
        {
            "_id" : ObjectId("5c26ab7c18b45eec4d910fe6"), 
            "ID" : NumberInt(8003), 
            "ContactID" : NumberInt(9319), 
            "OrgID" : NumberInt(1030), 
            "GenreID" : NumberInt(213), 
            "GenreNotes" : "", 
            "createdAt" : ISODate("2018-12-28T23:02:20.967+0000"), 
            "updatedAt" : ISODate("2018-12-28T23:02:20.967+0000")
        }, 
 */

// @inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService,EventAggregator)

@inject(Router, ApiService, UtilService, ApplicationService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  //  console.log(' inv SearchResults ');
  message = 'Hello Contacat 101!';
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
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 

    //let queryParams = this.utilService.parseQueryString();
    //let queryParams2 = this.utilService.generateQueryString(queryParams);
    // queryParams2.replace('%3D','=');
    //   queryParams2.split('%3D').join('=');
    // var find = '%3D';
    // var re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '=');
    // find = '%26';
    // re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '&');
    // this.queryParams = queryParams2
    // console.log('squeryParams2', this.queryParams);

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

  loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    return this.api.findContact(this.queryParams)//searchrec)
      .then((jsonRes) => {
        inv = jsonRes.data;
        this.invdata = inv;
        // console.log('jsonRes ', jsonRes);
        console.log('this.inv loadData 0 ', inv[0]);
        return inv
      });
  }
  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //  let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/onepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    // #/inventory/data/#=InventoryCode#
    //let rt2 = '#/inventory/data/#=' + dataItem.InventoryCode + '#'
    let rt2 = '#/contact/data/' + dataItem._id// 

    this.router.navigate(rt2);

  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
  //////////////

  // performSearch() {
  //   if (this.search) {
  //     let qs = this.utilService.generateQueryString(this.search);
  //     let path = `Search${this.utilService.counter++}${qs}`;
  //     this.router.navigate(`#/inventory/${path}`);
  //     // this.router.navigate(`#/inventory/${this.search}`);
  //     // this.router.navigate(`#/inventory/InvSearch`);
  //   }
  // }


  /////////

  // updateData(e) {

  //   return api.updatecase(e)
  //     .then((jsonRes) => {
  //       console.log('this.scans ', jsonRes)
  //       return jsonRes

  //     })
  // }
}


          // OwnershipStatus: { type: "string" },
          // RetailPriceAlpha: { type: "string" },
          // RetailPrice: { type: "string" },
          // RetailPriceDate: { type: "date" },
          // DateAdded: { type: "date" },
          // PurchasedDate: { type: "string" },
          // PurchasedFrom: { type: "string" },
          // PurchasedPrice: { type: "string" },
          // PurchasedForPrice: { type: "string" },
          // Sold: { type: "string" },
          // // Not Sold": { type: "string" },,
          // SoldToID: { type: "string" },
          // // Sold Date : { type: "date" },
          // SoldFor:  { type: "string" },
          // SoldPrice:  { type: "string" },
          // //Min SellingPrice : "",
          // NetToOwner: { type: "string" },
          // ConsignedStartDate:  { type: "string" },
          // ConsignedEndDate:  { type: "date" },
          // MRGLocation: { type: "string" },
          // SoldDesc:  { type: "string" },

          // link: { type: "string" },workername  workeraddr workercity
          //  "First Name": { type: "string" },
          // workeraddr: { type: "string" },
          // workercity: { type: "string" },
          // filename: { type: "string" },
          // contents: { type: "string" },
          // createdAt: { type: "date" },
          //  billedamt: { type: "number" },
          //    payamt: { type: "number" },      
          // // assignto:{ type: "string" },
          // assignto: { defaultValue: { staffid: 1, username: 'jrt' } }
          // // contents: { type: "memo" } billedamt payamt