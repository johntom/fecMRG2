// mods: by:jrt date: 1/23/2019 
import { Aurelia } from 'aurelia-framework';
import { Router, Redirect } from 'aurelia-router';
import { ApplicationService } from './application-service';
// import {SessionService} from './session-service';

export class AuthorizeStep {
  // static inject = [Aurelia, Router, ApplicationService, SessionService];
  static inject = [Aurelia, Router, ApplicationService];

  // constructor(aurelia, router, appService, sessionService) {
  constructor(aurelia, router, appService) {
    this.aurelia = aurelia;
    this.router = router;
    this.appService = appService;
    // this.sessionService = sessionService;
  }

  run(navigationInstruction, next) {
    // if (this.sessionService.isAuthenticated()) {
    localStorage.setItem('href', window.location.href);
    let hash = window.location.hash;
    let keyHash = window.location.hash;
    let keyHashroot = ''
    if (keyHash.indexOf('?') > 0) {
      keyHashroot = keyHash.substring(0, keyHash.indexOf('?'));
      keyHash = keyHash.substring(keyHash.indexOf('?'));

    }
    // to create a singleton find if last char of keyHashroot='-'
    // hadcoded if (keyHashroot==='#/action/Actionlist') keyHash = keyHashroot
    if (keyHashroot.indexOf('-') > 0) {
      keyHash = keyHashroot.substring(0, keyHashroot.indexOf('-'));
    }
    let found = this.appService.tabs.find(f => f.key === keyHash);
    if (!found) {
      let name = window.location.hash
        .split('/')
        .pop();

      if (name.indexOf('?') > 0) {
        // if (name.indexOf('contact or savedlists') > 0) {
        //   name = name.substring(0, name.indexOf('contact'));
        // } else

        if (hash.indexOf('&tabname') > 0) {
          // &singletonname=savedlists
          // name = hash.substring(0, hash.indexOf('&singletonname' + 1));
          if (hash.indexOf("=") > 0) {
            name = hash.substring(hash.indexOf('=') + 1);
          }
          // else {
          // should never make it here    
          //   //// put val after ? on tab
          //   name = keyHash.substring(1, keyHash.length);
          //   //// This replace function removes both "r"

          //   name = name.replace(/%3D/g, "")
          //   name = name.replace(/\s/g, "") //replace space
          // }
        } else {
          // name = keyHash
          //// put val after ? on tab
          if (hash.indexOf('&search') > 0) {
            name = keyHashroot;
          } else {

            name = keyHash.substring(1, keyHash.length);
          }
          //// This replace function removes both "r"
          name = name.replace(/%22/g, "")
          name = name.replace(/%20/g, "")


          name = name.replace(/%3D/g, ":")
          name = name.replace(/\s/g, "") //replace space
        }
      }

      let tab = {
        key: keyHash,
        name: name || 'home',
        href: hash || '#/home'
      };
      this.appService.tabs.push(tab);
      this.appService.tabs.forEach(t => t.isSelected = false);
      tab.isSelected = true;
    } else {
      this.appService.tabs.forEach(t => t.isSelected = false);
      found.isSelected = true;
    }
    return next();
    // } else {
    //   next.cancel();
    //   window.location.href = window.location.origin;
    //   return;        
    // }
  }

}
