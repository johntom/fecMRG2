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
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        options.success(this.currentItem.provenance);
        this.currentItem.provenance = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
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
          Sequence: { type: "number" }, // scan template
          ProvDate: { type: "date", editable: true },
          ProvMemo: { type: "string", editable: true },
          ProvLocDesc: { type: "string", editable: true },
          
          // ProvLocDesc: { defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
        }
      }
    },
    // pageSize: 12,
  })




  //use above function in grid configuration



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
    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.provenance === undefined) this.currentItem.provenance = []
    //////////////////////////////////////////////////////////////////////////////
  }
  textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    // $('<textarea data-text-field="Label" data-value-field="Value" data-bind="value:' + options.field + '" style="width: ' + (container.width() - 10) + 'px;height:' + (container.height() - 12) + 'px" />').appendTo(container);
  }
  activate(params, routeConfig) {

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
        // "id" : "5d5002e2ac257d943dcfc52b", 
        //     "legacyid" : NumberInt(27417), 
        //     "ProvOwner" : "Arthur Dove", 
        //     "ProvLoc" : "5d5009e8ee1af1dc544c05e8", 
        //     "ProvLocDesc" : "New York, NY", 
        //     "ProvDate" : "", 
        //     "ProvMemo" : "", 
        //     "Sequence" : NumberInt(1)
    item = {  id:this.epoch+'', ProvMemo: '', ProvLocDesc:  '', Sequence:  '' }
    provenance.unshift(item)
    if (flag) this.currentItem.provenance = provenance
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

  locTemplate = '${ProvLocDesc ? ProvLocDesc.Description" : ""}';

  locDropDownEditor(container, options) {
    $('<input data-text-field="Description"   filter: true,  delay: 1000 , data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
      
       
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation,
        dataTextField: "Description",
        dataValueField: "Description"
      });
  }
//   delay: 1000 , filter: true,

  attached() {

  }

}

