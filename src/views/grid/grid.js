import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// // import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import { UtilService } from '../../services/util-service';
// // import moment from 'moment';
// import { ApplicationService } from '../../services/application-service';
// import { MyDataService } from "../../services/my-data-service";
// @inject(ApiService, ApplicationService, MyDataService)

// @inject(Router, ApiService, UtilService, ApplicationService, MyDataService)

@inject(ApiService)

export class Grid {
  pageable = {
    refresh: true,
    pageSizes: true,
    buttonCount: 10
  };
  heading = 'Service-Invoice...';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((inmates) => {
            console.log(' inv datasource ', inmates,inmates.length);// inv[0]);
            options.success(inmates);
          });
      },

    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          //   // LegacyID: { type: "number" }, // scan template
          //   Artist: { type: "string" }, // barcode insured
          DOB: {
            type: "date"
          },
          bookingDate: {
            type: "date" 
          },
          sentencingDate: {
            type: "date"
          },
          serviceDateFrom: {
            type: "date"
          },
          serviceDateTo: {
            type: "date"
          },
           serviceDays: {
            type: "number"
          },
          approvedDate: {
            type: "date"
          },
          invDate: {
            type: "date"
          },
          treatmentDateFrom: {
            type: "date"
          },
          treatmentDateTo: {
            type: "date"
          },
          
          
          payee: {
                type: "string"
              },
			   repricedAmt: {
                type: "number"
              },
savings: {
                type: "number"
              },
        }
      }
    },
    pageSize: 12,
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })
  constructor(api) {
    // this.datasource = {
    //   type: 'odata',
    //   transport: {
    //     read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers'
    //   },
    //   pageSize: 5
    // };
    this.api = api


  }


  activate() {
    console.log('in activate')
    // this.datasource = new kendo.data.DataSource({
    //   transport: {
    //     read: (options) => {
    //       //  this.loadData(this.capColor, this.prevtown)
    //       this.loadData()
    //         .then((inmates) => {
    //           console.log(' inv datasource ', inmates.length);// inv[0]);
    //           options.success(inmates);
    //         });
    //     },

    //   },
    //   schema: {
    //     model: {
    //       id: "id", // Must assign id for update to work
    //       // fields: {
    //       //   // LegacyID: { type: "number" }, // scan template
    //       //   Artist: { type: "string" }, // barcode insured
    //       // }
    //     }
    //   },
    //   pageSize: 12,
    //   // aggregate: [{ field: "type", aggregate: "count" },
    //   //   { field: "template", aggregate: "count" }
    //   // ]
    // })
    // // return this.api.getInmates()
    // //   .then(jsonRes => {
    // //     this.inmates = jsonRes.data
    // //     this.allinmates = jsonRes.data
    // //     console.log('inmates ', this.inmates)
    // //   });
  }

  loadData() {
    console.log('this.loadData ')
    //  return Promise.all([
    //     this.dataService.loadSearch(this.queryParams)
    //   ]).then(values => {
    //     this.origItems = values[0];
    //     // this.appService.searchDataLoaded = true;
    //     claim = this.origItems;
    //     // console.log(' this.loadSearch', this.origItems)
    //     console.log('claim ', claim.length)
    //     return claim
    //     //bad   this.currentItem = this.items.find(f => f.id == params.id);
    //   }).catch(error => {
    //     console.error("Error encountered while trying to get data.", error);
    //   });
    //     this.api.getInmates()
    //       .then(jsonRes => {
    //         this.inmates = jsonRes.data

    //         this.allinmates = jsonRes.data
    //         console.log('inmates ', this.inmates)
    // return Promise.resolve(this.inmates);
    //       });
    let claim;
    return Promise.all([
      this.api.getInmatesExpanded()

    ]).then(values => {
      this.inmates = values[0].data;
      // this.appService.searchDataLoaded = true;
      claim = this.inmates;
      // console.log(' this.loadSearch', this.origItems)
      console.log('claim ', claim.length)
      return claim
      //bad   this.currentItem = this.items.find(f => f.id == params.id);
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
}


