import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';

@inject(Router, ApiService, UtilService, ApplicationService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  //  console.log(' inv SearchResults ');
  message = ''//Hello Inventory 101- a!';
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
        fields: {

          // LegacyID: { type: "number" }, // scan template
          Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          InventoryCode: { type: "string" },
          Title: { type: "string" },
          MediumSupport: { type: "string" },
          CurrentLocation: { type: "string" },
          Bin: { type: "string" }, // barcode insured
          Owner: { type: "string" },
          InvYear: { type: "string" },
          UnframedHeight: { type: "string" },
        }
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
    this.appService.refreshcatalogLoaded = false;
  }

  addcatalog() {
    this.router.navigate(`#/catalog/data/create`);
  }
  activate(params, routeConfig) {
    this.queryParams = this.utilService.parseQueryStringUrl();
    // this.datasource.read()
  }

  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }
  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
  async loadData() {
    let cat;
    let notmailinglist = 0;
    if (this.appService.catalogsearchresults && !this.appService.refreshcatalogLoaded) {
      this.spinner.remove()
      return this.appService.catalogsearchresults;
    } else {
      let response = await this.api.findCatalog(this.queryParams);
      let cat = response.data
      this.recct = cat.length;
      this.spinner.remove()
      if (this.recct === 1) {
        let tab = this.appService.tabs.find(f => f.isSelected);
        this.closeTab(tab);
        let rt2 = '#/catalog/data/' + cat[0].id + '/' + cat[0].CatalogTitle.slice(0, 10);
       
        this.router.navigate(rt2);
     
      } else
        if (cat === 0 || this.recct === 0) {
          this.message = ' no records found '
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          let rt2 = '#/home'
          this.router.navigate(rt2);
        } else {
          this.appService.catalogsearchresults = cat;
          return cat
        }
    }
  }


  async loadDataHold() {
    let inv;
    let response = await this.api.findCatalog(this.queryParams);
    return response.data
    console.log('this.repos ', this.api.catalogList)


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
    let rt2 = '#/catalog/data/' + dataItem.id + '/' + dataItem.CatalogTitle.slice(0, 10);
    this.router.navigate(rt2);// `#/inventory/${path}`);

  }

  performRefresh() {
    console.log('performRefresh ')
    this.appService.searchDataLoaded = false;
    this.datasource.read()
  }


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