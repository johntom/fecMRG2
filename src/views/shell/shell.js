// import 'jquery';
// import 'bootstrap';
// import 'kendo.all.min';

// }
// import { PLATFORM } from 'aurelia-pal';

// export class App {
//   configureRouter(config, router) {
//     config.title = 'Michael Rosenfeld'//Aurelia Babel SystemJS';
//     config.map([
//       { "route": ["", "welcome"], "name": "welcome", "moduleId": PLATFORM.moduleName("./welcome"), "nav": true, "title": "Welcome" },
//       { "route": "grid", "name": "grid", "moduleId": PLATFORM.moduleName("./views/grid/grid"), "nav": true, "title": "Imates-Srv-Inv Grid" },
//       { "route": "gridservice", "name": "gridservice", "moduleId": PLATFORM.moduleName("./views/gridservice/grid"), "nav": true, "title": "Service Grid" },
//       { "route": "inmates", "name": "inmates", "moduleId": PLATFORM.moduleName("./views/inmates/inmates"), "nav": true, "title": "Inmates" },
//       { "route": "inmatesdata", "name": "inmatesdata", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
//       { "route": "inmates/:id", "name": "inmates-data-form", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
//       { "route": "payee", "name": "payee", "moduleId": PLATFORM.moduleName("./views/payee/payee"), "nav": true, "title": "Payee" },


//       { "route": "ab-select", "name": "ab-select", "moduleId": PLATFORM.moduleName("./views/ab-select/ab-select"), "nav": true, "title": "AB Select" }


//     ]);

//     this.router = router;
//   }
// }
import { PLATFORM } from 'aurelia-pal';

import { ApplicationService } from '../../services/application-service';
import { AuthorizeStep } from '../../services/authorize-step';

export class Shell {
  static inject = [ApplicationService];

  constructor(appService) {
    this.appService = appService;
  }

  configureRouter(config, router) {
    config.title = 'Michael Rosenfeld';
    config.addPipelineStep('authorize', AuthorizeStep);
    // config.map([
    //   { route: '', redirect: 'home' },
    //   { route: 'home', name: 'home', "moduleId": PLATFORM.moduleName('../home/home'), nav: true, title: 'Home' },
      
    //   { route: 'inventory/:id', name: 'inventory-search-results', "moduleId": PLATFORM.moduleName('../inventory/search-results'), title: 'Search Results' },
    //   { route: 'inventory/data/:id', name: 'inventory-data-form', "moduleId": PLATFORM.moduleName('../inventory/data-form'), title: 'Data Form' },
    //   { route: 'inventory', name: 'inventory', "moduleId": PLATFORM.moduleName('../inventory/inventory'), nav: true, title: 'Inventory' },

    //   { route: 'contact', name: 'contact', "moduleId": PLATFORM.moduleName('../contact/contact), nav: true, title: 'Contact' },
    //   { route: 'contact/:id', name: 'contact-search-results', "moduleId": PLATFORM.moduleName('../contact/search-results'), title: 'Search Results' },
    //   { route: 'contact/data/:id', name: 'contact-data-form', "moduleId": PLATFORM.moduleName('../contact/data-form'), title: 'Data Form' },

    //   { route: 'catalog', name: 'catalog', "moduleId": PLATFORM.moduleName('../catalog/catalog'), nav: true, title: 'Catalog' },
    //   { route: 'catalog/:id', name: 'catalog-search-results', "moduleId": PLATFORM.moduleName('../catalog/search-results'), title: 'Search Results' },
    //   { route: 'catalog/data/:id', name: 'catalog-data-form', "moduleId": PLATFORM.moduleName('../catalog/data-form'), title: 'Data Form' },
    //   { route: 'savedlists', name: 'savedlists', "moduleId": PLATFORM.moduleName('../savedlists/savedlists'), nav: true, title: 'Saved Lists' },
    //   // { route: '', name: 'no-selection',      moduleId: './no-selection',      nav: true, title: 'Select' },
    //   { route: 'savedlists/:id', name: 'contact-detail', "moduleId": PLATFORM.moduleName('../savedlists/contact-detail'), href: 'contact/123', nav: true, title: 'Contact Detail' },
    //   { route: 'action', name: 'action', "moduleId": PLATFORM.moduleName('../action/action'), nav: true, title: 'Actions' },
    //   { route: 'action/:id', name: 'action-search-results', "moduleId": PLATFORM.moduleName('../action/search-results'), title: 'Search Results' },
    //   { route: 'action/data/:id', name: 'action-data-form', "moduleId": PLATFORM.moduleName('../action/data-form'), title: 'Data Form' },

    // ]);
    config.map([
      { "route": ["", "welcome"], "name": "welcome", "moduleId": PLATFORM.moduleName("../home/home"), "nav": true, "title": "Welcome" },
      { "route": "grid", "name": "grid", "moduleId": PLATFORM.moduleName("./views/grid/grid"), "nav": true, "title": "Imates-Srv-Inv Grid" },
      { "route": "gridservice", "name": "gridservice", "moduleId": PLATFORM.moduleName("./views/gridservice/grid"), "nav": true, "title": "Service Grid" },
      { "route": "inmates", "name": "inmates", "moduleId": PLATFORM.moduleName("./views/inmates/inmates"), "nav": true, "title": "Inmates" },
      { "route": "inmatesdata", "name": "inmatesdata", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      { "route": "inmates/:id", "name": "inmates-data-form", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      { "route": "payee", "name": "payee", "moduleId": PLATFORM.moduleName("./views/payee/payee"), "nav": true, "title": "Payee" },


      { "route": "ab-select", "name": "ab-select", "moduleId": PLATFORM.moduleName("./views/ab-select/ab-select"), "nav": true, "title": "AB Select" }


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
