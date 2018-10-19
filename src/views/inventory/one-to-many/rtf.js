
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import lodash from 'lodash';
import moment from 'moment';
// import EXIF from './exif';
// <require from="../../resources/value-converters/round-format"></require>
// import RoundFormat from "../../../resources/value-converters/round-format";
//  RoundFormat RoundFormatValueConverter

//import _ from 'lodash'
@inject(ApiService, ApplicationService, DialogService)
export class Rtf {
  tools = [
    'pdf',
    'html',

    'bold',
    'italic',
    'underline',
    'strikethrough',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'insertUnorderedList',
    'insertOrderedList',
    'indent',
    'outdent',
    'createLink',
    'unlink',
    'insertImage',
    'insertFile',
    'subscript',
    'superscript',
    'createTable',
    'addRowAbove',
    'addRowBelow',
    'addColumnLeft',
    'addColumnRight',
    'deleteRow',
    'deleteColumn',
    'viewHtml',
    'formatting',
    'cleanFormatting',
    'fontName',
    'fontSize',
    'foreColor',
    'backColor',
    'print'
  ];
  resizable = {
    content: true,
    toolbar: true
  }
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  // provenance: Provenance[] = []
  done = false;
  edit = false;
  pre = '<p>'
  post = '</p>'
  prebefore = '</p>'
  preafter = ' '
  preitalic = '<em>'
  postitalic = '</em>'
  lineBreak = '<br>'


  stylesheets = ['https://demos.telerik.com/kendo-ui/content/web/editor/pdf-export-styles.css'];
  pdf = {
    fileName: 'NewDocument.pdf',
    proxyURL: '//demos.telerik.com/kendo-ui/service/export',
    paperSize: 'letter',
    margin: {
      bottom: 20,
      left: 30,
      right: 20,
      top: 20
    }
  };
  html = {
    fileName: 'NewDocument.html',
    proxyURL: '//demos.telerik.com/kendo-ui/service/export',
    paperSize: 'letter',
    margin: {
      bottom: 20,
      left: 20,
      right: 20,
      top: 20
    }
  };

  //  imagesizes = [
  //         { id: 0, name: 'normal',factor:1 },
  //         { id: 1, name: 'x1.5' ,factor:1.5},
  //         { id: 2, name: 'x2' ,factor:2},
  //         { id: 3,  name: 'x3' ,factor:3},
  //       ];

  //       selectedimagesize = imagesizes[0];
  searchsold = [
    // { id: 0, name: 'Y' },
    // { id: 1, name: 'N' },
    // { id: 2, name: 'NFS' },
    // { id: 3, name: 'DON' },
    { id: 0, name: 'normal size', factor: 1 },
    { id: 1, name: '1.5 size', factor: 1.5 },
    { id: 2, name: '2 size', factor: 2 },
    { id: 3, name: '3 size', factor: 3 },
    { id: 4, name: '.5 size', factor: .5 },
    { id: 5, name: '.3 size', factor: .3 },

  ];
  selectedimagesize = 0;//null searchsold[0];
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

  }
  created(owningView, myView) {
    // Invoked once the component is created...
    //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
  }

  bind(bindingContext, overrideContext) {
    // Invoked once the databinding is activated...
    //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
  }
  // activate(params, routeConfig) {

  // }

  setInitialValue(edt) {
    if (this.currentItem.rtf1 !== undefined) edt.value(this.currentItem.rtf1);
  }

  setInitialValueLabel(edt) {
    if (this.currentItem.rtf2 !== undefined) edt.value(this.currentItem.rtf2);
  }

  // attached() {

  // }
  // buildExhibit(segment2) {
  // buildExhibit() {
  //   let exhibition = this.currentItem.exhibition
  //   if (exhibition !== undefined) {
  //     // this.currentItem.exhibition
  //     let iarray = []
  //     this.segment2 += ` <br><p>EXHIBITION HISTORY: </p>`
  //     for (const item of exhibition) {
  //       console.log("loopitem ====", item)
  //       //  iarray.push(item)

  //       this.segment2 += '<br>' + item.ExhibitTitle + ' ' + item.ExhibitSponser + ' ' + item.Reproduction + ' ' + item.ExhibitDates + ' '
  //     }
  //     // return segment2
  //   }
  // }

  buildEdition() {
    //this.segment2 += `<p><span style='text-decoration-line:underline'><strong><u>EDITION</u></strong></span><u></u></p>`
    let segmentEditionHead = `<p><span style='text-decoration-line:underline'><strong><u>EDITION</u></strong></span><u></u></p>`
    let segmentEdition = ''
    let PublisherLoc
    let PrinterLoc
    //  this.currentItem.EditionComment this.currentItem.Chop
    //  this.currentItem.Publisher this.currentItem.PublisherLocation-codesProvenanceLocation 
    //  this.currentItem.Printer-codesProvenanceLocation
    let pl = this.appService.codesProvenanceLocation
    if (this.currentItem.PublisherLocation !== undefined) {
      let oid = pl.findIndex(x => x.id === this.currentItem.PublisherLocation)
      oid == -1 ? PublisherLoc = '' : PublisherLoc = ', ' + pl[oid].Description
    } else PublisherLoc = ''


    if (this.currentItem.PrinterLocation !== undefined) {
      let oidp = pl.findIndex(x => x.id === this.currentItem.PrinterLocation)
      oidp == -1 ? PrinterLoc = '' : PrinterLoc = ', ' + pl[oidp].Description

    } else PrinterLoc = ''
    if (this.currentItem.Edition !== undefined && this.currentItem.Edition !== '')
      segmentEdition += `Edition: ${this.currentItem.Edition} <br>`
    if (this.currentItem.Publisher !== undefined && this.currentItem.Publisher !== '') {
      segmentEdition += `${this.currentItem.Publisher}${PublisherLoc}<br>`
    }
    if (this.currentItem.Printer !== undefined && this.currentItem.Printer !== '') {
      segmentEdition += `${this.currentItem.Printer}${PrinterLoc}<br>`
    }
    if (segmentEdition !== '') {
      this.segment2 += segmentEditionHead
      this.segment2 += segmentEdition + `<br> ${this.currentItem.EditionComment}<br>`



    }
  }

  buildProv() {
    let provenance = this.currentItem.provenance
    if (provenance !== undefined) {
      let iarray = []
      // this.segment2 += ` <br><p>PROVONANCE HISTORY: </p>`
      // this.segment2 += `<p><span style="text-decoration-line:underline;"><strong>PROVONANCE</strong></span></p>`
      this.segment2 += `<p><span style='text-decoration-line:underline'><strong><u>PROVENANCE</u></strong></span><u></u></p>`
      let provarray = []

      for (const item of provenance) {
        //  console.log("loopitem provenance====", item)
        // let ProvOwner = req.param('ProvOwner')
        // let ProvDate = req.param('ProvDate')
        // let ProvSortDate = req.param('ProvSortDate')
        // let ProvMemo = req.param('ProvMemo');
        // let Sequence = req.param('Sequence')
        // let ProvLoc = req.param('Description');

        let pl = this.appService.codesProvenanceLocation
        let oid
        if ((item.ProvLoc + '').length < 6) {

          oid = pl.findIndex(x => x.ID === item.ProvLoc)
        } else {
          oid = pl.findIndex(x => x.id === item.ProvLoc)

        }
        //unshift Adds new elements to the beginning of an array, and returns the new length

        if (oid !== -1) {
          let ProvLoc = this.appService.codesProvenanceLocation[oid].Description
          if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
            // this.segment2 += `${item.ProvOwner}, ${ProvLoc}<br>`
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>${item.ProvMemo}<br>` })
          }
        } else {
          if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
            // this.segment2 += `${item.ProvOwner}<br>`
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>${item.ProvMemo}<br>` })
          }

        }
        //
        //	this.segment2 += `${item.ProvOwner}, ${ProvLoc}<br> ${item.ProvMemo}`
      }
      let myObjects = lodash.sortBy(provarray, 'sord');

      for (const obj of myObjects) {
        // this.segment2 += obj.date + ' ' + obj.exception
        this.segment2 += obj.exception
      }
    }


  }
  buildRepro() {

    let pre = '<p>'
    let post = '</p>'
    let prebefore = '</p>'
    let preafter = ' '
    let preitalic = '<em>'
    let postitalic = '</em>'
    let lineBreak = '<br>'
    // this.segment2 += `<br><p><span style="text-decoration-line:underline;"><strong>EXHIBITION & PUBLICATION </strong></span></p>`
    let exandpubhead = `<br><br><br><p><span style='text-decoration-line:underline'><strong><u>EXHIBITION & PUBLICATION HISTORY</u></strong></span><u></u></p><br>`

    let exhibitandpubs = []


    // conbine both tables
    let pl = this.appService.codesProvenanceLocation

    let exhibition = this.currentItem.exhibition
    let reproduction = this.currentItem.reproduction
    let myObjects
    let rec = {}
    let linkPageNo
    if (exhibition !== undefined) {
      for (const item of exhibition) {
        console.log('==================-item==========', item.ExhibitTitle)

        // let ExhibitTitle = req.param('ExhibitTitle')
        // let ExhibitSponser = req.param('ExhibitSponser')
        // let ExhibitLocation = req.param('Description') //typeahead
        // let ExhibitDates = req.param('ExhibitDates')
        // let ExhibitSortDate = req.param('ExhibitSortDate')
        // let Traveled = req.param('Traveled')
        // let batchno = req.param('batchno')
        // let ExhibitMemo = req.param('ExhibitMemo')


        // check to see if link in repo
        if (reproduction !== undefined) {
          // let eid = reproduction.findIndex(x => x.ReproductionExhibit === item.ExhibitTitle)
          let eid = reproduction.findIndex(x => x.id === item.id)
          let reporec
          linkPageNo = ''
          console.log('eid ', eid, linkPageNo) //ColorBWDesc1)

          if (eid !== -1) {
            reporec = reproduction[eid]
            console.log('reporec', reporec.ReproductionPage, reporec)

            linkPageNo = `, ${reporec.ReproductionPage} `
            item.ExhibitSortDate = reporec.ReproductionSortDate
          }
        } else linkPageNo = ''

        //console.log('item.ReproductionExhibit ',  item.ReproductionExhibit, 'linkPageNo', linkPageNo)
        let oid
        if ((item.ExhibitLocation + '').length < 6) {

          oid = pl.findIndex(x => x.ID === item.ExhibitLocation)
        } else {
          oid = pl.findIndex(x => x.id === item.ExhibitLocation)

        }
        //  oid = pl.findIndex(x => x.id === item.ExhibitLocation) 
        if (oid == -1) oid = 1
        let ExhibitLocationDesc = pl[oid].Description

        // , ${item.ExhibitMemo}`
        // console.log('moment', moment(item.ExhibitSortDate,'YYYYmmdd'))
        let ExhibitMemo
        //	item.ExhibitMemo === undefined ? ExhibitMemo = '' : ExhibitMemo = ', ' + item.ExhibitMemo <strong>DD:</strong>
        let exceptline
        if (item.ExhibitMemo === null || item.ExhibitMemo === undefined || item.ExhibitMemo === '') {
          // exceptline = pre + `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}${linkPageNo} ` + post
          exceptline = pre + `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}${linkPageNo} <br><br> `
        }
        else {
          //    exceptline = pre + `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}${linkPageNo}, ${item.ExhibitMemo}` + post
          exceptline = `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}${linkPageNo}, ${item.ExhibitMemo} <br><br>`

        }

        rec = {
          // date: moment(item.ExhibitSortDate,'YYYYmmdd'),
          //ReproductionSortDate ExhibitSortDate
          date: item.ExhibitSortDate,
          //   exception: pre + item.ExhibitTitle + ', ' + item.ReproductionLocation + ', ' + item.ExhibitDates + post
          exception: exceptline

        }
        console.log('rec ', rec)

        exhibitandpubs.push(rec)
      }
    } else exhibition = []



    //       console.log('inv.reproduction.length', inv.reproduction.length)




    // 2014-01-01
    // Villiger, Suzi. 0Hans Hofmann Catalogue Raisonné of Paintings Vol. II (5bae1dff459dbacdea25a716: Lund Humphries, 2014-01-01) 
    // null, on page Illustrated in color on page 368, no. P606
    /**  let ExhibitID = req.param('ExhibitID')
        let ReproductionType = req.param('ReproductionType')//TransportTo')
        let ReproductionPage = req.param('ReproductionPage')//TransportFrom')
        let ColorBW = req.param('ColorBW');
        let ReproductionDate = req.param('ReproductionDate')
        let ReproductionSortDate = req.param('ReproductionSortDate')//TransportTo')
        let ReproductionLocation = req.param('DescriptionLoc')//TransportFrom')
        let ReproductionAuthor = req.param('ReproductionAuthor');
        let ReproductionName = req.param('ReproductionName'); //publishr
        let ReproductionTitle = req.param('ReproductionTitle');
  */
    if (reproduction !== undefined) {
      for (const item of reproduction) {
        if (item.ReproductionExhibit === null) {//undefined)
          // let oid
          // if ((item.ReproductionLocation + '').length < 6) {

          //   oid = pl.findIndex(x => x.ID === item.ReproductionLocation)
          // } else {
          //   oid = pl.findIndex(x => x.id === item.ReproductionLocation)

          // }

          let oid = pl.findIndex(x => x.id === item.ReproductionLocation)

          if (oid == -1) oid = 1
          let ReproductionLocationDesc = pl[oid].Description


          let ColorBWDesc = ''
          if (item.ColorBW !== null) {
            let cid = this.appService.codesReproductionType.findIndex(x => x.id === item.ColorBW)
            // ColorBWDesc = `${this.appService.codesReproductionType}[${cid}].Description, `
            ColorBWDesc = this.appService.codesReproductionType[cid].Description + ', '
          }
          let data = pre + `${item.AuthorLast}, ${item.AuthorFirst}, <em>${item.ReproductionTitle}</em> ${preafter}`
          //   let data= pre + ` ${item.AuthorLast}, ${item.AuthorFirst}, ${preitalic} ${item.ReproductionTitle} ${postitalic} ${preafter} ( `


          data += `${ReproductionLocationDesc}: ${item.ReproductionName}, ${item.ReproductionDate}  ${lineBreak}`
          data += `${ColorBWDesc} on page ${item.ReproductionPage} ${lineBreak} ${post}`
          rec = {
            date: item.ReproductionSortDate,

            exception: data
          }

          exhibitandpubs.push(rec)
        }
      }
    }

    if (exhibitandpubs.length > 0) {
      myObjects = lodash.sortBy(exhibitandpubs, 'date');
      //  console.log('============myObjects===========================================')
      // lodash.forEach(myObjects, function (result) {
      //   console.log('result ', result);
      // });
      this.segment2 += exandpubhead
      for (const obj of myObjects) {
        // this.segment2 += obj.date + ' ' + obj.exception
        this.segment2 += obj.exception
      }

    }
  }
  //1
  buildInscribed() {
    // rules:
    // 1 everying to left of : is plain text and to right is em
    // 2 until it finds a ; (convert ; to </em> <br>)  
    // 3 repeat 1 from new position
    let inscribed = this.currentItem.Inscribed
    let iLines = []
    console.log('inscribed==================== ', inscribed)
    if (inscribed !== undefined) {
      let a2 = ''
      let a3 = ''

      this.inscribedText = ''
      // let semis = inscribed.count(';')
      // const semisCount = (inscribed, ";") => lodash.countBy(inscribed)[';'] || 0;
      // let semisCount =   lodash.count(inscribed, ";")
      // console.log(("str1,str2,str3,str4".match(/,/g) || []).length); //logs 3
      // console.log(("str1,str2,str3,str4".match(new RegExp("str", "g")) || []).length); //logs 4

      //inscribed verso with orientation information and Museum of Modern Art numbers: [up arrow] top / 57.424 / 56.1276; 
      //signed and dated by Lee Krasner, the artist's widow, verso on backing board: Jackson Pollock 1952 ca. / Lee Krasner Pollock 1960

      // inscribed verso with orientation information and Museum of Modern Art numbers em [up arrow] top / 57.424 / 56.1276
      //signed and dated by Lee Krasner, the artist's widow, verso on backing board em Jackson Pollock 1952 ca. / Lee Krasner Pollock 1960

      let semisCount = (inscribed).match('/;/g')
      let strCount = (inscribed).match(new RegExp(";", "g"))
      let colonPos
      let leftofcolonText
      let rightofcolonbaseText
      let semisPos
      let rightofcolonTextem
      let restoftext
      console.log(semisCount, strCount);
      //  let semisPos = inscribed.indexOf(";"); 
      colonPos = inscribed.indexOf(":");
      leftofcolonText = inscribed.substr(0, colonPos);
      rightofcolonbaseText = inscribed.substr(colonPos + 1, inscribed.length - colonPos);
      semisPos = rightofcolonbaseText.indexOf(";");
      rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em>';
      iLines.push(leftofcolonText + ' ' + rightofcolonTextem)
      restoftext = rightofcolonbaseText.substr(semisPos + 1, rightofcolonbaseText.length);

      colonPos = restoftext.indexOf(":");
      leftofcolonText = restoftext.substr(0, colonPos);
      rightofcolonTextem = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos) + '</em>';
      iLines.push(leftofcolonText + ' ' + rightofcolonTextem)


      // semisPos = inscribed.indexOf(";");
      // //  let leftofcolonText=inscribed.substr(colonpos, colonpos);
      // rightofcolonText = inscribed.substr(colonPos + 1, semisPos - 1);

      for (const item of iLines) {
        this.inscribedText += item + '<br>'
      }


      //console.log('semis',semisCount,semisPos ,colonPos ,leftofcolonText ,rightofcolonText)
      // let n1 = inscribed.indexOf(":");
      // let a1 = inscribed.substr(0, n1);
      // a2 = inscribed.substr(n1, inscribed.length)

      // let n2 = a2.indexOf(";");
      // console.log('n2', n2)
      // if (n2 > -1) {
      //   a3 = a2.substr(n2 + 1, inscribed.length)
      //   a2 = inscribed.substr(n1, n2)
      // } // else a2=inscribedText
      // // let rawInsribed
      // // (a3 === undefined) ? inscribedText = pre + a1 + preitalic + a2 + postitalic +
      // //  preafter + post : inscribedText = pre + a1 + preitalic + a2 + postitalic + preafter + ',' + a3 + post

      // // (a3 === undefined) ? inscribedText = this.pre + a1 + this.preitalic + a2 + this.postitalic + this.post : inscribedText = pre + a1 + this.preitalic + a2 + this.postitalic + this.preafter + ',' + a3 + this.post
      // if (a3 === '') {
      //   inscribedText = this.pre + a1 + this.preitalic + a2 + this.postitalic + this.post
      // } else {
      //   inscribedText = pre + a1 + this.preitalic + a2 + this.postitalic + this.preafter + ',' + a3 + this.post
      // }
      // this.inscribedText = inscribedText

      // console.log('inscribedText', this.inscribedText)
    }

  }

  createRTF() {
    // https://www.npmjs.com/package/docxtemplater
    // let pre = '<p>'
    // let post = '</p>'
    // let prebefore = '</p>'
    // let preafter = ' '
    // let preitalic = '<em>'
    // let postitalic = '</em>'
    // let lineBreak = '<br>'
    // 1811 3/4 in unframed
    // 45.72 cm x 27.94 NaN cm unframed
    let dims
    let dimscm

    let cmuh = this.currentItem.UnframedHeight16
    let cmfh = this.currentItem.FramedHeight16

    let cmuw = this.currentItem.UnframedWidth16
    let cmfw = this.currentItem.FramedWidth16
    let factor = 0.3175 //.125 * 2.54 
    switch (cmuh) {
      case null:
        cmuh = 0
        break;
      case '0/0':
        cmuh = 0
        break;
      case '1/8':
        cmuh = factor
        break;
      case '1/4':
        cmuh = factor * 2
      case '3/8':
        cmuh = factor * 3
        break;
      case '1/2':
        cmuh = factor * 4
        break;
      case '5/8':
        cmuh = factor * 5
        break;
      case '3/4':
        cmuh = factor * 6
        break;
      case '7/8':
        cmuh = factor * 7
        break;
    }

    switch (cmfh) {
      case null:
        cmfh = 0
        break;

      case '0/0':
        cmfh = 0
        break;
      case '1/8':
        cmfh = factor
        break;
      case '1/4':
        cmfh = factor * 2
      case '3/8':
        cmfh = factor * 3
        break;
      case '1/2':
        cmfh = factor * 4
        break;
      case '5/8':
        cmfh = factor * 5
        break;
      case '3/4':
        cmfh = factor * 6
        break;
      case '7/8':
        cmfh = factor * 7
        break;

    }
    switch (cmuw) {
      case null:
        cmuw = 0
        break;

      case '0/0':
        cmuw = 0
        break;
      case '1/8':
        cmuw = factor
        break;
      case '1/4':
        cmuw = factor * 2
      case '3/8':
        cmuw = factor * 3
        break;
      case '1/2':
        cmuw = factor * 4
        break;
      case '5/8':
        cmuw = factor * 5
        break;
      case '3/4':
        cmuw = factor * 6
        break;
      case '7/8':
        cmuw = factor * 7
        break;

    }

    switch (cmfw) {
      case null:
        cmfw = 0
        break;

      case '0/0':
        cmfw = 0
        break;
      case '1/8':
        cmfw = factor
        break;
      case '1/4':
        cmfw = factor * 2
      case '3/8':
        cmfw = factor * 3
        break;
      case '1/2':
        cmfw = factor * 4
        break;
      case '5/8':
        cmfw = factor * 5
        break;
      case '3/4':
        cmfw = factor * 6
        break;
      case '7/8':
        cmfw = factor * 7
        break;


    }

    // num.toPrecision(2)
    /*
    we lost the Height dimension in the cm part

there are extra ' when there are fractions

14 5/8 ' x '12 1/4 in. / __ x 31 cm
17 1/2 ' x '22 1/4 in. / __ x 57 cm   */
    if (this.currentItem.UnframedHeight16 === null) {
      dims = this.currentItem.UnframedHeight + ' x '
      dimscm = this.currentItem.UnframedHeight * 2.54 + ' cm ' + ' x '
    } else {
      // dims = this.currentItem.UnframedHeight + ' ' + this.currentItem.UnframedHeight16 + ' x '
      dims = `${this.currentItem.UnframedHeight} <span style="font-size:x-small;"> ${this.currentItem.UnframedHeight16}</span> x `

      // dimscm = this.currentItem.UnframedHeight * 2.54 + ' ' + this.currentItem.UnframedHeight16 * 2.54 + ' x '
      // dimscm = Math.round((this.currentItem.UnframedHeight * 2.54) + cmuh) + ' x '

      dimscm = ((this.currentItem.UnframedHeight * 2.54) + cmuh).toPrecision(2) + ' x '

      // Math.round(num * 100) / 100
    }

    if (this.currentItem.UnframedWidth16 === null) {
      // dims += `<span style="font-size:x-small;"> ${this.currentItem.UnframedWidth} </span>`
      dims += this.currentItem.UnframedWidth

      dimscm += this.currentItem.UnframedWidth * 2.54
    } else {
      dims += `${this.currentItem.UnframedWidth}       <span style="font-size:x-small;"> ${this.currentItem.UnframedWidth16} </span>`
      // dimscm += Math.round(((this.currentItem.UnframedWidth * 2.54) + cmuw))
      dimscm += ((this.currentItem.UnframedWidth * 2.54) + cmuw).toPrecision(2)

    }
    /////////////////////////////


    let dimsf
    let dimscmf
    if (this.currentItem.FramedHeight !== 0) {
      if (this.currentItem.FramedHeight16 === null) {
        //   dimsf = this.currentItem.FramedHeight + ' x '
        dimsf = `${this.currentItem.FramedHeight} <span style="font-size:x-small;"> ${this.currentItem.FramedHeight} </span> x `

        dimscmf = this.currentItem.FramedHeight * 2.54 + ' cm ' + ' x '
      } else {
        dimsf = `${this.currentItem.FramedHeight}  + ' ' + <span style="font-size:x-small;"> ${this.currentItem.FramedHeight16} </span> x `
        // dimscmf = ((this.currentItem.FramedHeight * 2.54) + cmfh) + ' x '
        dimscmf = ((this.currentItem.FramedHeight * 2.54) + cmfh).toPrecision(2)

      }

      if (this.currentItem.FramedWidth16 === null) {
        dimsf += this.currentItem.FramedWidth
        dimscmf += (this.currentItem.FramedWidth * 2.54).toPrecision(2)

      } else {
        // dimsf += this.currentItem.FramedWidth + ' ' + this.currentItem.FramedWidth16
        dimsf += `${this.currentItem.FramedWidth}  <span style="font-size:x-small;"> ${this.currentItem.FramedWidth16} </span>  `

        // dimscmf += ((this.currentItem.FramedWidth * 2.54) + cmfw)
        dimscmf += ((this.currentItem.FramedWidth * 2.54) + cmfw).toPrecision(2)

      }
    }

    let artist = this.currentItem.artist

    let artistWdates = `<strong>${artist.firstName} ${artist.lastName}`

    if (artist.died) {
      artistWdates += ` (${artist.yearofBirth} - ${artist.died})`
    } else {
     artistWdates += ` (b.${artist.yearofBirth})`
    }
    artistWdates += '</strong>'

    let artistWdates1 = `${artist.firstName} ${artist.lastName}`

    if (artist.died) {
      artistWdates1 += ` (${artist.yearofBirth} - ${artist.died})`
    } else {
      // (b.1950)

      artistWdates1 += ` (b.${artist.yearofBirth})`
    }



    this.buildInscribed()


    //1
    let segment1 = ` ${artistWdates1}<br>`
    segment1 += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `
    segment1 += `  ${this.currentItem.MediumSupportobj.Description}<br> `
    if (dimsf !== undefined) {
      segment1 += `  ${dimsf} in. framed<br> `
      segment1 += `  ${dimscmf} cm framed<br> `
    }

    segment1 += `  ${dims} in. unframed<br> `
    segment1 += `  ${dimscm} cm unframed<br> `
    
   
if (this.currentItem.Signed)  segment1 += 'signed'


if (this.currentItem.Dated) {
  
   if (this.currentItem.Signed){ 
    segment1 += ' and dated '
   }  else   segment1 += 'dated '
}
    // segment1 += ` ${this.inscribedText}<br> ` 



    // this.appService.clientHeight = this.mainimage.clientHeight
    // this.appService.clientWidth = this.mainimage.clientWidth
    let fac = this.searchsold[this.selectedimagesize] // - ${this.sold.factor}
    //  alert(`${this.selectedimagesize}- ${fac.factor} `  )
    //   - ${fac}

    let ww = this.appService.clientWidth * fac.factor
    let hh = this.appService.clientHeight * fac.factor
    //  let ww = this.currentItem.clientWidth * fac.factor
    //  let hh = this.currentItem.clientHeight * fac.factor


    console.log(hh, ww)
    if (ww === 0) ww = 450
    if (hh === 0) hh = 450

    this.segment2 = `<p><img src="https://artbased.com/api/v1/getonepdf/inv/${this.currentItem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></p>`

    // this.segment2 = `<p><img src="https://artbased.com/api/v1/getonepdf/inv/POLLOCJ005.jpg" alt="" width="${ww}" height="${hh}" /></p>`
    // this.segment2 = `<p><img src="https://artbased.com/api/v1/getonepdf/inv/${this.currentItem.InventoryCode}.jpg" alt="" width="${this.appService.cli}" height="${hh}" /></p>`

    this.segment2 += ` ${artistWdates}<br><br><br>`
    this.segment2 += ` <em>${this.currentItem.Title}</em>, ${this.currentItem.InvYear}<br>`
    this.segment2 += ` ${this.currentItem.MediumSupportobj.Description}  <br> `
    // this.segment2 += ` <p> ${this.currentItem.InvYear} </p> `
    // if (dimsf !== undefined) this.segment2 += `  ${dimsf} in framed<br> `
    // if (dimscmf !== undefined) this.segment2 += `  ${dimscmf} cm framed<br>  `
    if (dims !== undefined) this.segment2 += `  ${dims} in.`
    if (dimscm !== undefined) this.segment2 += ` / ${dimscm} cm <br>  `

    // this.segment2 += `<br> ${this.currentItem.SignedLocation} <br>`
    // this.segment2 += ` ${this.currentItem.SignedLocation} <br>`
    // this.segment2 += `<br><br>no. P606 <br>`
    this.segment2 += ` ${this.inscribedText}<br> `

    if (this.currentItem.CatalogueNo !== undefined && this.currentItem.CatalogueNo !== '')
      this.segment2 += ` Catalogue No: ${this.currentItem.CatalogueNo} <br>  <br> <br> `


    this.buildEdition()
    this.buildProv()
    this.buildRepro()
    // this.editor.value('<p>' + segment1 + '</p>' + '<hr><p>' +  this.segment2 + '</p>');

    this.editor.value('<p>' + this.segment2 + '</p>');
    this.currentItem.rtf1 = this.editor.value()// factsheet

    this.editorlabel.value('<p>' + segment1 + '</p>');
    this.currentItem.rtf2 = this.editorlabel.value()// label



  }
  saveChanges() {
    this.currentItem.rtf1 = this.editor.value()

    // let img1 = `https://artbased.com/api/v1/getonePdf/inv/${this.currentItem.InventoryCode}.jpg" `
    // EXIF.getData(img1, function () {
    //   var make = EXIF.getTag(this, "Make");
    //   var model = EXIF.getTag(this, "Model");
    //   var makeAndModel = document.getElementById("makeAndModel");
    //   this.makeAndModel = `${make} ${model}`;
    // });


  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
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
}

 // buildRepro() {
  //   let reproduction = this.currentItem.reproduction
  //   if (reproduction !== undefined) {
  //     let iarray = []
  //     this.segment2 += `<p><span style="text-decoration-line:underline;"><strong>EXHIBITION & PUBLICATION HISTORY</strong></span></p>`

  //     for (const item of reproduction) {
  //       console.log("loopitem ====", item)

  //       this.segment2 += '<br>' + item.ReproductionName + ' ' + item.ReproductionTitle + ' '
  //         + item.ReproductionAuthor
  //         + item.ReproductionDate

  //     }

  //   }
  //   this.segment2 += ` <br />`
  //   let exhibition = this.currentItem.exhibition
  //   if (exhibition !== undefined) {
  //     // this.currentItem.exhibition
  //     let iarray = []
  //     this.segment2 += ` <br><p>EXHIBITION HISTORY: </p>`
  //     for (const item of exhibition) {
  //       console.log("loopitem ====", item)
  //       //  iarray.push(item)
  //       this.segment2 += '<br>' + item.ExhibitTitle + ' ' + item.ExhibitSponser + ' ' + item.Reproduction + ' ' + item.ExhibitDates + ' '
  //     }
  //   }
  // }


  //   <p>Charles Porter ( 1847 -  1923 )<br />
  // <em>Untitled (Peonies)</em>, c.1890 <br />
  // box assemblage of wood, glass, <br />
  // 24 x 20 in framed<br />
  // 60.96 cm  x 50.8 cm framed<br />
  // 20 3/8 x 16 1/4 in unframed<br />
  // 50.8 NaN x 40.64 NaN cm unframed<br />
  // signed <br />
  // signed lower right: "C E Porter"<br />
  // </p>

  //=======================================\\
  // <hr />
  // <p><img src="https://artbased.com/api/v1/getonePdf/inv/PORTERC008.jpg" alt="" width="300" height="300" /></p>
  // <p><strong>Charles Porter ( 1847 -  1923 )</strong><br />
  // </p>
  // <p><em>Untitled (Peonies)</em>, c.1890</p>
  // <p>box assemblage of wood, glass,<br />
  // </p>
  // <p><br />
  // </p>
  // <p>20 3/8 x 16 1/4 in unframed<br />
  // 50.8 NaN x 40.64 NaN cm unframed<br />
  // <br />
  // signed lower right: "C E Porter" <br />
  // titled verso:signed lower right: "C E Porter" <br />
  // </p>
  // <p><span style="text-decoration-line:underline;"><strong>PROVONANCE</strong></span></p>
  // <p><br />
  // Charles Ethan Porter&nbsp;<br />
  // Farmington Fine Arts Auction&nbsp;<br />
  // Private Collection&nbsp;<br />
  // Michael Rosenfeld Gallery LLC&nbsp;</p>
  // <p>REPRODUCTION HISTORY:</p>
  // <p><br />
  // <br />
  // undefined undefined undefined10/1/2018<br />
  // undefined undefined undefined01/01/2018</p>
  // <p><br />
  // </p>
  // <p><span style="text-decoration:underline;"><strong>EXHIBITION &amp; PUBLICATION HISTORY</strong></span></p>
  // <p><br />
  // Test1 Sponser1 undefined  <br />
  // Windows on the City: Looking Out at Gracie&rsquo;s New York The Gracie Mansion Conservancy undefined November 10, 2013-November 30, 2016 <br />
  // nancy nancy2 undefined Da  <br />
  // </p>
  // <p><br />
  // </p>
  // <p>&nbsp;</p>




 /**Charles Ethan Porter (1847-1923)
 Untitled (Peonies), c.1890
 oil on canvas
 20" x 16" unframed 
 signed 
 signed lower right: CE Porter
  ==============================
  Charles Porter ( 1847 - 1923 )
 
 undefined , c.2003
 
 )
 59d282beb777d41f42a5b2ee
 
 )
 signed
 
 )
 signed lower right: "C E Porter"
 
 )
  
  
  */
    // artist.yearofBirth artist.died
    //   "firstName" : "Charles", 
    // "lastName" : "Porter", 
    // if (this.currentItem.rtf1 !== undefined) {
    //   this.editor.value(this.currentItem.rtf1)
    // } else {
    /* "UnframedHeight" : 20.0, 
  "UnframedHeight16" : null, 
  "UnframedWidth" : 16.0, 
  "UnframedWidth16" : null, 
  "UnframedDepth" : 0.0, 
  "UnframedDepth16" : null, 
  "FramedHeight" : 0.0, 
  "FramedHeight16" : null, 
  "FramedWidth" : 0.0, 
  "FramedWidth16" : null, 
  "FramedDepth" : 0.0, 
  "FramedDepth16" : null,  */



    //  prp.Lines.Strings[12] := 'PUBLICATION HISTORY';
    //     artist_name := artist_name + HREPO + '</p>';
    //     while not eof do
    //     begin

    //       repo := ''; repo2 := ''; repo3 := '';
    //       repo := repo + '<p>' + frmInv.qReproduction.fieldbyname('Reproduction Author').asstring + ','; // NO SPACE BEC NEXT IS <I>
    //       //      repo2 := repo2 + ' ' + frmInv.qReproduction.fieldbyname('Reproduction Title').asstring + ', ';
    //       repo2 := repo2 + '<i>' + frmInv.qReproduction.fieldbyname('Reproduction Title').AsString + '</i>' + ', ';
    //       if frmInv.qReproduction.fieldbyname('Reproduction Name').asstring <> '' then
    //         repo3 := repo3 {+ ' (' } + frmInv.qReproduction.fieldbyname('Reproduction Name').asstring + ', ';



    //       if frmInv.qReproduction.fieldbyname('Reproduction Location').asstring <> '' then
    //       begin
    //         qCodes.Locate('ID', frmInv.qReproduction.fieldbyname('Reproduction Location').asstring, []);

    //         repo3 := repo3 + ' (' + qCodes.FieldByName('Description').AsString;
    //       end else
    //         repo3 := repo3 + ' (';



    //       if frmInv.qReproduction.fieldbyname('Reproduction Date').asstring <> '' then
    //         repo3 := repo3 + ', ' + frmInv.qReproduction.fieldbyname('Reproduction Date').asstring + ')'
    //       else
    //         repo3 := repo3 + ')';
    //       if frmInv.qReproduction.fieldbyname('Reproduction Page').asstring <> '0' then
    //         repo3 := repo3 + ', ' + frmInv.qReproduction.fieldbyname('Reproduction Page').asstring;
    //       repo3 := trim(repo3) + '</p>';
    //       if trim(repo) <> '' then
    //       begin

    //         artist_name := artist_name + repo + ' ' + repo2 + repo3 + '<p></p>'; // take space away
    //       end;

    // <p><strong>Features include:</strong></p>
    // 				Create Label and Fact Sheet
    // 			</button>
    // 			</span>
    // <textarea ak-rich-editor style="height:440px">