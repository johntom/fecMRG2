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
      // read: (options) => {
      //   //   this.currentItem.reproduction
      //   this.loadData()
      //     .then((repro) => {
      //       console.log(' repro datasource ', repro[0]);
      //       options.success(repro);
      //     });
      // },

      read: (options) => {
        options.success(this.currentItem.reproduction);
        this.currentItem.reproduction = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        console.log('   updatedItem ', updatedItem)
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
          offeramount: { type: "number" }, // scan template
          ReproductionLocation: { type: "string", editable: true },
          ReproductionLocationDesc: { type: "string", editable: true },
          ReproductionAuthor: { type: "string", editable: true },
          AuthorFirst: { type: "string", editable: true },
          AuthorLast: { type: "string", editable: true },
          ReproductionTitle: { type: "string", editable: true },
          ReproductionName: { type: "string", editable: true },
          AuthorFirst: { type: "string", editable: true },
          ReproductionPage: { type: "string", editable: true },
          ColorBW: { type: "string", editable: true },
          ReproductionExhibit: { type: "string", editable: true },
          Editor: { type: "boolean" }, // scan template
          ReproductionSortDate: { type: "date" },
        }
      }
    },
    // pageSize: 12,

  })


  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem
    this.dialogService = dialogService

    let exdata = [];
    this.exhibitiondropdown = ''
    let exhibitiondropdownclone = JSON.parse(JSON.stringify(this.currentItem.exhibition));
    for (const item of exhibitiondropdownclone) {
      if (item.ExhibitTitle !== undefined) item.id = item.id + '|' + item.ExhibitTitle.substr(0, 20)
      exdata.push(item)
    }
    this.exhibitiondropdown = exdata
    //////////////////////////////////////////////////////////////////////////
    if (this.currentItem.reproduction === undefined) this.currentItem.reproduction = []
    this.epoch = moment().unix();
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
  exhibitionDropDownEditor(container, options) {
    //  $('<input required data-text-field="ExhibitTitle" data-value-field="id" data-bind="value:' + options.field + '"/>')
    console.log('options.field', container, options, options.field)
    // $('<input  data-text-field="ExhibitTitle" data-value-field="id" data-bind="value:' + options.field + '"/>')
    // must store id for factsheet as title is not uniq
    //  
    $('<input  data-text-field="id" data-value-field="id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: {
          transport: {
            read: (options) => {
              options.success(this.exhibitiondropdown);
              // this.loadExhData()
              //   .then((exdata) => {
              //     options.success(exdata);
              //   });
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
    // this.repro = repro

    return repro
    // return this.appService.actionsearchresults

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
    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('dataItem', dataItem);
        // not needed this.currentItem.reproduction[0]=dataItem
         this.datasource.read()
       
      } else {
        console.log('cancel');
      }

      // this.currentItem.reproduction = this.datasource._data 
      console.log(response)//.output);
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
      id: this.epoch, ReproductionAuthor: '', AuthorFirst: '', AuthorLast: '', ReproductionTitle: '',
      ReproductionName: '', ReproductionLocationDesc: '', ReproductionDate: '', ReproductionPage: '',
      Sequence: '', ReproductionTypeDesc: '', ReproductionPage: '', ColorBWDesc: '', ReproductionSortDate: '',
      Editor: false
    }

    reproduction.unshift(item)
    if (flag) this.currentItem.reproduction = reproduction
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item
    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {
    
      if (!response.wasCancelled) {
        console.log('dataItem', item);
        //  needed this.currentItem.reproduction[0]=dataItem
        this.currentItem.reproduction[0]=item
         this.datasource.read()
       
      } else {
        console.log('cancel');
      }

      // this.currentItem.reproduction = this.datasource._data 
      console.log(response)//.output);
    });

  }

}
// onEdit(e) {
  //   // let grid = e.sender;
  //   // let selectedRow = grid.select();
  //   // let dataItem = grid.dataItem(selectedRow);
  //   // this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {

  //   //   if (!response.wasCancelled) {
  //   //     console.log('item', item);
  //   //     item.edit = false//this.saveitem(item, index)
  //   //   } else {

  //   //     console.log('cancel');
  //   //   }
  //   //   console.log(response)//.output);
  //   // });
  // }

  // rowSelected(e) {
  //   // let grid = e.sender;
  //   // let selectedRow = grid.select();
  //   // let dataItem = grid.dataItem(selectedRow);
  //   // this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {
  //   //   if (!response.wasCancelled) {
  //   //     console.log('item', item);
  //   //     item.edit = false//this.saveitem(item, index)
  //   //   } else {

  //   //     console.log('cancel');
  //   //   }
  //   //   console.log(response)//.output);
  //   // });
  // }
  // rowpopSelected(e) {
  //   let grid = this.grid;
  //   let targetRow = $(e.target).closest("tr");
  //   let currentRowIndex = targetRow.index();
  //   grid.select(targetRow);
  //   let selectedRow = grid.select();
  //   let dataItem = grid.dataItem(selectedRow);
  //   this.dialogService.open({ viewModel: Promptrepro, model: dataItem, lock: true }).whenClosed(response => {

  //     if (!response.wasCancelled) {
  //       console.log('item', response);
  //       this.repro[currentRowIndex].AuthorFirst = response.output.AuthorFirst
  //       // item.edit = false//this.saveitem(item, index)
  //     } else {

  //       console.log('cancel');
  //     }
  //     console.log(response)//.output);
  //   });
  // }

  //  "ReproductionAuthor" : "",             "AuthorFirst" : "", 
    //             "AuthorLast" : "",            "ReproductionTitle" : "Arthur G. Dove Paintings", 
    //             "ReproductionName" : "The Intimate Gallery",             "ReproductionDate" : "1927", 
    //             "ReproductionPage" : "no. 2 (as Rhapsody in Blue, Part I--Gerschwin)", 
    //             "ReproductionType" : "5d5009e8ee1af1dc544c05df", 
    //             "ColorBW" : "5d5009edee1af1dc544c130d",             "ColorBWeLegacy" : NumberInt(4953), 
    //             "ReproductionLocation" : "5d5009e8ee1af1dc544c05e8", 
    //             "ReproductionExhibit" : "",             "ReproductionSortDate" : "1927-01-01T05:00:00.000Z", 
    //             "ReproductionLocationDesc" : "New York, NY",             "replaced" : true, 
    //             "ReproductionTypeLegacy" : NumberInt(34),             "ReproductionTypeDesc" : "catalogue", 
    //             "ColorBWDesc" : "N/A"
    // this.modal(item, 0) // unshirt reproduction.length + 1)
  // modal(item, index) {
  //   // prev popup
  //   //   let currentModel = {}
  //   //   currentModel.currentItem = this.currentItem
  //   //   currentModel.item = item
  //   //   currentModel.currentItem.hide1 = false
  //   //   this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {
  //   //     if (!response.wasCancelled) {
  //   //       console.log('item', item);
  //   //       item.edit = false//this.saveitem(item, index)
  //   //     } else {
  //   //       console.log('cancel');
  //   //     }
  //   //     console.log(response)//.output);
  //   //   });
  //   // }
  // }