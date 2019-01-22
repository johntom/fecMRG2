import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(ApiService, ApplicationService, MyDataService, EventAggregator)
export class DataForm {
  heading = 'DataAddForm HEADER...';
  footer = 'DataAddForm FOOTER...';
  adjusterList = 'adjusterList';
  recordId = '';


  constructor(api, appService, dataService, eventAggregator) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.dataService = dataService;
    this.eventAggregator = eventAggregator;
    this.createEventListeners();

  }

  async activate(params, routeConfig) {

    if (params.id) {
      this.recordId = params.id;
      if (this.recordId === 'create') {
      } else {
        console.log('this.recordId ', this.recordId);
        let response = await this.api.findArtistid(this.recordId);
        this.artist = response.data[0];

      }
    }


  }

  attached() {


    if (this.appService.dataFormOneToManyTabs3.length > 0) {
      let tab = this.appService.dataFormOneToManyTabs3[0];
      this.selectOneToManyTab(tab);
    }
  }


  bind() {
    // this.adjusters = this.appService.adjusterList
    // console.log('adjusters ', this.adjusters);

    // this.bookApi.getGenres().then(genres => {
    //   this.adjusters = genres;
    // });
  }

  createEventListeners() {
    // this.adjusterSelectedListener = e => {
    //   if (e && e.detail) {
    //     this.adjuster = e.detail.value;
    //     console.log('this.adjuster  createEventListeners ', this.adjuster)
    //   }
    // };

  }



  detached() {
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }


  async saveartist() {
    // alert('save claim') //this.currentItem this.appService.originalrec 

    // console.log(' call save ', JSON.stringify(this.appService.currentClaim) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    // //return 
    // if (JSON.stringify(this.appService.currentClaim) !== JSON.stringify(this.appService.originalrec)) {

    //   this.api.saveclaim(this.appService.currentClaim).then((jsonRes) => {
    //     console.log('jsonRes ', jsonRes);

    //   });

    // }

    // async  updateartist(rec) {  createartist

//     if (this.recordId === 'create') {
//       let response = await this.api.createartist(this.artist);
//       this.artist = response.data[0];

//     } else {
//       console.log('this.recordId ', this.recordId);

//       let response = await this.api.updateartist(this.artist);
//       this.artist = response.data[0];
// }
 let response = await this.api.updateartistAA(this.artist);
  // this.artist = response.data[0];
  // this.api.updateartist(this.artist).then((jsonRes) => {
  //       console.log('jsonRes ', jsonRes);

  //     });


    

  }
  //  if (this.appService.dataFormOneToManyTabs3.length > 0) {
  //       let tab = this.appService.dataFormOneToManyTabs3[0];
  //       this.selectOneToManyTab(tab);
  //     }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs3.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    //   this.appService.currentItem = this.currentItem
    return true;
  }
}

