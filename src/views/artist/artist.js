import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
import { ApplicationService } from '../../services/application-service';
import { ApiService } from '../../utils/servicesApi';
import { DialogService } from 'aurelia-dialog';
// import { lodash } from 'lodash'
// import { Prompt } from '../claim/prompt';

export class Artist {
  static inject = [Router, UtilService, ApplicationService, ApiService, DialogService];

  heading = 'Welcome to the Artist page';
  counter = 1;
  search = {}
  selectedValue = null; //ADJUSTER_NAME
  // arists
  selectedValueA = null;
  findOptionA = value => this.appService.artistList.find(x => x.ArtistName === value)

  constructor(router, utilService, appService, api, dialogService) {
    console.log('name-tag constructor');
    this.router = router;
    this.utilService = utilService;
    this.searchInvCode = null
    this.appService = appService;
    this.api = api;
    this.dialogService = dialogService
  
  }
  //  findOption = value => this.appService.adjusterList.find(x => x.ADJUSTER_NAME === value);
  created() {
    console.log('name-tag created');
  }

  bind() {
    console.log('name-tag bind');
  }

  attached() {
    console.log('name-tag attached');
  }

  showModal(fieldname) {
    // this.appService.currentSearchadj = {}
    // this.appService.currentSearchadj.ADJUSTER_ID = undefined
    // this.appService.currentSearchadj.ADJUSTER_NAME = undefined

    // // this.currentItem.ADJUSTER_NAME=undefined
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    //   console.log(response.output)
    //   console.log(this.appService.currentSearchadj)
    //   // this.ADJUSTER_ID = this.appService.currentSearchadj.ADJUSTER_ID + ' ' + this.appService.currentSearchadj.ADJUSTER_NAME
    //   this.search.adjuster = this.appService.currentSearchadj.ADJUSTER_ID
    // });
  }
  activate() {
    console.log('name-tag activate before attached ');
  
  }

  detached() {
    console.log('name-tag detached');
  }

  unbind() {
    console.log('name-tag unbind');
  }

  performSearch() {
    if (this.search) {
      console.log('this.search', this.search)
      let qs = this.utilService.generateQueryString(this.search);
  
//  let adj =`${this.ADJUSTER_NAME.ADJUSTER_ID}`
      let  artist = this.ArtistName
      let path = `Searchartist${qs}`;
  
      if (artist !== null) {
        let rt2 = '#/artist/data/' + artist
        this.router.navigate(rt2)

      } else this.router.navigate(`#/artist/${path}`);
    }
  }


}