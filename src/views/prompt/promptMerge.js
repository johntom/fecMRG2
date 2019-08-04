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
  //WordSectionP
  async wordportraitlines(segment) {
    var html, link, blob, url, css;
    // https://jsfiddle.net/78xa14vz/3/
    // EU A4 use: size: 841.95pt 595.35pt;
    // US Letter use: size:11.0in 8.5in;
    //;mso-page-orientation: portrait; margin:36.0pt 36.0pt 36.0pt 36.0pt;
    // 36=1/4 
    // 54
    // ;margin:54.0pt 36.0pt 36.0pt 36.0pt;
    css = (
      '<style>' +
      '@page WordSection1{size: 595.35pt 841.95pt;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}' +
      '</style>'
    );



    html = segment;//window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = this.savelistname;//'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, this.savelistname + '.doc'); //'Document.doc' IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
    return segment
  };
  async wordportrait(segment) {
    var html, link, blob, url, css;

    css = (
      '<style>' +
      '@page WordSection1{size: 595.35pt 841.95pt;margin:54.0pt 36.0pt 36.0pt 36.0pt;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:0px gray none;width:5em;padding:2px;}' +
      '</style>'
    );



    html = segment;//window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = this.savelistname;//'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, this.savelistname + '.doc'); //'Document.doc' IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
    return segment
  };
  async wordlandscape(segment) {
    var html, link, blob, url, css;
    // https://jsfiddle.net/78xa14vz/3/
    // EU A4 use: size: 841.95pt 595.35pt;
    // US Letter use: size:11.0in 8.5in;

    css = (
      '<style>' +
      '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
      'div.WordSection1 {page: WordSection1;}' +
      'table{border-collapse:collapse;}td{border:1px gray solid;width:5em;padding:2px;}' +
      '</style>'
    );

    html = segment;//window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = this.savelistname;//'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, this.savelistname + '.doc'); //'Document.doc' IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
    return segment
  };

  async activate(currentmodel) {
    this.currentmodel = currentmodel
    this.listtype = currentmodel.listtype
    // let lname = currentmodel.listname;
    let dimwidth
    this.savelistname = currentmodel.listname;//lname;
    // listtypes=[{id:0,name:"check list"},{id:1,name:"price list"},{id:2,name:"location list"},
    // {id:3,name:"box label"},{id:4,name:"condition"},{id:5,name:"registra"}]
    // aug
    // let sty1="border-width:1px;border-color:black;border-style:solid;padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    // let styc="border-width:1px;border-color:black;border-style:solid;padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    let sty1 = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let styc = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    let styimage = "border: 1px gray solid;padding: 4px;";
    // let styc = "vertical-align:top;text-align:center;";

    let sty1no = "padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let stycno = "bpadding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";


    let styhno = " border-width:1px;border-color:#336600;border-style:solid;padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";

    let styh = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let styhc = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    //border-width:0px;border-color:black;border-style:solid;padding:3px;

    // (this.listtype === 5) ? dimwidth = 1024 : dimwidth = 768
    this.heading = `merge ${currentmodel.head} type: ${this.savelistname}`
    let segment
    // if (this.listtype === 0 || this.listtype === 3 || this.listtype === 4 || this.listtype === 5) {
    // segment = `<div id="docx">`
    //   segment +=  `<div class="WordSectionP">`
    //    segment += `<table style="width:1024px; border-style:solid;border-color:black;border-collapse:collapse;border-width:1px;"><tbody>`

    //   // segment = `<h1 style="text-align:center;width:${dimwidth}"></h1> <table ><tbody>`
    // } else {
      
//!!!!!!!!!!!!!!!!!!!!!!
// table width matters
      //<table style="width:650px;
    if (this.listtype === 0) {
      segment = `<div id="docx">`
      segment += `<div class="WordSection1">`
      segment += `<table style="width:950px; border-style:solid;border-color:black;border-collapse:collapse;border-width:1px;"><tbody>`

    }
    if (this.listtype === 1) {
      segment = `<div id="docx">`
      segment += `<div class="WordSection1">`
      segment += `<table style="width:1024px; border-style:solid;border-color:black;border-collapse:collapse;border-width:1px;"><tbody>`

    }
    if (this.listtype === 2) {

      // https://jsfiddle.net/78xa14vz/3/
      segment = `<div id="docx">`
      segment = `<div class="WordSection1">`
      // segment += `<table style="width:1024px; border-collapse: border: 1px gray solid;padding: 4px;width: 5em;"><tbody>`
      segment += `<table style="width:950px; border-style:solid;border-color:gray;border-collapse:collapse;border-width:1px;"><tbody>`
      segment += `<tr>`
      segment += `<td style="${styh},width:11%">Inventory Code</td>`
      segment += `<td style="${styh},width:11%">Artist</td>`
      segment += `<td style="${styh},width:11%">Title</td>`
      segment += `<td style="${styh},width:6%" >Date</td>`
      segment += `<td style="${styh},width:9%" >Medium</td>`
      segment += `<td style="${styh},width:5%">Hght</td>`
      segment += `<td style="${styh},width:5%" >Wdth</td>`
      segment += `<td style="${styh},width:5%">Dpth</td>`
      segment += `<td style="${styh},width:8%">Current<br> Location</td>`
      segment += `<td style="${styh},width:6%">Bin</td>`
      segment += `<td style="${styhc},width:12%" >Image</td>`
      segment += `</tr>`

      // table {
      //   border-collapse: collapse;
      // }
      // td {
      //   border: 1px gray solid;
      //   padding: 4px;
      //   width: 5em;
      // }



    }
    if (this.listtype === 3) {
      segment = `<div id="docx">`
      segment += `<div class="WordSection1">`
      segment += `<table style="width:650px; border-style:none;border-color:gray;border-collapse:collapse;border-width:0px;"><tbody>`

    }
    if (this.listtype === 5) {
      // https://jsfiddle.net/78xa14vz/3/
      segment = `<div id="docx">`
      segment = `<div class="WordSection1">`
      //segment += `<table style="width:768px;border-collapse:collapse;border-width:1px; border-style:solid;border-color:gray;padding: 4px;width: 5em;"><tbody>`
      segment += `<table style="width:650px; border-style:solid;border-color:gray;border-collapse:collapse;border-width:1px;"><tbody>`
      // segment += `<tr>`
    

      // segment += `<td style="${styh},width:10%">Inventory Code</td>`
      // segment += `<td style="${styh},width:20%">Artist</td>`
      // segment += `<td style="${styh},width:40%">Title</td>`
      // segment += `<td style="${styh},width:10%">Image</td>`
      // segment += `</tr>`

      // segment += `<td style="${styhc},width:12%" >Image</td>`


    }

    //else segment = `<h1 style="text-align:center;width:768px">${currentmodel.head}</h1> <table><tbody>`
    // }
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


      if (this.listtype === 0) {
        //{id:0,name:"check list"}
        //       <!-- Codes by HTML.am -->
        // <!-- CSS Code -->
        let sty1 = "border-width:1px;border-color:black;border-style:solid;padding:3px;"
        segment = `<style type="text/css" scoped>`
        segment += `table.GenTable {`
        segment += `width:100%;`
        // segment += `background-color:#FFFFFF;`
        segment += `border-collapse:collapse;border-width:1px;`
        segment += `border-color:black;`
        segment += `border-style:solid;`
        segment += `color:black;`
        segment += `}`
        segment += `table.GenTable td, table.GenTable th {`
        segment += `border-width:1px;`
        segment += `border-color:black;`
        segment += `border-style:solid;`
        segment += `padding:3px;`
        segment += `}`
        segment += `table.GenTable thead {`
        segment += `background-color:black;`
        segment += `}`
        segment += `</style>`
        segment += `<table class="GenTable">`
        segment += `<thead>`
        segment += `<tr>`
        segment += `<th style=${sty1}>Header Cell 1</th>`
        segment += `<th style=${sty1}>Header Cell 2</th>`
        segment += `<th style=${sty1}>Header Cell 3</th>`
        segment += `</tr>`
        segment += `</thead>`
        segment += `<tbody>`
        segment += `<tr>`
        segment += `<td style=${sty1}>Row 1, Cell 1</td>`
        segment += `<td style=${sty1}>Row 1, Cell 2</td>`
        segment += `<td style=${sty1}>Row 1, Cell 3</td>`
        segment += `</tr>`
        segment += `<tr>`
        segment += `<td style=${sty1}>Row 2, Cell 1</td>`
        segment += `<td style=${sty1}>Row 2, Cell 2</td>`
        segment += `<td style=${sty1}>Row 2, Cell 3</td>`
        segment += `</tr>`
        segment += `<tr>`
        segment += `<td style=${sty1}>Row 3, Cell 1</td>`
        segment += `<td style=${sty1}>Row 3, Cell 2</td>`
        segment += `<td style=${sty1}>Row 3, Cell 3</td>`
        segment += `</tr>`
        // </tbody>
        // </table>

      }


      if (this.listtype === 1) {
        // {id:1,name:"price list"}
        let oa = numeral(invitem.offeramount).format('($0,0.00)')
        segment += `<td style="width:70%;vertical-align:top">${invitem.rtf2}</br></br>`
        segment += `${oa}</td>`
        segment += `<td style="width:25%;vertical-align:top;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        segment += `</tr>`
      }

      if (this.listtype === 2) {
        // {id:2,name:"location list"},
        ww = 90
        hh = 90
             segment += `<tr style="height:17%;">`
        segment += `<td style="${sty1},width:11%">${invitem.InventoryCode}</td>`
        segment += `<td style="${sty1},width:11%">${invitem.artist.ArtistName}</td>`
        segment += `<td style="${sty1},width:11%">${invitem.Title}</td>`
        segment += `<td style="${sty1},width:6%;">${invitem.InvYear}</td>`
        segment += `<td style="${sty1},width:9%">${invitem.MediumSupportobj.Description}</td>`
        segment += `<td style="${styc},width:5%">${invitem.UnframedHeight}</td>`
        segment += `<td style="${styc},width:5%;">${invitem.UnframedWidth}</td>`
        segment += `<td style="${styc},width:5%;">${invitem.UnframedDepth}</td>`
        segment += `<td style="${styc},width:6%;">${invitem.currentocationname}</td>`
        segment += `<td style="${sty1},width:6%;">${invitem.Bin}</td>`
        segment += `<td style="${styc},width:12%;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
        // text-align:center;
        segment += `</tr>`


      }

      if (this.listtype === 3) {
        // {id:3,name:"box label"}
        //   <p style="text-align:center;"><span style="font-size: 46pt;font-family:Arial, Helvetica, sans-serif;"><strong>THOMAS</strong></span></p>
        // <p style="text-align:center;"><span style="font-size:xx-large;font-family:Arial, Helvetica, sans-serif;">title</span></p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ww = 114
        hh = 114//25
        // width="60" height="60"
        // 50 to 48
        var i;
        for (i = 0; i < 7; i++) {
          segment += `<tr >`
          segment += `<td style="width:25%;vertical-align:top"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
          segment += `<td style="width:75%;vertical-align:top;text-align:left;font-size: 48pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong><br><span style="font-family:Helvetica, sans-serif;text-align:left;vertical-align:top;font-size:30pt;">${invitem.Title}</span></td>`
          segment += `<tr >`

          // attempt to no wrap
          // segment += `<td style="width:70%;vertical-align:top;text-align:center;font-size: 48pt;font-family:Helvetica, sans-serif;"><strong>${invitem.InventoryCode}</strong></td>`
          // segment += `<tr ><td style="width:70%;vertical-align:top;font-family:Helvetica, sans-serif;text-align:center;vertical-align:top;font-size:30pt;white-space: nowrap; text-overflow:ellipsis; overflow: hidden;max-width:1px;">${invitem.Title}</td></tr>`


          segment += `</tr>`
        }
        // segment += `<div style="page-break-after: always"><span style="display: none;">&nbsp;</span></div>`
        segment += `<div style="page-break-after: always"><span style="display: none;">&nbsp;</span></div>`

      }


      if (this.listtype === 4) {
        // {id:4,name:"condition"}
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
        segment += `<div style="page-break-after: always"><span style="display: none;">&nbsp;</span></div>`

      }
      if (this.listtype === 5) {
        // {id:5,name:"registrar"}]
        // segment = `<h1 style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;text-align:center;"></h1> <table><tbody>`
        ww = 95
        hh = 95
        // style="height:17%;"
        // segment += `<tr >`
        // segment += `<td style="${sty1},width:2%">${invitem.InventoryCode}</td>`
        // segment += `<td style="${sty1},width:8%">${invitem.rtf2}</td>`
        // segment += `<td style="width:2%;vertical-align:middle;text-align: center;"><img  src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></td>`

      //   segment += `<tr style="height:17%;">`
      //   segment += `<td style="${sty1},width:11%">${invitem.InventoryCode}</td>`
      //   segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`
      //   // segment += `<td style="width:12%;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
       
      //  segment += `<td style="width:12%;text-align:center;">${invitem.Artist}</td>`
       


       segment += `<td style="${sty1},width:15%">${invitem.InventoryCode}</td>`
       segment += `<td style="${sty1},width:40%">${invitem.rtf2}</td>`
       segment += `<td style="width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
      
      
     
       
        // vertical-align:middle;
        // segment += `<td style="${sty1}">${invitem.InventoryCode}</td>`
        // segment += `<td style="${sty1}">${invitem.rtf2}</td>`
        // segment += `<td style="vertical-align:middle;text-align: center;"><img  src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></td>`
        // vertical-align: middle;
        // max-height: 25px;
        // max-width: 160px;
        // <td style="width:25%;vertical-align:top;text-align:center;">

        segment += `</tr>`
      }

    }


    // if (this.listtype === 2 ||  this.listtype === 4 || this.listtype === 5) {
    //    segment += `</tbody></table>`
    //   segment += `</div></div>`
    //   this.wordlandscape(segment);
    //     this.controller.ok('added')
    // } else  this.segment = segment


    if (this.listtype === 2) {
      segment += `</tbody></table>`
      segment += `</div></div>`
      this.wordlandscape(segment);
      this.controller.ok('added')
    }

    if (this.listtype === 3) {
  segment += `</tbody></table>`
      segment += `</div></div>`
      this.wordportrait(segment);

      // this.wordlandscape(segment);

      this.controller.ok('added')
    }

    if (this.listtype === 5) {
      segment += `</tbody></table>`
      segment += `</div></div>`

      this.wordportraitlines(segment);

      this.controller.ok('added')
    }
    // if (this.listtype === 4) {
    //   //  segment += `</tbody></table>`
    //   // segment += `</div></div>`
    //   this.wordlandscape(segment);
    //   this.controller.ok('added')
    // } else {

    //   segment += `</tbody></table>`
    //   segment += `</div></div>`
    //   this.wordlandscape(segment);
    //   this.controller.ok('added')
    // }


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





   // save to    https://artbased.com/api/v1/downloadonepdf/lists/sl2.doc
      //       listtypes=[{id:0,name:"check list"},{id:1,name:"price list"},{id:2,name:"inventory list"},
      // {id:3,name:"box label"},{id:4,name:"condition"}]
      // <style type="text/css" scoped>
      // table.GeneratedTable {
      // width:100%;
      // background-color:#FFFFFF;
      // border-collapse:collapse;border-width:1px;
      // border-color:#336600;
      // border-style:solid;
      // color:#009900;
      // }

      // table.GeneratedTable td, table.GeneratedTable th {
      // border-width:1px;
      // border-color:#336600;
      // border-style:solid;
      // padding:3px;
      // }

      // table.GeneratedTable thead {
      // background-color:#000000;
      // }
      // </style>

      // <!-- HTML Code -->
      // <table class="GeneratedTable">
      // <thead>
      // <tr>
      // <th>Header Cell 1</th>
      // <th>Header Cell 2</th>
      // <th>Header Cell 3</th>
      // </tr>
      // </thead>
      // <tbody>
      // <tr>
      // <td>Row 1, Cell 1</td>

