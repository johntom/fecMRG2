import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';
import { ApiService } from '../../utils/servicesApi';


import { EventAggregator } from 'aurelia-event-aggregator';

export class Contact{
  static inject = [Router, UtilService,ApiService,EventAggregator];

  heading = 'Welcome to the Contact page';
  counter = 1;
  search = {}
  selectedValue = null;
   findOption = value => this.mru.find(x => x === value);
  options = [];//multiselect select2
  selected = [];//multiselect select2
  altAKeyPressSubscription;

  constructor(router, utilService,api, eventAggregator) {
    this.router = router;
    this.utilService = utilService;
      this.api = api;
       this.eventAggregator = eventAggregator
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
     alert ('add')
    // this.router.navigate(`#/inventory/data/create`);
  }
activate(){
 
 console.log('name-tag activate before attached ');
    this.mru = []
    let mruinfo, tabindex
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
        this.mru.push(this.mruinfo.mru1)
      this.mru.push(this.mruinfo.mru2)
      this.mru.push(this.mruinfo.mru3)
      this.mru.push(this.mruinfo.mru4)
      this.mru.push(this.mruinfo.mru5)
    }

}
  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      let path = `ConSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/contact/${path}`);
      // this.router.navigate(`#/inventory/${this.search}`);
      // this.router.navigate(`#/inventory/InvSearch`);
    }
  }

  populateInv(e) {
    // this.appService.onlyonce = 0
     //  let rt2 = '#/artist/data/' + item.id+'?'+item.LastName+','+item.FirstName//ArtistName
     
     this.router.navigate(`#/contact/data/${e.id}?${e.name}`);
  }

}