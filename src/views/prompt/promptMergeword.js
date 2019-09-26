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



  async exporttoword(segment, header, footer, logo, orientation, margins) {
    var html, link, blob, url, css;
    let ht1 = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`
    ht1 += `<head><title>Microsoft Office HTML Example</title>`
    ht1 += `<link rel=File-List href="mydocument_files/filelist.xml">`
    ht1 += `<style><!-- `
    ht1 += `@page`;
    ht1 += `{`;
    if (orientation === 'portrait') { ht1 += 'size:21cm 29.7cmt;' } else { ht1 += 'size:29.7cmt 21cm ;' }// ht1 += `size:21cm 29.7cmt;}
    // ht1 += `margin:1cm 1cm 1cm 1cm; /* Margins: 2.5 cm on each side */`
    //  ht1 += `margin: 0.5in 0.5in 1in 1in; /* Margins: 2.5 cm on each side */`

    ht1 += `margin:2cm 2cm 2cm 2cm;` /* Margins: 2.5 cm on each side */
    // mso-page-orientation: portrait;  
    ht1 += `mso-page-orientation: portrait;  `;
    // (header === true) ? ht1 += `mso-header: url("docs/headerfooter.htm") h1;` : '';
    if (header === true) { ht1 += `mso-header: url("docs/headerfooter.htm") h1;` }
    if (footer === true) {
      if (logo === true) { ht1 += `mso-footer: url("docs/headerfooter.htm") f1;` } else { ht1 += `mso-footer: url("docs/footernologo.htm") f1;` }
    }
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
    let sty1 = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let styc = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    let styimage = "border: 1px gray solid;padding: 4px;";
    // let styc = "vertical-align:top;text-align:center;";
    let sty1no = "padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let stycno = "bpadding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    this.sty1no = sty1no
    let styhno = " border-width:1px;border-color:#336600;border-style:solid;padding:3px;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";

    let styh = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:left;";
    let styhc = "border: 1px gray solid;padding: 4px;width: 5em;font-family:Calibri, Geneva, sans-serif;font-size:11.0pt;vertical-align:top;text-align:center;";
    //border-width:0px;border-color:black;border-style:solid;padding:3px;

    // (this.listtype === 5) ? dimwidth = 1024 : dimwidth = 768
    this.heading = `merge ${currentmodel.head} type: ${this.savelistname}`
    let segment
    if (this.listtype === -1) {
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
    //   listtypes = [{ id: -1, name: 'choose' }, { id: 0, name: "exhibition" }, { id: 1, name: "price list" },
    // { id: 2, name: "location list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
    // { id: 5, name: "registrar" }, { id: 6, name: "presention" },
    // { id: 7, name: "checklist" } ,   { id: 8, name: "test" }
    if (this.listtype === 0) {
      //exhibition
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      //price list
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      //location list
      // let ht1 = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>`
      // ht1 += `<head><title>Microsoft Office HTML Example</title>`
      // ht1 += `<link rel=File-List href="mydocument_files/filelist.xml">`
      // ht1 += `<style><!-- `
      // ht1 += `@page`;
      // ht1 += `{`;
      let  segment = `<table style="width:950px; border-style:solid;border-color:gray;border-collapse:collapse;border-width:1px;"><tbody>`

      // let segment = `<table style="width:950px; border-style:solid;border-color:gray;border-collapse:collapse;border-width:1px;">`
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
      segment += `<td style="${styh},width:12%" >Image</td>`
      segment += `</tr>`
      for (const invitem of currentmodel.detail) { //this.datasource._data) {
        let wwr = invitem.clientWidthRatio
        let hhr = invitem.clientHeightRatio
        if (wwr === undefined) wwr = 1
        if (hhr === undefined) hhr = 1
        // let ww = 90 * wwr
        // let hh = 90 * hhr
         let ww = 295 * wwr
        let hh = 295 * hhr
 



        // segment += `<td style="${styhc},width:12%" >Image</td>`
        // segment += `<tr style="height:17%;">`
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
        // segment += `<td style="${styc},width:12%;">${invitem.InventoryCode}/></td>`
         segment += `<td style="${sty1},width:12%;vertical-align:middle;text-align:center;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
      // text-align:center;
 segment += `</tr>`
      }
     
      // segment += `</table>`
      //  segment += `</tbody></table>`
      this.exporttoword(segment, false, false, true, 'landscape', '');
      this.controller.ok('added')
    }

    if (this.listtype === 3) {
      // box label
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      this.exporttoword(segment, false, false, false, 'portrait', '');
      this.controller.ok('added')
    }
    if (this.listtype === 4) {
      //condition
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      this.exporttoword(segment, false, false, false, 'portrait', '');
      this.controller.ok('added')
    }
    if (this.listtype === 5) {
      //registrar
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      this.exporttoword(segment, false, false, false, 'portrait', '');
      this.controller.ok('added')
    }

    if (this.listtype === 6) {
      //presention
      let segment = `<table style="width:650px; border-collapse:collapse;border-width:1px;"><tbody>`
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
      this.exporttoword(segment, false, false, false, 'portrait', '');
      this.controller.ok('added')
    }
    if (this.listtype === 7) {
      //checklist
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
      this.exporttoword(segment, false, false, false, 'portrait', '');
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

      this.exporttoword(segment, false, false, false, 'portrait', '');
      this.controller.ok('added')
    }
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


