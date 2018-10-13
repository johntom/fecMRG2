
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { lodash } from 'lodash';
//import _ from 'lodash'
@inject(ApiService, ApplicationService, DialogService)
export class Rtf {
  tools = [
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
  buildProv() {
    let provenance = this.currentItem.provenance
    if (provenance !== undefined) {
      let iarray = []
      // this.segment2 += ` <br><p>PROVONANCE HISTORY: </p>`
      this.segment2 += `<p><span style="text-decoration-line:underline;"><strong>PROVONANCE</strong></span></p>`
      this.segment2 += ` <p><br />`


      for (const item of provenance) {
        console.log("loopitem ====", item)

        this.segment2 += '<br>' + item.ProvOwner + ' ' + item.ProvSortDate
      }


    }
  }
  buildRepro() {
    // let pre = '<w:p><w:r><w:t xml:space="preserve">'
    // let post = '</w:t></w:r></w:p>'
    // let prebefore = '<w:p>'
    // let preafter = '<w:r><w:t xml:space="preserve">'
    // let preitalic = '<w:r><w:rPr><w:i/></w:rPr><w:t xml:space="preserve">'
    // let postitalic = '</w:t></w:r>'
    // let lineBreak = '<w:pPr><w:spacing w:after="0"/><w:br/></w:pPr><w:pPr><w:spacing w:after="0"/></w:pPr>'

    let pre = '<p>'
    let post = '</p>'
    let prebefore = '</p>'
    let preafter = ' '
    let preitalic = '<em>'
    let postitalic = '</em>'
    let lineBreak = '<br>'


    let reproduction = this.currentItem.reproduction
    if (reproduction !== undefined) {
      for (const item of reproduction) {
        if (item.ExhibitRepro !== undefined) {
          item.splice(i, 1)
        } else {
          // exhibition ExhibitSortDate  ReproductionSortDate  
          // use 1 date in combined array tryex
          item.ExhibitSortDate = item.ReproductionSortDate

        }
      }
    } else reproduction = []

    // conbine both tables
    let exhibition = this.currentItem.exhibition

    if (exhibition !== undefined) {
      for (const item of exhibition) {
        if (item.repropage === 'none') {
          //  console.log('==================-none1==========')
          rec = {
            date: item.ExhibitSortDate,
            exception: pre + item.ExhibitTitle + ', ' + item.location + ', ' + item.ExhibitDates + post
          }
        } else {
          if (item.repropage !== undefined) {
            //   console.log('==================defined==========')
            rec = {
              date: item.ExhibitSortDate,
              exception: prebefore + preitalic + item.ExhibitTitle + postitalic + preafter + ', ' + inv.exhibition[i].location + ', ' + exhibition[i].ExhibitDates + ', ' + lineBreak + item.repropage + post
            }
          } else {
            rec = {
              date: item.ExhibitSortDate,
              exception: pre + item.ExhibitTitle + ', ' + item.location + ', ' + item.ExhibitDates + post
            }
          }

        }
        tryex.push(rec)
      }
    } else exhibition = []
    //       console.log('inv.reproduction.length', inv.reproduction.length)
    let myObjects
    if (reproduction !== undefined) {
      for (const item of reproduction) {
        rec = {
          date: item.ReproductionSortDate,
          exception: pre + item.AuthorLast + ', ' +
            item.AuthorFirst + '.  ' + preitalic +
            +' ' + item.ReproductionTitle + ' ' + postitalic + preafter + '(' +
            item.ReproductionLocationDesc + ': ' +
            item.ReproductionName + ', ' +
            item.ReproductionSortDate + ') ' + lineBreak +
            item.color + ', on page ' + item.ReproductionPage + lineBreak + post
        }
        console.log('in repo rec', rec)
        console.log('=======================================================')
        console.log('=======================================================reproduction', i)

        tryex.push(rec)
      }
      myObjects = lodash.sortBy(tryex, 'date');
      lodash.forEach(myObjects, function (result) {
        console.log('result ', result);
      });
      this.segment2 += myObjects
    }
    // } else {
    //      myObjects = {}
    // }
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

    let dims
    let dimscm
    if (this.currentItem.UnframedHeight16 === null) {
      dims = this.currentItem.UnframedHeight + ' x '
      dimscm = this.currentItem.UnframedHeight * 2.54 + ' cm ' + ' x '
    } else {
      dims = this.currentItem.UnframedHeight + ' ' + this.currentItem.UnframedHeight16 + ' x '
      dimscm = this.currentItem.UnframedHeight * 2.54 + ' ' + this.currentItem.UnframedHeight16 * 2.54 + ' x '
    }

    if (this.currentItem.UnframedWidth16 === null) {
      dims += this.currentItem.UnframedWidth
      dimscm += this.currentItem.UnframedWidth * 2.54
    } else {
      dims += this.currentItem.UnframedWidth + ' ' + this.currentItem.UnframedWidth16
      dimscm += this.currentItem.UnframedWidth * 2.54 + ' ' + this.currentItem.UnframedWidth16 * 2.54
    }
    /////////////////////////////


    let dimsf
    let dimscmf
    if (this.currentItem.FramedHeight !== 0) {
      if (this.currentItem.FramedHeight16 === null) {
        dimsf = this.currentItem.FramedHeight + ' x '
        dimscmf = this.currentItem.FramedHeight * 2.54 + ' cm ' + ' x '
      } else {
        dimsf = this.currentItem.FramedHeight + ' ' + this.currentItem.FramedHeight16 + ' x '
        dimscmf = this.currentItem.FramedHeight * 2.54 + ' ' + this.currentItem.FramedHeight16 * 2.54 + ' x '
      }

      if (this.currentItem.FramedWidth16 === null) {
        dimsf += this.currentItem.FramedWidth
        dimscmf += this.currentItem.FramedWidth * 2.54
      } else {
        dimsf += this.currentItem.FramedWidth + ' ' + this.currentItem.FramedWidth16
        dimscmf += this.currentItem.FramedWidth * 2.54 + ' ' + this.currentItem.FramedWidth16 * 2.54
      }
    }
    // <p><img src="https://artbased.com/api/v1/getonePdf/inv/PORTERC008.jpg" alt="" width="300" height="300" /></p>
    // <p><strong>Charles Porter ( 1847 -  1923 )</strong><br />
    // </p>
    // <p><em>Untitled (Peonies)</em>, c.1890</p>
    //  let artist_name
    // artist_name += `<p><strong> ${this.currentItem.artist.firstName}  ${this.currentItem.artist.lastName}`
    // if (this.currentItem.artist.died != undefined) {
    //   // artist_name += ` (this.currentItem.Artist.yearofBirth -  this.currentItem.Artist.died ) `
    //   artist_name += ` ( ${this.currentItem.artist.yearofBirth} -  ${this.currentItem.artist.died} )</strong><br> `
    // } else artist_name += `, ${this.currentItem.artist.yearofBirth}</strong><br> `


    let artist = this.currentItem.artist
    let artistWdates
    if (artist.died) {
      artistWdates = artist.yearofBirth + '-' + artist.died
    } else {
      artistWdates = 'b.' + inv.artist.yearofBirth
    }

    //1
    let inscribed = this.currentItem.Inscribed
    let inscribedText
    console.log('inscribed==================== ', inscribed)
    if (inscribed !== undefined) {
      let a2 = ''
      let a3 = ''
      let inscribedText = '';
      let n1 = inscribed.indexOf(":");
      let a1 = inscribed.substr(0, n1);
      a2 = inscribed.substr(n1, inscribed.length)

      let n2 = a2.indexOf(";");
      console.log('n2', n2)
      if (n2 > -1) {
        a3 = a2.substr(n2 + 1, inscribed.length)
        a2 = inscribed.substr(n1, n2)
      }
      // let rawInsribed
      // (a3 === undefined) ? inscribedText = pre + a1 + preitalic + a2 + postitalic +
      //  preafter + post : inscribedText = pre + a1 + preitalic + a2 + postitalic + preafter + ',' + a3 + post

      // (a3 === undefined) ? inscribedText = this.pre + a1 + this.preitalic + a2 + this.postitalic + this.post : inscribedText = pre + a1 + this.preitalic + a2 + this.postitalic + this.preafter + ',' + a3 + this.post
      if (a3 === '') {
        inscribedText = this.pre + a1 + this.preitalic + a2 + this.postitalic + this.post
      } else {
        inscribedText = pre + a1 + this.preitalic + a2 + this.postitalic + this.preafter + ',' + a3 + this.post
      }
      this.inscribedText = inscribedText

      console.log('inscribedText', this.inscribedText)
    }

    //1
    let segment1 = ` ${artistWdates}<br>`
    segment1 += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `
    segment1 += `  ${this.currentItem.MediumSupportobj.Description}<br> `
    if (dimsf !== undefined) {
      segment1 += `  ${dimsf} in framed<br> `
      segment1 += `  ${dimscmf} cm framed<br> `
    }

    segment1 += `  ${dims} in unframed<br> `
    segment1 += `  ${dimscm} cm unframed<br> `
    segment1 += `  signed <br>  `
    segment1 += `  ${this.currentItem.SignedLocation}<br>  `


    this.segment2 = `<p><img src="https://artbased.com/api/v1/getonePdf/inv/PORTERC008.jpg" alt="" width="300" height="300" /></p>`
    this.segment2 += ` ${artistWdates}<br>`
    this.segment2 += ` <br> <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear}   `
    this.segment2 += ` <br> ${this.currentItem.MediumSupportobj.Description}  `
    // this.segment2 += ` <p> ${this.currentItem.InvYear} </p> `
    this.segment2 += `  ${dimsf} in framed<br> `
    this.segment2 += `  ${dimscmf} cm framed<br>  `
    this.segment2 += `  ${dims} in unframed<br> `
    this.segment2 += `  ${dimscm} cm unframed<br>  `
    // this.segment2 += `<br> ${this.currentItem.SignedLocation} <br>`
    // this.segment2 += ` ${this.currentItem.SignedLocation} <br>`
    // this.segment2 += `<br><br>no. P606 <br>`
    this.segment2 += `  ${inscribedText} <br>  `
    this.buildProv()
    this.buildRepro()
    this.editor.value('<p>' + segment1 + '</p>' + '<hr><p>' + this.segment2 + '</p>');
    // this.editor.value('<p>' + this.segment2 + '</p>');
    this.currentItem.rtf1 = this.editor.value()

  }
  saveChanges() {
    this.currentItem.rtf1 = this.editor.value()
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