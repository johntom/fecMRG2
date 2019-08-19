import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

export class Catalog {
  static inject = [Router, UtilService];

  heading = 'Welcome to the Catalog page';
  counter = 1;
  search = {}

 
  constructor(router, utilService) {
    this.router = router;
    this.utilService = utilService;
  }

  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
    //  let path = `searchCatalog${qs}&tabname=searchCatalog${this.utilService.counter++}`;
      let path = `searchCatalog-${qs}&tabname=Catalogsearch`;
      this.appService.catalogsearchresults = '';// reset not clicking on tab
      let rt2 = `#/catalog/${path}`
      this.router.navigate(rt2);
    }
  }
}