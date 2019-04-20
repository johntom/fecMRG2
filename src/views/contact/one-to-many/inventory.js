
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';

import { Prompt } from   '../../../services/prompt';

import { bindable } from 'aurelia-framework';

import { Promptcontact } from '../prompt';



@inject(ApiService, ApplicationService, DialogService)
export class Inventory {
  @bindable searchdoc
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  //   provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentContactItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  modalDocs() {

    this.dialogService.open({ viewModel: Prompt, model: 'docs', lock: false }).whenClosed(response => {

      console.log(response.output);
    });
  }
  searchdocChanged(value) {
  
    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }

  showModal(fieldname, index) {

    this.currentItem.fieldname = 'Artist'//fieldname

    this.currentItem.artist = this.currentItem.artists[index]//.artists
    if (this.currentItem.artist.ArtistName === undefined) this.currentItem.artist.ArtistName = '';

    this.dialogService.open({ viewModel: Promptcontact, model: this.currentItem, lock: true }).whenClosed(response => {
      if (response.wasCancelled) {
        console.log('cancel');
      } else {
        this.currentItem.artists[index].id = this.currentItem.artist.id
        this.currentItem.artists[index].ArtistName = this.currentItem.artist.ArtistName
       
        let artistrec = {}
        artistrec.id = this.currentItem.artist.id;
        artistrec.ArtistName = this.currentItem.artist.ArtistName;
        artistrec.yearofBirth = this.currentItem.artist.yearofBirth;
        artistrec.died = this.currentItem.artist.died;


        this.currentItem.artists[index] = artistrec;
        this.currentItem.artists = this.currentItem.artists
        this.artname = artistrec

      }
      console.log(response.output);
    });
  }

  addItem() {
    let artists = this.currentItem.artists
    let flag = false
    let item
    if (artists === undefined) {
      flag = true
      artists = []
    }
    item = {
      ArtistName: ''
    }
    artists.unshift(item)
    if (flag) this.currentItem.artists = artists
    this.newartists = '';
  }




  remove(item, index) {
    this.mode = 0
   
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let artists = this.currentItem.artists
        artists.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
}

