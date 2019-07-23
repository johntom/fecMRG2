import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from './application-service';
@inject(Router, DialogService,ApplicationService)
export class RtfService {
  
  currentItem;
  currentView;
  // tabs = [];
  // asyncHandleDirty() {
  //   const model = 'You have unsaved changes. '//Cancel to stay OK to leave';

  //   const options = { viewModel: Prompt, model: model, lock: false };
  //   return this.dialogService.open(options).whenClosed(response => response);
  // }

  // navigate(route) {
  //   this.router.navigate(route);
  // }






 
  searchsold = [
    { id: 0, name: 'normal size', factor: 1 },
    { id: 1, name: '1.5 size', factor: 1.5 },
    { id: 2, name: '2 size', factor: 2 },
    { id: 3, name: '3 size', factor: 3 },
    { id: 4, name: '.5 size', factor: .5 },
    { id: 5, name: '.3 size', factor: .3 },

  ];
  selectedimagesize = 0;//null searchsold[0];
  constructor(router, dialogService,appService) {
    this.dialogService = dialogService
    this.router = router
  
    // this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    // this.dialogService = dialogService

  }


  created(owningView, myView) {
  }

  bind(bindingContext, overrideContext) {
  }

  setInitialValue(edt) {
    if (this.currentItem.rtf1 !== undefined) edt.value(this.currentItem.rtf1);
  }

  setInitialValueLabel(edt) {
    if (this.currentItem.rtf2 !== undefined) edt.value(this.currentItem.rtf2);
  }

  buildEdition() {
    let segmentEditionHead = `<span style='text-decoration-line:underline'><u>EDITION</u></span><u></u><br>`

    let segmentEdition = ''
    let PublisherLoc
    let PrinterLoc

    if (this.currentItem.EditionText !== null && this.currentItem.EditionText !== undefined && this.currentItem.EditionText !== '') {

      let EditionText = this.currentItem.EditionText
      EditionText = EditionText.replace(new RegExp('\n', 'gi'), `<br>`);
      this.segment2 += segmentEditionHead
      this.segment2 += EditionText + `<br>`

    }
  }

  buildProv() {
    let provenance = this.currentItem.provenance
    if (provenance !== undefined && provenance.length !== 0) {
      let iarray = []
   
      let provheader = `<span style='text-decoration-line:underline'><u>PROVENANCE</u></span><br>`

      let provarray = []

      for (const item of provenance) {
        
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
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}, ${ProvLoc}<br>${item.ProvMemo}<br>` })
          }
        } else {
          if (item.ProvMemo === null || item.ProvMemo === undefined || item.ProvMemo === '') {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>` })
          } else {
            provarray.unshift({ sord: item.Sequence, exception: `${item.ProvOwner}<br>${item.ProvMemo}<br>` })
          }

        }
        
      }
      let myObjects = _.sortBy(provarray, 'sord');
      this.segment2 += provheader
      for (const obj of myObjects) {
       this.segment2 += obj.exception
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
    let exandpubhead = `<br><span style='text-decoration-line:underline'><u>EXHIBITION & PUBLICATION HISTORY</u></span><br>`

    let exhibitandpubs = []

    console.log('===========buildRepro')

    // conbine both tables
    let provloc = this.appService.codesProvenanceLocation

   
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
     


        // check to see if link in repo (loop thru exhibit and find repo match)
        if (reproduction !== undefined) {
          let eid = reproduction.findIndex(x => x.ReproductionExhibit === item.id)
          let reporec
          linkPageNo = ''
       
          if (eid !== -1) {
            reporec = reproduction[eid]
            console.log('link in exhibit from repo ct', ct, reporec.ReproductionPage, reporec)

            // linkPageNo = `, ${reporec.ReproductionPage}`
            linkPageNo = ` ${reporec.ReproductionPage}`
            item.ExhibitSortDate = reporec.ReproductionSortDate
          } else console.log('no link in exhibit from repo ct', ct)

        } else linkPageNo = ''
   let oid
        if ((item.ExhibitLocation + '').length < 6) {

          oid = provloc.findIndex(x => x.ID === item.ExhibitLocation)
        } else {
          oid = provloc.findIndex(x => x.id === item.ExhibitLocation)

        }
        if (oid == -1) oid = 1
        let ExhibitLocationDesc = provloc[oid].Description

         let ExhibitMemo
        let lpn
        console.log('===================item.id linkPageNo', item.id, linkPageNo + '...')
        if (linkPageNo === undefined || linkPageNo === "") {
          lpn = '<br><br>'
        } else {
          lpn = `<br>${linkPageNo}<br><br>`
        }
        console.log('===================item.id linkPageNo', item.id, lpn)
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
         
          date: item.ExhibitSortDate,
          exception: exceptline

        }
        console.log('rec.date/ exception', rec.date, rec.exception)

        exhibitandpubs.push(rec)
      }
    } else exhibition = []
    let rct = 0
    if (reproduction !== undefined) {
        var i;
        let item
        for (i = 0; i < reproduction.length; i++) { 
        item = reproduction[i];
        rct++
        console.log('rct ', rct) //, item.ReproductionPage, itm.ReproductionDate,item.ReproductionExhibit+'...')

        if (item.ReproductionExhibit === null || item.ReproductionExhibit === undefined || item.ReproductionExhibit === "") {//selected choose)
          console.log('reproduction item ', rct, item.ReproductionPage, item.ReproductionDate)
          let oid = provloc.findIndex(x => x.id === item.ReproductionLocation)
          if (oid == -1) oid = 1
          let ReproductionLocationDesc = provloc[oid].Description
           let data
          if (item.ReproductionAuthor !== "") {
data = ppre + `${item.ReproductionAuthor}. <em>${item.ReproductionTitle}</em> ${preafter}`
          } else 
          data = ppre + `${item.AuthorLast}, ${item.AuthorFirst}. <em>${item.ReproductionTitle}</em> ${preafter}`
         
          data += `(${ReproductionLocationDesc}: ${item.ReproductionName}, ${item.ReproductionDate}) <br>`
          data += `${item.ReproductionPage} <br> ${ppost}<br>`
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
      
      this.segment2 += exandpubhead
      for (const obj of myObjects) {
        // this.segment2 += obj.date + ' ' + obj.exception
        this.segment2 += obj.exception
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
        leftofcolonText = inscribed.substr(0, colonPos);
        rightofcolonbaseText = inscribed.substr(colonPos + 1, inscribed.length - colonPos);
        semisPos = rightofcolonbaseText.indexOf(";");
        if (semisPos === -1) {
          semisPos = rightofcolonbaseText.length
          // rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos - 1) + '</em>'; //+ '</em><br>';
           rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(0, semisPos ) + '</em>'; //+ '</em><br>';
        
          iLines.push(leftofcolonText + ' ' + rightofcolonTextem) 
        } else {
          // there is a semi so add br
          rightofcolonTextem = '<em>' + rightofcolonbaseText.substr(1, semisPos - 1) + '</em><br>';
          restoftext = rightofcolonbaseText.substr(semisPos + 1, rightofcolonbaseText.length);

          colonPos = restoftext.indexOf(":");
          leftofcolonText2 = restoftext.substr(0, colonPos);
          // rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos +1) + '</em>';
            rightofcolonTextem2 = '<em>' + restoftext.substr(colonPos + 1, restoftext.length - colonPos ) + '</em>';
  
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



    switch (cmud) {
      case null:
        cmud = 0
        break;
      case '0/0':
        cmud = 0
        break;
      case '1/8':
        cmud = factor
        break;
      case '1/4':
        cmud = factor * 2
      case '3/8':
        cmud = factor * 3
        break;
      case '1/2':
        cmud = factor * 4
        break;
      case '5/8':
        cmud = factor * 5
        break;
      case '3/4':
        cmud = factor * 6
        break;
      case '7/8':
        cmud = factor * 7
        break;
    }
    switch (cmfd) {
      case null:
        cmfd = 0
        break;
      case '0/0':
        cmfd = 0
        break;
      case '1/8':
        cmfd = factor
        break;
      case '1/4':
        cmfd = factor * 2
      case '3/8':
        cmfd = factor * 3
        break;
      case '1/2':
        cmfd = factor * 4
        break;
      case '5/8':
        cmfd = factor * 5
        break;
      case '3/4':
        cmfd = factor * 6
        break;
      case '7/8':
        cmfd = factor * 7
        break;
    }

    // num.toPrecision(2)
    /*
    we lost the Height dimension in the cm part

there are extra ' when there are fractions

14 5/8 ' x '12 1/4 in. / __ x 31 cm
17 1/2 ' x '22 1/4 in. / __ x 57 cm   */
    // let dims
    // let dimscm
    // let dimsf
    // let dimscmf

    this.dims = undefined
    this.dimscm = undefined
    this.dimsf = undefined
    this.dimscmf = undefined

    let ufwcm
    if (this.currentItem.UnframedHeight16 === null) {
      this.dims = this.currentItem.UnframedHeight + ' x '
      this.dimscm = this.roundNumber((this.currentItem.UnframedHeight * 2.54).toPrecision(2), 1) + ' x ' //fix
    } else {
      this.dims = `${this.currentItem.UnframedHeight} <span style="font-size:x-small;"> ${this.currentItem.UnframedHeight16}</span> x `
      this.dimscm = this.roundNumber((this.currentItem.UnframedHeight * 2.54).toPrecision(2) + cmuh, 1) + ' x '
    }

    if (this.currentItem.UnframedWidth16 === null) {
      this.dims += this.currentItem.UnframedWidth
      ufwcm = this.currentItem.UnframedWidth * 2.54
      this.dimscm += this.roundNumber((ufwcm), 1).toPrecision(2) + ' x '
    } else {
      this.dims += `${this.currentItem.UnframedWidth}       <span style="font-size:x-small;"> ${this.currentItem.UnframedWidth16} </span>`
      ufwcm = this.roundNumber(this.currentItem.UnframedWidth * 2.54, 1).toPrecision(2)
  
      this.dimscm += (ufwcm + cmuw.toPrecision(2))

    }

    if (this.currentItem.UnframedDepth16 === null) {
      if (this.currentItem.UnframedDepth === null || this.currentItem.UnframedDepth === 0) { } else {
        this.dims += ' x ' + this.currentItem.UnframedDepth
        ufwcm = this.currentItem.UnframedDepth * 2.54
        console.log('ufwcm', ufwcm)
        this.dimscm += ' x ' + this.roundNumber(ufwcm, 1).toPrecision(2)
        //  this.dimscm +=  ' x ' +ufwcm
        console.log('  this.dimscm', this.dimscm)
      }
    } else {
      this.dims += ' x ' + `${this.currentItem.UnframedDepth}   <span style="font-size:x-small;"> ${this.currentItem.UnframedDepth16} </span>`
      ufwcm = this.roundNumber(this.currentItem.UnframedDepth * 2.54,1).toPrecision(2)   // this.dimscm += ' x ' + this.roundNumber((( this.currentItem.UnframedDepth * 2.54) + cmud), 1) //+ ' cm '

      this.dimscm += ' x ' + ((ufwcm) + cmud) //+ ' cm '

    }
    //   cmfd cmud

    /////////////////////////////

    if (this.currentItem.FramedHeight !== 0) {
      if (this.currentItem.FramedHeight16 === null) {
        this.dimsf = `${this.currentItem.FramedHeight} <span style="font-size:x-small;"> ${this.currentItem.FramedHeight} </span> x `
        this.dimscmf = this.roundNumber((this.currentItem.FramedHeight * 2.54).toPrecision(2), 1) + ' x ' //+ ' cm ' //
      } else {
        this.dimsf = `${this.currentItem.FramedHeight} <span style="font-size:x-small;"> ${this.currentItem.FramedHeight16} </span> x `
        this.dimscmf = this.roundNumber((this.currentItem.FramedHeight * 2.54).toPrecision(2) + cmuw, 1) + ' x '// + ' cm ' //
      }

      if (this.currentItem.FramedWidth16 === null) {
        this.dimsf += this.currentItem.FramedWidth
        this.dimscmf += (this.currentItem.FramedWidth * 2.54).toPrecision(2)
      } else {
        this.dimsf += `${this.currentItem.FramedWidth}  <span style="font-size:x-small;"> ${this.currentItem.FramedWidth16} </span>  `
        this.dimscmf += this.roundNumber((this.currentItem.FramedWidth * 2.54).toPrecision(2) + cmfw, 1) //+ ' cm ' //+ ' x '
      }
    }

 
    if (this.currentItem.FramedDepth16 === null) {
      if (this.currentItem.FamedDepth === null || this.currentItem.FramedDepth === 0) { } else {
        this.dimsf += ' x ' + this.currentItem.FramedDepth
        this.dimscmf = + ' x ' + this.roundNumber((this.currentItem.FramedDepth * 2.54).toPrecision(2), 1)
      }
    } else {
      this.dimsf += ' x ' + `${this.currentItem.FramedDepth}       <span style="font-size:x-small;"> ${this.currentItem.FramedDepth16} </span>`
      this.dimscmf += ' x ' + this.roundNumber((this.currentItem.FramedDepth * 2.54).toPrecision(2) + cmfd, 1) //+ ' cm '

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
        this.EditionCommentFormat=''
    this.buildEditionLogic(this.currentItem.EditionComment)
    this.currentItem.EditionText = this.currentItem.Edition + '\n' + this.EditionCommentFormat + '\n'
    this.currentItem.EditionText += this.currentItem.Chop + '\n'
    this.currentItem.EditionText += this.currentItem.Publisher + ', ' + this.currentItem.PublisherLocation + '\n'
    this.currentItem.EditionText += this.currentItem.Printer + ', ' + this.currentItem.PrinterLocation + '\n'
    delete this.EditionCommentFormat
   


  }
async addRTF(){
  alert ('add')
  return await  true
}


  async createRTF() { 
 alert ('createRTF')
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


    let segment1 = ` ${artistWdates1}<br>`
    segment1 += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `

    if (this.currentItem.MediumSupportobj !== undefined)
      segment1 += `  ${this.currentItem.MediumSupportobj.Description}<br> `
    let uidx
    this.dimsf === undefined ? uidx = -1 : uidx = (this.dimsf.indexOf('undefined'))

    if (uidx > -1) {
    } else {
      segment1 += `  ${this.dimsf} in. framed<br> `
      segment1 += `  ${this.dimscmf} cm framed<br> `
    }

    segment1 += `  ${this.dims} in. unframed<br> `
    segment1 += `  ${this.dimscm} cm unframed<br> `

    if (this.currentItem.Signed === 'Y') this.currentItem.Signed === true
    if (this.currentItem.Signed === 'N') this.currentItem.Signed === false
    if (this.currentItem.Dated === 'Y') this.currentItem.Dated === true
    if (this.currentItem.Dated === 'N') this.currentItem.Dated === false

    if (this.currentItem.Signed === true) segment1 += 'signed'


    if (this.currentItem.Dated === true) {

      if (this.currentItem.Signed === true) {
        segment1 += ' and dated '
      } else segment1 += 'dated '
    }


    let fac = this.searchsold[this.selectedimagesize] // - ${this.sold.factor}

    let ww = this.currentItem.clientWidth * fac.factor
    let hh = this.currentItem.clientHeight * fac.factor


    console.log(hh, ww)
    if (ww === 0) ww = 450
    if (hh === 0) hh = 450
    // 	<img ref="mainimage" class="responsive-img"
    this.segment2 = `<p><img class="responsive-img" src="https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg" alt="" width="${ww}" height="${hh}" /></p>`

    this.segment2 += ` ${artistWdates}<br><br><br>`
    this.segment2 += ` <em>${this.currentItem.Title}</em>, ${this.currentItem.InvYear}<br>`
    if (this.currentItem.MediumSupportobj !== undefined)
      this.segment2 += ` ${this.currentItem.MediumSupportobj.Description}  <br> `
  
    if (this.dims !== undefined) this.segment2 += `  ${this.dims} in.`
    if (this.dimscm !== undefined) this.segment2 += ` / ${this.dimscm} cm <br>  `

    this.segment2 += ` ${this.inscribedText}<br> `

    if (this.currentItem.CatalogueNo !== undefined && this.currentItem.CatalogueNo !== '')
      // this.segment2 += ` Catalogue No: ${this.currentItem.CatalogueNo} <br>  <br> <br> `

    this.segment2 += ` no. ${this.currentItem.CatalogueNo} <br>   `
    this.segment2 += ` AltID. ${this.currentItem.AltID} <br>  <br> <br> `

    this.buildEdition()
    this.buildProv()
    this.buildRepro()
    this.editor.value('<p>' + this.segment2 + '</p>');
    this.currentItem.rtf1 = this.editor.value()// factsheet
    this.editorlabel.value('<p>' + segment1 + '</p>');
    this.currentItem.rtf2 = this.editorlabel.value()// label

return await this.currentItem.rtf1

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

 
  // remove(item, index) {
  //   //alert('you are about to delete ' + item.Notes + ' ' + index)
  //   this.mode = 0
  //   this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
  //     if (!response.wasCancelled) {
  //       console.log('Delete')
  //       let provenance = this.currentItem.provenance
  //       provenance.splice(index, 1)
  //     } else {
  //       console.log('cancel');
  //     }
  //     console.log(response.output);
  //   });
  // }
}
