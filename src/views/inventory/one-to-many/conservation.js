import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
// import { ynPrompt } from '../../../services/prompt';

import { Promptyn } from '../../../services/promptyn';
import { Promptorg } from '../promptorg';
import jsRapTable from '../../../../jslib/jsRapTable';
 
@inject(ApiService, ApplicationService, DialogService)
export class Conservation {
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
    this.currentItem = this.appService.currentItem;//testrec;
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
      if (orgobj !== undefined) {
         this.currentItem.conservedbyname = orgobj.OrgName
         this.appService.originalrec.conservedbyname = this.currentItem.conservedbyname// fix dirty
   
      }
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

 async showModal(fieldname, index) {
    this.currentItem.fieldname = fieldname
    this.currentItem.ConservedBy = this.currentItem.conservation[index].ConservedBy // mongoid
    this.currentItem.conservedbyname = this.currentItem.conservation[index].conservedbyname
    this.appService.originalrec.conservedbyname = this.currentItem.conservedbyname// fix dirty
   
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
        
    this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

    
      this.currentItem.conservation[index].ConservedBy = this.currentItem.ConservedBy
      this.currentItem.conservation[index].conservedbyname = this.currentItem.conservedbyname
      this.appService.originalrec.conservedbyname = this.currentItem.conservedbyname// fix dirty
   
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

     attached() {
    $(document).ready(function () {
      $('#raptable').jsRapTable({
        onSort: function (i, d) {
          $('tbody').find('td').filter(function () {
            return $(this).index() === i;
          }).sortElements(function (a, b) {
            if (i)
              return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
            else
              return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
          }, function () {
            return this.parentNode;
          });
        },
      });

    })
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
