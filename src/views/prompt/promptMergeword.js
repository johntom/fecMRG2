import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { Promptyn } from '../../services/promptyn';
import { bindable } from 'aurelia-framework';
import numeral from 'numeral';

export class Promptmergeword {
  static inject = [DialogController, ApplicationService, DialogService, ApiService];
  @bindable searchcontact;


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



  async exporttoword(segment, header, footer, orientation, margins) {
    var html, link, blob, url, css;

    let ht1 = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`
    ht1 += `<head><title>Microsoft Office HTML Example</title>`
    ht1 += `<link rel=File-List href="mydocument_files/filelist.xml">`
    ht1 += `<style><!-- `
    ht1 += `@page`
    ht1 += `{`
    ht1 += `size:21cm 29.7cmt;  /* A4 */`
    // ht1 += `margin:1cm 1cm 1cm 1cm; /* Margins: 2.5 cm on each side */`
    //  ht1 += `margin: 0.5in 0.5in 1in 1in; /* Margins: 2.5 cm on each side */`

    ht1 += `margin:2cm 2cm 2cm 2cm;` /* Margins: 2.5 cm on each side */
    // mso-page-orientation: portrait;  
    ht1 += `mso-page-orientation: portrait;  `;
    (header === true) ? ht1 += `mso-header: url("docs/headerfooter.htm") h1;` : '';
    (footer === true) ? ht1 += `mso-footer: url("docs/headerfooter.htm") f1;` : '';
    // ht1 += `mso-footer: url("https://johntom.github.io/fecMRG2/src/docs/headerfooter.htm") f1;`
    ht1 += `}`
    ht1 += `@page Section1 { }`
    ht1 += `div.Section1 { page:Section1; }`
    ht1 += `p.MsoHeader, p.MsoFooter { border: 1px solid black; }`
    ht1 += `--></style>`
    ht1 += `</head>`
    ht1 += `<body>`
    ht1 += `<div class=Section1>`
    ht1 += `${segment}`
    ht1 += `</div>`
    ht1 += `</body>`
    ht1 += `</html>`
    html = ht1;//window.docx.innerHTML;
    blob = new Blob(['\ufeff', css + html], {
      type: 'application/msword'
    });
    url = URL.createObjectURL(blob);
    link = document.createElement('A');
    link.href = url;
    // Set default file name. 
    // Word will append file extension - do not add an extension here.
    link.download = 'Document'//this.savelistname;//'Document';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, this.savelistname + '.doc'); //'Document.doc' IE10-11
    else link.click();  // other browsers
    document.body.removeChild(link);
    return html

  }
  async activate(currentmodel) {
    this.currentmodel = currentmodel
    this.slname = this.currentmodel.head;
    this.listtype = currentmodel.listtype
    // let lname = currentmodel.listname;
    let dimwidth
    this.savelistname = currentmodel.listname;//lname;



  if(this.listtype === 0) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}
if (this.listtype === 1) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}
if (this.listtype === 2) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}

if (this.listtype === 3) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}
if (this.listtype === 4) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}
if (this.listtype === 5) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}

if (this.listtype === 6) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}
if (this.listtype === 7) {
  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`

    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`

    segment += `</tr>`

  }
  this.exporttoword(segment);
  this.controller.ok('added')
}

if (this.listtype === 8) {
  //
  //  let sty1 = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
  //    #content img { 
  //    max-width: 620px;
  //    height: auto;
  // }
  // segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" max-width="250px"; width="100%"; height="auto"; /></td>`

  segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
  for (const invitem of currentmodel.detail) { //this.datasource._data) {
    let wwr = invitem.clientWidthRatio
    let hhr = invitem.clientHeightRatio
    if (wwr === undefined) wwr = 1
    if (hhr === undefined) hhr = 1
    let ww = 295 * wwr
    let hh = 295 * hhr
    segment += `<td style="${sty1},width:25%">${invitem.InventoryCode}</td>`
    segment += `<td style="${sty1},width:30%">${invitem.rtf2}</td>`
    segment += `<td style="${sty1},width:20%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
    segment += `</tr>`

  }
  // async exporttoword(segment, header, footer, orientation, margins) {

  this.exporttoword(segment, false, false, 'portrait', '');
  this.controller.ok('added')
}




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



 // async exporttoword() {
  //   var html, link, blob, url, css;
  //   let ht1 = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`
  //   ht1 += `<head><title>Microsoft Office HTML Example</title>`
  //   ht1 += `<link rel=File-List href="mydocument_files/filelist.xml">`
  //   ht1 += `<style><!-- `
  //   ht1 += `@page`
  //   ht1 += `{`
  //   ht1 += `size:21cm 29.7cmt;  /* A4 */`
  //   // ht1 += `margin:1cm 1cm 1cm 1cm; /* Margins: 2.5 cm on each side */`
  //   //  ht1 += `margin: 0.5in 0.5in 1in 1in; /* Margins: 2.5 cm on each side */`
  //   ht1 += `margin:2cm 2cm 2cm 2cm;` /* Margins: 2.5 cm on each side */
  //   // mso-page-orientation: portrait;  
  //   ht1 += `mso-page-orientation: portrait;  `
  //   // ht1 += `mso-header: url("docs/headerfooter.htm") h1;`
  //   // ht1 += `mso-footer: url("docs/headerfooter.htm") f1;`
  //   ht1 += `mso-footer: url("https://johntom.github.io/fecMRG2/src/docs/headerfooter.htm") f1;`
  //   ht1 += `}`
  //   ht1 += `@page Section1 { }`
  //   ht1 += `div.Section1 { page:Section1; }`
  //   ht1 += `p.MsoHeader, p.MsoFooter { border: 1px solid black; }`
  //   ht1 += `--></style>`
  //   ht1 += `</head>`
  //   ht1 += `<body>`
  //   ht1 += `<div class=Section1>`
  //   ht1 += `I'm page 1.`
  //   ht1 += `<br clear=all style='mso-special-character:line-break;page-break-before:always'>`
  //   ht1 += `I'm page 2. raisonné`
  //   ht1 += `</div>`
  //   ht1 += `</body>`
  //   ht1 += `</html>` 
  //   html = ht1;//window.docx.innerHTML;
  //   blob = new Blob(['\ufeff', css + html], {
  //     type: 'application/msword'
  //   });
  //   url = URL.createObjectURL(blob);
  //   link = document.createElement('A');
  //   link.href = url;
  //   // Set default file name. 
  //   // Word will append file extension - do not add an extension here.
  //   link.download = 'Document'//this.savelistname;//'Document';
  //   document.body.appendChild(link);
  //   if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(blob, this.savelistname + '.doc'); //'Document.doc' IE10-11
  //   else link.click();  // other browsers
  //   document.body.removeChild(link);
  //    return html
  // }


