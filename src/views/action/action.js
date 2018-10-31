import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

import { bindable, inject } from 'aurelia-framework';

@inject(Router, UtilService, ApplicationService, MyDataService)


export class Action {
  @bindable picker;

  heading = 'Actions';
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
   
  stateList = [
    { oname: 'Alabama', id: 'al' },
    { oname: 'Alaska', id: 'ak' },
   
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
populateInv(e) {
    //10-17 this.search.inventorycode = e
    this.appService.onlyonce = 0
    //10-17  this.performSearch()
    //https://johntom.github.io/fecMRG2/#/inventory/data/PORTERC008
    //10-17   this.router.navigate(`#/inventory/data/${ this.search.inventorycode}`);
    this.router.navigate(`#/inventory/data/${e}`);
  }

  performSearch() {
    
    if (this.search) {
      if (keyword !== 'undefined' && keyword !== 'null') this.search.keywords = `${this.keywordDescription.Description}`

      //  if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      // if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      // if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`

      let qs = this.utilService.generateQueryString(this.search);
      console.log('this.search ', this.search)
      let counter = this.utilService.counter++
      let path = `Search${counter}${qs}`;
      this.router.navigate(`#/inventory/${path}`);
      this.appService.currentSearch = path 
    }
  }


  addinventory() {
   
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
    this.altAKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-a', this.addinventory.bind(this));
    this.altSKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-s', this.performSearch.bind(this));

  }
  detached() {
    this.altAKeyPressSubscription.dispose();
    this.altSKeyPressSubscription.dispose();
  }

  activate() {
    console.log('name-tag activate before attached ');
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

  checkms() {
    console.log(this.selectedOptions)

  }

}