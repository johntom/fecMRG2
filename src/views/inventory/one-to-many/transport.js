
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

  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      // read: (options) => {
      //   //   this.currentItem.reproduction
      //   this.loadData()
      //     .then((repro) => {
      //       console.log(' repro datasource ', repro[0]);
      //       options.success(repro);
      //     });
      // },
      read: (options) => {
        options.success(this.currentItem.transport);
        this.currentItem.transport = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        // console.log('   updatedItem ', updatedItem)
        options.success(updatedItem)
     },
      destroy: (options) => {
        let updatedItem = options.data;
        options.success(updatedItem)
      }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          TransportDate: { type: "date", editable: true },
          TransportNotes: { type: "string", editable: true },
         }
      }
    },
    // pageSize: 12,
  })
  //use above function in grid configuration
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
     this.epoch = moment().unix();

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
    item = { id:this.epoch, TransportNotes: '', edit: true }
    transport.unshift(item)
    if (flag) this.currentItem.transport = transport
  }

  saveitem(item, index) {
    item.edit = !item.edit

  }
  
 textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    // $('<textarea data-text-field="Label" data-value-field="Value" data-bind="value:' + options.field + '" style="width: ' + (container.width() - 10) + 'px;height:' + (container.height() - 12) + 'px" />').appendTo(container);
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
 locationTemplate = '${eloc ? eloc.Description : ""}';
  locationDropDownEditor(container, options) {
    $('<input required data-text-field="Description" data-value-field="id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation
      });
  }
  locTemplate = '${ExhibitLocation ? ExhibitLocation.Description" : ""}';
  locDropDownEditor(container, options) {
    $('<input required data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation,
        dataTextField: "Description",
        dataValueField: "Description"
      });
  }
   attached() {
   
  }

}