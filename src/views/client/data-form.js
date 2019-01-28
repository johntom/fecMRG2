import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';

@inject(Router, ApiService, ApplicationService, MyDataService)
export class DataForm {
  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
  measures = [
    { id: 0, name: '1/16' },
    { id: 1, name: '2/16' },
    { id: 3, name: '3/16' },
    { id: 4, name: '4/16' },
    { id: 5, name: '5/16' },
    { id: 6, name: '6/16' },
    { id: 7, name: '7/16' },
    { id: 8, name: '8/16' },
    { id: 9, name: '9/16' },
    { id: 10, name: '10/16' },
    { id: 11, name: '11/16' },
    { id: 12, name: '12/16' },
    { id: 13, name: '13/16' },
    { id: 14, name: '14/16' },
    { id: 15, name: '15/16' },

  ];


  searchsold = [
    { id: 0, name: 'Y' },
    { id: 1, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];
  constructor(router, api, appService, dataService) {
    this.api = api
    this.appService = appService
    this.inv = ''
    this.dataService = dataService
    this.router = router
  }
  showModal() {
    alert('in m')
  }
  // findOption = value => {
  //   console.log('value', value)
  //   this.options.find(x => x.name === value);
  // }
  // onChange(selectedartist) {
  //   alert('artist: ' + selectedartist)
  // }
  /**<div class="form-group flex-column-1 margin-left-10">
                  <label for="codes">Genre--</label>
                  <select id="GenreID" class="form-control" change.delegate="selectChangedGenre(currentItem.GenreID)""
                   value.bind="appService.currentItem.GenreID"> 
                        <option model.bind="null">Choose...</option> 
                         <option repeat.for="opt of appService.codesGenre" model.bind="opt.id">
                          ${opt.Description} 
                        </option> 
                      </select>
                </div> */
  showKeywords() {
    alert(`GenreTypes: ${this.currentItem.keywords}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }



  selectChange(GenreID) {
    alert('in c ' + opt + GenreID)
    // let genres = this.appService.codesGenre
    // let gid = genres.findIndex(x => x.id === genreid)
    // let item = genres[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.currentItem.GenreID = item.id
    // this.currentItem.GenreID = this.GenreID
  }

  showAttendees() {
    alert(`GenreTypes: ${this.currentItem.genretypes}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }
  // (MediumSupport,currentItem.MediumSupport)
  selectChangedMS(MediumSupport) {
    alert('in selectChangedMS  ', MediumSupport, this.MediumSupport1)
    // this.MediumText=''
    // let genres = this.appService.codesGenre
    // let gid = genres.findIndex(x => x.id === genreid)
    // let item = genres[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    // this.currentItem.GenreID = item.id

  }
  DropdownChanged(changedVal) {
    alert(changedVal);
  }
  activate(params, routeConfig) {
    this.tabname = this.appService.currentSearch

    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      if (this.recordId === 'create') {
        // return 'new'
        this.currentItem = {}
        this.currentItem.id = 'create'
        this.appService.currentItem = {}
        this.appService.currentItem.id = 'create'
        this.appService.testrec = {}
        this.appService.originalrec = {}
      } else {
        console.log('this.recordId ', this.recordId);
        // if (!this.appService.currentClaim) { // not sure about this condition
        // need return for promise

        //   this.dataService.loadClients()
        return this.api.findClientOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            //  this.inv = inv[0]
            this.currentItem = inv[0]
            this.appService.currentItem = inv[0]
            this.appService.testrec = inv[0]


            this.appService.originalrec = JSON.parse(JSON.stringify(this.appService.currentItem))// inv[0]));

            // return inv
            // });

          })
      }
    }
  }

  attached() {
    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];
    //   this.selectOneToOneTab(tab);
    // }
    // if (this.appService.dataFormOneToManyTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToManyTabs[0];
    //   this.selectOneToManyTab(tab);
    // }



  }

  // selectOneToOneTab(tab) {
  //   this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToOneTab = tab;
  //   return true;
  // }
  // selectOneToManyTab(tab) {
  //   this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
  //   tab.isSelected = true;
  //   this.currentOneToManyTab = tab;
  //   return true;
  // }

  saveclient() {
    if (JSON.stringify(this.appService.currentItem) !== JSON.stringify(this.appService.originalrec)) {
      if (this.appService.currentItem.id === 'create') {
        this.api.addclient(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);
          //console.log('tab ', tab, this.tabname);
          //  this.closeTab(tab);
          //  let rt2 = '#/inventory/' + this.tabname ///claim'//Search?'cant use when search has a number 
          //  this.router.navigate(rt2);
        });
      } else {
        this.api.saveclient(this.appService.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let tab = this.appService.tabs.find(f => f.isSelected);
        });
      }
    }
    this.close();
  }
  close() {
    let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim
    // Finally, we close out this tab
    this.closeTab(tab);
    let rt2 = '#/client/' + this.tabname ///claim'//Search?'cant use when search has a number 
    console.log('this.tabname ', this.tabname)
    this.router.navigate(rt2);
  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }


}