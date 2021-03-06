import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
// import { ynPrompt } from '../../../services/prompt';

import { Promptyn } from '../../../services/promptyn';
import { Prompt } from '../prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Type {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
   this.currentItem = this.appService.currentContactItem;
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }
   saveitem(item,index) {
    item.edit = !item.edit
   
  }
  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    //InsuredBy
    if ((this.currentItem.ConservedBy === undefined) || (this.currentItem.ConservedBy === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.ConservedBy)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.conservedbyname = orgobj.OrgName
    }
  }
  remove(item, index) {
    // alert('you are about to delete ' + item.Notes + ' ' + index)
    // this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    // this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
  
      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.conservation
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  showModal(fieldname, index) {
    this.currentItem.fieldname = fieldname
    this.currentItem.ConservedBy = this.currentItem.conservation[index].ConservedBy // mongoid
    this.currentItem.conservedbyname = this.currentItem.conservation[index].conservedbyname

    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
        
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

    
      this.currentItem.conservation[index].ConservedBy = this.currentItem.ConservedBy
      this.currentItem.conservation[index].conservedbyname = this.currentItem.conservedbyname
      if (!response.wasCancelled) {
        // console.log('Delete') currentItem.conservation
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  addDetail() {
    let conservation = this.currentItem.conservation
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (conservation === undefined) {
      flag = true
      conservation = []
    }
    item = { Treatment: '', edit: true }
    conservation.unshift(item)
    if (flag) this.currentItem.conservation = conservation
  }

  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let notes = this.currentItem.notes//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {

      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {

      this.currentItem.notes[index] = this.currentnote
      console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

    }
    this.mode = 0
    this.isDisableEdit = true
  }
}

  //  showModal(fieldname,index) {
  //     this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
  //     this.currentItem.consignedto[index].ConsignedTo = this.currentItem.ConsignedTo
  //     this.currentItem.consignedto[index].consignedtoname = this.currentItem.consignedtoname
  //       if (!response.wasCancelled) {
  //         // console.log('Delete') InsuredBy
  //         // let notes = this.currentItem.notes
  //         // notes.splice(index, 1)// start, deleteCount)
  //       } else {
  //         console.log('cancel');
  //       }
  //       console.log(response.output);
  //     });
  //   }