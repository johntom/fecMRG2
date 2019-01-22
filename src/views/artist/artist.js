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
  // findOptionA = value => this.appService.findIndex(x => x.ArtistName === value)
  // findOptionA =  this.appService.artistList.find(x => x.ArtistName === value)
  // findOptionA = value => this.appService.artistList.find(x => x.ArtistName === value)
  //   let mid = meds.findIndex(x => x._id === this.currentItem.SoldTo)
  //      let orgobj = this.appService.orgsList[mid]//10]
  //      // let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
  //      // let item = insco[aid];
  //         let item = insco.find(x => x._id === serviceinsco)
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
  changeCallbackArtist(selectedValueA) {
    let findvalue = this.myDatalistA.value
  }

  addartist() {
   
    this.router.navigate(`#/artist/data/create`);
  }


  performSearch() {
    if (this.search) {
      console.log('this.search', this.search)
      // let item = insco.find(x => x._id === serviceinsco)  let  artist =  this.myDatalistA.value
      let item = this.appService.artistList.find(x => x.ArtistName === this.myDatalistA.value)

      // let qs = this.utilService.generateQueryString(this.search);
      let qs = this.utilService.generateQueryString(item.id);

      //  let adj =`${this.ADJUSTER_NAME.ADJUSTER_ID}`
      //  let  artist =  this.myDatalistA.value
      // let path = `Searchartist${qs}`;

      // if (artist !== null) {
      //   let rt2 = '#/artist/data/' + artist
      //   this.router.navigate(rt2)

      // } else this.router.navigate(`#/artist/${path}`);
      let path = `Searchartist${qs}`;
// data
      if (item !== null) {
        let rt2 = '#/artist/data/' + item.id
        this.router.navigate(rt2)

      } else this.router.navigate(`#/artist/${path}`);


    }
  }


}