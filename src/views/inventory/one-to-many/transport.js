
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { Router } from 'aurelia-router';
import { Promptyn } from '../../../services/promptyn';
@inject(Router, ApiService, ApplicationService, DialogService)
export class Transport {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
   recordId = '';
  //  transport: Transport[] = []
  done = false;
  edit = false;

  

  constructor(router, api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.transport = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currenttransport = '';
    this.dialogService = dialogService
    this.router = router;
  }

  activate(params, routeConfig) {
  }
  selectChanged(selectedtransport, id) {
  //  console.log('selectedtransport',selectedtransport)
    // Find the selected adjuster object
    // let adj = this.appService.adjusterActiveList.find(x => x.ADJUSTER_ID === adjusterid);
    // // Update the current adjuster with the new values
    // selectedadjuster.ADJUSTER_ID = adj.ADJUSTER_ID;
    // selectedadjuster.ACCOUNT_REP_ID = adj.ADJUSTER_ID;



    // // We don't need to change the TYPE as it is bound correctly from the UI
    // selectedadjuster.ADJUSTER_NAME = adj.ADJUSTER_NAME;
  }

  addDetail() {
 let transport = this.currentItem.transport
    let flag = false
    let item
   // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (transport === undefined) {
      flag = true
      transport = []
    }
    item = {  TransportNotes: '', edit: true }
    transport.unshift(item)
    if (flag) this.currentItem.transport = transport
  }

  saveitem(item, index) {
    item.edit = !item.edit

  }
  


  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0


    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let transport = this.currentItem.transport
        transport.splice(index, 1)
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

}