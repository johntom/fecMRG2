// import { Router, Redirect } from 'aurelia-router';
// import { UtilService } from '../../services/util-service';
// import { ApplicationService } from '../../services/application-service';
// import { MyDataService } from "../../services/my-data-service";
// import { bindable, inject } from 'aurelia-framework';
// @inject(Router, UtilService, ApplicationService, MyDataService)

// export class Batchupdate {
//   @bindable picker;
//   heading = 'Batch Update';
//   counter = 1;
//   search = {}
//   mappingDataStructure = {
//     class: 'class',

//     option: 'name',

//     style: 'style',
//     title: 'title',
//     tokens: 'tokens'
//   }
//   selectOptions = {
//     liveSearch: true,
//     showSubtext: true,
//     showTick: true,
//     selectedTextFormat: 'count > 3',
//     actionsBox: true
//   };
//   isEditing = false;
//   isOptgroupBreadDisabled = false;
//   selectMappingStructure = {
//     subtext: 'company'
//   };


//   constructor(router, utilService, appService, dataService) {
//     this.router = router;
//     this.utilService = utilService;
//     this.appService = appService;
//     this.dataService = dataService;
//   }
//  performSearchSL() {
//     let savedlist = this.myDatalist.value //datalist
//     if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = savedlist // `${this.name.name}`
//     if (this.search) {
//       // this.search={savedlists:this.search.savedlists);
//     let qs = this.utilService.generateQueryString(this.search);
//     console.log('this.search ', this.search)
//     let counter = this.utilService.counter++
//     // name as - at end its a singleton
//     /*
//      let path = `list${counter}${qs}`;
//          this.appService.currentActionlist = this.search.savedlists
//          this.router.navigate(`#/batchupdte/${path}`);
//          this.appService.currentSearch = path //`Search${counter}`
//     } else alert('Please make a selection')
//     */
// let path = `Batchlist-${qs}`;
//    // see authorize-step.js on how I make this a singleton with saving the result set
//     this.appService.actionsearchresults='';// reset 
//     this.router.navigate(`#/batchupdte/${path}&tabname=bstvhlist`);
//     this.appService.currentSearch = path
//     } else alert('Please make a selection')
    
//   }

//   // performSearch() {
//   //   let savedlist = `${this.name}`
//   //   if (savedlist === 'undefined' || savedlist === undefined) {
//   //     alert('Please make a selection')
//   //   } else
//   //     if (this.search) {
//   //       if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`
//   //       let qs = this.utilService.generateQueryString(this.search);
//   //       let counter = this.utilService.counter++
//   //       // let path = `ActSearch${counter}${qs}`;
//   //       let path = `list${counter}${qs}`;
//   //       // let path = `list:${qs}`;// name on tab
//   //       // console.log('this.search  path ', this.search, path)
//   //       this.appService.currentActionlist = this.search.savedlists

//   //       this.router.navigate(`#/batchupdte/${path}`);
//   //       this.appService.currentSearch = path //`Search${counter}`
//   //     } else alert('Please make a selection')
//   // }

//   performClear() {
//     this.search = {}
//   }
//   attached() {
//     // this.savedlists = this.appService.savedlists
//   }

//   activate() {
//     this.savedlists = this.appService.savedlists
//   }

// }


import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

import { bindable, inject } from 'aurelia-framework';
// @inject()
@inject(Router, UtilService, ApplicationService, MyDataService)


export class Batchupdate {
  @bindable picker;

  heading = 'SELECT AN ACTION';
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

  
 
  constructor(router, utilService, appService, dataService) {
    this.router = router;
    this.utilService = utilService;
    this.appService = appService;
    // this.page = '#/action'
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
 performSearchSL() {
    if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = savedlist // `${this.name.name}`
    if (this.search) {
      // this.search={savedlists:this.search.savedlists);
    let qs = this.utilService.generateQueryString(this.search);
    console.log('this.search ', this.search)
    let counter = this.utilService.counter++
    // name as - at end its a singleton
    let path = `Batchupdate-${qs}`;
   // see authorize-step.js on how I make this a singleton with saving the result set
    this.appService.actionsearchresults='';// reset 
    this.router.navigate(`#/batchupdte/${path}&tabname=batchupdte`);
    this.appService.currentSearch = path
    } else alert('Please make a selection')
  }
  // performSearch() {
  //   let savedlist = `${this.name}`
  //   if (savedlist === 'undefined' || savedlist === undefined) {
  //     alert('Please make a selection')
  //   } else
  //     if (this.search) {
  //       if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`
  //       let qs = this.utilService.generateQueryString(this.search);
  //       let counter = this.utilService.counter++
  //       //let path = `list${counter}${qs}`;
  //       let path = `list${counter}${qs}`;
  //       this.appService.currentActionlist = this.search.savedlists
  //       this.router.navigate(`#/action/actionview`);
  //       this.appService.currentSearch = path //`Search${counter}`
  //     } else alert('Please make a selection')
  // }

  performClear() {
    this.search = {}
  }
  attached() {
    // this.savedlists = this.appService.savedlists
  }
 
  // activate() {

  // }
 activate(params, routeConfig) {
  //   this.savedlists = this.appService.savedlists
  //   this.queryParams = this.utilService.parseQueryStringUrl();
  //   const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
  //  this.myDatalist.value ='Test List'
  //   this.performSearchSL()
    // const pairs = qs.split('&')
    // const queryParams = {}
    // let slname
    // let ct =0
    // pairs.forEach(p => {
    //   const kv = p.split('=')
    //   if (ct===0) slname = kv[1]
    //   ct++
    // });
    //1-27 this.item.savedlist = slname
    // or
    // this.item.savedlist = this.appService.currentActionlist
   
  }




}
