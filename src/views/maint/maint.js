import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { EventAggregator } from 'aurelia-event-aggregator';


export class Maint {
  static inject = [Router, UtilService, ApplicationService];

  constructor(router, utilService, appService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    // this.searchInvCode = null
    this.appService = appService;
    // this.search.STATUS='O'
    // this.search.claimno = '01-03188'

  }
//  { "route": 'artist', name: 'artist', moduleId: PLATFORM.moduleName('./views/artist/artist'), nav: false, title: 'Artist' },
//       { "route": 'artist/:id', name: 'artist-search-results', moduleId: PLATFORM.moduleName('./views/artist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
//       { "route": 'artist/data/:id', name: 'artist-data-form', moduleId: PLATFORM.moduleName('./views/artist/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'

//       { route: 'code/:id', name: 'code-search-results', moduleId: PLATFORM.moduleName('./views/code/search-results'), title: 'Search Results', activationStrategy: 'replace' },
//       { route: 'code/data/:id', name: 'code-data-form', moduleId: PLATFORM.moduleName('./views/code/data-form'), title: 'Data Form', activationStrategy: 'replace' },
//       { route: 'code', name: 'code', moduleId: PLATFORM.moduleName('./views/code/code'), nav: false, title: 'Code' },
//       { route: 'todo/:id', name: 'todo-search-results', moduleId: PLATFORM.moduleName('./views/todo/search-results'), title: 'Search Results', activationStrategy: 'replace' },
//       { route: 'todo/data/:id', name: 'todo-data-form', moduleId: PLATFORM.moduleName('./views/todo/data-form'), title: 'Data Form', activationStrategy: 'replace' },
//       { route: 'todo', name: 'todo', moduleId: PLATFORM.moduleName('./views/todo/todo'), nav: false, title: 'Todo' },
//       { route: 'email/:id', name: 'email-search-results', moduleId: PLATFORM.moduleName('./views/emaillist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
//       { route: 'email/data/:id', name: 'email-data-form', moduleId: PLATFORM.moduleName('./views/emaillist/data-form'), title: 'Data Form', activationStrategy: 'replace' },
//       { route: 'email', name: 'email', moduleId: PLATFORM.moduleName('./views/emaillist/email'), nav: false, title: 'Email' },

  menu1() {
    // alert ('m1') s
    let rt2 = '#/artist';

    this.router.navigate(rt2);
  }
  menu2() {
    let rt2 = '#/code';

    this.router.navigate(rt2);
  }
  menu3() {
    let rt2 = '#/todo';

    this.router.navigate(rt2);
  }
  menu4() {
    let rt2 = '#/mailinglist';

    this.router.navigate(rt2);
  }
  // menu5() {
  //   let rt2 = '#/adjuster';

  //   this.router.navigate(rt2);
  // }
  // menu6() {
  //   let rt2 = '#/code';

  //   this.router.navigate(rt2);
  // }
  // menu7() {
  //   let rt2 = '#/todo';

  //   this.router.navigate(rt2);
  // }
}
