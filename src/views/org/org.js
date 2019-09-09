import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { DialogService } from 'aurelia-dialog';

// import { Prompt } from '../claim/prompt';

export class Org {
  static inject = [Router, UtilService, ApplicationService, ApiService, DialogService];

  heading = 'ORG SEARCH '// ("BusIndivid" = B';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME
  constructor(router, utilService, appService, api, dialogService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvCode = null
    this.appService = appService;
    // this.search.claimno = '01-03188'
    this.api = api;
    this.dialogService = dialogService
    // alert(this.appService.adjusterList.length)
  }
  //  findOption = value => this.appService.adjusterList.find(x => x.ADJUSTER_NAME === value);
  created() {
    console.log('name-tag created');
  }

  bind() {
    console.log('name-tag bind');
  }

  attached() {
    console.log('name-tag attached');
  }


  activate() {
    //console.log('name-tag activate before attached ');
    this.mru = []
    let mruinfo, tabindex
    mruinfo = localStorage.getItem('mru-mrgorg');
    if (mruinfo === null) {
      // tabindex = 0
      this.mruinfo = 0
    } else {
      this.mruinfo = JSON.parse(mruinfo)



      if (this.mruinfo.mru1 !== undefined) {
        this.mru.push(this.mruinfo.mru1)
      }
      if (this.mruinfo.mru2 !== undefined) {
        this.mru.push(this.mruinfo.mru2)
      }

      if (this.mruinfo.mru3 !== undefined) {
        this.mru.push(this.mruinfo.mru3)
      }

      if (this.mruinfo.mru4 !== undefined) {
        this.mru.push(this.mruinfo.mru4)
      }

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


  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }
 
  performSearch() {
    if (this.search) {
      // console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);
      // let path = `searchOrg${qs}&tabname=searchOrg${this.utilService.counter++}`;
      let path = `searchOrg-${qs}&tabname=Orgsearch`;
      // see authorize-step.js on how I make this a singleton with saving the result set
      this.appService.orgsearchresults = '';// reset not clicking on tab
      let rt2 = `#/org/${path}`
      this.appService.currentSearch = path
      this.router.navigate(rt2)

    }
  }

  addorg() {
    this.router.navigate(`#/org/data/create`);
  }

}