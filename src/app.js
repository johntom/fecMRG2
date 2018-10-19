// see Home NOT IN USE
import { PLATFORM } from 'aurelia-pal';
import { ApplicationService } from './services/application-service';
import { AuthorizeStep } from './services/authorize-step';


import {EventAggregator} from 'aurelia-event-aggregator';



export class App {
  static inject = [ApplicationService,EventAggregator];

  constructor(appService,eventAggregator) {
    this.appService = appService;
    this.eventAggregator = eventAggregator;
  }

// use activationStrategy for all wildcards 
// { route: 'claim/:id', name: 'claim-search-results', moduleId: PLATFORM.moduleName('./views/claim/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },
   

  configureRouter(config, router) {
    config.title = 'MRG Layout';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      // { "route": ["", "welcome"], "name": "welcome", "moduleId": PLATFORM.moduleName("./welcome"), "nav": true, "title": "Welcome" },
      { "route": '', redirect: 'home' },
      { "route": 'home', name: 'home', moduleId: PLATFORM.moduleName('./views/home/home'), nav: true, title: 'Home' },
      { "route": 'inventory/:id', name: 'inventory-search-results', "moduleId": PLATFORM.moduleName('./views/inventory/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },
      { "route": 'inventory/data/:id', name: 'inventory-data-form', "moduleId": PLATFORM.moduleName('./views/inventory/data-form'), title: 'Data Form' ,activationStrategy:'replace'  },
      { "route": 'inventory', name: 'inventory', "moduleId": PLATFORM.moduleName('./views/inventory/inventory'), nav: true, title: 'Inventory' },
      { "route": 'contact', name: 'contact', moduleId: PLATFORM.moduleName('./views/contact/contact'), nav: true, title: 'Contact' },
      { "route": 'contact/:id', name: 'contact-search-results', moduleId: PLATFORM.moduleName('./views/contact/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },
      { "route": 'contact/data/:id', name: 'contact-data-form', moduleId: PLATFORM.moduleName('./views/contact/data-form'), title: 'Data Form' ,activationStrategy:'replace'  },
      { "route": 'catalog', name: 'catalog', moduleId: PLATFORM.moduleName('./views/catalog/catalog'), nav: true, title: 'Catalog' },
      { "route": 'catalog/:id', name: 'catalog-search-results', moduleId: PLATFORM.moduleName('./views/catalog/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },
      { "route": 'catalog/data/:id', name: 'catalog-data-form', moduleId: PLATFORM.moduleName('./views/catalog/data-form'), title: 'Data Form' ,activationStrategy:'replace'  },
      // { "route": 'savedlists', name: 'savedlists', moduleId: PLATFORM.moduleName('./views/savedlists/savedlists'), nav: true, title: 'Saved Lists' },
      // { "route": 'savedlists/:id', name: 'contact-detail', moduleId: PLATFORM.moduleName('./views/savedlists/contact-detail'), href: 'contact/123', nav: true, title: 'Contact Detail' ,activationStrategy:'replace'  },
      { "route": 'action', name: 'action', moduleId: PLATFORM.moduleName('./views/action/action'), nav: true, title: 'Actions' },
      { "route": 'action/:id', name: 'action-search-results', moduleId: PLATFORM.moduleName('./views/action/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },
      { "route": 'action/data/:id', name: 'action-data-form', moduleId: PLATFORM.moduleName('./views/action/data-form'), title: 'Data Form'  }, // ,activationStrategy:'replace'
      { "route": 'batchupdate', name: 'batchupdate', moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), nav: true, title: 'Batch' },

      // { route: '', name: 'no-selection',      moduleId: './no-selection',      nav: true, title: 'Select' },
      //  { "route": "grid", "name": "grid", "moduleId": PLATFORM.moduleName("./views/grid/grid"), "nav": true, "title": "Imates-Srv-Inv Grid" },
      // { "route": "gridservice", "name": "gridservice", "moduleId": PLATFORM.moduleName("./views/gridservice/grid"), "nav": true, "title": "Service Grid" },
      // { "route": "inmates", "name": "inmates", "moduleId": PLATFORM.moduleName("./views/inmates/inmates"), "nav": true, "title": "Inmates" },
      // { "route": "inmatesdata", "name": "inmatesdata", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      // { "route": "inmates/:id", "name": "inmates-data-form", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      // { "route": "payee", "name": "payee", "moduleId": PLATFORM.moduleName("./views/payee/payee"), "nav": true, "title": "Payee" },
      { "route": "ab-select", "name": "ab-select", "moduleId": PLATFORM.moduleName("./views/ab-select/ab-select"), "nav": true, "title": "AB Select" }

    ]);

    this.router = router;
  }
  attached() {
    const body = document.querySelector('body');
    if (body) {
      body.addEventListener('keydown', this.onKeyDown.bind(this));
    }
  }
  onKeyDown(e) {
    if (e.key === "a" && e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      this.eventAggregator.publish('keydown:alt-a');
    }
      if (e.key === "s" && e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      this.eventAggregator.publish('keydown:alt-s');
    }
  }
  selectTab(e, tab) {
    e.preventDefault();
    e.stopPropagation();
    // by calling router if canDeactivate is false it wont allow route
    // the canDeactivate raises a dialog
    this.appService.navigate(tab.href);
    return true;
  }
  closeTab(tab, index) {
    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
  }
}

