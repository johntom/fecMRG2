import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';
import { Promptexhibit } from '../../prompt/promptExhibit';


@inject(ApiService, ApplicationService, DialogService)

export class Exhibition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

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
        options.success(this.currentItem.exhibition);
        this.currentItem.exhibition = this.datasource._data // sync to our model
      },

      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        console.log('   updatedItem ', updatedItem)

        options.success(updatedItem)
      }
    },


    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          Traveled: { type: "number" }, // scan template
          ExhibitTitle: { type: "string", editable: true },
          ExhibitSponser: { type: "string", editable: true },
          ExhibitLocation: { type: "string", editable: true },
          ReproductionTitle: { type: "string", editable: true },
          ExhibitSortDate: { type: "date", editable: true },
          ExhibitDates: { type: "string", editable: true },

          ExhibitMemo: { type: "string", editable: true },

        }
      }
    },
    pageSize: 12,

  })



  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;
    console.log('this.currentItem  exhibition', this.appService.currentItem.exhibition);
    this.dialogService = dialogService
  }



  activate(params, routeConfig) {
    this.exhibition = this.appService.currentItem.exhibition   // this.currentItem.exhibition
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

  saveitem(item, index) {
    item.edit = !item.edit

  }

  remove(item, index) {

    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let exhibition = this.currentItem.exhibition
        exhibition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }


  selectChanged(reproid) {
    let aid = this.repro.findIndex(x => x._id === reproid)
    this.currentItem.exhibition[aid].ExhibitRepro = reproid
  }

  addExhibit() {
    // addExhibit ExhibitSponser  ExhibitLocation ExhibitRepro ExhibitDates ExhibitSortDate Traveled ExhibitMemo
    let exhibition = this.currentItem.exhibition
    let flag = false
    let item = {}
    if (exhibition === undefined) {
      flag = true
      exhibition = []
      item.id = 1
    } else item.id = exhibition.length + 1
    item = {
      id: item.id,
      addExhibit: '', ExhibitSponser: '', ExhibitLocation: '', ExhibitRepro: '',
      ExhibitDates: '', ExhibitSortDate: '',
      Traveled: '', ExhibitMemo: '', edit: true
    }
    exhibition.unshift(item)
    if (flag) this.currentItem.exhibition = exhibition
    this.modal(item, 0) // unshirt reproduction.length + 1)

  }
}


  //  modal(item, index) {
  //     let currentModel = {}
  //     currentModel.currentItem = this.currentItem
  //     currentModel.item = item
  //      this.dialogService.open({ viewModel: Promptexhibit, model: currentModel, lock: true }).whenClosed(response => {
  //       if (!response.wasCancelled) {
  //         console.log('item', item);
  //       item.edit = false//this.saveitem(item, index)
  //       } else {
  //         console.log('cancel');
  //       }
  //       console.log(response)//.output);
  //     });
  //   }
  //    attached() {
  //     $(document).ready(function () {
  //       $('#raptable').jsRapTable({
  //         onSort: function (i, d) {
  //           $('tbody').find('td').filter(function () {
  //             return $(this).index() === i;
  //           }).sortElements(function (a, b) {
  //             if (i)
  //               return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
  //             else
  //               return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
  //           }, function () {
  //             return this.parentNode;
  //           });
  //         },
  //       });
  //     })






