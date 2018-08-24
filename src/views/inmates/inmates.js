import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { bindable } from 'aurelia-framework';
// @inject(HttpClient, Router, ApplicationService, ApiService)
@inject(Router, ApplicationService, ApiService)
export class Inmates {
  @bindable searchdoc
  heading = 'BC Inmates';
  inmates = [];

  // constructor(http, router, appService,api) {
  //   //console.log('in c')
  //   http.configure(config => {
  //     config
  //       .useStandardConfiguration()
  //       .withBaseUrl('https://gtztest.com/api/')//https://jif.bergenrisk.com/api/')

  //   });
  //   // https://jif.bergenrisk.com/api/v1/inmate
  //   this.http = http;
  //   this.router = router;
  //   this.appService = appService;
  //   this.api = api;
  // }

  // activate() {
  //   console.log('in c')
  //   return this.http.fetch('v1/inmate')// /1')// users')
  //     .then(response => response.json())
  //     .then(inmates => this.inmates = inmates.data);
  //   console.log('inmates ', this.inmates)
  // }
  ///////////
  //metainmates = ['inmate.lastname', 'inmate.firstname', 'inmate.ss']
  metainmates = ['lastname', 'firstname', 'ss']

  constructor(router, appService, api) {
    this.router = router;
    this.appService = appService;
    this.api = api;

  }
  //  return this.api.findclaimOne(this.recordId).then((jsonRes) => {
  //         // console.log('jsonRes ', jsonRes);
  //         let claim = jsonRes.data
  searchdocChanged(value) {
    if (value === "") { this.inmates = this.allinmates } else
      // this.inmates = this.inmates.filter((item) => {
      //   //if (item.inmate['lastname'].toLowerCase().search(value.toLowerCase()) != -1) return true
      //   if (item.inmate['lastname'].toLowerCase().search(value.toLowerCase()) != -1) return true

      // }); 
      // this.inmates = this.inmates.filter((item) => {
      //   //if (item.inmate['lastname'].toLowerCase().search(value.toLowerCase()) != -1) return true
      //   if ((item.inmate.lastname).toLowerCase().search(value.toLowerCase()) != -1) return true
      // }); 
      //  this.inmates = arr.find(o => o.name === 'string 1');
      this.inmates = this.inmates.filter((item) => {
        for (let i in this.metainmates) {
          let md = this.metainmates[i]
          if (item.inmate[md] !== undefined) {
            // if (item[md].toLowerCase().search(value.toLowerCase()) != -1) return true
            if ((item.inmate[md]).toLowerCase().search(value.toLowerCase()) != -1) return true
          }
        }
      });
    return
  }
  activate() {
    console.log('in activate')

    return this.api.getInmates()
      .then(jsonRes => {
        this.inmates = jsonRes.data
        this.allinmates = jsonRes.data
        console.log('inmates ', this.inmates)
      });
  }



  openrecord(row) {

    console.log('row', row);
    let rt2
    if (row === 'create') {
      //let newrec = {inmate:{lastname: ""},booking: []}
      //this.appService.currentRecord ={}//newrec
      rt2 = `#/inmates/create`
    } else {
      rt2 = `#/inmates/${row.id}`
      this.appService.currentRecord = row;
    }

    this.router.navigate(rt2);
  }


}
