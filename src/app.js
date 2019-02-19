// see Home NOT IN USE
import { PLATFORM } from 'aurelia-pal';
import { ApplicationService } from './services/application-service';
import { AuthorizeStep } from './services/authorize-step';

import { EventAggregator } from 'aurelia-event-aggregator';

export class App {
  static inject() {
    return [ApplicationService, EventAggregator];
  }

  constructor(appService, eventAggregator) {
    this.appService = appService;
    this.eventAggregator = eventAggregator;
  }
 
  // use activationStrategy for all wildcards 
  // { route: 'claim/:id', name: 'claim-search-results', moduleId: PLATFORM.moduleName('./views/claim/search-results'), title: 'Search Results' ,activationStrategy:'replace'  },


  configureRouter(config, router) {
    config.title = 'MRG Layout';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { "route": '', redirect: 'home' },
      { "route": 'home', name: 'home', moduleId: PLATFORM.moduleName('./views/home/home'), nav: true, title: 'Home' },
      { "route": 'inventory/:id', name: 'inventory-search-results', "moduleId": PLATFORM.moduleName('./views/inventory/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'inventory/data/:id', name: 'inventory-data-form', "moduleId": PLATFORM.moduleName('./views/inventory/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'inventory', name: 'inventory', "moduleId": PLATFORM.moduleName('./views/inventory/inventory'), nav: true, title: 'Inventory' },
      { "route": 'contact', name: 'contact', moduleId: PLATFORM.moduleName('./views/contact/contact'), nav: true, title: 'Contact' },
      { "route": 'contact/:id', name: 'contact-search-results', moduleId: PLATFORM.moduleName('./views/contact/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'contact/data/:id', name: 'contact-data-form', moduleId: PLATFORM.moduleName('./views/contact/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'catalog', name: 'catalog', moduleId: PLATFORM.moduleName('./views/catalog/catalog'), nav: true, title: 'Catalog' },
      { "route": 'catalog/:id', name: 'catalog-search-results', moduleId: PLATFORM.moduleName('./views/catalog/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'catalog/data/:id', name: 'catalog-data-form', moduleId: PLATFORM.moduleName('./views/catalog/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      // { "route": 'savedlists', name: 'savedlists', moduleId: PLATFORM.moduleName('./views/savedlists/savedlists'), nav: true, title: 'Saved Lists' },
      // { "route": 'savedlists/:id', name: 'contact-detail', moduleId: PLATFORM.moduleName('./views/savedlists/contact-detail'), href: 'contact/123', nav: true, title: 'Contact Detail' ,activationStrategy:'replace'  },
      { "route":  'action', name: 'action', moduleId: PLATFORM.moduleName('./views/action/action'), nav: true, title: 'Actions', settings: { 
        children: [
          { href: '/fecMRG2/#/action', title: 'Action' },
          { href: '/fecMRG2/#/batchupdate', title: 'Batch' }
        ]} 
      },
      { "route": 'action/:id', name: 'action-search-results', moduleId: PLATFORM.moduleName('./views/action/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'action/data/:id', name: 'action-data-form', moduleId: PLATFORM.moduleName('./views/action/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'
      { "route": 'batchupdate', name: 'batchupdate', moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), title: 'Batch' },
      { "route": 'artist', name: 'artist', moduleId: PLATFORM.moduleName('./views/artist/artist'), nav: true, title: 'Artist' },
      { "route": 'artist/:id', name: 'artist-search-results', moduleId: PLATFORM.moduleName('./views/artist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'artist/data/:id', name: 'artist-data-form', moduleId: PLATFORM.moduleName('./views/artist/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'
      { "route": 'org', name: 'org', moduleId: PLATFORM.moduleName('./views/org/org'), nav: true, title: 'Org' },
      { "route": 'org/:id', name: 'org-search-results', moduleId: PLATFORM.moduleName('./views/org/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'org/data/:id', name: 'org-data-form', moduleId: PLATFORM.moduleName('./views/org/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'
      { route: 'code/:id', name: 'code-search-results', moduleId: PLATFORM.moduleName('./views/code/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { route: 'code/data/:id', name: 'code-data-form', moduleId: PLATFORM.moduleName('./views/code/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { route: 'code', name: 'code', moduleId: PLATFORM.moduleName('./views/code/code'), nav: true, title: 'Code' },
      { route: 'todo/:id', name: 'todo-search-results', moduleId: PLATFORM.moduleName('./views/todo/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { route: 'todo/data/:id', name: 'todo-data-form', moduleId: PLATFORM.moduleName('./views/todo/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { route: 'todo', name: 'todo', moduleId: PLATFORM.moduleName('./views/todo/todo'), nav: true, title: 'Todo' },


  // { "route": "ab-select", "name": "ab-select", "moduleId": PLATFORM.moduleName("./views/ab-select/ab-select"), "nav": true, "title": "AB Select" }

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
    if (e.key === "a" && e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      this.eventAggregator.publish('keydown:ctrl-a');
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
  isSingleActionMenu(row) {
    return !row.settings.children;
  }
  isCollapsibleMenu(row) {
    return row.settings && row.settings.children;
  }
}

