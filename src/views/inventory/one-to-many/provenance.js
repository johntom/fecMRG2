import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
// import { Prompt } from '../../../services/prompt';


import { Promptyn } from '../../../services/promptyn';
import { Prompt } from '../prompt';


@inject(ApiService, ApplicationService, DialogService)
export class Provenance {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  // provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  showModal(fieldname, index) {
    this.currentItem.fieldname = fieldname
    this.currentItem.ProvOwner = this.currentItem.provenance[index].ProvOwner
    this.currentItem.provownername = this.currentItem.provenance[index].ProvOwner//provownername
    this.currentItem.Provlegacyid = this.currentItem.provenance[index].legacyid

    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {
      // ProvOwnerID
      this.currentItem.provenance[index].ProvOwner = this.currentItem.ProvOwner
      this.currentItem.provenance[index].provownername = this.currentItem.provownername
      if (!response.wasCancelled) {
        // console.log('Delete') InsuredBy
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let provenance = this.currentItem.provenance
        provenance.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  addit() {
    //alert('in addit prov')
  }
  addDetail() {
    //alert('in prov')
    let provenance = this.currentItem.provenance
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (provenance === undefined) {
      flag = true
      provenance = []
    }
    item = { ProvMemo: '', edit: true }
    provenance.unshift(item)
    if (flag) this.currentItem.provenance = provenance
  }


    attached() {
    $(document).ready(function () {
      $('#dtVerticalScrollExample').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "ordering": false,
      });
      // $('.dataTables_length').addClass('bs-select');
    });

  }

}

