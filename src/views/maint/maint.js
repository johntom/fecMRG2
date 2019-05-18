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
  //  { route: 'deposit/:id', name: 'deposit-search-results', moduleId: PLATFORM.moduleName('./views/deposit/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'deposit/data/:id', name: 'deposit-data-form', moduleId: PLATFORM.moduleName('./views/deposit/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'deposit', name: 'deposit', moduleId: PLATFORM.moduleName('./views/deposit/deposit'), nav: false, title: 'Deposit', activationStrategy: 'replace' },


  //     { route: 'insurance/:id', name: 'insurance-search-results', moduleId: PLATFORM.moduleName('./views/insurance/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'insurance/data/:id', name: 'insurance-data-form', moduleId: PLATFORM.moduleName('./views/insurance/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'insurance', name: 'insurance', moduleId: PLATFORM.moduleName('./views/insurance/insurance'), nav: false, title: 'Insurance' },
  //     { route: 'insured/:id', name: 'insured-search-results', moduleId: PLATFORM.moduleName('./views/insured/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'insured/data/:id', name: 'insured-data-form', moduleId: PLATFORM.moduleName('./views/insured/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'insured', name: 'insured', moduleId: PLATFORM.moduleName('./views/insured/insured'), nav: false, title: 'Insured' },
  //     { route: 'claimant/:id', name: 'claimant-search-results', moduleId: PLATFORM.moduleName('./views/claimant/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'claimant/data/:id', name: 'claimant-data-form', moduleId: PLATFORM.moduleName('./views/claimant/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'claimant', name: 'claimant', moduleId: PLATFORM.moduleName('./views/claimant/claimant'), nav: false, title: 'Claimant' },
  //     { route: 'adjuster/:id', name: 'adjuster-search-results', moduleId: PLATFORM.moduleName('./views/adjuster/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'adjuster/data/:id', name: 'adjuster-data-form', moduleId: PLATFORM.moduleName('./views/adjuster/data-form'), title: 'Data Form' },
  //     { route: 'adjuster', name: 'adjuster', moduleId: PLATFORM.moduleName('./views/adjuster/adjuster'), nav: false, title: 'Adjuster' },
  //     { route: 'code/:id', name: 'code-search-results', moduleId: PLATFORM.moduleName('./views/code/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'code/data/:id', name: 'code-data-form', moduleId: PLATFORM.moduleName('./views/code/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'code', name: 'code', moduleId: PLATFORM.moduleName('./views/code/code'), nav: false, title: 'Code' },
  //     { route: 'todo/:id', name: 'todo-search-results', moduleId: PLATFORM.moduleName('./views/todo/search-results'), title: 'Search Results', activationStrategy: 'replace' },
  //     { route: 'todo/data/:id', name: 'todo-data-form', moduleId: PLATFORM.moduleName('./views/todo/data-form'), title: 'Data Form', activationStrategy: 'replace' },
  //     { route: 'todo', name: 'todo', moduleId: PLATFORM.moduleName('./views/todo/todo'), nav: false, title: 'Todo' },

  menu1() {
    // alert ('m1') s
    let rt2 = '#/deposit';

    this.router.navigate(rt2);
  }
  menu2() {
    let rt2 = '#/insurance';

    this.router.navigate(rt2);
  }
  menu3() {
    let rt2 = '#/insured';

    this.router.navigate(rt2);
  }
  menu4() {
    let rt2 = '#/claimant';

    this.router.navigate(rt2);
  }
  menu5() {
    let rt2 = '#/adjuster';

    this.router.navigate(rt2);
  }
  menu6() {
    let rt2 = '#/code';

    this.router.navigate(rt2);
  }
  menu7() {
    let rt2 = '#/todo';

    this.router.navigate(rt2);
  }
}
