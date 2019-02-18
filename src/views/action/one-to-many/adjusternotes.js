import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Adjusternotes {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService ,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }




  activate(params, routeConfig) {
   
  }
  remove(item, index) {
     this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.notes
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  addNote() {

    let notes = this.currentItem.notes
    let flag = false
    let item
    let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (notes === undefined) {
      flag = true
      notes = []
    }
    item = { WorkDate: newNoteWorkDate, Notes: '', edit: true }
    notes.unshift(item)
    if (flag) this.currentItem.notes = notes

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }




  cancel(item, index) {
    this.mode = 0
    let notes = this.currentItem.notes//notes
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
 