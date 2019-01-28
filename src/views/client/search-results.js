import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  clients;
  //  console.log(' inv SearchResults ');
  message = 'Hello Client 101';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((clients) => {
            console.log(' inv datasource ', clients[0]);
            options.success(clients);
          });
      },

    },
    schema: {
      model: {
          mobile: true,
        id: "id", // Must assign id for update to work
        fields: {

          // LegacyID: { type: "number" }, // scan template
          CompanyName: { type: "string" }, // barcode insured
          Notes: { type: "string" },
          //  Title: { type: "string" },

        }
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
    // this.clients;
    this.ImageID = '20150921_153441_resized_2'  //4;
  }

  activate(params, routeConfig) {


    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
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
    let clients;
    //  let inv= this.appService.orgsList;
    // return inv  
    // return this.api.loadClients(this.queryParams)//searchrec)
    return this.api.findClient(this.queryParams)//searchrec)


      .then((jsonRes) => {
        clients = jsonRes.data;

        return clients
      });
  }
  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }
  performAction1() {
    console.log('Action1 ')
    alert('You have selected Action 1')
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
    let rt2 = '#/client/data/' + dataItem.id//InventoryCode;

    this.router.navigate(rt2);// `#/inventory/${path}`);

  }
  details2(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //  let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/onepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    // #/inventory/data/#=InventoryCode#
    //let rt2 = '#/inventory/data/#=' + dataItem.InventoryCode + '#'
    let rt2 = '#/client/data/' + dataItem.id//InventoryCode;
    this.router.navigate(rt2);// `#/inventory/${path}`);
  }

    addClient() {
    // let rt2 = '#/claim/data/create';
    // let rt2 = '#/client/dataadd';
     let rt2 = '#/client/data/create'

    this.router.navigate(rt2);// `#/inventory/${path}`);
  }
}


