import { api } from '../Utils/api'
import $ from 'jquery';
import moment from 'moment';
import { inject } from 'aurelia-dependency-injection';
// import {kendoUi} from 'kendo-ui';
import { AppRouter } from 'aurelia-router';
import { ListViewModel } from '../list-view-model';
import { activationStrategy } from 'aurelia-router';
@inject(AppRouter)
// export class kendoPTJQ2GROUP {
export class Gymdooor extends ListViewModel {
  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  afterAttached() {
    //alert ('this.ss1 '+this.ss1+this.ss2)
    var selectedOrders = [];
    var idField = "id";
    this.startDatePicker = new Date(this.ss1)
    this.endDatePicker = new Date(this.ss2)
    // this.endDatePicker = new Date('5-5-2016')
    // this.changeData()
    jQuery(this.grid).kendoGrid({
       toolbar: ["excel"],
      // toolbar: ["excel", "pdf"],
      excel: {
        fileName: "Kendo UI Grid Export.xlsx",
        proxyURL: "//demos.telerik.com/kendo-ui/service/export",
        filterable: true,
        allPages: true
      },
   
    pdf: {
      allPages: true,
      avoidLinks: true,
      paperSize: "A4",
      margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
      landscape: true,
      repeatHeaders: true,
      template: $("#page-template").html(),
      scale: 0.8
    },

     
      dataSource: {
        type: "json",
        transport: {
          //  type: "json",
          read: "http://parktowergroupmanagement.com:9002/api/v1/gym/getAll/" + this.ss1 + "/" + this.ss2
          // read: "http://localhost:9002/api/v1/gym/getAll/" + this.ss1 + "/" + this.ss2

        },
        sort: [{
          field: 'AccessDate',
          dir: 'asc'
        }, {
          field: 'AccessTime',
          dir: 'asc'
        }],
        group: {
          field: "CYM",
          aggregates: [

            {
              field: "CYM",
              aggregate: "count"
            },
            {
              field: "Total",
              aggregate: "sum"
            }
          ]
        },
        schema: {
          model: {
            id: "id",
            fields: {
              Tenant: {
                type: "string"
              },
              Name: {
                type: "string"
              },
              MessageLocalDateTime: {
                type: "date"
              },
              // SecondaryObjectName: {
              //   type: "string"
              // },
              CYM: {
                type: "string"
              },
              CDATE: {
                type: "string"
              },
              CTIME: {
                type: "string"
              },
              DAY: {
                type: "string"
              },
              AccessDate: {
                type: "string"
              },
              AccessHour: {
                type: "string"
              },
            }
          }
        },
        pageSize: 20,
        aggregate: [{ field: "CYM", aggregate: "count" },
        { field: "Total", aggregate: "sum" }]
      },
      groupable: true,
      // sortable: true,
      sortable: {
        mode: "multiple",
        allowUnsort: true
      },
      selectable:"multiple", 
      scrollable: false,
      pageable: true,
      reorderable: true,
      resizable: true,
      columnMenu: true,
      filterable: {
        mode: "row"
      },
      columns: [
       
        {
          field: "Tenant",
          filterable: true,
          width: 220
        },
        {
          field: "Name",
          
          title: "Member",
          filterable: true,
          width: 200
        },
     

        {
          field: "CYM",
          headerAttributes: {
            style: "text-align:right"
          },
          attributes: {
            "class": "weekend",
            style: "text-align: right; font-size: 14px"
          },
          title: "YearMonth",
          type: "number",
          format: "{0:0}",
          filterable: true,
          width: 90,

          aggregates: ["count"],
          footerTemplate: "<div style='float: right'>Grant Total:#= kendo.toString(count, '0') # </div>",
          groupFooterTemplate: "<div style='float: right'>Mothly Total:#= kendo.toString(count, '0') #</div>"
                },

        {
          field: "AccessDate",
          title: "Date",
          filterable: false,
          width: 60
        },
        //moment().format('ww')        { field: "CDATE",title: "Date",  filterable: false ,width:130},
        {
          field: "AccessDay", //DAY",
          title: "Day",
          filterable: true,
          width: 60
        },
        {
          field: "AccessHour", //CTIME",
          title: "Time",
          filterable: false,
          width: 160
        },
        {
          field: "zone",
          title: "Zone",
          filterable: true,
          width: 180
        },

        {
          field: "AccessTime", 
          title: "SortTime",
          filterable: false,
          width: 230
        },

      ],
      change: function (e, args) {
        var grid = e.sender;
        var items = grid.items();
        items.each(function (idx, row) {
            var idValue = grid.dataItem(row).get(idField);
            if (row.className.indexOf("k-state-selected") >= 0) {
                selectedOrders[idValue] = true;
            } else if (selectedOrders[idValue]) {
                delete selectedOrders[idValue];
            }
        });
      },
      dataBound: function (e) {
        var grid = e.sender;
        var items = grid.items();
        var itemsToSelect = [];
        items.each(function (idx, row) {
          var dataItem = grid.dataItem(row);
          if (selectedOrders[dataItem[idField]]) {
            itemsToSelect.push(row);
          }
        });

        e.sender.select(itemsToSelect);
      }
    });
  }

  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  }
  startDatePicker = new Date('1-1-2019');
  endDatePicker = new Date();
  constructor(router) {
    super('gymdoor', router);
    this.statusText = 'turn box off'
    this.ss1;
    this.ss2;
  }
  
  processCSV() {
    api.processCSV()
      .then((jsonRes) => {
        this.upmess = jsonRes.data //.message
        console.log('this.upmess ', this.upmess)

      })
  }
  loadCSV(image) {
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    console.log('uploadCSV filename ', image[0].name)
    formData.append('file', image[0]);

    // api.uploadfile(formData)
    //   .then((jsonRes) => {
    //     this.upmess = jsonRes //.data.message

    //     $("#file").val("");
    //     api.convert().then((jsonRes) => {
    //              this.upmess =  this.upmess +jsonRes.data.message
    //            })
    //   })
    api.uploadfile(formData)
      .then((jsonRes) => {
        this.upmess = jsonRes.data 
        console.log(' this.upmess ', this.upmess)
          $("#file").val("");
      })
  }

  addDocs(images) {
    //images is file
    let docs = []

    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    formData.append('file', images[0]);
    console.log('formData ', formData)

    api.uploadfile(formData)
      .then((jsonRes) => {
        this.upmess = jsonRes //.data.message

        $("#file").val("");
      })
    //})
  }
  checkData(images, formData, docs) {
    let promises = []
    // return new Promise((resolve, reject) => {
    let i = 0;
    // let docs = this.currentRecord.docs
    //  if (docs === undefined) docs = []
    let imagelen = images.length
    for (i = 0; i < images.length; i++) {
      let ext = images[i].name.split('.').pop();
      let fname = images[i].name
      console.log('fname ', fname)
      let mid = -100 // not needed
      let ival = i
      console.log('ival ', ival)

      mid = docs.findIndex(x => x.FILE_NAME === fname)
      console.log('mid ', mid)

      if (mid > -1) {
        // if we find file in array pass all values so we can evaluate later
        let obj = {
          name: fname,
          val: ival,
          ext: ext
        }
        var promise = this.promiseDialog(obj)
        promises.push(promise);
      } else {
        var item = {
          FILE_NAME: fname,
          FILE_EXT: '.' + ext,
          OVERWRITE: 'N'
        }
        console.log('item ', item)

        // docs.unshift(item)
        // this.docs = docs
        // this.currentRecord.docs = docs
        return formData.append('file', images[ival]);
      }
    }
    // })
  }


  startChange() {
    // http://stackoverflow.com/questions/18399805/reloading-refreshing-kendo-grid
    //   let startDate = this.startDatePicker.value();
    //  // let endDate = this.endDatePicker.value();
    //   if (startDate) {
    //     // startDate = new Date(startDate);
    //     // startDate.setDate(startDate.getDate());
    //     // this.endDatePicker.min(startDate);
    //   let endDate = moment(this.endDatePicker).format('MM-DD-YYYY')
    //   let startDate = moment(this.startDatePicker).format('MM-DD-YYYY') 
    //   } else if (endDate) {
    //     this.startDatePicker.max(new Date(endDate));
    //   } else {
    //     endDate = new Date();
    //     this.startDatePicker.max(endDate);
    //     this.endDatePicker.min(endDate);
    //   }
  }

  endChange() {
    // let endDate = moment(this.endDatePicker).format('MM-DD-YYYY')
    // let startDate = moment(this.startDatePicker).format('MM-DD-YYYY')
    // if (endDate) {
    //   endDate = new Date(endDate);
    //   endDate.setDate(endDate.getDate());
    //   this.startDatePicker.max(endDate);
    // } else if (startDate) {
    //   this.endDatePicker.min(new Date(startDate));
    // } else {
    //   endDate = new Date();
    //   this.startDatePicker.max(endDate);
    //   this.endDatePicker.min(endDate);
    // }
  }
  clearData() {
   
  }


  activate(params, queryString, routeConfig) {
     let d1 = params.d1
      if (d1 === undefined) {
      this.ss1 = '1-1-2019'//2-1-2018'
      this.ss2 = new Date() //'10-10-2016'//new Date() //this.endDatePicker//'2-1-2016'

    } else {
      this.ss1 = params.d1
      this.ss2 = params.d2

    }


  }

  changeData() {

    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    let rt = 'gymdoor'
    console.log('this.route ', this.route)
    this.router.navigate(rt + '/1' + '?d1=' + s1 + '&d2=' + s2);
  }
  loadData() {
    let s1 = moment(this.startDatePicker).format('MM-DD-YYYY')
    let s2 = moment(this.endDatePicker).format('MM-DD-YYYY')
    api.getGYM(s1, s2)
      .then((jsonRes) => {
        let gymdoor = jsonRes
        return gymdoor
      })
  }


  //  attached() {

  //     jQuery(this.grid).kendoGrid({
  //       toolbar: ["excel"],
  //       excel: {
  //         fileName: "Kendo UI Grid Export.xlsx",
  //         proxyURL: "//demos.telerik.com/kendo-ui/service/export",
  //         filterable: true,
  //         allPages: true
  //       },

  //         excelExport:
  //       function(e) {
  //         var rows = e.workbook.sheets[0].rows;

  //         for (var ri = 0; ri < rows.length; ri++) {
  //           var row = rows[ri];

  //           if (row.type == "group-footer" || row.type == "footer") {
  //             for (var ci = 0; ci < row.cells.length; ci++) {
  //               var cell = row.cells[ci];
  //               if (cell.value) {
  //                 // Use jQuery.fn.text to remove the HTML and get only the text
  //                  // must have a div or it blows
  //                  cell.value = $(cell.value).text();
  //                 // cell.value = cell.value;
  //                 // Set the alignment
  //                 cell.hAlign = "right";
  //               }
  //             }
  //           }
  //         }
  //       },
  //       dataSource: {
  //          type: "json",
  //         transport: {
  //         //  type: "json",
  //         read: "http://localhost:8080/api/v1/two/getAll/" + this.ss1 + "/" + this.ss2
  //           // read: this.loadData()// bad
  //           //  data: this.loadData()//bad
  //         },
  //         // data: this.loadData(),//bad
  //         group: {
  //           field: "TenantCategory_TenantCategory", aggregates: [

  //             { field: "TenantCategory_Desc", aggregate: "count" },
  //             { field: "Total", aggregate: "sum" }
  //           ]
  //         },

  //         schema: {
  //           model: {
  //             fields: {
  //               CompanyName: { type: "string" },
  //               CYM: { type: "string" },
  //               CDATE: { type: "string" },
  //               TenantCategory_TenantCategory: { type: "string" },
  //               TenantCategory_Desc: { type: "string" },
  //               Comments: { type: "string" },
  //               Total: { type: "number" },
  //               TenantCategory_Amt: { type: "number" }
  //             }
  //           }
  //         },
  //         pageSize: 12,

  //         aggregate: [{ field: "TenantCategory_Desc", aggregate: "count" },
  //           { field: "Total", aggregate: "sum" }]
  //       },
  //       groupable: true,
  //       sortable: true,
  //       scrollable: false,
  //       pageable: true,
  //       columns: [

  //         // { field: "TenantCategory_Desc", title: "TenantCategory_Desc", aggregates: ["count"], footerTemplate: "Total Count: #=count#", groupFooterTemplate: "Count: #=count#" },

  //          { field: "TenantCategory_Desc", 
  //          headerAttributes:{ style:"text-align:right"},
  //          attributes:{ class:"text-right" } ,
  //          title: "TenantCategory_Desc",  type: "number", format: "{0:0}", aggregates: ["count"],
  //          footerTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>", groupFooterTemplate: "<div style='float: right'>#= kendo.toString(count, '0') #</div>" },


  //    { field: "Total", 
  //          headerAttributes:{ style:"text-align:right"},
  //          attributes:{ class:"text-right" } ,
  //          title: "Total",  type: "number", format: "{0:c2}", aggregates: ["sum"],
  //          footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>", groupFooterTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>" },


  //         { field: "CompanyName", filterable: false },
  //         { field: "CYM", title: "YearMonth", filterable: true },
  //         { field: "CDATE", filterable: false },
  //       ]
  //     });
  //   }
}

// footerTemplate: "<div style='float: right'>#= sum #</div>"

// footerTemplate: "<div style='text-align: right'>#= sum #</div>"

// footerTemplate: "<div style='float: right'>#= kendo.toString(sum, 'c2') #</div>"

//val | currencyFormat

export class CurrencyFormatValueConverter {
  toView(value) {
    return numeral(value).format('($0,0.00)');
  }

}
