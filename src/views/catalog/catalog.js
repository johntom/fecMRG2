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
      let path = `CatSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/catalog/${path}`);
      // this.router.navigate(`#/inventory/${this.search}`);
      // this.router.navigate(`#/inventory/InvSearch`);
    }
  }
}