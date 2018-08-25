// import 'jquery';
// import 'bootstrap';
// import 'kendo.all.min';
import { ApplicationService } from '../../services/application-service';
import { AuthorizeStep } from '../../services/authorize-step';
import { PLATFORM } from 'aurelia-pal';

export class Shell {
  static inject = [ApplicationService];

  constructor(appService) {
    this.appService = appService;
  }

  configureRouter(config, router) {
    config.title = 'MRG Layout';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: '', redirect: 'home' },
        { "route": ["", "welcome"], "name": "welcome", "moduleId": PLATFORM.moduleName("../../welcome"), "nav": true, "title": "Welcome" },
      { "route": "grid", "name": "grid", "moduleId": PLATFORM.moduleName("../grid/grid"), "nav": true, "title": "Imates-Srv-Inv Grid" },

      // { route: 'home', name: 'home', moduleId: '../home/home', nav: true, title: 'Home' },
      // { route: 'inventory/:id', name: 'inventory-search-results', moduleId: '../inventory/search-results', title: 'Search Results' },
      // { route: 'inventory/data/:id', name: 'inventory-data-form', moduleId: '../inventory/data-form', title: 'Data Form' },
      // { route: 'inventory', name: 'inventory', moduleId: '../inventory/inventory', nav: true, title: 'Inventory' },

      // { route: 'contact', name: 'contact', moduleId: '../contact/contact', nav: true, title: 'Contact' },
      // { route: 'contact/:id', name: 'contact-search-results', moduleId: '../contact/search-results', title: 'Search Results' },
      // { route: 'contact/data/:id', name: 'contact-data-form', moduleId: '../contact/data-form', title: 'Data Form' },

      // { route: 'catalog', name: 'catalog', moduleId: '../catalog/catalog', nav: true, title: 'Catalog' },
      // { route: 'catalog/:id', name: 'catalog-search-results', moduleId: '../catalog/search-results', title: 'Search Results' },
      // { route: 'catalog/data/:id', name: 'catalog-data-form', moduleId: '../catalog/data-form', title: 'Data Form' },
      // { route: 'savedlists', name: 'savedlists', moduleId: '../savedlists/savedlists', nav: true, title: 'Saved Lists' },
      // // { route: '', name: 'no-selection',      moduleId: './no-selection',      nav: true, title: 'Select' },
      // { route: 'savedlists/:id', name: 'contact-detail', moduleId: '../savedlists/contact-detail', href: 'contact/123', nav: true, title: 'Contact Detail' },
      // { route: 'action', name: 'action', moduleId: '../action/action', nav: true, title: 'Actions' },
      // { route: 'action/:id', name: 'action-search-results', moduleId: '../action/search-results', title: 'Search Results' },
      // { route: 'action/data/:id', name: 'action-data-form', moduleId: '../action/data-form', title: 'Data Form' },

    ]);

    this.router = router;
  }

  // selectTab(tab) {
  //   this.appService.tabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   return true;
  // }
  // closeTab(tab, index) {
  //   let wasSelected = tab.isSelected;
  //   tab.isSelected = false;
  //   this.appService.tabs.splice(index, 1);
  //   if (wasSelected && this.appService.tabs.length > 0) {
  //     let newIndex = (index > 0) ? index - 1 : 0;
  //     let newTab = this.appService.tabs[newIndex];
  //     newTab.isSelected = true;
  //     this.router.navigate(newTab.href);
  //   }
  // }

  // may 2018 new generic close

  
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
