import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

export class Todo {
  static inject = [Router, UtilService];

  heading = 'Todo';
  counter = 1;
  search = {}

 
  constructor(router, utilService) {
    this.router = router;
    this.utilService = utilService;
  }

  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      // let path = `searchCatalog${this.utilService.counter++}${qs}`;
      // this.router.navigate(`#/catalog/${path}`);
      let path = `searchCatalog${qs}&tabname=searchCatalog${this.utilService.counter++}`;
      let rt2 = `#/catalog/${path}`
      this.router.navigate(rt2);
    }
  }
}