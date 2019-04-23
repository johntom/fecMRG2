import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { DialogService } from 'aurelia-dialog';

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

      // let adj = `${this.ADJUSTER_NAME.ADJUSTER_ID}`
       //this.router.navigate(`#/contact/${path}&tabname=ContactSRH${this.utilService.counter++}`);
      let path = `searchOrg${qs}&tabname=searchOrg${this.utilService.counter++}`;

  //  path = path.replace( /\s/g, "")
      let rt2 = `#/org/${path}`
      
      this.router.navigate(rt2)

    }
  }

addorg(){
    this.router.navigate(`#/org/data/create`);
}

}