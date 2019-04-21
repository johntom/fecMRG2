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
  message = 'todo!';
  staffTemplate = '${assignto ? assignto.StaffName : ""}';
  
  categoryTemplate = '${Category.CategoryName}';
  status = [
    'high',
    'medium',
    'low',
    'discuss'

  ]

  statusresults = [
    'new',
    'in queue',
    'in process',
    'next release',
    'ready for testing',
    'needs revisiting',
    'completed',
    'out of scope'
  ]
  // srTemplate = '${Category.name}';
//  srTemplate = '${statusresults ? statusresults.name : ""}';
 srTemplate = '${statusresults ? statusresults : ""}';
statusTemplate= '${status ? status : ""}';
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
      }
    },
		  // edit: function (e) {
      //           $(e.container).parent().css({
      //               width: '500px',
      //               height: '500px'
      //           });
      //       },
			//  options : {editable:{
      //       mode: "popup",
      //       window: {
      //           width: '800px'
      //       },
      //      // template: kendo.template('<div class="k-edit-label"><label for="ProductName">ProductName</label></div><div class="k-edit-field"><select value.bind="ProductName &amp; notify" class="au-target" au-target-id="39"><option value="Chai">Chaix</option><option value="Chai2">Chaixx</option></select></div>')
      //     },
			//  },
			//  editable: {
      //                     mode: "popup",
      //                     window: {
      //                         title: "My Custom Title",
      //                         animation: false,
      //                         width: "800px",
      //                         height: "300px",
      //                     },
//  },
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
          Category: { defaultValue: { CategoryID: 1, CategoryName: 'Beverages' } },
          assignto: { defaultValue: { staffid: 100, StaffName: 'Dittemer, Jennifer' } },
          // statusresults: { defaultValue:  {name:'in process'}  },
            statusresults: { defaultValue:  'in process'  },
           status  : { defaultValue:  'high'  },
      


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


    updateData(e) {
        console.log('updateData ', e)
       

        return this.api.updatetodo(e)//, this.todo)
            .then((jsonRes) => {
                console.log('this.scans ', jsonRes)
                return jsonRes
            })
    }

  // async staffDropDownEditor(container, options) {
  //       $('<input required data-text-field="StaffName" data-value-field="staffid" data-bind="value:' + options.field + '"/>')
  //           .appendTo(container)
  //           .kendoDropDownList({
  //               autoBind: false,
  //               type: 'json',
  //               dataSource: {
  //                   transport: {
  //                       read: "https://backend.brmflow.com/api/v1/staff/find/"
  //                   }
  //               }
  //           });
  //   }
  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 

    //let queryParams = this.utilService.parseQueryString();
    //let queryParams2 = this.utilService.generateQueryString(queryParams);


    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()
  }
  //   <ak-col k-field="assignto" k-title="assignto" k-width="180px" k-editor.bind="staffDropDownEditor"
  //  k-filterable.bind="false" k-groupable.bind="false" k-template.bind="staffTemplate"></ak-col>

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
  statusDropDownEditor(container, options) {
    // $('<input required data-text-field="status" data-value-field="status" data-bind="value:' + options.field + '"/>')
   
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
                .then((inv) => {
                  console.log(' inv statusDropDownEditor ', inv[0]);
                  options.success(inv);
                });
            }
          }
        }
      })
  }
 
  statusresultsDropDownEditor(container, options) {
    console.log(options)
    // $('<input required data-text-field="name" data-value-field="name" data-bind="value:' + options.field + '"/>')
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
                .then((inv) => {
                  console.log(' inv statusresultsDropDownEditor ', inv[0]);
                  options.success(inv);
                });
            }
          } 
        } 
      })
 
  }

 company_memoEditor(container, options) {
                   $('<textarea name="' + options.field + '" cols="50"  rows="4" required/>').appendTo(container);
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

  // onEdit(e) {
  //         let grid = e.sender;
  //         var targetRow = $(e.container);
  //         grid.select(targetRow)
  //     }

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
    status = [
      'high',
      'medium',
      'low',
      'discuss'
    ]
    return status
  }

  async loadData3() {
    let statusresults = [ 'new',
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
  // async loadData3x() {
  //   let statusresults = [
      
  //     {'name':'new'},

  //    {'name':'in queue'},
  //    {'name': 'in process'},
  //    {'name': 'next release'},
  //    {'name': 'ready for testing'},
  //    {'name': 'needs revisiting'},
  //    {'name': 'completed'},
  //    {'name': 'out of scope'}
  //   ]
  //   return statusresults
  // }
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