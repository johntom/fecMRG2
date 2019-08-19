
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

import { bindable, inject } from 'aurelia-framework';
// @inject()
@inject(Router, UtilService, ApplicationService, MyDataService)


export class Mailinglist {
  @bindable picker;
  // @bindable selectCamping;
  // @bindable selectCondiment;
  // @bindable selectStyledCondiment;
  // @bindable selectPicnic;

  heading = 'SELECT AN ACTION';
  counter = 1;
  search = {}
  mappingDataStructure = {
    class: 'class',

    option: 'name',
    // option: 'option',
    // subtext: 'subtext',
    style: 'style',
    title: 'title',
    tokens: 'tokens'
  }
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3',
    actionsBox: true
  };
  isEditing = false;
  isOptgroupBreadDisabled = false;
  selectMappingStructure = {
    subtext: 'company'
  };


  states = [
    { OrgName: 'Alabama', id: 'al' },
    { OrgName: 'Alaska', id: 'ak' },
    { OrgName: 'Arizona', id: 'az' },
    { OrgName: 'Arkansas', id: 'ak' },
    { OrgName: 'California', id: 'ca' },
    { OrgName: 'Colorado', id: 'co' },
    { OrgName: 'Connecticut', id: 'cn' }]

  stateList = [
    { oname: 'Alabama', id: 'al' },
    { oname: 'Alaska', id: 'ak' },
    { oname: 'America Samoa', id: 'america samoa' },
    { oname: 'Arizona', id: 'arizona' },
    { oname: 'Arkansas', id: 'arkansas' },
    { oname: 'California', id: 'california' },
    { oname: 'Colorado', id: 'colorado' },
    { oname: 'Connecticut', id: 'connecticut' },
    { oname: 'New York', id: 'NY' }]
  monthsOfTheYear = [
    { name: 'January', short: 'Jan', number: 1 },
    { name: 'February', short: 'Feb', number: 2 },
    { name: 'March', short: 'Mar', number: 3 },
    { name: 'April', short: 'Apr', number: 4 },
    { name: 'May', short: 'May', number: 5 },
    { name: 'June', short: 'Jun', number: 6 },
    { name: 'July', short: 'Jul', number: 7 },
    { name: 'August', short: 'Aug', number: 8 },
    { name: 'September', short: 'Sep', number: 9 },
    { name: 'October', short: 'Oct', number: 10 },
    { name: 'November', short: 'Nov', number: 11 },
    { name: 'December', short: 'Dec', number: 12 }
  ];
  searchdates = [
    { id: 0, name: 'DateAdded' },
    { id: 1, name: 'DateModified' },
    { id: 2, name: 'SoldDate' },
  ];
  searchsold = [
    { id: 0, name: 'Y' },
    { id: 1, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];

  constructor(router, utilService, appService, dataService) {
    this.router = router;
    this.utilService = utilService;
    this.appService = appService;
    // this.page = '#/action'
    // this.search.inventorycode = 'PORTERC008'
    this.dataService = dataService;
  }

  getStatesExample(filter, limit) {

    let promise = this.httpClient.fetch('data/states.json')
      .then(response => {
        return response.json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.state.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => limit ? states.splice(0, limit) : states);
    return promise;
    // return Promise.delay(500, promise);
  }

  // getStates(filter, limit) {
  //   let filterlc = filter.toLowerCase()
  //   let states
  //   let Promise = this.dataService.loadStates()
  //     .then(response => {
  //       states = response
  //       console.log('states', states)
  //       return states //response // .json();
  //     })
  //     .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
  //     .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

  //   return Promise
  // } 
  performSearchSL() {

    let mailinglist = this.myDatalist.value
    // let idx = this.appService.catalogList.findIndex(x => x.CatalogTitle === mailinglist)
    let idx = this.appService.catalogList.find(x => x.CatalogTitle === mailinglist)

    // let mid = sels.findIndex(x => x === dataItem.InventoryCode)
    if (idx === -1) {
      alert('Please make a selection')
    } else {

      if (mailinglist !== 'undefined' && mailinglist !== 'null') this.search.mailinglist = mailinglist
      if (this.search) {
        let qs = this.utilService.generateQueryString(this.search);
        //        let qs = this.utilService.generateQueryString(idx.id);
        console.log('this.search ', this.search)
        let counter = this.utilService.counter++
        // name as - at end its a singleton
        let path = `Mailinglist-${qs}`;
        //    let path = `Mailinglist-?mailinglist=${idx.id}`;
        // see authorize-step.js on how I make this a singleton with saving the result set
        this.appService.actionsearchresults = '';// reset 
        this.router.navigate(`#/mailinglist/${path}&tabname=mailinglist`);
        this.appService.currentSearch = path
      }

    }
  }

  performClear() {
    this.search = {}
  }
  attached() {
    // this.savedlists = this.appService.savedlists
  }

  // activate() {

  // }
  activate(params, routeConfig) {
    //   this.savedlists = this.appService.savedlists
    //   this.queryParams = this.utilService.parseQueryStringUrl();
    //   const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
    //  this.myDatalist.value ='Test List'
    //   this.performSearchSL()
    // const pairs = qs.split('&')
    // const queryParams = {}
    // let slname
    // let ct =0
    // pairs.forEach(p => {
    //   const kv = p.split('=')
    //   if (ct===0) slname = kv[1]
    //   ct++
    // });
    //1-27 this.item.savedlist = slname
    // or
    // this.item.savedlist = this.appService.currentActionlist

  }




}
