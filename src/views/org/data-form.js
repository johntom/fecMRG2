import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';

import { Router } from 'aurelia-router';
@inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(router, api, appService, dataService, eventAggregator) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();
    this.router = router
    this.message = ""
  }

  async activate(params, routeConfig) {
    let pp = JSON.stringify(params);
    this.cname = pp.substring(2, pp.indexOf(':') - 3);// params.indexOf(':')
    this.heading = `DataForm for record  ${this.cname} `;
    if (this.appService.currentSearch === undefined) {
      this.tabname = 0
    } else
      this.tabname = this.appService.currentSearch



    if (params.id) {
      this.recordId = params.id;


      if (this.recordId === 'create') {
        this.appService.currentOrgItem = {}
      } else {
        let response = await this.api.findorgOnemongo(this.recordId);
        this.org = response.data[0];
          if (this.org!==undefined) this.mrubuild()
        // console.log('this.org ', this.org)
        // let response2 = await this.api.findorgContacts(this.org.id)// ID);
        // alert('dd '+this.org)
        let response2 = await this.api.findorgContacts(this.recordId)// ID); 
        if (response2.data = '0') {
          //   return 'No contacts found';
          this.contacts = [];
          this.appService.currentOrgItem = this.org

        } else {
          // console.log('2 ',response2)
          this.contacts = response2.data;
          this.appService.currentOrgItem = this.org

        
        }
        // console.log('this.repos contacts ', this.contacts)
        // this.allcontacts = this.contacts

      }
    }


  }

  mrucheck(newrec, prevtemp) {
    this.skip = false
    if (prevtemp[0] != undefined && newrec.id === prevtemp[0].id) this.skip = true;
    if (prevtemp[1] != undefined && newrec.id === prevtemp[1].id) this.skip = true;
    if (prevtemp[2] != undefined && newrec.id === prevtemp[2].id) this.skip = true;
    if (prevtemp[3] != undefined && newrec.id === prevtemp[3].id) this.skip = true;
    if (prevtemp[4] != undefined && newrec.id === prevtemp[4].id) this.skip = true;
    if (prevtemp[5] != undefined && newrec.id === prevtemp[5].id) this.skip = true;
    if (prevtemp[6] != undefined && newrec.id === prevtemp[6].id) this.skip = true;
    if (prevtemp[7] != undefined && newrec.id === prevtemp[7].id) this.skip = true;
    if (prevtemp[8] != undefined && newrec.id === prevtemp[8].id) this.skip = true;
    if (prevtemp[9] != undefined && newrec.id === prevtemp[9].id) this.skip = true;
    console.log('   this.skip ', this.skip)
  }

  mrubuild() {
    let mruget = localStorage.getItem('mru-mrgorg');
    if (mruget === null) {
      // tabindex = 0
      mruget = 0
    } else {
      mruget = JSON.parse(mruget)
    }


    function mruinfo(temp) {
      if (temp[0] != undefined) this.mru1 = temp[0];
      if (temp[1] != undefined) this.mru2 = temp[1];
      if (temp[2] != undefined) this.mru3 = temp[2];
      if (temp[3] != undefined) this.mru4 = temp[3];
      if (temp[4] != undefined) this.mru5 = temp[4];
      if (temp[5] != undefined) this.mru6 = temp[5];
      if (temp[6] != undefined) this.mru7 = temp[6];
      if (temp[7] != undefined) this.mru8 = temp[7];
      if (temp[8] != undefined) this.mru9 = temp[8];
      if (temp[9] != undefined) this.mru10 = temp[9];
    }
 
    const prevtemp = [mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const temp = [{ id: this.recordId, name: this.cname }, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const newrec = { id: this.recordId, name: this.cname }
    this.mrucheck(newrec, prevtemp);
    if (!this.skip) {
      if (this.recordId === mruget.mru1 || this.recordId === mruget.mru2 || this.recordId === mruget.mru3 ||
        this.recordId === mruget.mru4 || this.recordId === mruget.mru5 || this.recordId === mruget.mru6 || this.recordId === mruget.mru7 || this.recordId === mruget.mru8 || this.recordId === mruget.mru9 || this.recordId === mruget.mru10) { } else {
        if (!this.skip) {
          mruinfo = new mruinfo(temp);
          localStorage.setItem('mru-mrgorg', JSON.stringify(mruinfo));
        }
      }
    }
  }   

  attached() {
    if (this.appService.dataFormOneToManyTabs4.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs4[0];
      this.selectOneToManyTab(tab);
    }
  }


  bind() {
    // this.adjusters = this.appService.adjusterList
    // console.log('adjusters ', this.adjusters);

    // this.bookApi.getGenres().then(genres => {
    //   this.adjusters = genres;
    // });
  }

  createEventListeners() {
    // this.adjusterSelectedListener = e => {
    //   if (e && e.detail) {
    //     this.adjuster = e.detail.value;
    //     console.log('this.adjuster  createEventListeners ', this.adjuster)
    //   }
    // };

  }



  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  // async saveclaim() {

  //   let response2 = await this.api.saveorg(this.org)// ID);
  //   let savetime = moment().format('MM/DD/YY h:mm:ss a')

  //   this.message = "Save successful. org updated @ " + savetime
  // }


  async saveorg(opt) {
    if (this.recordId === 'create') {
      this.org.BusIndivid = "B";
      // this.org.orgphones = []
      // this.org.emails = []
      this.recordId = ''
      this.appService.currentorgCount = 1
      let response2 = await this.api.createorg(this.org)// ID);
      this.recordId = response2.data.id;//
    } else {
      let response2 = await this.api.saveorg(this.org)// ID);
    }

    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    this.message = "Save successful. org updated @ " + savetime
    if (opt === 1) this.requestclose()
  }


  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs4.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    // let tabindex = this.appService.dataFormOneToManyTabs4.findIndex(f => f.isSelected)
    // function tabinfo(temp) { 
    //   this.recid = temp[0];
    //   this.tabindex = temp[1];

    // }
    // var temp = [this.currentItem.id, tabindex];
    // tabinfo = new tabinfo(temp);
    // // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
    // localStorage.setItem('tabinfoC' + this.currentItem.id, JSON.stringify(tabinfo));
    return true;
  }
  requestclose() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
  //12-9  this.message = "Save successful. org updated @ " + savetime
    let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim
    // Finally, we close out this tab
    this.closeTab(tab);
    let rt2
    // (this.tabname === 0) ? rt2 = '#/org/' : rt2 = '#/org/' + this.tabname
    (this.appService.currentorgCount === 1 || this.appService.currentorgCount ===undefined) ? rt2 = '#/org/' : rt2 = '#/org/' + this.tabname
    this.router.navigate(rt2);

  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }
}

