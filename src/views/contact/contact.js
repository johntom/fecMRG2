import {Router, Redirect} from 'aurelia-router';
import {UtilService} from '../../services/util-service';

// for bb test
import { ApiService } from '../../utils/servicesApi';

export class Contact{
  static inject = [Router, UtilService,ApiService];

  heading = 'Welcome to the Contact page';
  counter = 1;
  search = {}

 
  constructor(router, utilService,api) {
    this.router = router;
    this.utilService = utilService;
      this.api = api;
  }
activate(){
 

//  return this.api.getBB('1022709')
//         .then((jsonRes) => {
//           console.log('jsonRes ', jsonRes);          
//           let inv = jsonRes.data;
//           this.currentItem = inv[0];
//           console.log('data-form:activate - currentItem', jsonRes,inv,this.currentItem);
//           // this.inv = inv[0]
//           // // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
//           // return inv
//         });

}
  performSearch() {
    if (this.search) {
      let qs = this.utilService.generateQueryString(this.search);
      let path = `ConSearch${this.utilService.counter++}${qs}`;
      this.router.navigate(`#/contact/${path}`);
      // this.router.navigate(`#/inventory/${this.search}`);
      // this.router.navigate(`#/inventory/InvSearch`);
    }
  }
}