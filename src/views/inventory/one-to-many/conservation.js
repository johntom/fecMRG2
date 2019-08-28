import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { Promptyn } from '../../../services/promptyn';

@inject(ApiService, ApplicationService, DialogService) 
export class Conservation {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {

      read: (options) => {
        options.success(this.currentItem.conservation);
        // this.currentItem.conservation = this.datasource._data // sync to our model
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
          Treatment: { type: "string" },
          Dates: { type: "string", editable: true },
          InvoiceNo: { type: "string", editable: true },
          ConservedBy: { type: "string" }
          // defaultValue: { id: '5d5009e8ee1af1dc544c05e8', Description: 'New York, NY' } },
        }
      }
    },
    // pageSize: 12,
  })




  //use above function in grid configuration
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;

    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.conservation === undefined) this.currentItem.conservation = []
    ////////////////////////////////////////////////////////////////////////////// 
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
    this.epoch = moment().unix();
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }
  activate(params, routeConfig) {

  }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    // $('<textarea data-text-field="Label" data-value-field="Value" data-bind="value:' + options.field + '" style="width: ' + (container.width() - 10) + 'px;height:' + (container.height() - 12) + 'px" />').appendTo(container);
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
  remove(item, index) {
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let condition = this.currentItem.condition
        condition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  // click.delegate="addDetail()">	<span show.bind="!condition.edit">${ConditionDate}</span>

  addDetail() {
    let conservation = this.currentItem.conservation
    let flag = false
    let item
    let dd = moment().format('YYYY-MM-DD')
  if (conservation === undefined|| conservation.length===0) {
  
      flag = true 
      conservation = [] 
    }
    item = { id: this.epoch, Treatment: 'add', Dates: "", InvoiceNo: "", ConservedBy: "" }
    conservation.unshift(item)
      this.currentItem.conservation = conservation
         this.datasource.read()
    // if (flag) this.currentItem.conservation = conservation
    // (flag===true) ? this.currentItem.conservation = conservation : this.currentItem.conservatio.push(conservation)
  }
  attached() {

  }
}