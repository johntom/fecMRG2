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
    this.filename = 0

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
    if (this.listtype === 0 || this.listtype === 3) {

      segment = `<h1 style="text-align:center;"></h1> <table><tbody>`
    } else {
      if (this.listtype === 2) {
        segment = `<h1 style="text-align:center;width:1024px"></h1> <table "><tbody>`
       
      } else segment = `<h1 style="text-align:center;">${currentmodel.head}</h1> <table><tbody>`
    }
//  <table style="border-width:1px;border-style:solid;border-color:#2b2a2a;"><tbody>`

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
      //       listtypes=[{id:0,name:"check list"},{id:1,name:"price list"},{id:2,name:"inventory list"},
      // {id:3,name:"box label"},{id:4,name:"condition"}]
      if (this.listtype === 0) {
        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:20%;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:45%;vertical-align:top">${invitem.rtf2}</td>`
        // segment += `<td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:25%;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }


      if (this.listtype === 1) {
        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:70%;vertical-align:top">${invitem.rtf2}</br></br>`
        segment += `$10.000</td>`

        segment += `<td style="width:25%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }

      if (this.listtype === 2) {
        ww = 100
        hh = 100
        // segment += `<tr style="width:25%;border-width:1px;border-style:solid;border-color:#2b2a2a;height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`

        segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.artist.ArtistName}</td>`
        segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Title}</td>`

        segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Year}</td>`
        //  segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:15%;vertical-align:top">${invitem.MediumSupportobj.Description}</td>`
        segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.currentocationname}</td>`

        segment += `<td style="width:25%;border-width:1px;border-style:solid;border-color:#2b2a2a;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }



      if (this.listtype === 3) {
        // {id:3,name:"box label"}
        //   <p style="text-align:center;"><span style="font-size:48pt;font-family:Arial, Helvetica, sans-serif;"><strong>THOMAS</strong></span></p>
        // <p style="text-align:center;"><span style="font-size:xx-large;font-family:Arial, Helvetica, sans-serif;">title</span></p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ww = 125
        hh = 125
        // width="60" height="60"
        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:48pt;font-family:Arial, Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="width:70%;text-align:center;vertical-align:top;font-size:34pt;">${invitem.Title}</span></br>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img  src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:48pt;font-family:Arial, Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="width:70%;text-align:center;vertical-align:top;font-size:34pt;">${invitem.Title}</span></br>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:48pt;font-family:Arial, Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="width:70%;text-align:center;vertical-align:top;font-size:34pt;">${invitem.Title}</span></br>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:48pt;font-family:Arial, Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="width:70%;text-align:center;vertical-align:top;font-size:34pt;">${invitem.Title}</span></br>`
        segment += `</tr>`
        // segment += ` ^m`
        // segment += ` <p><!-- pagebreak --></p>`

        //<P style="page-break-before: always">`


      }


      if (this.listtype === 4) {
        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:65%;vertical-align:top">${invitem.rtf2}</br></br>`
        segment += `$10.000</td>`

        segment += `<td style="width:35%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }

    }

    segment += `</tbody></table>`
    this.segment = segment

  }



  setInitialValue(edt) {
    //  edt.value(`<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">${this.segment}</span>`);
    edt.value(this.segment);
  }


  saveMerge() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    console.log('this.editor.value()', this.currentmodel.head, this.editor.value())
    let dt = moment().unix();//..new Date();
    this.filename = this.currentmodel.head + '_' + dt
    this.api.saveMerge(this.filename, this.editor.value())
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

