import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
export class Promptmerge {
  static inject = [DialogController, ApplicationService, DialogService, ApiService];
  @bindable searchcontact;

  tools = [
    'pdf',
    'html',
    'bold',
    'italic',
    'underline',

    'subscript',
    'superscript',

    'viewHtml',
    'formatting',
    'cleanFormatting',
    'fontName',
    'fontSize'
    // 'foreColor',
    // 'backColor',
    // 'print'
  ];
  constructor(controller, appService, dialogService, api) {
    this.controller = controller;
    this.answer = null;
    this.appService = appService;


    controller.settings.lock = false;
    // this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
    this.allcontacts = []
  }

  //  constructor(argument) {
  //     // Create and initialize your class object here...
  //  }

  //  created(owningView, myView) {
  //     // Invoked once the component is created...
  //  }

  //  bind(bindingContext, overrideContext) {
  //     // Invoked once the databinding is activated...
  //  }

  //  attached(argument) {
  //     // Invoked once the component is attached to the DOM...
  //  }

  //  detached(argument) {
  //     // Invoked when component is detached from the dom
  //  }

  //  unbind(argument) {
  //     // Invoked when component is unbound...
  //  }
  async activate(currentmodel) {
    this.currentmodel = currentmodel
    this.listtype = currentmodel.listtype
    this.listname = currentmodel.listname
    // this.dialogService.open({ viewModel: Promptmerge,
    // model: { head: this.savedlist, listtype: this.selectedlist,listname:listname , detail: sels }, lock: true }).whenClosed(async response => {

    this.heading = `merge ${currentmodel.head} type: ${this.listname}`
    let segment
    segment = `<h1 style="text-align:center;">${currentmodel.head}</h1> <table><tbody>`
    for (const invitem of currentmodel.detail) { //this.datasource._data) {
      let ww = invitem.clientWidthRatio
      let hh = invitem.clientHeightRatio
      if (ww === undefined) ww = 1
      if (hh === undefined) hh = 1
      ww = 225 * ww
      hh = 225 * hh
      // we have  the ratio of each image
      // ie h=1 w=1
      // w h-1 w=.5
      // save to    https://artbased.com/api/v1/downloadonepdf/lists/sl2.doc
      if (this.listtype === 0) {
        segment += `<tr style="height:17%;"><td style="width:8%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:42%;vertical-align:top">${invitem.InventoryCode}</td>`

        segment += `<td style="width:42%;vertical-align:top">${invitem.rtf2}</td>`
        // segment += `<td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:42%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }


      if (this.listtype === 1) {
        segment += `<tr style="height:17%;"><td style="width:8%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:32%;vertical-align:top">${invitem.InventoryCode}</td>`
        segment += `<td style="width:22%;vertical-align:top">Price:$10.000</td>`

        segment += `<td style="width:32%;vertical-align:top">${invitem.rtf2}</td>`
        segment += `<td style="width:22%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }
    }


    segment += `</tbody></table>`
    this.segment = segment;

  }



  setInitialValue(edt) {
    edt.value(this.segment);
  }


  saveMerge() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    console.log('this.editor.value()', this.currentmodel.head, this.editor.value())
    this.api.saveMerge(this.currentmodel.head, this.editor.value())
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.message = "Save successful. merge added @ " + savetime
        } else this.message = "Save Failed  @ " + savetime
      })

  }
  async save() {

    this.controller.ok('added')

  }


}

