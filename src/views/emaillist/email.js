import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

export class Email {
  static inject = [Router, UtilService];

  heading = 'Welcome to the Email page';
  counter = 1;
  search = {}

 
  constructor(router, utilService) {
    this.router = router;
    this.utilService = utilService;
  }

  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      let path = `searchEmail${qs}&tabname=searchEmail${this.utilService.counter++}`;
      let rt2 = `#/email/${path}`
      this.router.navigate(rt2);
    }
  }
}