
// import { inject } from 'aurelia-dependency-injection';
// import { ApiService } from '../../../utils/servicesApi';
// import { ApplicationService } from '../../../services/application-service';
// import { Aurelia } from 'aurelia-framework';
// import { DialogService } from 'aurelia-dialog';
// import { Prompt } from '../../../services/prompt';
// import { RtfService } from '../../../services/rtf-service';

// //https://wesbos.com/template-strings-html/
// @inject(ApiService, ApplicationService, DialogService, RtfService)
// export class Rtf {
//   tools = [
//     'pdf',
//     'html',
//     'bold',
//     'italic',
//     'underline',
//     // 'strikethrough',
//     'justifyLeft',
//     'justifyCenter',
//     'justifyRight',
//     'justifyFull',
//     // 'insertUnorderedList',
//     // 'insertOrderedList',
//     // 'indent',
//     // 'outdent',
//     // 'createLink',
//     // 'unlink',
//      'insertImage',
//     // 'insertFile',
//     'subscript',
//     'superscript',
//     'createTable',
//     'addRowAbove',
//     'addRowBelow',
//     'addColumnLeft',
//     'addColumnRight',
//     'deleteRow',
//     'deleteColumn',
//     'viewHtml',
//     'formatting',
//     'cleanFormatting',
//     'fontName',
//     'fontSize'
//     // 'foreColor',
//     // 'backColor',
//     // 'print'
//   ];
//   // tools = [
//   //   'pdf',
//   //   'html',
//   //   'bold',
//   //   'italic',
//   //   'underline',
//   //   // 'strikethrough',
//   //   // 'justifyLeft',
//   //   // 'justifyCenter',
//   //   // 'justifyRight',
//   //   // 'justifyFull',
//   //   // 'insertUnorderedList',
//   //   // 'insertOrderedList',
//   //   // 'indent',
//   //   // 'outdent',
//   //   // 'createLink',
//   //   // 'unlink',
//   //   // 'insertImage',
//   //   // 'insertFile',
//   //   'subscript',
//   //   'superscript',
//   //   // 'createTable',
//   //   // 'addRowAbove',
//   //   // 'addRowBelow',
//   //   // 'addColumnLeft',
//   //   // 'addColumnRight',
//   //   // 'deleteRow',
//   //   // 'deleteColumn',
//   //   'viewHtml',
//   //   'formatting',
//   //   'cleanFormatting',
//   //   'fontName',
//   //   'fontSize'
//   //   // 'foreColor',
//   //   // 'backColor',
//   //   // 'print'
//   // ];
//   resizable = {
//     content: true,
//     toolbar: true
//   }
//   heading = 'DataForm HEADER...';
//   footer = 'DataForm FOOTER...';
//   recordId = '';
//   done = false;
//   edit = false;
//   pre = '<p>'
//   post = '</p>'
//   prebefore = '</p>'
//   preafter = ' '
//   preitalic = '<em>'
//   postitalic = '</em>'
//   lineBreak = '<br>'

//   stylesheets = ['https://demos.telerik.com/kendo-ui/content/web/editor/pdf-export-styles.css'];
//   pdf = {
//     fileName: 'NewDocument.pdf',
//     proxyURL: '//demos.telerik.com/kendo-ui/service/export',
//     paperSize: 'letter',
//     margin: {
//       bottom: 20,
//       left: 30,
//       right: 20,
//       top: 20
//     }
//   };
//   html = {
//     fileName: 'NewDocument.html',
//     proxyURL: '//demos.telerik.com/kendo-ui/service/export',
//     paperSize: 'letter',
//     margin: {
//       bottom: 20,
//       left: 20,
//       right: 20,
//       top: 20
//     }
//   };


//   searchsold = [
//     { id: 0, name: 'normal size', factor: 1 },
//     { id: 1, name: '1.5 size', factor: 1.5 },
//     { id: 2, name: '2 size', factor: 2 },
//     { id: 3, name: '3 size', factor: 3 },
//     { id: 4, name: '.5 size', factor: .5 },
//     { id: 5, name: '.3 size', factor: .3 },
//   ];
//   selectedimagesize = 0;//null searchsold[0];
//   constructor(api, appService, dialogService, rtfService) {
//     this.api = api;
//     this.appService = appService;
//     this.provenance = '';
//     this.currentItem = this.appService.currentItem//testrec;
//     this.mode = 0;
//     this.editrec = '';
//     this.isDisableEdit = true
//     this.currentprovenance = '';
//     this.dialogService = dialogService
//     this.rtfService = rtfService
 
//   }
//   created(owningView, myView) {
//     // Invoked once the component is created...
//     //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
//   }
//   bind(bindingContext, overrideContext) {
//     // Invoked once the databinding is activated...
//     //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
//   }

//   setInitialValue(edt) {
//     if (this.currentItem.rtf1 !== undefined) edt.value(this.currentItem.rtf1);
//   }
//   setInitialValueLabel(edt) {
//     if (this.currentItem.rtf2 !== undefined) edt.value(this.currentItem.rtf2);
//   }


//   // buildEdition() {
//   //   this.EditionCommentFormat = ''
//   //   this.buildEditionLogic(this.currentItem.EditionComment)
//   //   this.currentItem.EditionText = this.currentItem.Edition + '\n' + this.EditionCommentFormat + '\n'
//   //   this.currentItem.EditionText += this.currentItem.Chop + '\n'
//   //   this.currentItem.EditionText += this.currentItem.Publisher + ', ' + this.currentItem.PublisherLocation + '\n'
//   //   this.currentItem.EditionText += this.currentItem.Printer + ', ' + this.currentItem.PrinterLocation + '\n'
//   //   delete this.EditionCommentFormat
//   // }


//   buildEdition() {
//     let segmentEditionHead = `<span style='text-decoration-line:underline'><u>EDITION</u></span><u></u><br>`
//     let segmentEdition = ''
//     let PublisherLoc
//     let PrinterLoc
//     if (this.currentItem.EditionText !== null && this.currentItem.EditionText !== undefined && this.currentItem.EditionText !== '') {
//       let EditionText = this.currentItem.EditionText
//       EditionText = EditionText.replace(new RegExp('\n', 'gi'), `<br>`);
//       this.segment1 += segmentEditionHead
//       this.segment1 += EditionText + `<br>`
//     }
//   }

//   buildProv() {
//     let provenance = this.currentItem.provenance
//     if (provenance !== undefined && provenance.length !== 0) {
//       let iarray = []
//       let provheader = `<br><span style='text-decoration-line:underline'><u>PROVENANCE</u></span><br>`
//       let provarray = []
//       for (const item of provenance) {
//         let pl = this.appService.codesProvenanceLocation
//         let oid
//         if ((item.ProvLoc + '').length < 6) {
//           oid = pl.findIndex(x => x.ID === item.ProvLoc)
//         } else {
//           oid = pl.findIndex(x => x.id === item.ProvLoc)
//         }
//         //unshift Adds new elements to the beginning of an array, and returns the new length
//         if (oid !== -1) {
//           let ProvLoc = this.appService.codesProvenanceLocation[oid].Description
//           if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
//             provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>` })
//           } else {
//             provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>${item.ProvMemo}<br>` })
//           }
//         } else {
//           if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
//             provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>` })
//           } else {
//             provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>${item.ProvMemo}<br>` })
//           }
//         }
//       }
//       let myObjects = _.sortBy(provarray, 'sord');
//       this.segment1 += provheader
//       for (const obj of myObjects) {
//         this.segment1 += obj.exception
//       }
//     }


//   }
//   buildRepro() {
//     let pre = '<p>'
//     let post = '</p>'
//     let ppre = ''
//     let ppost = ''
//     let prebefore = '</p>'
//     let preafter = ' '
//     let preitalic = '<em>'
//     let postitalic = '</em>'
//     let lineBreak = '<br>'
//     let exandpubhead = `<br><span style='text-decoration-line:underline'><u>EXHIBITION & PUBLICATION HISTORY</u></span><br>`
//     let exhibitandpubs = []
//     //console.log('===========buildRepro')
//     // conbine both tables
//     let provloc = this.appService.codesProvenanceLocation
//     let exhibition = undefined
//     let reproduction = undefined
//     if (this.currentItem.exhibition !== undefined) exhibition = JSON.parse(JSON.stringify(this.currentItem.exhibition));
//     if (this.currentItem.reproduction !== undefined) reproduction = JSON.parse(JSON.stringify(this.currentItem.reproduction));
//     let myObjects
//     let rec = {}
//     let linkPageNo
//     if (exhibition !== undefined) {
//       let ct = 0
//       for (const item of exhibition) {
//         //console.log('==================-item==========', item.ExhibitTitle)
//         ct++
//         // check to see if link in repo (loop thru exhibit and find repo match)
//         if (reproduction !== undefined) {
//           let eid = reproduction.findIndex(x => x.ReproductionExhibit === item.id)
//           let reporec
//           linkPageNo = ''
//           if (eid !== -1) {
//             reporec = reproduction[eid]
//             // console.log('link in exhibit from repo ct', ct, reporec.ReproductionPage, reporec)
//             linkPageNo = ` ${reporec.ReproductionPage}`
//             item.ExhibitSortDate = reporec.ReproductionSortDate
//           } else console.log('no link in exhibit from repo ct', ct)

//         } else linkPageNo = ''
//         let oid
//         if ((item.ExhibitLocation + '').length < 6) {
//           oid = provloc.findIndex(x => x.ID === item.ExhibitLocation)
//         } else {
//           oid = provloc.findIndex(x => x.id === item.ExhibitLocation)
//         }
//         if (oid == -1) oid = 1
//         let ExhibitLocationDesc = provloc[oid].Description
//         let ExhibitMemo
//         let lpn
//         // console.log('===================item.id linkPageNo', item.id, linkPageNo + '...')
//         if (linkPageNo === undefined || linkPageNo === "") {
//           lpn = '<br><br>'
//         } else {
//           lpn = `<br>${linkPageNo}<br><br>`
//         }
//         // console.log('===================item.id linkPageNo', item.id, lpn)
//         let exceptline
//         if (item.ExhibitMemo === null || item.ExhibitMemo === undefined || item.ExhibitMemo === '') {
//           exceptline = ppre + `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates} ${lpn}`
//           //console.log('===================item.id linkPageNo', exceptline)
//         }
//         else {
//           exceptline = `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}; ${item.ExhibitMemo} ${lpn} `
//           //console.log('==================no link exceptline', exceptline)
//         }
//         rec = {
//           date: item.ExhibitSortDate,
//           exception: exceptline
//         }
//         // console.log('rec.date/ exception', rec.date, rec.exception)
//         exhibitandpubs.push(rec)
//       }
//     } else exhibition = []
//     let rct = 0
//     if (reproduction !== undefined) {
//       // for (const item of reproduction) {
//       var i;
//       let item
//       for (i = 0; i < reproduction.length; i++) {
//         item = reproduction[i];
//         rct++
//         //console.log('rct ', rct) //, item.ReproductionPage, itm.ReproductionDate,item.ReproductionExhibit+'...')

//         if (item.ReproductionExhibit === null || item.ReproductionExhibit === undefined || item.ReproductionExhibit === "") {//selected choose)
//           console.log('reproduction item ', rct, item.ReproductionPage, item.ReproductionDate)
//           let oid = provloc.findIndex(x => x.id === item.ReproductionLocation)
//           if (oid == -1) oid = 1
//           let ReproductionLocationDesc = provloc[oid].Description

//           let data
//           if (item.ReproductionAuthor !== "") {
//             data = ppre + `${item.ReproductionAuthor}. <em>${item.ReproductionTitle}</em> ${preafter}`
//           } else
//             data = ppre + `${item.AuthorLast}, ${item.AuthorFirst}. <em>${item.ReproductionTitle}</em> ${preafter}`
         
//           data += `(${ReproductionLocationDesc}: ${item.ReproductionName}, ${item.ReproductionDate}) <br>`
//           data += `${item.ReproductionPage} <br> ${ppost}<br>`
         
//           rec = {
//             date: item.ReproductionSortDate,
//             exception: data
//           }
//           //console.log('push item ', rct, rec)
//           exhibitandpubs.push(rec)
//         }
//       }
//     }

//     if (exhibitandpubs.length > 0) {
//       myObjects = _.sortBy(exhibitandpubs, 'date');
//       this.segment1 += exandpubhead
//       for (const obj of myObjects) {
//         // this.segment1 += obj.date + ' ' + obj.exception
//         this.segment1 += obj.exception
//       }

//     }
//     console.log('===========buildRepro End')
//   }


//   buildInscribed(inscribed) {
//     // rules:
//     // 1 everying to left of : is plain text and to right is em
//     // 2 until it finds a ; (convert ; to </em> <br>)  
//     // 3 repeat 1 from new position
//     // let inscribed = this.currentItem.Inscribed
//     let iLines = []
//     console.log('inscribed==================== ', inscribed)
//     if (inscribed !== undefined) {
//       let a2 = ''
//       let a3 = ''
//       this.inscribedText = ''
//       let semisCount = (inscribed).match('/;/g')
//       let strCount = (inscribed).match(new RegExp(";", "g"))
//       let colonPos
//       let leftofcolonText, leftofcolonText2
//       let rightofcolonbaseText
//       let semisPos
//       let rightofcolonTextem, rightofcolonTextem2
//       let restoftext
//       console.log(semisCount, strCount);
//       colonPos = inscribed.indexOf(":");
//       if (colonPos === -1) {
//         iLines.push(inscribed)
//       } else {
//         leftofcolonText = inscribed.substr(0, colonPos + 1);
//         rightofcolonbaseText = inscribed.substr(colonPos + 1, inscribed.length - colonPos);
//         semisPos = rightofcolonbaseText.indexOf(";");
//         if (semisPos === -1) {
//           semisPos = rightofcolonbaseText.length
//           rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos) + '</em>'; //+ '</em><br>';
//           iLines.push(leftofcolonText + ' ' + rightofcolonTextem)
//         } else {
//           rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em><br>';
//           restoftext = rightofcolonbaseText.substr(semisPos, rightofcolonbaseText.length);
//           colonPos = restoftext.indexOf(":");
//           leftofcolonText2 = restoftext.substr(0, colonPos);
//           rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos) + '</em>';

//           iLines.push(leftofcolonText + ' ' + rightofcolonTextem + ' ' + leftofcolonText2 + ' ' + rightofcolonTextem2)
//         }
//       }
//       for (const item of iLines) {
//         this.inscribedText += item + '<br>'
//       }
//     }
//   }

//   // https://www.npmjs.com/package/docxtemplater
//   // let pre = '<p>'
//   // let post = '</p>'
//   // let prebefore = '</p>'
//   // let preafter = ' '
//   // let preitalic = '<em>'
//   // let postitalic = '</em>'
//   // let lineBreak = '<br>'
//   // 1811 3/4 in unframed
//   // 45.72 cm x 27.94 NaN cm unframed
//   // toma 14 x 22 x 1 in. / NaN cm 
//   createDim() {

//     let cmuh = this.currentItem.UnframedHeight16
//     let cmfh = this.currentItem.FramedHeight16
//     let cmuw = this.currentItem.UnframedWidth16
//     let cmfw = this.currentItem.FramedWidth16
//     let cmud = this.currentItem.UnframedDepth16
//     let cmfd = this.currentItem.FramedDepth16
//     // num.toPrecision(2)
//     this.dims = '';//undefined
//     this.dimscm = '';// undefined
//     this.dimsf = undefined
//     this.dimscmf = undefined
//     let ufwcm
//     let cmh = this.buildFactor(this.currentItem.UnframedHeight16)
//     let cmw = this.buildFactor(this.currentItem.UnframedWidth16)
//     let cmd = this.buildFactor(this.currentItem.UnframedDepth16)

//     this.buildDimLogic('unframed', 'UnframedHeight', 'UnframedHeight16', 'UnframedWidth', 'UnframedWidth16', 'UnframedDepth', 'UnframedDepth16', cmh, cmw, cmd)

//     this.dimsfactsheet = this.dims
//     this.dimscmfactsheet = this.dimscm

//     this.dims = ''
//     this.dimscm = ''
//     this.dimsight = ''
//     this.dimscmsight = ''


//     cmh = this.buildFactor(this.currentItem.SightHeight16)
//     cmw = this.buildFactor(this.currentItem.SightWidth16)
//     cmd = this.buildFactor(this.currentItem.SightDepth16)
//     this.buildDimLogic('sight', 'SightHeight', 'SightHeight16', 'SightWidth', 'SightWidth16', 'SightDepth', 'SightDepth16', cmh, cmw, cmd)
//     if (this.dims !== '') {
//       this.dimsight = this.dims
//       this.dimscmsight = this.dimscm
//     }

//     this.dims = ''
//     this.dimscm = ''
//     this.dimframed = ''
//     this.dimcmframed = ''

//     cmh = this.buildFactor(this.currentItem.FramedHeight16)
//     cmw = this.buildFactor(this.currentItem.FramedWidth16)
//     cmd = this.buildFactor(this.currentItem.FramedDepth16)

//     this.buildDimLogic('framed', 'FramedHeight', 'FramedHeight16', 'FramedWidth', 'FramedWidth16', 'FramedDepth', 'FramedDepth16', cmh, cmw, cmd)
//     if (this.dims !== '') {
//       this.dimframed = this.dims
//       this.dimcmframed = this.dimscm
//     }

//   }
//   buildFactor(dim) {
//     if (dim === '') dim = 0
//     let factor = 0.3175 //.125 * 2.54 
//     switch (dim) {
//       case null:
//         dim = 0
//         break;

//       case '0/0':
//         dim = 0
//         break;
//       case '1/8':
//         dim = factor
//         break;
//       case '1/4':
//         dim = factor * 2
//       case '3/8':
//         dim = factor * 3
//         break;
//       case '1/2':
//         dim = factor * 4
//         break;
//       case '5/8':
//         dim = factor * 5
//         break;
//       case '3/4':
//         dim = factor * 6
//         break;
//       case '7/8':
//         dim = factor * 7
//         break;
//     }
//     return dim
//   }

//   buildDimLogic(dtype, height, heightfraction, width, widthfraction, depth, depthfraction, cmh, cmw, cmd) {
//     let ufwcm
//     let frac
//     let mdim
//     if (cmh === undefined || cmh === '') cmh = 0;
//     if (cmw === undefined || cmw === '') cmw = 0;
//     if (cmd === undefined || cmd === '') cmd = 0;
//     // console.log('dep:', '1', this.currentItem[depth] === undefined, '2', this.currentItem[depth] === '0', '3', this.currentItem[depth] === 0, '4', this.currentItem[depth] === null, '5', this.currentItem[depth] = '')
//     if (this.currentItem[heightfraction] === undefined || this.currentItem[heightfraction] === '0' || this.currentItem[heightfraction] === 0 || this.currentItem[heightfraction] === null) { this.currentItem[heightfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
//     if (this.currentItem[widthfraction] === undefined || this.currentItem[widthfraction] === '0' || this.currentItem[widthfraction] === 0 || this.currentItem[widthfraction] === null) { this.currentItem[widthfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
//     if (this.currentItem[depthfraction] === undefined || this.currentItem[depthfraction] === '0' || this.currentItem[depthfraction] === 0 || this.currentItem[depthfraction] === null) { this.currentItem[depthfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
//     if (this.currentItem[height] === undefined || this.currentItem[height] === '0' || this.currentItem[height] === 0 || this.currentItem[height] === null) this.currentItem[height] = ''
//     if (this.currentItem[width] === undefined || this.currentItem[width] === '0' || this.currentItem[width] === 0 || this.currentItem[width] === null) this.currentItem[width] = ''
//     if (this.currentItem[depth] === undefined || this.currentItem[depth] === '0' || this.currentItem[depth] === 0 || this.currentItem[depth] === null) this.currentItem[depth] = ''
//     // console.log('dep::', '1', this.currentItem[depth] === undefined, '2', this.currentItem[depth] === '0', '3', this.currentItem[depth] === 0, '4', this.currentItem[depth] === null, '5', this.currentItem[depth] = '')
//     // console.log('frac ', this.currentItem[heightfraction], this.currentItem[widthfraction], this.currentItem[depthfraction])
//     // console.log('deim ', this.currentItem[height], this.currentItem[width], this.currentItem[depth], 'd-', this.currentItem[depth] === '')
//     if ((this.currentItem[height] === '' || this.currentItem[width] === '') && (this.currentItem[heightfraction] === '')) { } else {
//       if (this.currentItem[height] === '') {
//         if (this.currentItem[heightfraction] !== "") {
//           this.dims += `<span style="font-size:8.5pt;">${this.currentItem[heightfraction]} x `
//         } else this.dims += ' x '

//         this.dimscm += this.roundNumber((this.currentItem[height] * 2.54).toPrecision(2), 1) + ' x ' //fix
//       } else {
//         this.dims += `${this.currentItem[height]} <span style="font-size:8.5pt;"> ${this.currentItem[heightfraction]}</span> x `
//         if (cmh === 0) { frac = 0 } else frac = cmh * 2.54
//         mdim = (this.currentItem[height] * 2.54) + cmh
//         this.dimscm += this.roundNumber(mdim, 2) + ' x '
//       }

//       if (this.currentItem[width] === '') {
//         if (this.currentItem[widthfraction] !== "") {
//           this.dims += `<span style="font-size:8.5pt;">${this.currentItem[widthfraction]} x `
//         } else this.dims += ' x '
//         if (cmw === 0) { frac = 0 } else frac = cmw * 2.54
//         mdim = (this.currentItem[width] * 2.54) + cmw
//         this.dimscm += this.roundNumber(mdim, 2)
//       } else {
//         this.dims += `${this.currentItem[width]} <span style="font-size:8.5pt;"> ${this.currentItem[widthfraction]}</span> `
//         if (cmw === 0) { frac = 0 } else frac = cmw * 2.54
//         mdim = (this.currentItem[width] * 2.54) + cmw
//         this.dimscm += this.roundNumber(mdim, 2)
//       }

//       if (this.currentItem[depth] === '') {
//         if (this.currentItem[depthfraction] !== "") {
//           this.dims += `  x  <span style="font-size:8.5pt;"> ${this.currentItem[depthfraction]} </span>`
//           if (cmd === 0) { cmd = 0 } else frac = cmd * 2.54
//           mdim = (this.currentItem[depth] * 2.54) + cmd
//           this.dimscm += ' x ' + this.roundNumber((mdim).toPrecision(2), 1)
//           this.dimscm += ' x ' + this.roundNumber(mdim, 2)
//         }

//       } else {
//         if (this.currentItem[depthfraction] === "") {
//           this.dims += ` x ${this.currentItem[depth]}  `
//         } else {
//           this.dims += ` x ${this.currentItem[depth]}   <span style="font-size:8.5pt;"> ${this.currentItem[depthfraction]} </span>`
//           // frac = cmd * 2.54
//           if (cmd === 0) { cmd = 0 } else frac = cmd * 2.54
//           mdim = (this.currentItem[depth] * 2.54) + cmd
//           this.dimscm += ' x ' + this.roundNumber((mdim * 1 + frac * 1).toPrecision(2), 1)
//           //console.log('  this.dimscm ', this.dimscm)
//         }
//       }
//     }
//   }
//   // edition
//   buildEditionLogic(edition) {
//     // rules:
//     // 1 everying to left of : is plain text and to right is em
//     // 2 until it finds a ; (convert ; to </em> <br>)  
//     // 3 repeat 1 from new position
//     // let inscribed = this.currentItem.Inscribed
//     let iLines = []
//     console.log('this.currentItem.EditionComment==================== ', edition)//this.currentItem.EditionComment
//     if (edition !== undefined) {
//       let a2 = ''
//       let a3 = ''
//       this.inscribedText = ''
//       let semisCount = (edition).match('/;/g')
//       let strCount = (edition).match(new RegExp(";", "g"))
//       let colonPos
//       let leftofcolonText, leftofcolonText2
//       let rightofcolonbaseText
//       let semisPos
//       let rightofcolonTextem, rightofcolonTextem2
//       let restoftext
//       console.log(semisCount, strCount);
//       colonPos = edition.indexOf(":");
//       leftofcolonText = edition.substr(0, colonPos);
//       rightofcolonbaseText = edition.substr(colonPos + 1, edition.length - colonPos);
//       semisPos = rightofcolonbaseText.indexOf(";");
//       if (semisPos === -1) {
//         semisPos = rightofcolonbaseText.length
//         rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos - 1) + '</em>'; //+ '</em><br>';
//         iLines.push(leftofcolonText + ' ' + rightofcolonTextem)
//       } else {
//         // there is a semi so add br
//         rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em><br>';
//         restoftext = rightofcolonbaseText.substr(semisPos + 1, rightofcolonbaseText.length);
//         colonPos = restoftext.indexOf(":");
//         leftofcolonText2 = restoftext.substr(0, colonPos);
//         rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos) + '</em>';
//         iLines.push(leftofcolonText + ' ' + rightofcolonTextem + ' ' + leftofcolonText2 + ' ' + rightofcolonTextem2)
//       }
//       for (const item of iLines) {
//         this.EditionCommentFormat += item //+ '<br>'
//       }
//     }
//   }

//   async createRTF(createoptval) {
//     // alert('in create')
//      this.rtfService.currentItem = this.currentItem
//      let createopt = 1; // 1 MEANS UI DISPLAYS HTML 2; // 1 is from tab
//      let rr = await this.rtfService.createRTF(createopt)

//     // this.createDim()
//     // let artist = this.currentItem.artist
//     // let artistWdates = `<strong>${artist.firstName} ${artist.lastName}`
//     // if (artist.died) {
//     //   artistWdates += ` (${artist.yearofBirth}-${artist.died})`
//     // } else {
//     //   artistWdates += ` (b.${artist.yearofBirth})`
//     // }
//     // artistWdates += '</strong>'
//     // let artistWdates1 = `${artist.firstName} ${artist.lastName}`
//     // if (artist.died) {
//     //   artistWdates1 += ` (${artist.yearofBirth}-${artist.died})`
//     // } else {
//     //   artistWdates1 += ` (b.${artist.yearofBirth})`
//     // }
//     // this.buildInscribed(this.currentItem.Inscribed)
//     // this.segment2 = ` ${artistWdates1}<br>`
//     // this.segment2 += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `

//     // if (this.currentItem.MediumSupportobj !== undefined)
//     //   this.segment2 += `  ${this.currentItem.MediumSupportobj.Description}<br>`
 
//     // let uidx
//     // if (this.currentItem.Signed === undefined) this.currentItem.Signed = false
//     // if (this.currentItem.Dated === undefined) this.currentItem.Dated = false
//     // this.currentItem.Dated = this.currentItem.Dated + ''
//     // if (this.currentItem.Signed === 'Y') this.currentItem.Signed === true
//     // if (this.currentItem.Signed === 'N') this.currentItem.Signed === false
//     // if (this.currentItem.Dated === 'Y') this.currentItem.Dated === true
//     // if (this.currentItem.Dated === 'N') this.currentItem.Dated === false
//     // // if (this.currentItem.Signed === true) this.segment2 += '<br>signed'
//     // // if (this.currentItem.Dated === true) {
//     // //   if (this.currentItem.Signed === true) {
//     // //     this.segment2 += ' and dated<br> '
//     // //   } else this.segment2 += 'dated <br>'
//     // // } else this.segment2 += '<br>'
//     // ///////////////////////////////////////////////////////////////////////////  
//     // let fac = this.searchsold[this.selectedimagesize] 
//     // let ww = this.currentItem.clientWidth * fac.factor
//     // let hh = this.currentItem.clientHeight * fac.factor
//     // //console.log(hh, ww)
//     // if (ww === 0) ww = 450
//     // if (hh === 0) hh = 450
//     // this.segment1 = `<p><img class="responsive-img" src="https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></p>`


//     // this.segment1 += ` ${artistWdates}<br><br><br>`
//     // this.segment1 += ` <em>${this.currentItem.Title}</em>, ${this.currentItem.InvYear}<br>`
//     // if (this.currentItem.MediumSupportobj !== undefined)
//     //   this.segment1 += ` ${this.currentItem.MediumSupportobj.Description}  <br> `
   
//     // if (this.dimsfactsheet !== undefined) {
//     //   this.segment1 += `  ${this.dimsfactsheet} in.`
//     //   this.segment2 += `  ${this.dimsfactsheet} in. `
   
//     // }

//     // if (this.dimscm !== undefined) {
//     //   this.segment1 += ` / ${this.dimscmfactsheet} cm <br>  `
//     //   this.segment2 += ` / ${this.dimscmfactsheet} cm  <br>  `
//     // }
//     // if (this.dimsight !== '') {
//     //   this.segment2 += ` ${this.dimsight} in`
//     //   this.segment2 += ` / ${this.dimscmsight} cm sight size</br>  `
//     // }
//     // if (this.dimframed !== '') {
//     //  this.segment2 += ` ${this.dimframed} in`
//     //   this.segment2 += ` / ${this.dimcmframed} cm framed size </br>  `
//     // }
//     // this.segment1 += ` ${this.inscribedText}</br> `
//     // this.segment2 += ` ${this.inscribedText}</br> `
//     // if (this.currentItem.CatalogueNo !== undefined && this.currentItem.CatalogueNo !== '')
//     //   this.segment1 += ` no. ${this.currentItem.CatalogueNo} <br>   `
//     // this.currentItem.AltID = this.currentItem.AltID + ''
//     // // console.log('this.currentItem.AltID', this.currentItem.AltID)
//     // if (this.currentItem.AltID !== '') {
//     //   this.segment1 += ` ${this.currentItem.AltID} <br> `
//     // }
//     // this.buildEdition()
//     // this.buildProv()
//     // this.buildRepro()
    
//     this.editor.value( this.currentItem.rtf1 );
//     this.editorlabel.value(this.currentItem.rtf2 ); 
    

//     // if (createopt === 1) {
//     //   // caled from rtf tab
//     //   this.editor.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment1 + '</span>');
//     //   this.currentItem.rtf1 = this.editor.value()// factsheet
//     //   this.editorlabel.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment2 + '</span>');
//     //   this.currentItem.rtf2 = this.editorlabel.value()// label
//     // }



//   }

//   roundNumber(num, scale) {
//     if (Math.round(num) != num) {
//       if (Math.pow(0.1, scale) > num) {
//         return 0;
//       }
//       var sign = Math.sign(num);
//       var arr = ("" + Math.abs(num)).split(".");
//       if (arr.length > 1) {
//         if (arr[1].length > scale) {
//           var integ = +arr[0] * Math.pow(10, scale);
//           var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
//           var proc = +arr[1].slice(scale, scale + 1)
//           if (proc >= 5) {
//             dec = dec + 1;
//           }
//           dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
//           return dec;
//         }
//       }
//     }
//     return num;
//   }

//   onChange(e) {
//     // this.logger.log('value change');
//     this.currentItem.rtf1 = this.editor.value()
//   }
//   onChangelabel(e) {
//     this.currentItem.rtf2 = this.editorlabel.value()
//   }

//   saveChanges() {
//     this.currentItem.rtf1 = this.editor.value()
//   }
//   saveChangesDetail() {
//     this.currentItem.rtf2 = this.editorlabel.value()
//   }

//   // let img1 = `https://artbased.com/api/v1/getonePdf/inv/${this.currentItem.InventoryCode}.jpg" `
//   // EXIF.getData(img1, function () {
//   //   var make = EXIF.getTag(this, "Make");
//   //   var model = EXIF.getTag(this, "Model");
//   //   var makeAndModel = document.getElementById("makeAndModel");
//   //   this.makeAndModel = `${make} ${model}`;
//   // });
//   remove(item, index) {
//     //alert('you are about to delete ' + item.Notes + ' ' + index)
//     this.mode = 0
//     this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
//       if (!response.wasCancelled) {
//         console.log('Delete')
//         let provenance = this.currentItem.provenance
//         provenance.splice(index, 1)
//       } else {
//         console.log('cancel');
//       }
//       console.log(response.output);
//     });
//   }
// }
