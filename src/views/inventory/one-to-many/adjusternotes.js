import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';

@inject(ApiService, ApplicationService, DialogService)
export class Adjusternotes {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
 // notes: Note[] = []; WorkDate Notes notes
  newNoteWorkDate = '';
  newNote = '';
scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
     
      read: (options) => {
        options.success(this.currentItem.notes);
        this.currentItem.notes = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
       
        options.success(updatedItem)
        },

      destroy: (options) => {
        let updatedItem = options.data;
      
        options.success(updatedItem)
      }
    },

    schema: {
      model: {
        id: "WorkDate", // Must assign id for update to work
        fields: {
          WorkDate: { type: "date", editable: true },
          notes: { type: "string", editable: true },
        }
      }
    },
    // pageSize: 12,
  })

  constructor(api, appService ,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;//testrec;
   
    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.notes === undefined) this.currentItem.notes = []
    //////////////////////////////////////////////////////////////////////////////
   
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService 
      this.epoch = moment().unix();


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
    item = { id:this.epoch,WorkDate: newNoteWorkDate, Notes: '' }
    notes.unshift(item)
    if (flag) this.currentItem.notes = notes

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
   attached() {
   
  }

}
 