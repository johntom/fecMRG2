import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

export class Inventory {
  static inject = [Router, UtilService, ApplicationService, MyDataService];

  heading = 'Welcome to the Inventory page';
  counter = 1;
  search = {}
  //   title: 0,
  //   invcode: 0
  // };
  /** <label repeat.for="product of products">
          <input type="radio" name="group1"
                 model.bind="product.id" checked.bind="selectedProductId">
          ${product.id} - ${product.name}
        </label> */
  // search.selectedSoldId search.selectedDateId search.startdate search.stopdate
  // value
  states = [
    { OrgName: 'Alabama', id: 'al' },
    { OrgName: 'Alaska', id: 'ak' },
    { OrgName: 'Arizona', id: 'az' },
    { OrgName: 'Arkansas', id: 'ak' },
    { OrgName: 'California', id: 'ca' },
    { OrgName: 'Colorado', id: 'co' },
    { OrgName: 'Connecticut', id: 'cn' }]
  stateListxx = [
    { name: 'Alabama', value: 'al' },
    { name: 'Alaska', value: 'ak' },
    { name: 'America Samoa', value: 'america samoa' },
    { name: 'Arizona', value: 'arizona' },
    { name: 'Arkansas', value: 'arkansas' },
    { name: 'California', value: 'california' },
    { name: 'Colorado', value: 'colorado' },
    { name: 'Connecticut', value: 'connecticut' },
    { name: 'New York', value: 'NY' }]
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
    this.page = '#/inventory'
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

  // CodeType:3
  // CodeTypeDesc:"Genre"
  // Description:"Machines, Industry"
  // ID:391
  // id:"59d282beb777d41f42a5a310"
  getKeywords(filter, limit) {
    // NUT USED use direct in html
    let filterlc = filter.toLowerCase()
    let keywords
    let Promise = this.dataService.loadKeywords()
      .then(response => {
        keywords = response
        console.log('keywords', keywords)
        return keywords
      })
      .then(keywords => filter.length > 0 ? keywords.filter(item => item.Description.toLowerCase().indexOf(filter.toLowerCase()) > -1) : keywords)
      .then(keywords => filter.length > 0 ? keywords.filter(item => item.Description.toLowerCase().indexOf(filterlc) > -1) : keywords)

    return Promise
  }
  performSearch() {
    let keywd = `${this.Description}`

//search.savedlists
  let savedlist = `${this.name}`

    let medsupport = `${this.DescriptionMS}`
    let currentlocation = `${this.DescriptionLoc}`
    let multikeys = `${this.multikeywords}`
    console.log('selectedSoldId',this.search.selectedSoldId)
    // alert(keywd)
    if (this.search) {
      if (keywd !== 'undefined' && keywd !=='null' ) this.search.keywords = `${this.Description.Description}`
       if (savedlist !== 'undefined' && savedlist !=='null' ) this.search.savedlists = `${this.name.name}`
     
      if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`

      let qs = this.utilService.generateQueryString(this.search);
      console.log('this.search ', this.search)
      let counter = this.utilService.counter++
      let path = `Search${counter}${qs}`;
      this.router.navigate(`#/inventory/${path}`);
      this.appService.currentSearch = path //`Search${counter}`
    }
  }


addinventory() {
alert ('add')
 this.router.navigate(`#/inventory/data/create`);
}

  genreSelected(item) {
    if (item) {
      console.log('genre Selected: ' + item.Description);
    } else {
      console.log('Month cleared');
    }
  }

  performClear() {
    this.search = {}
    //this.router.navigate(`#/inventory/`);
  }
  attached() {
    // this.stateList
    // set typahead value for state
    // console.log('sl', this.stateList)
    // // this.name = {
    // //   name: 'New York',
    // //   value: 'NY'
    // // }
    // this.oname = {
    //   oname: 'Alabama', id: 'al'
    // }
    // this.dow.value = this.oname


    // /////////////////////////////////////////
    // this.OrgName = {
    //   OrgName: this.states[1].OrgName,
    //   // value: orgobj._id
    //   // id: this.states[1].id
    //   value: this.states[1].id
    // }
    // this.dows.value = this.OrgName




  }

}