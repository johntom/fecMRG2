import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { DialogService } from 'aurelia-dialog';
// import { lodash } from 'lodash'
// import { Prompt } from '../claim/prompt';

export class Org {
  static inject = [Router, UtilService, ApplicationService, ApiService, DialogService];

  heading = 'Welcome to the Adjusterprep page';
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
    console.log('name-tag activate before attached ');


  }

  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }

  performSearch() {
    if (this.search) {
      console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);

      let adj = `${this.ADJUSTER_NAME.ADJUSTER_ID}`
      let path = `Searchorg${qs}`;

      if (adj !== null) {
        let rt2 = '#/org/data/' + adj
        this.router.navigate(rt2)

      } else this.router.navigate(`#/org/${path}`);
    }
  }


}