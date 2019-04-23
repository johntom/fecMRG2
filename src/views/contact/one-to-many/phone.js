import { inject } from 'aurelia-dependency-injection';

import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Phone {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
 // notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService ,dialogService) {
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
    // console.log('saveitem ', item);
    // this.currentAdjuster = item.ADJUSTER
    // this.currentClaim = item.CLAIM
    // //this.flag = 1

    // this.openCount -= 1

  }


  activate(params, routeConfig) {
   
  }
  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';
 
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let phones = this.currentItem.phones
        phones.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  addPhone() {

  let phones= this.currentItem.phones
    let flag = false
    let item
    if (phones === undefined) {
      flag = true
      phones = []
    }
    //Type Phoneno Area  Ext
    item = { Type: '', Phoneno: '', edit: true }
    phones.unshift(item)
    if (flag) this.currentItem.phones = phones

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }

addEmail() {

  let emails= this.currentItem.emails
    let flag = false
    let item
    if (emails === undefined) {
      flag = true
      emails = []
    }
    //Type Phoneno Area  Ext
    item = { Type: '', email: '', edit: true }
    emails.unshift(item)
    if (flag) this.currentItem.emails = emails

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }


  //  save(note, index) { 
  //    // not used
  //     this.mode = 0
  //     console.log(' this.currentItem.notes', this.currentItem.notes)
  //     this.isDisableEdit = true
  //     document.getElementById('a' + index).disabled = true;
  //     document.getElementById('b' + index).disabled = true;
  //   }


  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let phones = this.currentItem.phones//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {

      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {

      this.currentItem.phones[index] = this.currentnote
      console.log(' this.currentItem.notes', phones, this.currentItem.phones[index])

    }
    this.mode = 0
    this.isDisableEdit = true


  }


}
 