
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Promptorg } from './promptorg';
import { DialogImage } from './dialogImage';
import { bindable } from 'aurelia-framework';
import { RtfService } from '../../services/rtf-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Promptmerge } from '../prompt/promptMerge';
import { UtilService } from '../../services/util-service';


@inject(Router, UtilService, ApiService, ApplicationService, MyDataService, DialogService, RtfService, EventAggregator)
export class Rtfcreate {

  controller = null;
  MediumSupportobj = '';
  Title = '';
  InvYear = '';
  InventoryCode = '';

  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
  // orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID',
  //   'PhotographerID', 'PurchasedFrom', 'ConservedBy',
  //   'SoldToID', 'SoldTo', 'LoanTo', 'ProvOwner']
  measuresOld = [
    { id: 0, name: '1/16' },
    { id: 1, name: '2/16' },
    { id: 3, name: '3/16' },
    { id: 4, name: '4/16' },
    { id: 5, name: '5/16' },
    { id: 6, name: '6/16' },
    { id: 7, name: '7/16' },
    { id: 8, name: '8/16' },
    { id: 9, name: '9/16' },
    { id: 10, name: '10/16' },
    { id: 11, name: '11/16' },
    { id: 12, name: '12/16' },
    { id: 13, name: '13/16' },
    { id: 14, name: '14/16' },
    { id: 15, name: '15/16' },
  ];
  measures = [

    { id: 0, name: '1/8' },
    { id: 1, name: '1/4' },
    { id: 3, name: '3/8' },
    { id: 4, name: '1/2' },
    { id: 5, name: '5/8' },
    { id: 6, name: '3/4' },
    { id: 7, name: '7/8' }
  ];



  searchsold = [
    { id: -1, name: 'Y' },

    { id: 0, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];


  products = [
    { id: '0', name: 'Motherboard' },
    { id: '1', name: 'CPU' },
    { id: '2', name: 'Memory' },
  ];
    listtypes = [{ id: -1, name: 'choose' }, { id: 0, name: "exhibition" }, { id: 1, name: "price list" },
  { id: 2, name: "location list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
  { id: 5, name: "registrar" }, { id: 6, name: "presention" }]

  fieldname = ''
  error = "";
  division = {
    div_id: 1,
    div_code: "S",
    div_name: "Secondary"
  };



  constructor(router, utilService, api, appService, dataService, dialogService, rtfService, eventAggregator) {
    this.api = api
    this.appService = appService
    this.inv = ''
    this.dataService = dataService
    this.router = router
    this.dialogService = dialogService
    this.skippromt = false
    this.rtfService = rtfService
    this.eventAggregator = eventAggregator;
    this.epoch = moment().unix();
    this.selectedlist = -1
    this.utilService = utilService;
  }



  activate(params, routeConfig) {
   

    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;

      console.log('this.recordId ', this.recordId);

      this.addmode = false

      return this.api.findInventoryOne(this.recordId)
        .then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let inv = jsonRes.data;
          this.currentItem = inv[0]

          this.rtfService.currentItem = this.currentItem
       })


    }
  }



  async loadimage() {
    let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
    return new Promise((resolve, reject) => {
      this.mainimage.onload = function () { // alert alert("Height: " + this.height+' '+ this.width); 
        imageHeight = this.height
        imageWidth = this.width
        resolve(imageWidth);
      }
      this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
    })
  }

  async getimageinfo(opt) {
    return new Promise((resolve, reject) => {
      if (this.currentItem.clientHeight === undefined || this.currentItem.clientHeight === 0 || opt === 1) {
        let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
        this.currentItem.clientHeight = this.mainimage.clientHeight
        this.currentItem.clientWidth = this.mainimage.clientWidth
        if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
          clientHeightRatio = 1
          clientWidthRatio = 1
        } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
          clientHeightRatio = 1
          clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2)
        } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
          clientWidthRatio = 1
          clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)
        }
        this.currentItem.clientHeightRatio = clientHeightRatio
        this.currentItem.clientWidthRatio = clientWidthRatio
        resolve(imageWidth);
      }
      resolve(0);
    })
    resolve(0);
  }

  async attached() {


    let tab = this.appService.dataFormOneToManyTabs[0];
    this.selectOneToManyTab(tab);

    return Promise.all([
      this.loadimage(),
      this.getimageinfo(0)
    ]).then(values => {
     
      let createopt = 2; // 1 is from tab 2 is program
      let rr = this.rtfService.createRTF(createopt)
      this.eventAggregator.publish('rtfpayload', 'refresh');
      this.saveinventory(0)
      // this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));
      let tabinfo, tabindex
      tabinfo = localStorage.getItem('tabinfo' + this.currentItem.InventoryCode);
      if (tabinfo === null) {
        tabindex = 0
      } else {
        tabinfo = JSON.parse(tabinfo)
        tabindex = tabinfo.tabindex
      }
      if (this.appService.dataFormOneToManyTabs.length > 0) {
        let tab = this.appService.dataFormOneToManyTabs[tabindex];
        this.selectOneToManyTab(tab);
      }

    })
  }

  async publish() {
    this.eventAggregator.publish('rtfpayload', 'refresh');
    this.saveinventory(0)
  } 
  async saveinventory(option) {
    this.getimageinfo(0) // fix issue with isdirty
    this.eventAggregator.publish('rtfpayload', 'refresh');
    this.api.saveinventory(this.currentItem).then((jsonRes) => {
      console.log('jsonRes ', jsonRes)
      let tab = this.appService.tabs.find(f => f.isSelected);
      // this.message = "Save successful. Inventory updated @ " + savetime


       this.requestcloseNoCheck()

 
 
    });
  }

// https://johntom.github.io/fecMRG2/#/action/Actionlist-?savedlists%3DA1&tabname=actionlist
  requestcloseNoCheck() {
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    // let rt2 = '#/inventory/' + this.tabname
    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];

    console.log('newIndex newTab ',newTab.href)//newIndex,newTab,tab)
    let tabstr=newTab.href.substring(0,19)
    console.log('tabstr ',tabstr )
    // if (tabstr !=='#/action/Actionlist-')  this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
     if (tabstr ==='#/action') {

     } else this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
  
  }

  // closeTab(tab) {
  //   this.subscriber.dispose();
  //   let index = this.appService.tabs.indexOf(tab);
  //   tab.isSelected = false;
  //   this.appService.tabs.splice(index, 1);
  // }
  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    let tabindex = this.appService.dataFormOneToManyTabs.findIndex(f => f.isSelected)
    function tabinfo(temp) {
      this.recid = temp[0];
      this.tabindex = temp[1];

    }
    var temp = [this.currentItem.InventoryCode, tabindex];
    tabinfo = new tabinfo(temp);
    // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
    localStorage.setItem('tabinfo' + this.currentItem.InventoryCode, JSON.stringify(tabinfo));
    this.tabindex = tabindex// get clearded from line above
    return true;
  }



}

