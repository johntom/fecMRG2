import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-dependency-injection';

import { WebAPI } from '../../web-api';
import { ContactUpdated, ContactViewed } from '../../messages';
@inject(Router, UtilService, ApplicationService, MyDataService, EventAggregator, WebAPI)

export class Inventory {
  // static inject = [Router, Router, ApplicationService, MyDataService, EventAggregator];

  heading = 'INVENTORY SEARCH '
  counter = 1;
  search = {}
  selectedValue = null;
  // options1 = [ { id: 1, name: 'one' }, { id: 2, name: 'two' } ];
  // findOption = value => this.options1.find(x => x.name === value);
  findOption = value => this.mru.find(x => x === value);
  options = [];//multiselect select2
  selected = [];//multiselect select2
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
    // { id: 0, name: 'DateAdded' },
    // { id: 1, name: 'DateModified' },
    { id: 2, name: 'SoldDate' },
  ];
  //   searchdates = [
  //   // { id: 0, name: 'Added' },
  //   // { id: 1, name: 'Modified' },
  //   { id: 2, name: 'Sold' },
  // ];
  // searchsold = [
  //   { id: 1, name: 'Y' },
  //   { id: 2, name: 'N' },
  //   { id: 3, name: 'NFS' },
  //   { id: 4, name: 'DON' },
  // ];

  searchsold = [
    { id: -1, name: 'Y' },

    { id: 0, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];

  altAKeyPressSubscription;

  constructor(router, utilService, appService, dataService, eventAggregator, api) {
    this.router = router;
    this.utilService = utilService;
    this.appService = appService;
    this.page = '#/inventory'
    // this.search.inventorycode = 'PORTERC008'
    this.dataService = dataService;
    this.eventAggregator = eventAggregator
    this.api = api;
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
        console.log('keywords', keywordfmrus)
        return keywords
      })
      .then(keywords => filter.length > 0 ? keywords.filter(item => item.Description.toLowerCase().indexOf(filter.toLowerCase()) > -1) : keywords)
      .then(keywords => filter.length > 0 ? keywords.filter(item => item.Description.toLowerCase().indexOf(filterlc) > -1) : keywords)

    return Promise
  }

  populateInv(e) {
    //10-17 this.search.inventorycode = e
    this.appService.onlyonce = 0
    //10-17  this.performSearch()
    //https://johntom.github.io/fecMRG2/#/inventory/data/PORTERC008
    //10-17   this.router.navigate(`#/inventory/data/${ this.search.inventorycode}`);
    this.router.navigate(`#/inventory/data/${e}`);//?fulledit=true`);
  }

  performSearchSL() {
    let savedlist = this.myDatalist.value //datalist
    if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = savedlist// `${this.name.name}`
    let qs = this.utilService.generateQueryString(this.search);
    console.log('this.search ', this.search)
    let counter = this.utilService.counter++
    let path = `Search${counter}${qs}`;
    this.router.navigate(`#/inventory/${path}`);
    this.appService.currentSearch = path
  }
  performSearch() {
    let keyword = `${this.keywordDescription}`//.Description}` //aubs-typeahead 

    //search.savedlists
    //let savedlist = `${this.name}`

    let medsupport = `${this.DescriptionMS}`
    let currentlocation = `${this.DescriptionLoc}`
    let multikeys = `${this.multikeywords}`
    let multilocs = `${this.multilocations}`
 let mrglocations = `${this.mrglocations}`

    // console.log('selectedSoldId', this.search.selectedSoldId)
    let sold = this.search.sold// `${this.search.sold}`
 
    let owndedby = this.search.OwnedBy
    console.log('sold', this.search.sold)
    let selecteddate = this.search.selectedDateId//+''
    console.log('selectedDateId', selecteddate) //sold', sold,sold)
    //  this.search.sold=`${this.search.sold}`
    //  // this.search.inventorycode='soldit'
    // alert(keywd)
    if (this.search) {
      // if (keywd !== 'undefined' && keywd !== 'null') this.search.keywords = `${this.Description.Description}`
      if (keyword !== 'undefined' && keyword !== 'null') this.search.keywords = `${this.keywordDescription.Description}`

      //  if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`

      if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`
      if (multilocs !== 'undefined') this.search.multilocations = `${this.multilocations}`
      if (mrglocations !== 'undefined') {
        this.search.mrglocations = `${this.mrglocations}`
      } else this.search.mrglocations = false;

      if (sold !== 'undefined') this.search.sold = sold
      if (selecteddate !== 'undefined') this.search.selectedDateId = selecteddate
      if (owndedby !== 'undefined') this.search.owndedby = owndedby //search.owndedby

      let qs = this.utilService.generateQueryString(this.search);
      if (qs === '?') {
        alert('Please enter search criteria')
      } else {
        console.log('this.search ', this.search)
        let counter = this.utilService.counter++

        // opens multiple search results forms
        //      let path = `searchInv${qs}&tabname=searchInv${this.utilService.counter++}`;
        // opens 1 search results forms // to create a singleton find if last char of keyHashroot='-'
        // add - at end before ${qs} its a singleton
        let path = `searchInv-${qs}&tabname=Invsearch`;
        // see authorize-step.js on how I make this a singleton with saving the result set
        this.appService.inventorysearchresults = '';// reset not clicking on tab
        // this.router.navigate(`#/action/${path}&tabname=actionlist`);
        let rt2
        if (this.appService.gridview === 1) {
          rt2 = `#/inventory/alt/${path}`
        } else rt2 = `#/inventory/${path}`
        this.router.navigate(rt2);

        this.appService.currentSearch = path //`Search${counter}`
      }
    }
  }


  addinventory() {
    // alert ('add')
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

  // /////////////////////////////////////////

  attached() {
    this.altAKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-a', this.addinventory.bind(this));
    this.altSKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-s', this.performSearch.bind(this));

    this.ndate = moment().format('YYYY-MM-DD')
    let provarray = [{ id: 1, sord: 3, id: 2, sord: 1, id: 3, sord: 2 }]
    this.testlodash = _.sortBy(provarray, 'sord');
    // let contact = {
    //   id: 99,
    //   firstName: 'John',
    //   lastName: 'Tomaselli',
    //   email: 'jrt@gtz.com',
    //   phoneNumber: '212-867-5309'
    // }
    // this.eventAggregator.publish(new ContactUpdated(contact));


  }
  detached() {
    this.altAKeyPressSubscription.dispose();
    this.altSKeyPressSubscription.dispose();
  }

  activate() {
    console.log('name-tag activate before attached ');
    this.mru = []
    let mruinfo, tabindex
    mruinfo = localStorage.getItem('mru-mrg');
    if (mruinfo === null) {
      this.mruinfo = 0
    } else {
      this.mruinfo = JSON.parse(mruinfo)

      if (this.mruinfo.mru1 !== undefined) {
        this.mru.push(this.mruinfo.mru1.InvCode)
      }

      if (this.mruinfo.mru2 !== undefined) {
        this.mru.push(this.mruinfo.mru2.InvCode)
      }

      if (this.mruinfo.mru3 !== undefined) {
        this.mru.push(this.mruinfo.mru3.InvCode)
      }

      if (this.mruinfo.mru4 !== undefined) {
        this.mru.push(this.mruinfo.mru4.InvCode)
      }

      if (this.mruinfo.mru5 !== undefined) {
        this.mru.push(this.mruinfo.mru5.InvCode)
      }

      if (this.mruinfo.mru6 !== undefined) {
        this.mru.push(this.mruinfo.mru6.InvCode)
      }

      if (this.mruinfo.mru7 !== undefined) {
        this.mru.push(this.mruinfo.mru7.InvCode)
      }

      if (this.mruinfo.mru8 !== undefined) {
        this.mru.push(this.mruinfo.mru8.InvCode)
      }

      if (this.mruinfo.mru9 !== undefined) {
        this.mru.push(this.mruinfo.mru9.InvCode)
      }

      if (this.mruinfo.mru10 !== undefined) {
        this.mru.push(this.mruinfo.mru10.InvCode)
      }
      let contact = {
        id: 99,
        firstName: 'John',
        lastName: 'Tomaselli',
        email: 'jrt@gtz.com',
        phoneNumber: '212-867-5309'
      }
      this.eventAggregator.publish(new ContactViewed(contact));

    }
    // for select2
    this.selectOptions = [
      { label: 'My Option', value: 'my-value' },
      { label: 'Some Value', value: '1212' },
      { label: 'Select Me!', value: 'fsdf32423_312' },
    ];

    this.defaultSelected = this.selectOptions[0];
    // for select2 ms
    this.options = [
      { label: 'First Option', value: "1" },
      { label: 'Second Option', value: "2" },
      { label: 'Third Option', value: "3" }
    ];

    this.selected = ["3", "1"];
    this.optionsMatt = ['First Option', 'Second Option', 'Third Option'];
  }
  changeCallback(evt) {
    // The selected value will be printed out to the browser console

    let val = evt.detail.value
    console.log(val);
  }
  changeCallbackM(evt) {
    // The selected value will be printed out to the browser console


    console.log(this.selected);
  }
  changeCallbackMru(selectedvalue) {
    // The selected value will be printed out to the browser console
    // if mru
    console.log('selectedvalue ', selectedvalue, "myDatalist", this.myDatalist.value);
    // if (selectedvalue === undefined) {
    //   this.mru.push(this.myDatalist.value)
    //   this.populateInv(this.myDatalist.value)
    // } else this.populateInv(selectedvalue)

    if (selectedvalue === undefined) {

    } else this.performSearchSL()



  }
  checkms() {
    console.log(this.selectedOptions)

  }

}

// attached() {
  //   this.altAKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-a', this.addinventory.bind(this));
  //   // this.stateList
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

