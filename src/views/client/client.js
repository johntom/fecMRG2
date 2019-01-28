import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";





export class Client {
  static inject = [Router, UtilService, ApplicationService, MyDataService];

  heading = 'Welcome to the Client page';
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
    this.page = '#/client'
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
    // NUT USED
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
    // let keywd = `${this.Description}`
    // let medsupport = `${this.DescriptionMS}`
    // let currentlocation = `${this.DescriptionLoc}`

    // alert(keywd)
    if (this.search) {
      // if (keywd !== 'undefined') this.search.keywords = `${this.Description.Description}`
      // if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      // if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`

      let qs = this.utilService.generateQueryString(this.search);
      console.log('this.search ', this.search)
      let counter = this.utilService.counter++
      let path = `Search${counter}${qs}`;
      this.router.navigate(`#/client/${path}`);
      this.appService.currentSearch = path //`Search${counter}`
    }
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
    // set typahead value for state
    // this.name = {
    //   name: 'New York',
    //   value: 'NY'
    // }
    // this.dow.value = this.name

  }

}