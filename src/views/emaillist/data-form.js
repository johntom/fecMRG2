// import { api } from '../Utils/api'
// // import $ from 'jquery';
// import moment from 'moment';
// import { inject } from 'aurelia-dependency-injection';
// import { AppRouter } from 'aurelia-router';
// // import { ListViewModel } from '../list-view-model';
// import { activationStrategy } from 'aurelia-router';
// @inject(AppRouter)
// // export class kendoPTJQ2GROUP {
// export class Gymdooor extends ListViewModel {
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
// import { Promptcontact } from './prompt';
// import { Promptorg } from '../prompt/promptOrg';
import { computedFrom } from 'aurelia-framework';
// @inject(Router, ApiService, ApplicationService, MyDataService, DialogService)


// need after attached plugin

@inject( ApiService, ApplicationService)
export class DataForm {
  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }
 constructor(api, appService) {
    this.api = api;
    this.inv = '';
    this.appService = appService;
  }
  // afterAttached() {
  //   //alert ('this.ss1 '+this.ss1+this.ss2)
  //   var selectedOrders = [];
  //   var idField = "id";
  //   this.startDatePicker = new Date(this.ss1)
  //   this.endDatePicker = new Date(this.ss2)
  //   // this.endDatePicker = new Date('5-5-2016')
  //   // this.changeData()
  //   jQuery(this.grid).kendoGrid({

       datasource = new kendo.data.DataSource({
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
          // read: "http://parktowergroupmanagement.com:9002/api/v1/gym/getAll/" + this.ss1 + "/" + this.ss2
          //    this.appService.orgsList = values[2]; // merge of org and contact
          read:'https://artbased.com/api/v1/orgs'
          // read: (options) => {
          //   //  this.loadData(this.capColor, this.prevtown)
          //   this.loadData()
          //     .then((contacts) => {
          //       // console.log('   scans ', scans[0])
          //       options.success(contacts)

          //     })

          // },
          ///

          // <ak-col k-title="FirstName" k-width="180px" k-field="FirstName"></ak-col>
          // <ak-col k-title="Title Desc" k-width="180px" k-field="TitleDesc"></ak-col>
          // <ak-col k-title="Deceased" k-width="180px" k-field="deceased"></ak-col>
          // <ak-col k-title="Bus/Individ" k-width="180px" k-field="BusIndivid"></ak-col>
          // <ak-col k-title="Org" k-width="220px" k-template="#= (typeof org == 'undefined' || org == null) ? '' : org.OrgName #"></ak-col>


          ///
        },
        sort: [{
          field: 'LastName',
          dir: 'asc'
        }, {
          field: 'FirstName',
          dir: 'asc'
        }],
        group: {
          field: "CYM",

        },
        schema: {
          model: {
            id: "id",
            fields: {
              LastName: {
                type: "string"
              },
              FirstName: {
                type: "string"
              },
              // MessageLocalDateTime: {
              //   type: "date"
              // },

              TitleDesc: {
                type: "string"
              },
              BusIndivid: {
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
      selectable: "multiple",
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
          field: "LastName",
          filterable: true,
          width: 220
        },
        {
          field: "FirstName",

          title: "FirstName",
          filterable: true,
          width: 200
        },


        {
          field: "TitleDesc",
          title: "TitleDesc",
          filterable: true,
          width: 180
        },

        {
          field: "BusIndivid",
          title: "BusIndivid",
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
  // }

  // pageable = {
  //   refresh: true,
  //   pageSizes: true,
  //   buttonCount: 10
  // }
  // startDatePicker = new Date('1-1-2019');
  // endDatePicker = new Date();
  // constructor(router) {
  //   super('gymdoor', router);
  //   this.statusText = 'turn box off'
  //   this.ss1;
  //   this.ss2;
  // }
  async loadData() {
    console.log('this.loadData ')
     let contacts =this.appService.orgsList
     return contacts
    // let inv;
    //  this.appService.orgsList = values[2]; // merge of org and contact
    // let response = await this.api.findCatalog(this.queryParams);
    // return response.data
    // console.log('this.repos ', this.api.catalogList)
   // return this.appService.orgsList
  }

  

  startChange() {
   
  }

  endChange() {
 
  }
  clearData() {

  }
 

  async activate(params, routeConfig) {
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      console.log('this.recordId ', this.recordId);
      let response = await this.api.findCatalogone(this.recordId);
      this.currentItem = response.data[0]
      // this.appService.currentCatalogItem = this.currentItem;
      //  this.dataSource.read();
          // this. afterAttached()
     return this.currentItem
    
    }
  }
  // async activate(params, queryString, routeConfig) {
  //    let response = await this.api.findCatalogone(this.recordId);
  //     this.currentItem = response.data[0]
  //     this.appService.currentCatalogItem = this.currentItem;

  // }


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
// loadCSV(image) {
  //   let formData = new FormData()
  //   let newDate = moment().format('YYYY-MM-DD')
  //   let flag = false
  //   console.log('uploadCSV filename ', image[0].name)
  //   formData.append('file', image[0]);


  //   // api.uploadfile(formData)
  //   //   .then((jsonRes) => {
  //   //     this.upmess = jsonRes.data 
  //   //     console.log(' this.upmess ', this.upmess)
  //   //       $("#file").val("");
  //   //   })
  // }

  // addDocs(images) {
  //   //images is file
  //   let docs = []

  //   let formData = new FormData()
  //   let newDate = moment().format('YYYY-MM-DD')
  //   let flag = false
  //   formData.append('file', images[0]);
  //   console.log('formData ', formData)

  //   api.uploadfile(formData)
  //     .then((jsonRes) => {
  //       this.upmess = jsonRes //.data.message

  //       $("#file").val("");
  //     })
  //   //})
  // }
  // checkData(images, formData, docs) {
  //   let promises = []
  //   // return new Promise((resolve, reject) => {
  //   let i = 0;

  //   let imagelen = images.length
  //   for (i = 0; i < images.length; i++) {
  //     let ext = images[i].name.split('.').pop();
  //     let fname = images[i].name
  //     console.log('fname ', fname)
  //     let mid = -100 // not needed
  //     let ival = i
  //     console.log('ival ', ival)

  //     mid = docs.findIndex(x => x.FILE_NAME === fname)
  //     console.log('mid ', mid)

  //     if (mid > -1) {
  //       // if we find file in array pass all values so we can evaluate later
  //       let obj = {
  //         name: fname,
  //         val: ival,
  //         ext: ext
  //       }
  //       var promise = this.promiseDialog(obj)
  //       promises.push(promise);
  //     } else {
  //       var item = {
  //         FILE_NAME: fname,
  //         FILE_EXT: '.' + ext,
  //         OVERWRITE: 'N'
  //       }
  //       console.log('item ', item)

  //       // docs.unshift(item)
  //       // this.docs = docs
  //       // this.currentRecord.docs = docs
  //       return formData.append('file', images[ival]);
  //     }
  //   }
  //   // })
  // }
