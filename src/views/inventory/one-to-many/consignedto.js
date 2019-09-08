import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
// import { ynPrompt } from '../../../services/prompt';
import { Promptyn } from '../../../services/promptyn';

import { Promptorg } from '../promptorg';
import { Promptconsignedto } from '../../prompt/promptConsignedto';

@inject(ApiService, ApplicationService, DialogService)
export class Consignedto {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {

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
          // Sequence: { type: "number" }, // scan template
        //   consignedto: { type: "string", editable: true },
        //   // consignedtoname: { type: "string", editable: true },
        //   // econsignedto: { type: "string", editable: true },
        //   // econsignedto: {defaultValue: {OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" } },
        //   consignedtoname: { OrgName: "", State: "", _id: "" },

        //  // eloc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
        //   // ProvLoc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
          // artist: { defaultValue: {} },
          // ArtistName: {
          //   type: "string",
          //   from: "artist.ArtistName"
          // },
        
          //  consignedto: { defaultValue: {} },
        //   consignedto:{type: "array"},
        //   consignedtoname: {
        //     type: "string",
        //     from: "consignedto.consignedtoname.OrgName"
        //   },
        //   //  org: { defaultValue: {} },
        //  OrgName: {
        //     type: "string",
        //     from: "consignedto.consignedtoname"
        //   },
        consignedtoname: { defaultValue: {} },
          OrgName: {
            type: "string",
            from: "consignedtoname.OrgName"
          },
        
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
    console.log('currentItem ', this.currentItem)
    console.log('currentItem.consignedto ', this.currentItem.consignedto)
    this.dialogService = dialogService
    this.epoch = moment().unix();
  }

  // <input click.delegate="showModal('ConsignedTo')" type="text" id="ConsignedTo" class="form-control input-sm" value.bind="currentItem.consignedtoname">

  activate(params, routeConfig) {
    // let oid
    // let orgobj
    // let orgs = this.appService.orgsList
    // //InsuredBy
    // if ((this.currentItem.ConsignedTo === undefined) || (this.currentItem.ConsignedTo === null)) {
    // } else {
    //   oid = orgs.findIndex(x => x._id === this.currentItem.ConsignedTo)
    //   orgobj = this.appService.orgsList[oid]//10]
    //   if (orgobj !== undefined) this.currentItem.consignedtoname = orgobj.OrgName
    // }
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

  activate(params, routeConfig) {

  }


  addConsignedto() {
     let consignedto = this.currentItem.consignedto
    let flag = false
    let item

    let dd = moment().format('YYYY-MM-DD')
    if (consignedto === undefined) {
      flag = true
      consignedto = []
    }
    // item = {
    //   id: this.epoch, ReproductionAuthor: '', AuthorFirst: '', AuthorLast: '', ReproductionTitle: '',
    //   ReproductionName: '', ReproductionLocationDesc: '', ReproductionDate: '', ReproductionPage: '',
    //   Sequence: '', ReproductionTypeDesc: '', ReproductionPage: '', ColorBWDesc: '', ReproductionSortDate: '',
    //   Editor: false
    // }
    item = {
      id: this.epoch, 
      //Description: 'New York, NY' }, 
      ConsignmentNotes: '',
      ConsignedStartDate: dd,
      ConsignedEndDate: dd,
      ArtworkReleased: dd,
      CreatedDate: dd,
           consignedto: { OrgName: "", State: "", _id: "5" },
      consignedtoname: { OrgName: "", State: "", _id: "5" }
    }

    consignedto.unshift(item)
    if (flag) this.currentItem.consignedto = consignedto
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item
    currentModel.popuptype = 0;

    this.dialogService.open({ viewModel: Promptconsignedto, model: currentModel, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('dataItem', item);
        this.currentItem.consignedto[0] = item
        this.datasource.read()

      } else {
        console.log('cancel');
      }

      // this.currentItem.reproduction = this.datasource._data 
      console.log(response)//.output);
    });
 
  }

 detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = dataItem
    this.dialogService.open({ viewModel: Promptconsignedto, model: currentModel, lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('dataItem', dataItem);
         this.datasource.read()
      } else {
        console.log('cancel');
      }
      console.log(response)
    });
  }



}



  // addDetail() {
  //   let consignedto = this.currentItem.consignedto
  //   let flag = false
  //   let item

  //   let dd = moment().format('YYYY-MM-DD')
  //   if (consignedto === undefined) {
  //     flag = true
  //     consignedto = []
  //   }

  //   item = {
  //     id: this.epoch, eloc: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' }, ConsignmentNotes: '',
  //     ConsignedStartDate: dd,
  //     ConsignedEndDate: dd,
  //     ArtworkReleased: dd,
  //     CreatedDate: dd,
  //     consignedtoname: { OrgName: "", State: "", _id: "5" }
  //   }

  //   //     econsignedto: { OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" }, CreatedDate: dd

  //   consignedto.unshift(item)
  //   if (flag) this.currentItem.consignedto = consignedto
  // }