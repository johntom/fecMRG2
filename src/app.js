
// export class App {
//   configureRouter(config, router) {
//     config.title = 'Aurelia Babel SystemJS';
//     config.map([
//       {"route": ["", "welcome"], "name": "welcome", "moduleId": "./views/welcome/welcome", "nav": true, "title": "Welcome"},
//       {"route": "bootstrap-select", "name": "bootstrap-select", "moduleId": "./views/bootstrap-select/bootstrap-select", "nav": true, "title": "Bootstrap Select"}
//       // {"route": "bootstrap-select-demo", "name": "bootstrap-select-demo", "moduleId": "./views/bootstrap-select-demo/bootstrap-select-demo", "nav": true, "title": "Bootstrap Select Demo"}
//     ]);

//     this.router = router;
//   }
// }
import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Inmate Medical'//Aurelia Babel SystemJS';
    config.map([
      { "route": ["", "welcome"], "name": "welcome", "moduleId": PLATFORM.moduleName("./welcome"), "nav": true, "title": "Welcome" },
      { "route": "grid", "name": "grid", "moduleId": PLATFORM.moduleName("./views/grid/grid"), "nav": true, "title": "Imates-Srv-Inv Grid" },
      { "route": 'inventory/:id', name: 'inventory-search-results', "moduleId":PLATFORM.moduleName('./views/inventory/search-results'), title: 'Search Results' },
      { "route": 'inventory/data/:id', name: 'inventory-data-form', "moduleId":PLATFORM.moduleName('./views/inventory/data-form'), title: 'Data Form' },
      { "route": 'inventory', name: 'inventory', "moduleId": PLATFORM.moduleName('./views/inventory/inventory'), nav: true, title: 'Inventory' },

     
     
      { "route": "gridservice", "name": "gridservice", "moduleId": PLATFORM.moduleName("./views/gridservice/grid"), "nav": true, "title": "Service Grid" },
      { "route": "inmates", "name": "inmates", "moduleId": PLATFORM.moduleName("./views/inmates/inmates"), "nav": true, "title": "Inmates" },
      { "route": "inmatesdata", "name": "inmatesdata", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      { "route": "inmates/:id", "name": "inmates-data-form", "moduleId": PLATFORM.moduleName("./views/inmates/data-form"), "nav": false, "title": "InmatesData" },
      { "route": "payee", "name": "payee", "moduleId": PLATFORM.moduleName("./views/payee/payee"), "nav": true, "title": "Payee" },


      { "route": "ab-select", "name": "ab-select", "moduleId": PLATFORM.moduleName("./views/ab-select/ab-select"), "nav": true, "title": "AB Select" }


    ]);

    this.router = router;
  }
}
