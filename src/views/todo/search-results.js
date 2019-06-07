import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
@inject(Router, ApiService, UtilService, ApplicationService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  message = 'todo!';
  //https://aurelia-ui-toolkits.github.io/demo-kendo/#/about?childRoute=about
  // staffTemplate = '${assignto ? assignto.StaffName : ""}';

  // categoryTemplate = '${Category.CategoryName}';
  // status = [
  //   'high',
  //   'medium',
  //   'low',
  //   'discuss'
  // ]

  // statusresults = [
  //   'new',
  //   'in queue',
  //   'in process',
  //   'next release',
  //   'ready for testing',
  //   'needs revisiting',
  //   'completed',
  //   'out of scope'
  // ]
  statusresultsTemplate = '${statusresults ? statusresults : ""}';
  statusTemplate = '${status ? status : ""}';
  typeTemplate = '${type ? type : ""}';


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
        console.log('   updatedItem ', updatedItem)
        this.updateData(updatedItem)
          .then((scans) => {
            options.success(scans)
          })
        options.success()
      },
      // destroy: {
      //         url: crudServiceBaseUrl + '/Products/Destroy',
      //         dataType: 'jsonp'
      //       },
      // create: {
      //   url: crudServiceBaseUrl + '/Products/Create',
      //   dataType: 'jsonp'
      // },
      // parameterMap: function(options, operation) {
      //   if (operation !== 'read' && options.models) {
      //     return {models: kendo.stringify(options.models)};
      //   }
      // }

      // batch: true,

      /////
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
          updatedAt: { type: 'date' },
          type:{  defaultValue: {  id: 0, name: 'Other Issues/Questions' } },
          Category: { defaultValue: { CategoryID: 1, CategoryName: 'Beverages' } },
          assignto: { defaultValue: { staffid: 100, StaffName: 'Dittemer, Jennifer' } },
          // statusresults: { defaultValue:  {name:'in process'}  },
          statusresults: { defaultValue: 'in process' },
          status: { defaultValue: 'high' },
          DeveloperNotes: { type: "string" },
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
  categoryDropDownEditor(container, options) {
    $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        dataSource: {
          type: 'odata',
          transport: {
            read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Categories'
          }
        }
      });
  }


  async updateData(e) {
    console.log('updateData ', e)
    return this.api.updatetodo(e)//, this.todo)
      .then((jsonRes) => {
        console.log('this.scans ', jsonRes)
        return  jsonRes
      })
  }


  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }

  staffDropDownEditor(container, options) {
    $('<input required data-text-field="StaffName" data-value-field="staffid" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {

            read: "https://backend.brmflow.com/api/v1/staff/find/"
          }
        }
      });
  }

 typeDropDownEditor(container, options) {
   //  { id: 0, name: 'Inv Search Screen' },
    
    $('<input required data-text-field="name" data-value-field="name" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
            transport: {
            read: (options) => {
              //  this.loadData(this.capColor, this.prevtown)
              this.loadDatatypes()
                .then((type) => {
                  console.log(' inv statusDropDownEditor ', type[0]);
                  options.success(type);
                });
            }
          }
        }
      });
  }

  // $('<input required data-text-field="status" data-value-field="status" data-bind="value:' + options.field + '"/>')
  statusDropDownEditor(container, options) {
    $('<input required  data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              //  this.loadData(this.capColor, this.prevtown)
              this.loadData2()
                .then((status) => {
                  console.log(' inv statusDropDownEditor ', status[0]);
                  options.success(status);
                });
            }
          }
        }
      })
  }

  // $('<input required data-text-field="name" data-value-field="name" data-bind="value:' + options.field + '"/>')

  statusresultsDropDownEditor(container, options) {
    console.log(options)
    $('<input required  data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              //  this.loadData(this.capColor, this.prevtown)
              this.loadData3()
                .then((sr) => {
                  console.log(' inv statusresultsDropDownEditor ', sr[0]);
                  options.success(sr);
                });
            }
          }
        }
      })

  }

  company_memoEditor(container, options) {
    // $('<textarea name="' + options.field + '" cols="50"  rows="6" required/>').appendTo(container);
    $('<textarea name="' + options.field + '" cols="50"  rows="6" />').appendTo(container);
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

  async onEdit(e) {
          let grid = e.sender;
          var targetRow = $(e.container);
          grid.select(targetRow)
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

  async loadData2() {
    let status = ['high', 'medium', 'low', 'discuss']
    return status
  }

  async loadData3() {
    let statusresults = ['new',
      'in queue',
      'in process',
      'next release',
      'ready for testing',
      'needs revisiting',
      'completed',
      'out of scope'
    ]
    return statusresults
  }


  async loadDatatypes() {
    let types = [
      { id: 0, name: 'Inv Search Screen' },
      { id: 0, name: 'Inv Search Results Grid' },
      { id: 0, name: 'Inv Form' },
      { id: 0, name: 'Inv Tab: Text ' },
      { id: 0, name: 'Inv Tab: Note' },
      { id: 0, name: 'Inv Tab: Provenance' },
      { id: 0, name: 'Inv Tab: Exhibitions' },
      { id: 0, name: 'Inv Tab: Reproductions' },
      { id: 0, name: 'Inv Tab: Transport' },
      { id: 0, name: 'Inv Tab: Conservation' },
      { id: 0, name: 'Inv Tab: Condition' },
      { id: 0, name: 'Inv Tab: Purchased From' },
      { id: 0, name: 'Inv Tab: Sold To' },
      { id: 0, name: 'Inv Tab: Museum Loan' },
      { id: 0, name: 'Inv Tab: Consigned To' },
      { id: 0, name: 'Inv Tab: Offering' },
      { id: 0, name: 'Inv Tab: Consigned From' },
      { id: 0, name: 'Inv Tab: Photo' },
      { id: 0, name: 'Inv Tab: Docs' },
      { id: 0, name: 'Inv Tab: Edition' },
      { id: 0, name: 'Inv Tab: VAT' },
      { id: 0, name: 'Inv Add New' },
      { id: 0, name: 'Inv Issues/Questions' },
      { id: 0, name: 'Artist Select Screen' },
      { id: 0, name: 'Artist Form' },
      { id: 0, name: 'Artist Add New' },
      { id: 0, name: 'Artist Issues/Questions' },
      { id: 0, name: 'Action Select Screen' },
      { id: 0, name: 'Action Form: Left panel' },
      { id: 0, name: 'Action Form: Right Panel' },
      { id: 0, name: 'Batch Form' },
      { id: 0, name: 'Actions/Batch Issues/Questions' },
      { id: 0, name: 'Contact Search Screen' },
      { id: 0, name: 'Contact Search Results Grid' },
      { id: 0, name: 'Contact Form' },
      { id: 0, name: 'Contact Tab: Address' },
      { id: 0, name: 'Contact Tab: Artists' },
      { id: 0, name: 'Contact Tab: Cat Sold' },
      { id: 0, name: 'Contact Tab: Comp Cat Sent' },
      { id: 0, name: 'Contact Tab: Offering' },
      { id: 0, name: 'Contact Tab: Phone' },
      { id: 0, name: 'Contact Tab: Previous Orgs' },
      { id: 0, name: 'Contact Tab: Works Bought' },
      { id: 0, name: 'Contact Add New' },
      { id: 0, name: 'Contact Issues/Questions' },
      { id: 0, name: 'Org Search Screen' },
      { id: 0, name: 'Org Search Results Grid' },
      { id: 0, name: 'Org Form' },
      { id: 0, name: 'Org Issues/Questions' },
        { id: 0, name: 'Mailing List Search Form' },
    { id: 0, name: 'Mailing List Search Results' },
  
      { id: 0, name: 'Catalog Search Form' },
      { id: 0, name: 'Catalog Search Results Grid' },
      { id: 0, name: 'Catalog Form' },
      { id: 0, name: 'Catalog Issues/Questions' },
      { id: 0, name: 'Conversion Issues/Questions' },
      { id: 0, name: 'Global Issues/Questions' },
      { id: 0, name: 'Other Issues/Questions' },
    ];

    return types
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