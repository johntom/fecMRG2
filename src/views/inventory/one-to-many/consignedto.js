import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
// import { ynPrompt } from '../../../services/prompt';
import { Promptyn } from '../../../services/promptyn';

import { Promptorg } from '../promptorg';

@inject(ApiService, ApplicationService, DialogService)
export class Conssignedto {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
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
        options.success(this.currentItem.consignedto);
        this.currentItem.consignedto = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        // updatedItem.offerdate = this.offerdate
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
        id: "legacyid",//id", // Must assign id for update to work
        fields: {
          Sequence: { type: "number" }, // scan template
          consignedto: { type: "string", editable: true },
          // consignedtoname: { type: "string", editable: true },
          // econsignedto: { type: "string", editable: true },
          // econsignedto: {defaultValue: {OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" } },
          consignedtoname: { OrgName: "", State: "", _id: "" },

          eloc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
          // ProvLoc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
          ConsignedStartDate: { type: "date", editable: true },
          ConsignedEndDate: { type: "date", editable: true },
          ArtworkReleased: { type: "date", editable: true },
          CreatedDate: { type: "date", editable: true },
          Signed: { type: "boolean" },
          PDF: { type: "boolean" },
          Returned: { type: "boolean" },
          Sold: { type: "boolean" },
          ModifiedDate: { type: "date" },

          // Signed:{ type: "string" },
          // PDF: { type: "string" },
          // Returned:{ type: "string" },
          // Sold: { type: "string" },

        }
      }
    },
    // pageSize: 12,
  })
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;//testrec;
    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.consignedto === undefined) this.currentItem.consignedto = []
    //////////////////////////////////////////////////////////////////////////////
    console.log('consignedto ', this.currentItem.consignedto)
    this.dialogService = dialogService
    this.epoch = moment().unix();
  }

  // <input click.delegate="showModal('ConsignedTo')" type="text" id="ConsignedTo" class="form-control input-sm" value.bind="currentItem.consignedtoname">

  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    //InsuredBy
    if ((this.currentItem.ConsignedTo === undefined) || (this.currentItem.ConsignedTo === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.ConsignedTo)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.consignedtoname = orgobj.OrgName
    }
  }
  addDetail() {
    let consignedto = this.currentItem.consignedto
    let flag = false
    let item

    let dd = moment().format('YYYY-MM-DD')
    if (consignedto === undefined) {
      flag = true
      consignedto = []
    }

    item = {
      id: this.epoch, eloc: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' }, ConsignmentNotes: '',
      ConsignedStartDate: dd,
      ConsignedEndDate: dd,
      ArtworkReleased: dd,
      CreatedDate: dd,
      consignedtoname: { OrgName: "", State: "", _id: "5" }
    }

    //     econsignedto: { OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" }, CreatedDate: dd

    consignedto.unshift(item)
    if (flag) this.currentItem.consignedto = consignedto
  }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    // this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(async response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let consignedto = this.currentItem.consignedto
        consignedto.splice(index, 1)// start, deleteCount)
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

  // this.appService.orgsList
  orgTemplate = '${consignedtoname ? consignedtoname.OrgName : ""}';
  orgDropDownEditor(container, options) {
    $('<input required data-text-field="OrgName" data-value-field="_id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.orgsList,
        dataTextField: "OrgName",
        dataValueField: "_id"
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
  showModal(fieldname, index) {
    this.currentItem.fieldname = fieldname
    this.currentItem.ConsignedTo = this.currentItem.consignedto[index].ConsignedTo
    this.currentItem.consignedtoname = this.currentItem.consignedto[index].consignedtoname


    // this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {

      this.currentItem.consignedto[index].ConsignedTo = this.currentItem.ConsignedTo
      this.currentItem.consignedto[index].consignedtoname = this.currentItem.consignedtoname
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
  attached() {

  }
}
