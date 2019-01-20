import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import 'bootstrap-select/css/bootstrap-select.min.css';
import { bindable, inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';


// @inject()
@inject(Router, UtilService, ApplicationService, MyDataService,DialogService)


export class Artist {
  @bindable picker;
  // @bindable selectCamping;
  // @bindable selectCondiment;
  // @bindable selectStyledCondiment;
  // @bindable selectPicnic;

  heading = 'Actions';
  counter = 1;
  search = {}
  mappingDataStructure = {
    class: 'class',
   
    option: 'name',
   
    style: 'style',
    title: 'title',
    tokens: 'tokens'
  }

 
  constructor(router, utilService, appService, dataService,dialogService) {
    this.router = router;
    this.utilService = utilService;
    this.appService = appService;
    // this.page = '#/action'
    // this.search.inventorycode = 'PORTERC008'
    this.dataService = dataService;
       this.dialogService = dialogService 
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
 performSearchSL() {
    let savedlist = this.myDatalist.value //datalist
    if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = savedlist// `${this.name.name}`
    if (this.search) {
    let qs = this.utilService.generateQueryString(this.search);
    console.log('this.search ', this.search)
   let counter = this.utilService.counter++
    // let path = `Search${counter}${qs}`;
    let path = `actionSearch${counter}${qs}`;

   // keep counter if you want to open mutiple
   // 
   //  let path = `actionSearch${qs}`;
   
          this.appService.currentActionlist = this.search.savedlists
    this.router.navigate(`#/action/${path}`);
    this.appService.currentSearch = path
    } else alert('Please make a selection')
  }
  performSearch() {
    // archive this
    let savedlist = `${this.name}`
    if (savedlist === 'undefined' || savedlist === undefined) {
      alert('Please make a selection')
    } else
      if (this.search) {
        if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`
        let qs = this.utilService.generateQueryString(this.search);
        let counter = this.utilService.counter++
        // let path = `ActSearch${counter}${qs}`;
        let path = `list${counter}${qs}`;
        // let path = `list:${qs}`;// name on tab
        // console.log('this.search  path ', this.search, path)
        this.appService.currentActionlist = this.search.savedlists
        // let path = `SL:${this.search.savedlists}`;
        this.router.navigate(`#/action/${path}`);
        this.appService.currentSearch = path //`Search${counter}`
      } else alert('Please make a selection')
  }

  performClear() {
    this.search = {}
  }
  attached() {
    // this.savedlists = this.appService.savedlists
  }
 
  activate() {
    this.savedlists = this.appService.savedlists
  }


  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';
 
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.notes
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }



}

