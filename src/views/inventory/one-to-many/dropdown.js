import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';
import { Promptexhibit } from '../../prompt/promptExhibit';
// import products from './editing-custom-editor.json!';

@inject(ApiService, ApplicationService, DialogService)

export class Exhibition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
     
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
          Traveled: { type: "boolean" }, // scan template
          id: { type: "number" }, // scan template
          ExhibitTitle: { type: "string", editable: true },
          ExhibitSponser: { type: "string", editable: true },
          // ExhibitLocation: { type: "string", editable: true },
          ExhibitLocation: { type: "string", editable: true },
          // ExhibitLocation: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
          ExhibitLocationDesc: { type: "string", editable: true },
          ReproductionTitle: { type: "string", editable: true },
          ExhibitSortDate: { type: "date", editable: true },
          ExhibitDates: { type: "string", editable: true },
          ExhibitMemo: { type: "string", editable: true },
          Category: { defaultValue: { CategoryID: 1, CategoryName: 'Beverages' } },
          assignto: { defaultValue: { staffid: 100, StaffName: 'Tomaselli, John' } },
          eloc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
        }
      }
    },
    // pageSize: 12,
  })

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;
    console.log('this.currentItem  exhibition', this.appService.currentItem.exhibition);
    this.dialogService = dialogService
    this.codes = this.appService.codesProvenanceLocation
  }

  activate(params, routeConfig) {
    this.exhibition = this.appService.currentItem.exhibition   // this.currentItem.exhibition
  }

  staffTemplate = '${assignto ? assignto.StaffName : ""}';
  staffDropDownEditor(container, options) {
        $('<input data-text-field="StaffName" data-value-field="staffid" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                type: 'json',
                dataSource: {
                    transport: {
                           read: "https://backend.brmflow.com/api/v1/staff/find/"
                    }
                }
            });
    }						
	
	
	 locationTemplate = '${eloc ? eloc.Description : ""}';
   locationDropDownEditor(container, options) {
        $('<input data-text-field="Description" data-value-field="id" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                type: 'json',
                dataSource: this.appService.codesProvenanceLocation
            });
    }						
	
	
	




  //https://gist.run/?id=3c1a0aab9ef1a0aaf037518b5d61c803
  categoryDropDownEditor(container, options) {
    $('<input data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        dataSource: {
          type: 'odata',
          transport: {
            read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Categories'
          }
        }
      });
  }
  categoryTemplate = '${Category ? Category.CategoryName : ""}';
  locDropDownEditorID(container, options) {
    // $('<input data-text-field="Description" data-value-field="id" data-bind="value:' + options.field + '"/>')
    $('<input data-text-field="Description" data-value-field="id" data-bind="value:ExhibitLocation"/>')
      .appendTo(container)
      .kendoDropDownList({
        dataSource: this.appService.codesProvenanceLocation,
        dataTextField: "Description",
        dataValueField: "id"
      });
  }
   locTemplate(container) {
    //  return `${container.ExhibitLocation}--`
    if (container.ExhibitLocation) {
     // console.log('this.c', this.appService.codesProvenanceLocation)
      return `${container.ExhibitLocation}--`
    } else return `missing--`
  }
  locDropDownEditor(container, options) {
    $('<input data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation,
        dataTextField: "Description",
        dataValueField: "Description"
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






