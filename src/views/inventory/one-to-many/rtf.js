
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
//https://wesbos.com/template-strings-html/
@inject(ApiService, ApplicationService, DialogService)
export class Rtf {
  tools = [
    'pdf',
    'html',
    'bold',
    'italic',
    'underline',
    // 'strikethrough',
    // 'justifyLeft',
    // 'justifyCenter',
    // 'justifyRight',
    // 'justifyFull',
    // 'insertUnorderedList',
    // 'insertOrderedList',
    // 'indent',
    // 'outdent',
    // 'createLink',
    // 'unlink',
    // 'insertImage',
    // 'insertFile',
    'subscript',
    'superscript',
    // 'createTable',
    // 'addRowAbove',
    // 'addRowBelow',
    // 'addColumnLeft',
    // 'addColumnRight',
    // 'deleteRow',
    // 'deleteColumn',
    'viewHtml',
    'formatting',
    'cleanFormatting',
    'fontName',
    'fontSize'
    // 'foreColor',
    // 'backColor',
    // 'print'
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
  // buildExhibit(segment1) {
  // buildExhibit() {
  //   let exhibition = this.currentItem.exhibition
  //   if (exhibition !== undefined) {
  //     // this.currentItem.exhibition
  //     let iarray = []
  //     this.segment1 += ` <br><p>EXHIBITION HISTORY: </p>`
  //     for (const item of exhibition) {
  //       console.log("loopitem ====", item)
  //       //  iarray.push(item)

  //       this.segment1 += '<br>' + item.ExhibitTitle + ' ' + item.ExhibitSponser + ' ' + item.Reproduction + ' ' + item.ExhibitDates + ' '
  //     }
  //     // return segment1
  //   }
  // }

  buildEdition() {
    // let segmentEditionHead = `<p><span style='text-decoration-line:underline'><u>EDITION</u></span><u></u></p>`
    let segmentEditionHead = `<span style='text-decoration-line:underline'><u>EDITION</u></span><u></u><br>`

    let segmentEdition = ''
    let PublisherLoc
    let PrinterLoc

    // if (this.currentItem.EditionText !== '') {
    //  if (this.currentItem.EditionText !== null || this.currentItem.EditionText !== undefined || this.currentItem.EditionText !== '') {

    if (this.currentItem.EditionText !== null && this.currentItem.EditionText !== undefined && this.currentItem.EditionText !== '') {

      let EditionText = this.currentItem.EditionText
      EditionText = EditionText.replace(new RegExp('\n', 'gi'), `<br>`);
      this.segment1 += segmentEditionHead
      this.segment1 += EditionText + `<br>`

    }
  }

  buildProv() {
    let provenance = this.currentItem.provenance
    //  if (provenance !== undefined) {
    //   if (provenance.length !== 0) {
    if (provenance !== undefined && provenance.length !== 0) {
      let iarray = []
      // let provheader = `<p><span style='text-decoration-line:underline'><strong><u>PROVENANCE</u></strong></span><u></u></p>`
      // let provheader = `<p><span style='text-decoration-line:underline'><u>PROVENANCE</u></span><u></u></p>`

      let provheader = `<span style='text-decoration-line:underline'><u>PROVENANCE</u></span><br>`

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
            // this.segment1 += `${item.ProvOwner}, ${ProvLoc}<br>`
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>${item.ProvMemo}<br>` })
          }
        } else {
          if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
            // this.segment1 += `${item.ProvOwner}<br>`
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>${item.ProvMemo}<br>` })
          }

        }
        //
        //	this.segment1 += `${item.ProvOwner}, ${ProvLoc}<br> ${item.ProvMemo}`
      }
      // let myObjects = lodash.sortBy(provarray, 'sord');
      let myObjects = _.sortBy(provarray, 'sord');
      this.segment1 += provheader
      for (const obj of myObjects) {
        // this.segment1 += obj.date + ' ' + obj.exception
        this.segment1 += obj.exception
      }
    }


  }
  buildRepro() {

    let pre = '<p>'
    let post = '</p>'
    let ppre = ''
    let ppost = ''

    let prebefore = '</p>'
    let preafter = ' '
    let preitalic = '<em>'
    let postitalic = '</em>'
    let lineBreak = '<br>'
    //let exandpubhead = `<br><br><br><p><span style='text-decoration-line:underline'><strong><u>EXHIBITION & PUBLICATION HISTORY</u></strong></span><u></u></p><br>`
    // let exandpubhead = `<br><br><br><p><span style='text-decoration-line:underline'><u>EXHIBITION & PUBLICATION HISTORY</u></span><u></u></p><br>`
    let exandpubhead = `<br><span style='text-decoration-line:underline'><u>EXHIBITION & PUBLICATION HISTORY</u></span><br>`

    let exhibitandpubs = []

    console.log('===========buildRepro')

    // conbine both tables
    let provloc = this.appService.codesProvenanceLocation

    // let exhibition = this.currentItem.exhibition
    // let reproduction = this.currentItem.reproduction
    let exhibition = undefined
    let reproduction = undefined
    if (this.currentItem.exhibition !== undefined) exhibition = JSON.parse(JSON.stringify(this.currentItem.exhibition));
    if (this.currentItem.reproduction !== undefined) reproduction = JSON.parse(JSON.stringify(this.currentItem.reproduction));

    let myObjects
    let rec = {}
    let linkPageNo
    if (exhibition !== undefined) {
      let ct = 0
      for (const item of exhibition) {
        console.log('==================-item==========', item.ExhibitTitle)
        ct++
        // let ExhibitTitle = req.param('ExhibitTitle')
        // let ExhibitSponser = req.param('ExhibitSponser')
        // let ExhibitLocation = req.param('Description') //typeahead
        // let ExhibitDates = req.param('ExhibitDates')
        // let ExhibitSortDate = req.param('ExhibitSortDate')
        // let Traveled = req.param('Traveled')
        // let batchno = req.param('batchno')
        // let ExhibitMemo = req.param('ExhibitMemo')


        // check to see if link in repo (loop thru exhibit and find repo match)
        if (reproduction !== undefined) {
          // let eid = reproduction.findIndex(x => x.ReproductionExhibit === item.ExhibitTitle)
          // let eid = reproduction.findIndex(x => x.id === item.ReproductionExhibit)
          let eid = reproduction.findIndex(x => x.ReproductionExhibit === item.id)
          let reporec
          linkPageNo = ''
          // console.log('eid ', eid, linkPageNo) //ColorBWDesc1)

          if (eid !== -1) {
            reporec = reproduction[eid]
            console.log('link in exhibit from repo ct', ct, reporec.ReproductionPage, reporec)

            // linkPageNo = `, ${reporec.ReproductionPage}`
            linkPageNo = ` ${reporec.ReproductionPage}`
            item.ExhibitSortDate = reporec.ReproductionSortDate
          } else console.log('no link in exhibit from repo ct', ct)

        } else linkPageNo = ''

        //console.log('item.ReproductionExhibit ',  item.ReproductionExhibit, 'linkPageNo', linkPageNo)
        let oid
        if ((item.ExhibitLocation + '').length < 6) {

          oid = provloc.findIndex(x => x.ID === item.ExhibitLocation)
        } else {
          oid = provloc.findIndex(x => x.id === item.ExhibitLocation)

        }
        //  oid = provloc.findIndex(x => x.id === item.ExhibitLocation) 
        if (oid == -1) oid = 1
        let ExhibitLocationDesc = provloc[oid].Description

        // , ${item.ExhibitMemo}`
        // console.log('moment', moment(item.ExhibitSortDate,'YYYYmmdd'))
        let ExhibitMemo
        let lpn
        console.log('===================item.id linkPageNo', item.id, linkPageNo + '...')
        if (linkPageNo === undefined || linkPageNo === "") {
          lpn = '<br><br>'
        } else {
          lpn = `<br>${linkPageNo}<br><br>`
        }
        console.log('===================item.id linkPageNo', item.id, lpn)
        //	item.ExhibitMemo === undefined ? ExhibitMemo = '' : ExhibitMemo = ', ' + item.ExhibitMemo <strong>DD:</strong>
        let exceptline
        if (item.ExhibitMemo === null || item.ExhibitMemo === undefined || item.ExhibitMemo === '') {
          exceptline = ppre + `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates} ${lpn}`
          console.log('===================item.id linkPageNo', exceptline)

        }
        else {
          exceptline = `<em>${item.ExhibitTitle}</em>, ${item.ExhibitSponser}, ${ExhibitLocationDesc}, ${item.ExhibitDates}; ${item.ExhibitMemo} ${lpn} `
          console.log('==================no link exceptline', exceptline)
        }

        rec = {
          // date: moment(item.ExhibitSortDate,'YYYYmmdd'),
          //ReproductionSortDate ExhibitSortDate
          date: item.ExhibitSortDate,
          //   exception: pre + item.ExhibitTitle + ', ' + item.ReproductionLocation + ', ' + item.ExhibitDates + post
          exception: exceptline

        }
        console.log('rec.date/ exception', rec.date, rec.exception)

        exhibitandpubs.push(rec)
      }
    } else exhibition = []
    let rct = 0
    if (reproduction !== undefined) {
      // for (const item of reproduction) {
      var i;
      let item
      for (i = 0; i < reproduction.length; i++) {
        item = reproduction[i];
        rct++
        //alert(rct + ' ' + item.ReproductionExhibit + ' ' + item.ReproductionLocation + ' ')
        console.log('rct ', rct) //, item.ReproductionPage, itm.ReproductionDate,item.ReproductionExhibit+'...')

        if (item.ReproductionExhibit === null || item.ReproductionExhibit === undefined || item.ReproductionExhibit === "") {//selected choose)
          console.log('reproduction item ', rct, item.ReproductionPage, item.ReproductionDate)
          let oid = provloc.findIndex(x => x.id === item.ReproductionLocation)
          if (oid == -1) oid = 1
          let ReproductionLocationDesc = provloc[oid].Description
          //alert(rct + ' ReproductionLocationDesc ' + ReproductionLocationDesc + ' ')

          // let ColorBWDesc = ''
          // if (item.ColorBW !== null && item.ColorBW !== undefined) {
          //   //let cid = this.appService.codesReproductionType.findIndex(x => x.id === item.ColorBW)
          //   // ColorBWDesc = `${this.appService.codesReproductionType}[${cid}].Description, `
          //   let rec = this.appService.codesReproductionType.find(x => x.id === item.ColorBW)
          //   ColorBWDesc = rec.Description + ', '
          // }
          let data
          if (item.ReproductionAuthor !== "") {
            data = ppre + `${item.ReproductionAuthor}. <em>${item.ReproductionTitle}</em> ${preafter}`
          } else
            data = ppre + `${item.AuthorLast}, ${item.AuthorFirst}. <em>${item.ReproductionTitle}</em> ${preafter}`
          //alert(rct + ' ReproductionLocationDesc ' + ReproductionLocationDesc + ' data ' + data)

          data += `(${ReproductionLocationDesc}: ${item.ReproductionName}, ${item.ReproductionDate}) <br>`
          data += `${item.ReproductionPage} <br> ${ppost}<br>`
          //alert(rct + ' data 2  ' + data)
          //alert(rct + ' ' + item.ReproductionSortDate)

          rec = {
            date: item.ReproductionSortDate,
            exception: data
          }

          console.log('push item ', rct, rec)
          exhibitandpubs.push(rec)
        }
      }
    }

    if (exhibitandpubs.length > 0) {
      myObjects = _.sortBy(exhibitandpubs, 'date');
      //  console.log('============myObjects===========================================')
      // lodash.forEach(myObjects, function (result) {
      //   console.log('result ', result);
      // });
      this.segment1 += exandpubhead
      for (const obj of myObjects) {
        // this.segment1 += obj.date + ' ' + obj.exception
        this.segment1 += obj.exception
      }

    }
    console.log('===========buildRepro End')
  }

  //1
  buildInscribed(inscribed) {
    // rules:
    // 1 everying to left of : is plain text and to right is em
    // 2 until it finds a ; (convert ; to </em> <br>)  
    // 3 repeat 1 from new position

    // let inscribed = this.currentItem.Inscribed
    let iLines = []
    console.log('inscribed==================== ', inscribed)
    if (inscribed !== undefined) {
      let a2 = ''
      let a3 = '' 

      this.inscribedText = ''

      let semisCount = (inscribed).match('/;/g')
      let strCount = (inscribed).match(new RegExp(";", "g"))
      let colonPos
      let leftofcolonText, leftofcolonText2
      let rightofcolonbaseText
      let semisPos
      let rightofcolonTextem, rightofcolonTextem2
      let restoftext
      console.log(semisCount, strCount);
      colonPos = inscribed.indexOf(":");
      if (colonPos === -1) {
        iLines.push(inscribed)
      } else {
        leftofcolonText = inscribed.substr(0, colonPos+1);
        rightofcolonbaseText = inscribed.substr(colonPos + 1, inscribed.length - colonPos);
        semisPos = rightofcolonbaseText.indexOf(";");
        if (semisPos === -1) {
          semisPos = rightofcolonbaseText.length
          // rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos - 1) + '</em>'; //+ '</em><br>';
          rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos) + '</em>'; //+ '</em><br>';

          iLines.push(leftofcolonText + ' ' + rightofcolonTextem)
        } else {
          // there is a semi so add br
          rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em><br>';
          // restoftext = rightofcolonbaseText.substr(semisPos + 1, rightofcolonbaseText.length);
          restoftext = rightofcolonbaseText.substr(semisPos, rightofcolonbaseText.length);

          colonPos = restoftext.indexOf(":");
          leftofcolonText2 = restoftext.substr(0, colonPos);
          // rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos +1) + '</em>';
          rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos) + '</em>';

          iLines.push(leftofcolonText + ' ' + rightofcolonTextem + ' ' + leftofcolonText2 + ' ' + rightofcolonTextem2)
        }
      }
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
  // toma 14 x 22 x 1 in. / NaN cm 
  createDim() {

    let cmuh = this.currentItem.UnframedHeight16
    let cmfh = this.currentItem.FramedHeight16
    let cmuw = this.currentItem.UnframedWidth16
    let cmfw = this.currentItem.FramedWidth16
    let cmud = this.currentItem.UnframedDepth16
    let cmfd = this.currentItem.FramedDepth16



    // num.toPrecision(2)
    //     we lost the Height dimension in the cm part
    // there are extra ' when there are fractions
    // 14 5/8 ' x '12 1/4 in. / __ x 31 cm
    // 17 1/2 ' x '22 1/4 in. / __ x 57 cm  
    // let dims
    // let dimscm
    // let dimsf
    // let dimscmf

    this.dims = '';//undefined
    this.dimscm = '';// undefined
    this.dimsf = undefined
    this.dimscmf = undefined

    let ufwcm


    let cmh = this.buildFactor(this.currentItem.UnframedHeight16)
    let cmw = this.buildFactor(this.currentItem.UnframedWidth16)
    let cmd = this.buildFactor(this.currentItem.UnframedDepth16)

    this.buildDimLogic('unframed', 'UnframedHeight', 'UnframedHeight16', 'UnframedWidth', 'UnframedWidth16', 'UnframedDepth', 'UnframedDepth16', cmh, cmw, cmd)

    this.dimsfactsheet = this.dims
    this.dimscmfactsheet = this.dimscm

    this.dims = ''
    this.dimscm = ''
    this.dimsight = ''
    this.dimscmsight = ''


    cmh = this.buildFactor(this.currentItem.SightHeight16)
    cmw = this.buildFactor(this.currentItem.SightWidth16)
    cmd = this.buildFactor(this.currentItem.SightDepth16)
    this.buildDimLogic('sight', 'SightHeight', 'SightHeight16', 'SightWidth', 'SightWidth16', 'SightDepth', 'SightDepth16', cmh, cmw, cmd)
    if (this.dims !== '') {
      this.dimsight = this.dims
      this.dimscmsight = this.dimscm
    }

    //      this.dims=''
    // this.dimscm=''

    // cmh = this.buildFactor(this.currentItem.FramedHeight16)
    // cmw = this.buildFactor(this.currentItem.FramedWidth16)
    // cmd = this.buildFactor(this.currentItem.FramedDepth16)

    // this.buildDimLogic('framed', 'FramedHeight', 'FramedHeight16', 'FramedWidth', 'FramedWidth16', 'FramedDepth', 'FramedDepth16', cmh, cmw, cmd)



    ///  cmh = this.buildFactor(this.currentItem.imageHeight16)
    ///  cmw = this.buildFactor(this.currentItem.imagetWidth16)
    ///  cmd = this.buildFactor(this.currentItem.imageDepth16)
    ///  this.buildDimLogic('image','imageHeight', 'imageHeight16', 'imageWidth', 'imageWidth16', 'imageDepth', 'imageDepth16',  cmh, cmw,cmd)




  }
  buildFactor(dim) {
    let factor = 0.3175 //.125 * 2.54 
    switch (dim) {
      case null:
        dim = 0
        break;
      case '0/0':
        dim = 0
        break;
      case '1/8':
        dim = factor
        break;
      case '1/4':
        dim = factor * 2
      case '3/8':
        dim = factor * 3
        break;
      case '1/2':
        dim = factor * 4
        break;
      case '5/8':
        dim = factor * 5
        break;
      case '3/4':
        dim = factor * 6
        break;
      case '7/8':
        dim = factor * 7
        break;
    }
    return dim
  }


  buildDimLogic(dtype, height, heightfraction, width, widthfraction, depth, depthfraction, cmh, cmw, cmd) {
    // buildDimLogic('Unframed','Unframed16','UnframedWidth','UnframedWidth16','UnframedDepth','UnframedDepth16',cmuh,ufwcm)
    //  
    // rules:
    let ufwcm
    let frac
    let mdim
    if (this.currentItem[heightfraction] === undefined | this.currentItem[heightfraction] === '0' || this.currentItem[heightfraction] === 0 || this.currentItem[heightfraction] === null) { this.currentItem[heightfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
    if (this.currentItem[widthfraction] === undefined | this.currentItem[widthfraction] === '0' || this.currentItem[widthfraction] === 0 || this.currentItem[widthfraction] === null) { this.currentItem[heightfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
    if (this.currentItem[depthfraction] === undefined | this.currentItem[depthfraction] === '0' || this.currentItem[depthfraction] === 0 || this.currentItem[depthfraction] === null) { this.currentItem[depthfraction] = ''; cmh = 0; cmw = 0; cmd = 0; }
    if (this.currentItem[height] === undefined || this.currentItem[height] === '0' || this.currentItem[height] === 0 || this.currentItem[height] === null) this.currentItem[height] = ''
    if (this.currentItem[width] === undefined || this.currentItem[width] === '0' || this.currentItem[width] === 0 || this.currentItem[width] === null) this.currentItem[width] = ''
    if (this.currentItem[depth] === undefined || this.currentItem[depth] === '0' || this.currentItem[depth] === 0 || this.currentItem[depth] === null) this.currentItem[depth] = ''
    console.log('frac ',this.currentItem[heightfraction], this.currentItem[widthfraction], this.currentItem[depthfraction])
    console.log('deim ',this.currentItem[height], this.currentItem[width], this.currentItem[depth])
    // if ((this.currentItem[height] === '' || this.currentItem[width] === null || this.currentItem[width] === 0) && (this.currentItem[heightfraction] === '' || this.currentItem[heightfraction] === null || this.currentItem[heightfraction] === 0) ) { } {
    if ((this.currentItem[height] === '' || this.currentItem[width] === '') && (this.currentItem[heightfraction] === '')) { } else {
      if (this.currentItem[height] === '') {
        this.dims += this.currentItem[heightfraction] + ' x '
        this.dimscm += this.roundNumber((this.currentItem[height] * 2.54).toPrecision(2), 1) + ' x ' //fix
      } else {
        this.dims += `${this.currentItem[height]} <span style="font-size:x-small;"> ${this.currentItem[heightfraction]}</span> x `
        //  this.dimscm += this.roundNumber(((this.currentItem[height] * 2.54)+ cmh).toPrecision(2) , 1) + ' x '
        frac = cmh * 2.54
        mdim = (this.currentItem[height] * 2.54) + cmw
        this.dimscm += this.roundNumber((mdim + frac).toPrecision(2), 1) + ' x '




      }

      if (this.currentItem[width] === '') {
        this.dims += this.currentItem[widthfraction] 
        // this.dimscm += this.roundNumber((this.currentItem[width] * 2.54).toPrecision(2), 1) + ' x ' //fix

        frac = cmw * 2.54
        mdim = (this.currentItem[width] * 2.54) + cmw
        this.dimscm += this.roundNumber((mdim + frac).toPrecision(2), 1)

 
      } else { 
        this.dims += `${this.currentItem[width]} <span style="font-size:x-small;"> ${this.currentItem[widthfraction]}</span> `
        // this.dimscm += this.roundNumber(((this.currentItem[width] * 2.54)+ cmw).toPrecision(2) , 1) + ' x '
        frac = cmw * 2.54
        mdim = (this.currentItem[width] * 2.54) + cmw
        this.dimscm += this.roundNumber((mdim + frac).toPrecision(2), 1) 
  
      } 

      if (this.currentItem[depth] === '' ) {
        if( this.currentItem[depthfraction]!==""){
        this.dims += ' x ' + this.currentItem[depthfraction]
        // ufwcm = cmw * 2.54
        // this.dimscm += ' ' + this.roundNumber((ufwcm, 1).toPrecision(2), 1)
        frac = cmd * 2.54
        mdim = (this.currentItem[depth] * 2.54) + cmd
        this.dimscm += ' x ' +this.roundNumber((mdim + frac).toPrecision(2), 1) 
        } 

      } else {
        // this.dims += ' x ' + `${this.currentItem[depth]}   <span style="font-size:x-small;"> ${this.currentItem[depthfraction]} </span>`
        // ufwcm = this.roundNumber((this.currentItem[depth] * 2.54, 1).toPrecision(2), 1)
        // this.dimscm += ' x ' + (ufwcm + cmd)
        this.dims += ` x ${this.currentItem[depth]}   <span style="font-size:x-small;"> ${this.currentItem[depthfraction]} </span>`
        frac = cmd * 2.54
        mdim = (this.currentItem[depth] * 2.54) + cmd
        
        // console.log('  this.dimscm ',   this.currentItem[depth] * 2.54, (this.currentItem[depth] * 2.54)+cmd)
        this.dimscm += ' x ' +this.roundNumber((mdim*1 + frac*1).toPrecision(2), 1)
        console.log('  this.dimscm ', this.dimscm)

        // ufwcm = this.roundNumber((this.currentItem[depth] * 2.54, 1).toPrecision(2), 1)
        // this.dimscm += (ufwcm + cmd)
      }
      // 10 1/2 x 8 3/4 x 3/4 in. / 251.3 x 201.9 x 0.01.905 cm 
      //seight and framed  for hooper
      //       George Gershwin-"Rhapsody in Blue," Part I, 1927
      // oil and metallic paint on aluminum with metal clock spring 
      // 10 1/2 x 8 3/4 x 3/4 in. / 251.3 x 201.9 x 0.01.905 cm 
      // titled verso George Gershwin / Rhapsody in Blue / Part I

      // -----------------------------------------------------------------------------

      // Hooper
      // Check list text (right side) 
      // format like fact sheet (without all the spaces between lines)
      // Artist (b d)
      // Title
      // Date 
      // Medium
      // unframed dim without word unframed (just like fact sheet)
      // if they exist, sight dimensions with text “sight size”
      // if they exist framed dimensions with text “framed”
      // inscription text
      // if (dtype === 'unframed') { 
      // //   // this.dims += ` in. ` 
      // //   // this.dimscm += ` cm  `
      //  } else {
      //    this.dims += ` in.  `
      //    this.dimscm += ` cm ${dtype} <br> `
      //  }
    }


  }


  // edition
  buildEditionLogic(edition) {
    // rules:
    // 1 everying to left of : is plain text and to right is em
    // 2 until it finds a ; (convert ; to </em> <br>)  
    // 3 repeat 1 from new position

    // let inscribed = this.currentItem.Inscribed
    let iLines = []
    console.log('this.currentItem.EditionComment==================== ', edition)//this.currentItem.EditionComment
    if (edition !== undefined) {
      let a2 = ''
      let a3 = ''

      this.inscribedText = ''

      let semisCount = (edition).match('/;/g')
      let strCount = (edition).match(new RegExp(";", "g"))
      let colonPos
      let leftofcolonText, leftofcolonText2
      let rightofcolonbaseText
      let semisPos
      let rightofcolonTextem, rightofcolonTextem2
      let restoftext
      console.log(semisCount, strCount);
      colonPos = edition.indexOf(":");
      leftofcolonText = edition.substr(0, colonPos);
      rightofcolonbaseText = edition.substr(colonPos + 1, edition.length - colonPos);
      semisPos = rightofcolonbaseText.indexOf(";");
      if (semisPos === -1) {
        semisPos = rightofcolonbaseText.length
        rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos - 1) + '</em>'; //+ '</em><br>';
        iLines.push(leftofcolonText + ' ' + rightofcolonTextem)
      } else {
        // there is a semi so add br
        rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em><br>';
        restoftext = rightofcolonbaseText.substr(semisPos + 1, rightofcolonbaseText.length);

        colonPos = restoftext.indexOf(":");
        leftofcolonText2 = restoftext.substr(0, colonPos);
        rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos) + '</em>';
        iLines.push(leftofcolonText + ' ' + rightofcolonTextem + ' ' + leftofcolonText2 + ' ' + rightofcolonTextem2)
      }
      for (const item of iLines) {
        this.EditionCommentFormat += item //+ '<br>'
      }


    }

  }



  buildEdition() {
    this.EditionCommentFormat = ''
    this.buildEditionLogic(this.currentItem.EditionComment)
    this.currentItem.EditionText = this.currentItem.Edition + '\n' + this.EditionCommentFormat + '\n'
    this.currentItem.EditionText += this.currentItem.Chop + '\n'
    this.currentItem.EditionText += this.currentItem.Publisher + ', ' + this.currentItem.PublisherLocation + '\n'
    this.currentItem.EditionText += this.currentItem.Printer + ', ' + this.currentItem.PrinterLocation + '\n'
    delete this.EditionCommentFormat



  }



  createRTF(createopt) {
    // alert('in create')
    // this.buildEdition();
    createopt = 1;
    this.createDim()
    let artist = this.currentItem.artist
    let artistWdates = `<strong>${artist.firstName} ${artist.lastName}`
    if (artist.died) {
      artistWdates += ` (${artist.yearofBirth}-${artist.died})`
    } else {
      artistWdates += ` (b.${artist.yearofBirth})`
    }
    artistWdates += '</strong>'

    let artistWdates1 = `${artist.firstName} ${artist.lastName}`

    if (artist.died) {
      artistWdates1 += ` (${artist.yearofBirth}-${artist.died})`
    } else {
      // (b.1950)

      artistWdates1 += ` (b.${artist.yearofBirth})`
    } 

    this.buildInscribed(this.currentItem.Inscribed)

    //1
    this.segment2 = ` ${artistWdates1}<br>`
    this.segment2 += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `

    if (this.currentItem.MediumSupportobj !== undefined)
      this.segment2 += `  ${this.currentItem.MediumSupportobj.Description}<br> `
    let uidx

    if (this.currentItem.Signed === 'Y') this.currentItem.Signed === true
    if (this.currentItem.Signed === 'N') this.currentItem.Signed === false
    if (this.currentItem.Dated === 'Y') this.currentItem.Dated === true
    if (this.currentItem.Dated === 'N') this.currentItem.Dated === false

    if (this.currentItem.Signed === true) this.segment2 += 'signed'


    if (this.currentItem.Dated === true) {

      if (this.currentItem.Signed === true) {
        this.segment2 += ' and dated<br> '
      } else this.segment2 += 'dated <br>'
    } else this.segment2 +=  '<br>'



    let fac = this.searchsold[this.selectedimagesize] // - ${this.sold.factor}

    let ww = this.currentItem.clientWidth * fac.factor
    let hh = this.currentItem.clientHeight * fac.factor


    console.log(hh, ww)
    if (ww === 0) ww = 450
    if (hh === 0) hh = 450
    // 	<img ref="mainimage" class="responsive-img"
    this.segment1 = `<p><img class="responsive-img" src="https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></p>`


    this.segment1 += ` ${artistWdates}<br><br><br>`
    this.segment1 += ` <em>${this.currentItem.Title}</em>, ${this.currentItem.InvYear}<br>`
    if (this.currentItem.MediumSupportobj !== undefined)
      this.segment1 += ` ${this.currentItem.MediumSupportobj.Description}  <br> `
    // this.segment1 += ` <p> ${this.currentItem.InvYear} </p> `
    // if (dimsf !== undefined) this.segment1 += `  ${dimsf} in framed<br> `
    // if (dimscmf !== undefined) this.segment1 += `  ${dimscmf} cm framed<br>  `
    //     this.dimsfactsheet=this.dims
    // this.dimscmfactsheet=this.dimscm

    if (this.dimsfactsheet !== undefined) {
      this.segment1 += `  ${this.dimsfactsheet} in.`
      this.segment2 += `  ${this.dimsfactsheet} in. `
      // this.segment2 += `  ${this.dimscm} in.`
    }

    if (this.dimscm !== undefined) {

      this.segment1 += ` / ${this.dimscmfactsheet} cm <br>  `
      this.segment2 += ` / ${this.dimscmfactsheet} cm  <br>  `
      // this.segment2 += ` / ${this.dimscm} cm <br>  `
    }


    if (this.dimsight !== '') {

      this.segment2 += ` ${this.dimsight} in`
      this.segment2 += ` / ${this.dimscmsight} cm sight <br>  `
      // this.segment2 += ` / ${this.dimscm} cm <br>  `
    }
    // if (this.dimsight !== undefined) {

    //   this.segment2 += ` ${this.dimsight} in`
    //   this.segment2 += ` / ${this.dimscmsight} cm sight <br>  `
    //   // this.segment2 += ` / ${this.dimscm} cm <br>  `
    // }
    // this.segment1 += `<br> ${this.currentItem.SignedLocation} <br>`
    // this.segment1 += ` ${this.currentItem.SignedLocation} <br>`
    // this.segment1 += `<br><br>no. P606 <br>`
    this.segment1 += ` ${this.inscribedText}<br> `
    this.segment2 += ` ${this.inscribedText}<br> `
    if (this.currentItem.CatalogueNo !== undefined && this.currentItem.CatalogueNo !== '')
      // this.segment1 += ` Catalogue No: ${this.currentItem.CatalogueNo} <br>  <br> <br> `

      this.segment1 += ` no. ${this.currentItem.CatalogueNo} <br>   `
    if (this.currentItem.AltID !== undefined) {
      this.segment1 += ` AltID. ${this.currentItem.AltID} <br>  <br> <br> `
    }



    this.buildEdition()


    this.buildProv()
    this.buildRepro()


    // this.editor.value('<p>' + segment2 + '</p>' + '<hr><p>' +  this.segment1 + '</p>');
    if (createopt === 1) {
      // caled from rtf tab
      this.editor.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment1 + '</span>');
      this.currentItem.rtf1 = this.editor.value()// factsheet

      this.editorlabel.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment2 + '</span>');
      this.currentItem.rtf2 = this.editorlabel.value()// label




      // return this.currentItem.rtf1
    }



  }

  roundNumber(num, scale) {
    if (Math.round(num) != num) {
      if (Math.pow(0.1, scale) > num) {
        return 0;
      }
      var sign = Math.sign(num);
      var arr = ("" + Math.abs(num)).split(".");
      if (arr.length > 1) {
        if (arr[1].length > scale) {
          var integ = +arr[0] * Math.pow(10, scale);
          var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
          var proc = +arr[1].slice(scale, scale + 1)
          if (proc >= 5) {
            dec = dec + 1;
          }
          dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
          return dec;
        }
      }
    }
    return num;
  }

  onChange(e) {
    // this.logger.log('value change');
    this.currentItem.rtf1 = this.editor.value()
  }
  onChangelabel(e) {
    this.currentItem.rtf2 = this.editorlabel.value()
  }

  saveChanges() {
    this.currentItem.rtf1 = this.editor.value()
  }
  saveChangesDetail() {
    this.currentItem.rtf2 = this.editorlabel.value()
  }

  // let img1 = `https://artbased.com/api/v1/getonePdf/inv/${this.currentItem.InventoryCode}.jpg" `
  // EXIF.getData(img1, function () {
  //   var make = EXIF.getTag(this, "Make");
  //   var model = EXIF.getTag(this, "Model");
  //   var makeAndModel = document.getElementById("makeAndModel");
  //   this.makeAndModel = `${make} ${model}`;
  // });
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
  //     this.segment1 += `<p><span style="text-decoration-line:underline;"><strong>EXHIBITION & PUBLICATION HISTORY</strong></span></p>`

  //     for (const item of reproduction) {
  //       console.log("loopitem ====", item)

  //       this.segment1 += '<br>' + item.ReproductionName + ' ' + item.ReproductionTitle + ' '
  //         + item.ReproductionAuthor
  //         + item.ReproductionDate

  //     }

  //   }
  //   this.segment1 += ` <br />`
  //   let exhibition = this.currentItem.exhibition
  //   if (exhibition !== undefined) {
  //     // this.currentItem.exhibition
  //     let iarray = []
  //     this.segment1 += ` <br><p>EXHIBITION HISTORY: </p>`
  //     for (const item of exhibition) {
  //       console.log("loopitem ====", item)
  //       //  iarray.push(item)
  //       this.segment1 += '<br>' + item.ExhibitTitle + ' ' + item.ExhibitSponser + ' ' + item.Reproduction + ' ' + item.ExhibitDates + ' '
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