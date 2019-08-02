import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
import numeral from 'numeral';

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
    // listtypes=[{id:0,name:"check list"},{id:1,name:"price list"},{id:2,name:"location list"},
    // {id:3,name:"box label"},{id:4,name:"condition"},{id:5,name:"registra"}]
    (this.listtype === 5) ? dimwdimwidthith=1024 :  dimwidth=768
    this.heading = `merge ${currentmodel.head} type: ${this.listname}`
    let segment
    if (this.listtype === 0 || this.listtype === 3 || this.listtype === 4 || this.listtype === 5) {

      segment = `<h1 style="text-align:center;width:${dimwidth}"></h1> <table ><tbody>`
    } else {
      if (this.listtype === 2) {
        // <table width=1024>
        // segment = `<h1 style="text-align:center;width:1024px"> &nbsp;</h1><table><tbody>`
        segment = `<table><tbody>`
        // segment += `<tr style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`

        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;padding-left:2px">Inventory Code</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Artist</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Title</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Date</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Medium</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Height</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Width</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Depth</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Current<br> Location</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Bin</td>`
        segment += `<td style="width:15%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">Image</td>`
        segment += `</tr>`

      } else segment = `<h1 style="text-align:center;width:768px">${currentmodel.head}</h1> <table><tbody>`
    }
    // 768px  1024px
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

      // if (this.listtype === 0) {
      //   //{id:0,name:"check list"}
      //   segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
      //   segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:10%;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`

      //   segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:30%;vertical-align:top">${invitem.rtf2}</td>`
      //   // segment += `<td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
      //   segment += `<td style="width:20%;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
      //   segment += `<td style="width:10%;text-align:center;">&nbsp;&nbsp;</td>`

      //   segment += `</tr>`
      // }


      if (this.listtype === 1) {
        // {id:1,name:"price list"}


        let oa = numeral(invitem.offeramount).format('($0,0.00)')
        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
        segment += `<td style="width:70%;vertical-align:top">${invitem.rtf2}</br></br>`
        segment += `${oa}</td>`

        segment += `<td style="width:25%;vertical-align:top;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }

      if (this.listtype === 2) {
        // {id:2,name:"location list"},
        ww = 100
        hh = 100
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.artist.ArtistName}</td>`
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Title}</td>`
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;">${invitem.InvYear}</td>`
        // segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;vertical-align:top;text-align:left;">${invitem.MediumSupportobj.Description}</td>`
        // segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedHeight}</td>`
        // segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedWidth}</td>`
        // segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedDepth}</td>`
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.currentocationname}</td>`
        // segment += `<td style="width:8%;border-width:1px;border-style:solid;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Bin}</td>`
        // segment += `<td style="width:15%;border-width:1px;border-style:solid;border-color:#2b2a2a;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        // segment += `</tr>`

        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.artist.ArtistName}</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Title}</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;">${invitem.InvYear}</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;vertical-align:top;text-align:left;">${invitem.MediumSupportobj.Description}</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedHeight}</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedWidth}</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;vertical-align:top;text-align:center;">${invitem.UnframedDepth}</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.currentocationname}</td>`
        segment += `<td style="width:8%;border-width:1px;border-style:none;border-color:#2b2a2a;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top">${invitem.Bin}</td>`
        segment += `<td style="width:15%;border-width:1px;border-style:none;border-color:#2b2a2a;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

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
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`

        segment += `<tr style="height:17%;"><td style="width:5%;vertical-align:top"></td>`
        segment += `<td style="width:20%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `<td style="width:60%;vertical-align:top;text-align:center;font-size:50pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></br><span style="font-family:Helvetica, sans-serif;width:70%;text-align:center;vertical-align:top;font-size:30pt;">${invitem.Title}</br></span>`
        segment += `</tr>`
        // segment += ` ^m`
        // segment += ` <p><!-- pagebreak --></p>`
        //<P style="page-break-before: always">`

      }


      if (this.listtype === 4) {
        // {id:4,name:"condition"}
        // let today = moment().format('MMM/D/YYYY')
        //moment().format('MMMM Do YYYY
        let today = moment().format('LL');
        //&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        segment += `<tr style="height:17%">`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;text-align:left;
        padding-left:30px;"><br><br><br><br><br><br><br><br></td></tr>`
        segment += `<tr style="height:17%">`
        //  segment +=`<td style="width:15%;vertical-align:top;text-align:left;left-margin:20px">1</td>`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;text-align:left;
        padding-left:30px;"><strong>CONDITION REPORT</<strong><br><br></td></tr>`
        segment += `<tr style="height:17%">`
        // segment +=`<td style="width:15%;vertical-align:top;">2</td>`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:55%;vertical-align:top;text-align:left;padding-left:30px;">Date:&nbsp;&nbsp;${today}<br><br></td></tr>`

        segment += `<tr style="height:17%;"><td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:55%;vertical-align:top;padding-left:30px;">PREPARED BY:&nbsp;&nbsp;Hooper Turner, Senior Registrar<br><br></td></tr>`
        segment += `<tr style="height:17%;"><td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:55%;vertical-align:top;padding-left:30px;">WORK:<br><br></td></tr>`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:65%;vertical-align:top;padding-left:30px;">${invitem.rtf2}</td>`
        segment += `<td style="width:35%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
        segment += `<tr style="height:17%;"><td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:55%;vertical-align:top;padding-left:30px;">NOTES:</td></tr>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:90%;vertical-align:top;padding-left:30px;">${invitem.Condition}</br></br></td></tr>`
        segment += `<tr><td><br><br><br></td></tr>`
        segment += `<tr style="height:17%;">`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:55%;vertical-align:top;padding-left:30px;">By:&nbsp;&nbsp;&nbsp;&nbsp;________________________&nbsp;&nbsp;  Date:&nbsp;&nbsp;${today}<br><br></td></tr>`
        segment += `<tr style="height:17%;">`

        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:65%;vertical-align:top;margin-left:20px;padding-left:60px;">Hooper Turner, Senior Registrar <br><br></td></tr>`

      }
      if (this.listtype === 5) {
        // {id:5,name:"registrar"}]
        // segment = `<h1 style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;text-align:center;"></h1> <table><tbody>`
        ww = 75
        hh = 75
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:20%;vertical-align:top;padding-left:2px">${invitem.InventoryCode}</td>`
        segment += `<td style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;width:45%;vertical-align:top">${invitem.rtf2}</td>`
        segment += `<td style="width:25%;text-align:center;vertical-align:top;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
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
    let filename = this.currentmodel.head + '_' + dt
    this.api.saveMerge(filename, this.editor.value())
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.message = "Save successful. merge added @ " + savetime
          this.filename = filename

        } else this.message = "Save Failed  @ " + savetime
      })

  }
  async save() {

    this.controller.ok('added')

  }


}