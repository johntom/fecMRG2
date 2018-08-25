import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';

import { ynPrompt } from '../../../services/prompt';
import { Prompt } from '../prompt';
// @inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
@inject(ApiService, ApplicationService, DialogService)

export class Museamloan {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  // todos: Todo[] = [];
  // notes: Note[] = [];
  adjusters: Adjuster[] = []
  newNoteWorkDate = '';
  newNote = '';
  typeList = [
    "Primary",
    "Assistant"
  ];

  // constructor(taskQueue, signaler, api, appService, dialogService) {
    constructor(api, appService, dialogService) {
    // this.taskQueue = taskQueue;
    // this.signaler = signaler;
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

  addDetail() {
    let museumloan = this.currentItem.museumloan
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (museumloan === undefined) {
      flag = true
      museumloan = []
    }
    item = { Notes: '', edit: true }
    museumloan.unshift(item)
    if (flag) this.currentItem.museumloan = museumloan
  }


  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    //InsuredBy
    if ((this.currentItem.LoanTo === undefined) || (this.currentItem.LoanTo === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.LoanTo)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.conservedbyname = orgobj.OrgName
    }
  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)
    this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let adjusters = this.currentItem.adjusters
        adjusters.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
			// <input click.delegate="showModal('LoanTo',$index)" type="text" id="LoanTo" class="form-control input-sm"
      // value.bind="loantoname">
			
showModal(fieldname,index) {
  this.currentItem.LoanTo=   this.currentItem.museumloan[index].LoanTo  
  this.currentItem.loantoname=  this.currentItem.museumloan[index].loantoname

    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      this.currentItem.museumloan[index].LoanTo = this.currentItem.LoanTo
      this.currentItem.museumloan[index].loantoname = this.currentItem.loantoname
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

  addAdjuster() {
    let flag = 0;
    let item;
    if (this.currentItem.adjusters === undefined) {
      flag = 1;
      this.currentItem.adjusters = [];
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Primary', edit: true };
    } else {
      item = { ADJUSTER_ID: '', ADJUSTER_NAME: "", TYPE: 'Assistant', edit: true };
    }
    this.currentItem.adjusters = [item, ...this.currentItem.adjusters];



  }

  selectChanged(selectedadjuster, adjusterid) {
    // Find the selected adjuster object
    let adj = this.appService.adjusterList.find(x => x.ADJUSTER_ID === adjusterid);
    // Update the current adjuster with the new values
    selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    // We don't need to change the TYPE as it is bound correctly from the UI
    selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }

  cancel(item, index) {
  }
  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
}
