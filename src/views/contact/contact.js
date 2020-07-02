import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApiService } from '../../utils/servicesApi';


import { EventAggregator } from 'aurelia-event-aggregator';
import { ApplicationService } from '../../services/application-service';
export class Contact {
  static inject = [Router, UtilService, ApiService, EventAggregator, ApplicationService];

  heading = 'SEARCH CONTACTS';
  // counter = 1;
  search = {}
  selectedValue = null;
  findOption = value => this.mru.find(x => x === value);
  options = [];//multiselect select2
  selected = [];//multiselect select2
  altAKeyPressSubscription;
  mailingstatus = [
    { id: 1, name: 'Mailing list' },
    { id: 2, name: 'No Mailings' },
    { id: 3, name: 'Unsubscribed' }
  ]

deceasedstatus = [
    { id: 0, name: 'not deceased' },
    { id: 1, name: 'deceased' },
    { id: 2, name: 'either' }
  ]

  constructor(router, utilService, api, eventAggregator, appService) {
    this.router = router;
    this.utilService = utilService;
    this.api = api;
    this.eventAggregator = eventAggregator
    this.search = {}
    // this.search.deceased = true
    // this.search.nomailings = true
    // this.search.noinfo = true
    this.search.keywords = []
    this.search.genres = []
    this.appService = appService;

  }
  attached() {
    this.altAKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-a', this.addinventory.bind(this));
    this.altSKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-s', this.performSearch.bind(this));

  }
  detached() {
    this.altAKeyPressSubscription.dispose();
    this.altSKeyPressSubscription.dispose(); 
  }
  addinventory() {
    alert('add') 
    // this.router.navigate(`#/inventory/data/create`);
  }

  performClear() {
    this.search.mailingStatus = ''
     this.search.deceasedStatus = 2
  }
  performDefault() {
    this.search.mailingStatus = 1
    this.search.notinternational = true
    this.search.deceasedStatus=2
  }
  activate() {
    console.log('name-tag activate before attached ');
    this.mru = []
    let mruinfo, tabindex
    this.search.deceasedStatus=2
    mruinfo = localStorage.getItem('mru-mrgc');
    if (mruinfo === null) {
      // tabindex = 0
      this.mruinfo = 0
    } else {
      this.mruinfo = JSON.parse(mruinfo)
      // this.mru.push(this.mruinfo.mru1.name)
      // this.mru.push(this.mruinfo.mru2.name)
      // this.mru.push(this.mruinfo.mru3.name)
      // this.mru.push(this.mruinfo.mru4.name)
      // this.mru.push(this.mruinfo.mru5.name)
      // this.mru.push(this.mruinfo.mru1)
      // this.mru.push(this.mruinfo.mru2)
      // this.mru.push(this.mruinfo.mru3)
      // this.mru.push(this.mruinfo.mru4)
      // this.mru.push(this.mruinfo.mru5)


      if (this.mruinfo.mru1 !== undefined) {
        // this.mru.push(this.mruinfo.mru1.name)
        this.mru.push(this.mruinfo.mru1)
      }
      if (this.mruinfo.mru2 !== undefined) {
        this.mru.push(this.mruinfo.mru2)
      }
      // else this.mru.push(this.mruinfo.mru2)

      if (this.mruinfo.mru3 !== undefined) {
        this.mru.push(this.mruinfo.mru3)
      }
      // else this.mru.push(this.mruinfo.mru3)

      if (this.mruinfo.mru4 !== undefined) {
        this.mru.push(this.mruinfo.mru4)
      }
      // else this.mru.push(this.mruinfo.mru4)

      if (this.mruinfo.mru5 !== undefined) {
        this.mru.push(this.mruinfo.mru5)
      }
       if (this.mruinfo.mru6 !== undefined) {
        this.mru.push(this.mruinfo.mru6)
      }
       if (this.mruinfo.mru7 !== undefined) {
        this.mru.push(this.mruinfo.mru7)
      }
       if (this.mruinfo.mru8 !== undefined) {
        this.mru.push(this.mruinfo.mru8)
      }
       if (this.mruinfo.mru9 !== undefined) {
        this.mru.push(this.mruinfo.mru9)
      }
       if (this.mruinfo.mru10 !== undefined) {
        this.mru.push(this.mruinfo.mru10)
      }
    }    

  }
  performSearch() {  
    if (this.search) {   
      // 
      let keyword = `${this.keywordDescription}`
      let medsupport = `${this.DescriptionMS}`
      let currentlocation = `${this.DescriptionLoc}`
      let multikeys = `${this.multikeywords}`
      // console.log('selectedSoldId', this.search.selectedSoldId)
      let sold = this.search.sold// `${this.search.sold}`
      // if (keywd !== 'undefined' && keywd !== 'null') this.search.keywords = `${this.Description.Description}`
      if (keyword !== 'undefined' && keyword !== 'null') this.search.keywords = `${this.keywordDescription.Description}`
      //  if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`
      // if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      // if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`
      // if (sold !== 'undefined') this.search.sold = sold
      // if (selecteddate !== 'undefined') this.search.selectedDateId = selecteddate
      // if (owndedby !== 'undefined') this.search.owndedby = owndedby //search.owndedby
      // let qs = this.utilService.generateQueryString(this.search);
      // console.log('this.search ', this.search)
      // let counter = this.utilService.counter++ 
      // 
//if (deceased === 0 || deceased === '0') deceased = false;
  //  if ((deceased === '0'  || deceased == true )) {

  //           //    validsearch = true
  //           // {international:{$exists:false}}

  //           //  _.extend(searchObj, { "deceased": { $exists: true } });
  //           _.extend(searchObj, { "deceased": true });
  //           console.log('deceased ', searchObj)
  //       } else {
  //            if (deceased === '-1' || deceased == false) {
  //           validsearch = true
  //           console.log('deceased ml ', searchObj)
  //           // _.extend(searchObj, { "deceased": { $exists: false } });
  //           // nov 27 2019
  //           _.extend(searchObj, { "deceased": false });
  //            }
  //       }
      this.search.deceased = this.search.deceasedStatus// bring up eveyone
      let qs = this.utilService.generateQueryString(this.search);
       if (qs === '?') {
        alert('Please enter search criteria')
      } else {
      // let path = `searchContact${qs}&tabname=searchCntct${this.utilService.counter++}`;
      let path = `searchContact-${qs}&tabname=Contactsearch`;
      // see authorize-step.js on how I make this a singleton with saving the result set
      this.appService.contactsearchresults = '';// reset not clicking on tab
      let rt2 = `#/contact/${path}`
      this.router.navigate(rt2);
      }
    }
  }

  populateInv(e) {
    // this.appService.onlyonce = 0
    //  let rt2 = '#/artist/data/' + item.id+'?'+item.LastName+','+item.FirstName//ArtistName

    this.router.navigate(`#/contact/data/${e.id}?${e.name}`);
  }

}