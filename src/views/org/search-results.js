import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

// @inject(ApiService, ApplicationService, MyDataService)
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  adjusteritems = [];
  origItems = [];

  //  console.log(' inv SearchResults ');
  message = ''//Hello Adjusters !';
  datasource = new kendo.data.DataSource({

    transport: {
      read: (options) => {
        this.loadData()
          .then((orgs) => {
            options.success(orgs);
            //  console.log(' Adjusters datasource ', orgs[0], orgs.length)

          });
      },
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
      }
    },
    pageSize: 12,
  })

  constructor(router, api, utilService, appService, dataService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.appService.refreshorgLoaded = false;
    // orgsearchresults
  }

  activate(params, routeConfig) {

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    // not needed this.datasource.read()
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
    if (this.appService.orgsearchresults && !this.appService.refreshorgLoaded) {
      this.spinner.remove()
      return this.appService.orgsearchresults;

    } else {

      // return this.api.findallorgs(this.queryParams)
      let response = await this.api.findallorgs(this.queryParams);
// console.log('response ',response)  
      let orgs = response.data
      this.recct = orgs.length;
      this.spinner.remove()
      // if (this.recct === 'jj'){//1) {
        if (this.recct === 1) {
        let rt2 = '#/org/data/' + orgs[0].id + '?' + orgs[0].OrgName
        this.appService.currentorgCount = 1
        this.router.navigate(rt2);
        let tab = this.appService.tabs.find(f => f.isSelected);
        this.closeTab(tab);
      } else
        if (orgs === 0 || this.recct === 0) {
          this.message = ' no records found '
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          let rt2 = '#/home'
          this.router.navigate(rt2);
        } else {
           this.appService.currentorgCount = orgs.length
          this.appService.orgsearchresults = orgs;
          return orgs
        }

    }
  }
  // async loadDataHold() {

  //   let response = await this.api.findallorgs(this.queryParams);
  //   let orgs = response.data
  //   this.recct = orgs.length;
  //   if (this.recct === 1) {
  //     let rt2 = '#/org/data/' + orgs[0].id + '?' + orgs[0].OrgName
  //     this.router.navigate(rt2);
  //     let tab = this.appService.tabs.find(f => f.isSelected);
  //     this.closeTab(tab);
  //   } else
  //     if (orgs === 0 || this.recct === 0) {
  //       this.message = ' no records found '
  //       let tab = this.appService.tabs.find(f => f.isSelected);
  //       this.closeTab(tab);
  //       let rt2 = '#/home'
  //       this.router.navigate(rt2);
  //     } else return orgs

  // }


  //   let response = await this.api.findallorgs(this.queryParams);
  //   this.item = response.data[0];
  //   console.log('this.repos ', this.item)

  // }

  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

  }
  performRefresh() {
    console.log('performRefresh ')
    // alert('You have selected performRefresh')
    this.appService.searchDataLoaded = false;
    this.datasource.read()  //this.loadData(); // or
    //  this.appService.searchDataLoaded = true;
  }

  details(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    // let  name = dataItem.OrgName.replace(/%20/g, '')
    // /\s/g, "X"
    let name = dataItem.OrgName.replace(/\s/g, "")// (/ /g, '-')
    let rt2 = '#/org/data/' + dataItem.id + '?' + name
    // let rt2 = '#/contact/data/' + dataItem.id + '?' + dataItem.LastName + ',' + dataItem.FirstName + '-' + gid///+' '+dataItem.ID

    console.log('search-results:details', rt2);
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }

}

