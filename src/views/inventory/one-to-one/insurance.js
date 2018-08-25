
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Insurance {
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
    this.currentItem = this.appService.testrec;
   // console.log('consignedto ',this.currentItem.consignedto)
    this.dialogService = dialogService
  }

 activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList 
    //
    if ((this.currentItem.InsuredBy === undefined) || (this.currentItem.InsuredBy === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.InsuredBy)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.insuredbyname = orgobj.OrgName

    }


  }
  remove(item, index) {
    this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        // let InsuredBy = this.currentItem.InsuredBy
        // consignedto.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  showModal(fieldname) {
    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {

      if (!response.wasCancelled) {
       
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


}
