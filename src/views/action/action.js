import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import 'bootstrap-select/css/bootstrap-select.min.css';
import { bindable, inject } from 'aurelia-framework';
// @inject()
export class Action {
    @bindable picker;
  static inject = [Router, UtilService, ApplicationService, MyDataService];

  heading = 'Welcome to the Action page';
  counter = 1;
  search = {}
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3',
    actionsBox: true
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

  getStates(filter, limit) {
    let filterlc = filter.toLowerCase()
    let states
    let Promise = this.dataService.loadStates()
      .then(response => {
        states = response
        console.log('states', states)
        return states //response // .json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

    return Promise
  }

  //  if (this.search) {
  //       if (keywd !== 'undefined' && keywd !=='null' ) this.search.keywords = `${this.Description.Description}`
  //        if (savedlist !== 'undefined' && savedlist !=='null' ) this.search.savedlists = `${this.name.name}`

  //       if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
  //       if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
  //       if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`

  //       let qs = this.utilService.generateQueryString(this.search);
  //       console.log('this.search ', this.search)
  //       let counter = this.utilService.counter++
  //       let path = `Search${counter}${qs}`;
  performSearch() {
    let savedlist = `${this.name}`
        if ( savedlist === 'undefined' || savedlist === undefined ) {
         alert('Please make a selection')
    } else
    if (this.search ) {
      if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`
      let qs = this.utilService.generateQueryString(this.search);
      let counter = this.utilService.counter++
     // let path = `ActSearch${counter}${qs}`;
      let path = `list${counter}${qs}`;
     // let path = `list:${qs}`;// name on tab
     // console.log('this.search  path ', this.search, path)
       this.appService.currentActionlist =this.search.savedlists 
      // let path = `SL:${this.search.savedlists}`;
      this.router.navigate(`#/action/${path}`);
      this.appService.currentSearch = path //`Search${counter}`
    } else alert('Please make a selection')
  }

  performClear() {
    this.search = {}
  }
  attached() {

  }



}

