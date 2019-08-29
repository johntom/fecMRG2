import { TaskQueue } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';
import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';


import { Promptyn } from '../../../services/promptyn';
import { Promptorg } from '../promptorg';
// @inject(TaskQueue, BindingSignaler, ApiService, ApplicationService, DialogService)
@inject(ApiService, ApplicationService, DialogService)

export class Museamloan {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // adjusters: Adjuster[] = []
  newNoteWorkDate = '';
  newNote = '';
  typeList = [
    "Primary",
    "Assistant"
  ];
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        options.success(this.currentItem.museumloan);
        this.currentItem.museumloan = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
      //  updatedItem.offerdate = this.offerdate
      //  console.log('   updatedItem ', updatedItem)
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
          ArtworkReleased: { type: "date", editable: true },
          TransportNotes: { type: "string", editable: true },
          loantoname: { OrgName: "", State: "", _id: "" },
          Location: { type: "string", editable: true },
          InsuranceValue: { type: "string", editable: true },
          InsuranceValueAmt :{ type: "numeric", format:"{0:c2}" },
          ExhibitionTitle: { type: "string", editable: true },
          ExhibitionVenuesDates: { type: "string", editable: true },
          AgreementFormSignedMRG: { type: "boolean" },
          AgreementFormCountersigned: { type: "boolean" },
          Returned: { type: "boolean" },
          CofI: { type: "boolean" },
          Catalog: { type: "boolean" },
          UpdatedCV: { type: "boolean" },
          InfoonfactsheetsinHost: { type: "boolean" },
          UpdatedFactSheet: { type: "boolean" },



          // "_id" : ObjectId("5d5005c4db929d74487d182e"), 
          //     "ID" : NumberInt(8), 
          //     "LoanTo" : NumberInt(1711), 
          //     "InventoryToLoan" : "", 
          //     "Location" : NumberInt(2596), 
          //     "InsuranceValue" : "rsssss", 
          //     "ExhibitionTitle" : "Romare Bearden: Southern Recollections", 
          //     "ExhibitionVenuesDates" : "9/2/11-1/1/12", 
          //     "AgreementFormSignedMRG" : "Y", 
          //     "AgreementFormCountersigned" : "Y", 
          //     "CofI" : "Y", 
          //     "TransportNotes" : "", 
          //     "Catalog" : "Y", 
          //     "InfoonfactsheetsinHost" : "", 
          //     "UpdatedCV" : "Y", 
          //       "InsuranceValueAmt" : NumberInt(700000), 

          //     "InventoryID" : NumberInt(11183), 
          //     "CreatedDate" : "Thu Apr 26 2012 00:00:00 GMT-0400 (Eastern Daylight Time)", 
          //     "ModifiedDate" : "Wed May 02 2012 00:00:00 GMT-0400 (Eastern Daylight Time)", 
          //     "UpdatedFactSheet" : "Y", 
          //     "Returned" : "", 
          //     "createdAt" : ISODate("2019-08-11T12:10:44.875+0000"), 
          //     "updatedAt" : ISODate("2019-08-11T12:10:44.875+0000")

          // loantoname: {defaultValue: {OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" } },

        }
      }
    },
    // pageSize: 12,
  })
  ///////////
  //  { template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
  //         { command: "destroy", title: "&nbsp;", width: 100 }],
  //       editable: true
  //     });
  //     $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
  //       var grid = $("#grid").data("kendoGrid"),
  //           dataItem = grid.dataItem($(e.target).closest("tr"));
  //       dataItem.set("Discontinued", this.checked);
  //     });
  //////////

  constructor(api, appService, dialogService) {
    // this.taskQueue = taskQueue;
    // this.signaler = signaler;
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService


    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.museumloan === undefined) this.currentItem.museumloan = []
    ////////////////////////////////////////////////////////////////////////////// 

    this.epoch = moment().unix();
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }
  cbTemplate = '${Returned ? Returned : ""}';

  checkboxEditor(container, options) {
    // $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    // $(`<input type="checkbox" #= ${options.field} ? 'checked="checked"':"" # class="chkbx"  />`).appendTo(container);
    $(`<input type="checkbox" #= ${options.field} ? 'checked="checked"':"" # disabled="disabled"  />`).appendTo(container);
    //    template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
  }

  textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
    // $('<textarea data-text-field="Label" data-value-field="Value" data-bind="value:' + options.field + '" style="width: ' + (container.width() - 10) + 'px;height:' + (container.height() - 12) + 'px" />').appendTo(container);
  }
 
//  required
 
  orgTemplate = '${loantoname ? loantoname.OrgName : ""}';
  orgDropDownEditor(container, options) {
    $('<input  data-text-field="OrgName" data-value-field="_id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.orgsList,
        dataTextField: "OrgName",
        dataValueField: "_id"
      });
  }
  //required /////////////////////////////////////////////////////////////////////
  locationTemplate = '${eloc ? eloc.Description : ""}';
  locationDropDownEditor(container, options) {
    $('<input  data-text-field="Description" data-value-field="id" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation
      });
  }
  locTemplate = '${ExhibitLocation ? ExhibitLocation.Description" : ""}';
   //required /////////////////////////////////////////////////////////////////////
 
  locDropDownEditor(container, options) {
    $('<input  data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesProvenanceLocation,
        dataTextField: "Description",
        dataValueField: "Description"
      });
  }
  addDetail() {
    let museumloan = this.currentItem.museumloan
    let flag = false
    let item
    let dd = moment().format('YYYY-MM-DD')
    if (museumloan === undefined) {
      flag = true
      museumloan = []
    }
  // loantoname: {OrgName: "Ho, Christina", State: "", _id: "5d5005c2db929d74487d0c69" }, ArtworkReleased: false }
    item = {
      id: this.epoch, TransportNotes: '', ArtworkReleased: dd,
      loantoname: { OrgName: "", State: "", _id: "" }
      , AgreementFormSignedMRG: false
      , Returned: false
      , CofI: false
      , Catalog: false
      , UpdatedCV: false
      , InfoonfactsheetsinHost: false
      , UpdatedFactSheet: false
    }
    museumloan.unshift(item)
    if (flag) this.currentItem.museumloan = museumloan

  }

  activate(params, routeConfig) {
    let oid
    let orgobj
    let orgs = this.appService.orgsList
    //InsuredBy
    if ((this.currentItem.LoanTo === undefined) || (this.currentItem.LoanTo === null)) {
    } else {
      oid = orgs.findIndex(x => x._id === this.currentItem.LoanTo)
      orgobj = this.appService.orgsList[oid]//10]
      if (orgobj !== undefined) this.currentItem.conservedbyname = orgobj.OrgName
    }
  }
  attached() {
    // $(document).ready(function () {
    //   $('#dtVerticalScrollExample').DataTable({
    //     "scrollY": "200px",
    //     "scrollCollapse": true,
    //     "ordering": false,
    //   });
    //   $('.dataTables_length').addClass('bs-select');
    // });
  }
  saveitem(item, index) {
    item.edit = !item.edit
  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let museumloan = this.currentItem.museumloan
        museumloan.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }

  showModal(fieldname, index) {
    // this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
    this.currentItem.fieldname = fieldname
    this.currentItem.LoanTo = this.currentItem.museumloan[index].LoanTo
    this.currentItem.loantoname = this.currentItem.museumloan[index].loantoname
    this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {
      this.currentItem.museumloan[index].LoanTo = this.currentItem.LoanTo
      this.currentItem.museumloan[index].loantoname = this.currentItem.loantoname
      if (!response.wasCancelled) {
        // console.log('Delete') currentItem.conservation
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }


  cancel(item, index) {
  }
  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
  attached() {

  }
}
