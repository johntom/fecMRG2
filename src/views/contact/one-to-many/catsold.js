import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from   '../../../services/prompt';

import { Promptcontact } from '../prompt';

@inject(ApiService, ApplicationService, DialogService)
export class Catsold {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // notes: Note[] = [];
  //newNoteWorkDate = '';
  //newNote= '';
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentContactItem//testrec;

    // console.log('consignedto ', this.currentItem.consignedto)
    this.dialogService = dialogService
  }

  // <input click.delegate="showModal('ConsignedTo')" type="text" id="ConsignedTo" class="form-control input-sm" value.bind="currentItem.consignedtoname">

  activate(params, routeConfig) {
    // causes a save option
    
    // let oid
    // let orgobj
    // let orgs = this.appService.orgsList
   
    // if ((this.currentItem.ConsignedTo === undefined) || (this.currentItem.ConsignedTo === null)) {
    // } else {
    //   oid = orgs.findIndex(x => x._id === this.currentItem.ConsignedTo)
    //   orgobj = this.appService.orgsList[oid]//10]
    //   if (orgobj !== undefined) this.currentItem.consignedtoname = orgobj.OrgName
    // }



  }
  // 	<tr repeat.for="catalogsold of currentItem.catalogsold" with.bind="catalogsold">

  addItem() {
    let catalogsold = this.currentItem.catalogsold
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (catalogsold === undefined) {
      flag = true
      catalogsold = []
    }
    let cDate = moment().format('YYYY-MM-DD')

    item = {}// ConsignmentNotes: '', CreatedDate: cDate, edit: true }
    catalogsold.unshift(item)
    if (flag) this.currentItem.catalogsold = catalogsold
  }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let catalogsold = this.currentItem.catalogsold
        catalogsold.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  cancel(item, index) {

  }
  save(note, index) {

  }
  // showModal(fieldname, index) {
  //   this.currentItem.fieldname = fieldname
  //   this.currentItem.ConsignedTo = this.currentItem.consignedto[index].ConsignedTo
  //   this.currentItem.consignedtoname = this.currentItem.consignedto[index].consignedtoname

  //   //   this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {

  //   this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

  //     this.currentItem.consignedto[index].ConsignedTo = this.currentItem.ConsignedTo
  //     this.currentItem.consignedto[index].consignedtoname = this.currentItem.consignedtoname
  //     if (!response.wasCancelled) {
  //       // console.log('Delete') InsuredBy
  //       // let notes = this.currentItem.notes
  //       // notes.splice(index, 1)// start, deleteCount)
  //     } else {
  //       console.log('cancel');
  //     }
  //     console.log(response.output);
  //   });
  // }
  showModal(fieldname, index) {


    //  this.currentItem.fieldname = 'Artist'//fieldname

    //     this.currentItem.artist = this.currentItem.artists[index]//.artists
    //     if (this.currentItem.artist.ArtistName === undefined) this.currentItem.artist.ArtistName = '';


    this.currentItem.fieldname = 'Catalog'//fieldname
    // if ( this.currentItem.catalogsold!==undefined) {
    //     this.currentItem.catalog = this.currentItem.catalogsold[index]
    //     if (this.currentItem.catalog.CatalogTitle === undefined) this.currentItem.catalog.CatalogTitle = '';
    // }

    this.currentItem.catalog = this.currentItem.catalogsold[index]//.artists
    if (this.currentItem.catalog.CatalogTitle === undefined) this.currentItem.catalog.CatalogTitle = '';


    this.dialogService.open({ viewModel: Promptcontact, model: this.currentItem, lock: true }).whenClosed(response => {
      if (response.wasCancelled) {
        console.log('cancel');
      } else {
        this.currentItem.catalogsold[index].id = this.currentItem.catalog.id
        this.currentItem.catalogsold[index].CatalogTitle = this.currentItem.catalog.CatalogTitle

        // console.log('1 ',this.currentItem.catalog.id)
        // console.log('2 ',this.currentItem.catalog[index].id)
        // this.currentItem.catalog[index].id = this.currentItem.catalog.id
        // this.currentItem.catalog[index].CatalogTitle = this.currentItem.catalog.CatalogTitle
        // console.log('3 ',this.currentItem.catalog[index].id)

        let catalogrec = {}
        catalogrec.id = this.currentItem.catalog.id;
        catalogrec.CatalogTitle = this.currentItem.catalog.CatalogTitle;
        this.currentItem.catalogsold[index] = catalogrec;
        this.currentItem.catalog = catalogrec
        this.catname = catalogrec
   //     delete this.currentItem.catalog
      }
      console.log(response.output);
    });
  }
}
