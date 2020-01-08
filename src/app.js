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
    this.secured = false
    // this.user='jrt0'
    // this.password='111'
    this.appService.version = ' 406.12'
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
      { "route": 'inventory/alt/:id', name: 'inventory-search-results', "moduleId": PLATFORM.moduleName('./views/inventory/search-results2'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'inventory/data/:id', name: 'inventory-data-form', "moduleId": PLATFORM.moduleName('./views/inventory/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'inventory', name: 'inventory', "moduleId": PLATFORM.moduleName('./views/inventory/inventory'), nav: true, title: 'Inventory' },
      { "route": 'inventory/rtfcreate/:id', name: 'rtfcreate', "moduleId": PLATFORM.moduleName('./views/inventory/rtfcreate'), title: 'rtfcreate Form', activationStrategy: 'replace' },
      { "route": 'action', name: 'action', moduleId: PLATFORM.moduleName('./views/action/action'), nav: true, title: 'Action' },
      { "route": 'action/:id', name: 'action-search-results', moduleId: PLATFORM.moduleName('./views/action/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'action/data/:id', name: 'action-data-form', moduleId: PLATFORM.moduleName('./views/action/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'contact', name: 'contact', moduleId: PLATFORM.moduleName('./views/contact/contact'), nav: true, title: 'Contact' },
      { "route": 'contact/:id', name: 'contact-search-results', moduleId: PLATFORM.moduleName('./views/contact/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'contact/data/:id', name: 'contact-data-form', moduleId: PLATFORM.moduleName('./views/contact/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'catalog', name: 'catalog', moduleId: PLATFORM.moduleName('./views/catalog/catalog'), nav: true, title: 'Catalog' },
      { "route": 'catalog/:id', name: 'catalog-search-results', moduleId: PLATFORM.moduleName('./views/catalog/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'catalog/data/:id', name: 'catalog-data-form', moduleId: PLATFORM.moduleName('./views/catalog/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { "route": 'org', name: 'org', moduleId: PLATFORM.moduleName('./views/org/org'), nav: true, title: 'Org' },
      { "route": 'org/:id', name: 'org-search-results', moduleId: PLATFORM.moduleName('./views/org/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'org/data/:id', name: 'org-data-form', moduleId: PLATFORM.moduleName('./views/org/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'
      { route: 'mailinglist/:id', name: 'mailinglist-search-results', moduleId: PLATFORM.moduleName('./views/mailinglist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { route: 'mailinglist/data/:id', name: 'mailinglist-data-form', moduleId: PLATFORM.moduleName('./views/mailinglist/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { route: 'mailinglist', name: 'email', moduleId: PLATFORM.moduleName('./views/mailinglist/mailinglist'), nav: true, title: 'Mailing list' },
      { route: 'maint', name: 'maint', moduleId: PLATFORM.moduleName('./views/maint/maint'), nav: true, title: 'Maintenance' },
      { "route": 'artist', name: 'artist', moduleId: PLATFORM.moduleName('./views/artist/artist'), nav: false, title: 'Artist' },
      { "route": 'artist/:id', name: 'artist-search-results', moduleId: PLATFORM.moduleName('./views/artist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { "route": 'artist/data/:id', name: 'artist-data-form', moduleId: PLATFORM.moduleName('./views/artist/data-form'), title: 'Data Form' }, // ,activationStrategy:'replace'
      { route: 'code/:id', name: 'code-search-results', moduleId: PLATFORM.moduleName('./views/code/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { route: 'code/data/:id', name: 'code-data-form', moduleId: PLATFORM.moduleName('./views/code/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { route: 'code', name: 'code', moduleId: PLATFORM.moduleName('./views/code/code'), nav: false, title: 'Code' },
      { route: 'todo/:id', name: 'todo-search-results', moduleId: PLATFORM.moduleName('./views/todo/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      { route: 'todo/data/:id', name: 'todo-data-form', moduleId: PLATFORM.moduleName('./views/todo/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      { route: 'todo', name: 'todo', moduleId: PLATFORM.moduleName('./views/todo/todo'), nav: false, title: 'Todo' },
      { route: 'contactdups', name: 'contactdups', moduleId: PLATFORM.moduleName('./views/contactdups/contactdups'), title: 'Contactdups', activationStrategy: 'replace' },


      //   { "route": 'batchupdate/batchupdate', name: 'batchupdate', nav: true, moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), title: 'BatchUpdate', activationStrategy: 'replace' },
      //{ "route": 'batchupdate', name: 'batchupdate', moduleId: PLATFORM.moduleName('./views/batchupdate/batchupdate'),{ "route": 'batchupdate/:id', name: 'batchupdate-search-results', moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      //{ "route": 'batchupdate/:id', name: 'batchupdate-search-results', moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      // { "route": 'batchupdate/data/:id', name: 'batchupdate-data-form', moduleId: PLATFORM.moduleName('./views/batchupdate/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      // { "route": 'batchupdate', name: 'batchupdate', moduleId: PLATFORM.moduleName('./views/batchupdate/batchupdate'), nav: true, title: 'Search Results', activationStrategy: 'replace' },
      // { "route": 'batchupdate', name: 'batchupdate', moduleId: PLATFORM.moduleName('./views/batchupdate/search-results'), title: 'Batch' },
      // { route: 'email/:id', name: 'email-search-results', moduleId: PLATFORM.moduleName('./views/emaillist/search-results'), title: 'Search Results', activationStrategy: 'replace' },
      // { route: 'email/data/:id', name: 'email-data-form', moduleId: PLATFORM.moduleName('./views/emaillist/data-form'), title: 'Data Form', activationStrategy: 'replace' },
      // { route: 'email', name: 'email', moduleId: PLATFORM.moduleName('./views/emaillist/email'), nav: false, title: 'Email' },
      // { "route":  'action', name: 'action', moduleId: PLATFORM.moduleName('./views/action/action'), nav: true, title: 'Actions', settings: { 
      // children: [
      //   { href: '/fecMRG2/#/action', title: 'Action' },
      //   { href: '/fecMRG2/#/batchupdate', title: 'Batch' }
      // ]} 
      // },
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

  login() {
    // michael Homer211
    // elleng  hihihi..or hihihi19
    // francesca  Charlotte12!
    // mrg  Homer@211!
    // colleen yemayah1
    // mdk   preparator
    // Matthew MRG4data!

    // Zachary  Serper100
    // Dan Serper-1
    // Valentina  calix18cup
    // mdk   preparato
    let user = this.user
    this.loginmessage = '11/5/2019'; 
    //this.loginmessage = 'wrong password!'
    switch (user) {
      case null:
        dim = 0
        break;
      case 'michael':
        if (this.password === 'Homer211') {
          this.appService.loginuser = this.user
          this.appService.gridview = 1
          this.secured = true

        }
        break;
      case 'halley':
        if (this.password === 'Homer211') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'ryan':
        if (this.password === 'Homer211') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;


      case 'hooper':
        if (this.password === 'GWENstefani123!') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'francesca':
        if (this.password === 'Charlotte12!') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'Matthew':
        if (this.password === 'MRG4data!') {
          this.appService.loginuser = this.user
          this.appService.gridview = 1
          this.secured = true

        }
      case 'mdk':
        if (this.password === 'preparator') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'elleng':
        if (this.password === 'hihihi19') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'jrt':
        if (this.password === '111') {
          this.appService.loginuser = this.user
          this.appService.gridview = 1
          this.secured = true

        }
        break;
      case 'jrt0':
        if (this.password === '111') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true
        }
        break;
      case 'jrt2':
        //  if (this.password === 'jrt11111') {
        this.appService.loginuser = this.user
        this.appService.gridview = 2
        this.secured = true

        // }
        break;
      case 'colleen':
        if (this.password === 'yemayah1') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'mrg':
        if (this.password === 'Homer@211!') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'ap':
        if (this.password === 'Test1234!') {
          this.appService.loginuser = this.user
          this.appService.gridview = 1
          this.secured = true

        }
        break;
      case 'Zachary':
        if (this.password === 'Serper100') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'Dan':
        if (this.password === 'Serper-1') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
      case 'Valentina':
        if (this.password === 'calix18cup') {
          this.appService.loginuser = this.user
          this.appService.gridview = 0
          this.secured = true

        }
        break;
    }


    // if (this.user === 'michael') {
    //   if (this.password === 'Homer@211') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 1
    //     this.secured = true

    //   } else this.loginmessage = 'wrong password!'
    // }
    // if (this.user === 'francesca') {
    //   if (this.password === 'Charlotte12!') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 0
    //     this.secured = true

    //   } else this.loginmessage = 'wrong password!'
    // }
    // if (this.user === 'elleng') {
    //   if (this.password === 'hihihi19') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 0
    //     this.secured = true
    //   }
    // } else this.message = 'wrong password!'


    // if (this.user === 'Matthew') {
    //   if (this.password === 'MRG4data!') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 1
    //     this.secured = true
    //   }
    // } else this.loginmessage = 'wrong password!'
    // if (this.user === 'mdk') {
    //   if (this.password === 'preparator') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 0
    //     this.secured = true
    //   }
    // } else this.loginmessage = 'wrong password!'

    // if (this.user === 'jrt') {
    //   // if (this.password === 'jrt11111') {
    //   this.appService.loginuser = this.user
    //   this.appService.gridview = 1
    //   this.secured = true
    //   // }
    // } else this.loginmessage = 'wrong password!'


    // if (this.user === 'colleen') {
    //   if (this.password === 'MRG4data!') {
    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 0
    //     this.secured = true
    //   }
    // } else this.loginmessage = 'wrong password!'


    // if (this.user === 'mrg') {
    //   if (this.password === 'Homer@211!' || this.password === 'jrt11111') {

    //     this.appService.loginuser = this.user
    //     this.appService.gridview = 0
    //     this.secured = true

    //   }
    // } else this.loginmessage = 'wrong password!'


    // if (this.password === 'Homer@211!' || this.password === 'jrt11111') {

    //   this.appService.loginuser = this.user
    //   this.secured = true

    // }

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

      // { "route": 'savedlists', name: 'savedlists', moduleId: PLATFORM.moduleName('./views/savedlists/savedlists'), nav: true, title: 'Saved Lists' },
      // { "route": 'savedlists/:id', name: 'contact-detail', moduleId: PLATFORM.moduleName('./views/savedlists/contact-detail'), href: 'contact/123', nav: true, title: 'Contact Detail' ,activationStrategy:'replace'  },
      // { "route":  'action', name: 'action', moduleId: PLATFORM.moduleName('./views/action/action'), nav: true, title: 'Actions', settings: { 
      //   children: [
      //     { href: '/fecMRG2/#/action', title: 'Action' },
      //     { href: '/fecMRG2/#/batchupdate', title: 'Batch' }
      //   ]} 
      // },
      //  href: '/fecMRG2/#/action', title: 'Action' },
        //   { href: '/fecMRG2/#/batchupdate', title: 'Batch' }