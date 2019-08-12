import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { PromptForm } from '../promptForm';
import { Promptrepro } from '../../prompt/promptRepro';


@inject(ApiService, ApplicationService, DialogService)
export class Reproduction {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  edit = false;
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((repro) => {
            console.log(' repro datasource ', repro[0]);
            options.success(repro);
          });
      },
      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        console.log('   updatedItem ', updatedItem)
        // this.updateData(updatedItem)
        //   .then((scans) => {
        //     options.success(scans)
        //     this.datasource.read()
        //   })

        options.success(updatedItem)
      }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          offeramount: { type: "number" }, // scan template
          ReproductionLocation: { type: "string", editable: true },
          ReproductionAuthor: { type: "string", editable: true },
          AuthorFirst: { type: "string", editable: true },
          AuthorLast: { type: "string", editable: true },
          ReproductionTitle: { type: "string", editable: true },
          ReproductionName: { type: "string", editable: true },
          AuthorFirst: { type: "string", editable: true },
          ReproductionPage: { type: "string", editable: true },
          ColorBW: { type: "string", editable: true },



        }
      }
    },
    pageSize: 12,

  })




  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem
    this.dialogService = dialogService
  }



 ColorBWDropDownEditor(container, options) {
    $('<input required data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              options.success(this.appService.codesReproductionType);
            },
          }
        }
      });
  }



// "legacyid" : NumberInt(16916), 
//             "ExhibitTitle" : "Arthur Dove", 
//             "ExhibitSponser" : "Albright-Knox Art Gallery", 
//             "ExhibitLocation" : "5d5009e9ee1af1dc544c0939", 
//             "ExhibitLocationDesc" : "Buffalo, NY", 
//             "ExhibitDates" : "January 27 - March 2, 1975", 
//             "ExhibitSortDate" : "1975-01-27T05:00:00.000Z", 
//             "Traveled" : "Y", 
//             "ExhibitMemo" : "", 
            // "id" : NumberInt(8)
            //options.field=ReproductionExhibit
 exDownEditor(container, options) {
  //  $('<input required data-text-field="ExhibitTitle" data-value-field="id" data-bind="value:' + options.field + '"/>')
    console.log('options.field',options.field)
    $('<input  data-text-field="ExhibitTitle" data-value-field="id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              options.success(this.currentItem.exhibition);
            },
          }
        }
      });
  }



  typeDropDownEditor(container, options) {
    $('<input required data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              options.success(this.appService.codesPublicationType);
            },
          }
        }
      });
  }
  locDropDownEditor(container, options) {
    $('<input required data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {

            read: (options) => {
              options.success(this.appService.codesProvenanceLocation);

            },

          }
        }
      });
  }



  activate(params, routeConfig) {

  }

  modal(item, index) {
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item
    currentModel.currentItem.hide1 = false
    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('item', item);
        item.edit = false//this.saveitem(item, index)
      } else {

        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }

  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)
    this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let adjusters = this.currentItem.reproduction
        reproduction.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  addRepro() {
    let reproduction = this.currentItem.reproduction
    let flag = false
    let item
    if (reproduction === undefined) {
      flag = true
      reproduction = []
    }
    item = {
      ReproductionAuthor: '', AuthorFirst: '', AuthorLast: '', ReproductionTitle: '',
      ReproductionName: '', ReproductionLocation: '',
      ReproductionDate: '', ReproductionPage: '',
      Sequence: '', ReproductionType: '', ReproductionPage: '', ColorBW: '', ReproductionSortDate: '', edit: true
    }

    reproduction.unshift(item)
    if (flag) this.currentItem.reproduction = reproduction

    this.modal(item, 0) // unshirt reproduction.length + 1)

  }
  changeSelect(opt) {

    console.log('opt', opt)
  }

  remove(item, index) {


    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        // let reproduction = this.currentItem.reproduction
        this.currentItem.reproduction.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  attached() {

  }


  async loadData() {
    // console.log('this.loadData ')
    let repro = this.currentItem.reproduction
    this.repro = repro
    return repro
    // return this.appService.actionsearchresults

  }

  onEdit(e) {
    // let grid = e.sender;
    // let selectedRow = grid.select();
    // let dataItem = grid.dataItem(selectedRow);
    // this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {

    //   if (!response.wasCancelled) {
    //     console.log('item', item);
    //     item.edit = false//this.saveitem(item, index)
    //   } else {

    //     console.log('cancel');
    //   }
    //   console.log(response)//.output);
    // });
  }

  rowSelected(e) {
    // let grid = e.sender;
    // let selectedRow = grid.select();
    // let dataItem = grid.dataItem(selectedRow);
    // this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {

    //   if (!response.wasCancelled) {
    //     console.log('item', item);
    //     item.edit = false//this.saveitem(item, index)
    //   } else {

    //     console.log('cancel');
    //   }
    //   console.log(response)//.output);
    // });
  }
  rowpopSelected(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    let currentRowIndex = targetRow.index();
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('item', response);
        this.repro[currentRowIndex].AuthorFirst = response.output.AuthorFirst
        // item.edit = false//this.saveitem(item, index)
      } else {

        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }

  modal(item, index) {
    // prev popup
    //   let currentModel = {}
    //   currentModel.currentItem = this.currentItem
    //   currentModel.item = item

    //   currentModel.currentItem.hide1 = false


    //   this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {

    //     if (!response.wasCancelled) {
    //       console.log('item', item);
    //       item.edit = false//this.saveitem(item, index)
    //     } else {

    //       console.log('cancel');
    //     }
    //     console.log(response)//.output);
    //   });
    // }


  }
}
