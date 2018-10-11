import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import 'bootstrap-select/css/bootstrap-select.min.css';
import { bindable, inject } from 'aurelia-framework';
// @inject()
@inject(Router, UtilService, ApplicationService, MyDataService)


export class Batchupdate {
  @bindable picker;
 
  heading = 'Welcome to the Batchupdate page';
  counter = 1;
  search = {}
  mappingDataStructure = {
    class: 'class',
    
    option: 'name',
  
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
  
    this.dataService = dataService;
  }

 
  performSearch() {
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
      
        this.router.navigate(`#/batchupdte/${path}`);
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

}

