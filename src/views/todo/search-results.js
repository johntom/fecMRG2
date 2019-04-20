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
  message = 'Hello Inventory 101- a!';
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
      sort: [{
      field: 'createdAt',
      dir: 'desc'
    }],
    group: [{ field: "type" }, { field: "status" }], 
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {

          Issue: { type: "string" }, // barcode insured

          createdAt: { type: 'date' },
          updatedAt: { type: 'date' }

          // InventoryCode: { type: "string" },
          // Title: { type: "string" },
          // MediumSupport: { type: "string" },
          // CurrentLocation: { type: "string" },
          // Bin: { type: "string" }, // barcode insured
          // Owner: { type: "string" },
          // InvYear: { type: "string" },
          // UnframedHeight: { type: "string" },


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
  }

  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 

    //let queryParams = this.utilService.parseQueryString();
    //let queryParams2 = this.utilService.generateQueryString(queryParams);
    ;

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
  async addtodo() {
    // this.currentItem = {}
    // this.currentItem.id = 'create'
  let rt2 = `#/todo/data/create`
    this.router.navigate(rt2);
  }
  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    ///api/v1/inventory/getall

    let response = await this.api.findTodo(this.queryParams);
    console.log('this.repos ', response.data)
    return response.data


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
    this.appService.todo = dataItem
    // let rt2 = '#/todo/data/' + dataItem.id//+'/'+ dataItem.ID;

    // this.router.navigate(rt2);// `#/inventory/${path}`);

    let qs = this.utilService.generateQueryString(dataItem.id);
    // let path = `${qs}&tabname=Todo${this.utilService.counter++}`;
    let path = dataItem.id// `${dataItem.id}&tabname=Todo${this.utilService.counter++}`;

    let rt2 = `#/todo/data/${path}`
    this.router.navigate(rt2);



  }

}