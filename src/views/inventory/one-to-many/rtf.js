
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Rtf {
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
  activate(params, routeConfig) {

  }
  setInitialValue() {


    // l1 = '&lt;p&gt;&lt;img src=&quot;https://demos.telerik.com/kendo-ui/content/web/editor/kendo-ui-web.png&quot; alt=&quot;Editor for ASP.NET MVC logo&quot; style=&quot;display:block;margin-left:auto;margin-right:auto;&quot; /&gt;&lt;/p&gt;'
    // l1 += '&lt;p&gt;'
    // l1 += 'Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;'
    // l1 += 'In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,'
    // l1 += 'and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows'
    // l1 += 'accessibility standards and provides API for content manipulation.'

    // this.editor.value(l1)
    // if (this.currentItem.rtf1 !== undefined) this.editor.value(this.currentItem.rtf1);
 
  }
  attached() {
//  $(document).ready(function () {
//       // $('.collapsible').collapsible();
//        this.editor.value(this.currentItem.rtf1);
//     });

  }
  createRTF() {
    // https://www.npmjs.com/package/docxtemplater


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

    let artist_name = this.currentItem.artist.firstName + ' ' + this.currentItem.artist.lastName
    if (this.currentItem.artist.died != undefined) {
      // artist_name += ` (this.currentItem.Artist.yearofBirth -  this.currentItem.Artist.died ) `
      artist_name += ` ( ${this.currentItem.artist.yearofBirth} -  ${this.currentItem.artist.died} )<br> `
    }
    let holdname = artist_name
    artist_name += ` <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} <br> `
    artist_name += `  ${this.currentItem.MediumSupportobj.Description}<br> `
    if (dimsf !== undefined) {
      artist_name += `  ${dimsf} in framed<br> `
      artist_name += `  ${dimscmf} cm framed<br> `
    }

    artist_name += `  ${dims} in unframed<br> `
    artist_name += `  ${dimscm} cm unframed<br> `
    artist_name += `  signed <br>  `
    artist_name += `  ${this.currentItem.SignedLocation}<br>  `

    //////////////////////

    // ARTIST: Betye Saar (b.1926)
    // TITLE: "Now You Cookin' with Gas" c.1942
    // DATE: 1999
    // MEDIUM: mixed media collage on printed paper
    // SIZE: 11 1/2" x 7 3/4" framed 
    // SIZE: 29.2 x 19.7 cm framed 
    // SIZE: 15 3/8" x 11 1/2" unframed 
    // SIZE: 39.1 x 29.2 cm unframed 
    // DETAILS: 
    // signed and dated
    // titled verso: 'Now You Cookin' with Gas' c.1942"
    // signed lower right "Betye Saar" and verso "B.Saar"
    // dated "1999" lower right and verso
    // EXHIBITION HISTORY: 
    // Letters and Shadows: African American Art and Literature Since the Harlem Renaissance, Bowdoin College Museum of Art, Brunswick, ME, January 22, 2015 - March 15, 2015
    let segment2 = `<p>ARTIST:  ${holdname}</p>`
    segment2 += ` <p>TITLE: <em> ${this.currentItem.Title}</em>, ${this.currentItem.InvYear} </p>  `
    segment2 += ` <p>DATE: ${this.currentItem.InvYear} </p> `
    segment2 += ` <p>MEDIUM: ${this.currentItem.MediumSupportobj.Description} </p>  `
    segment2 += ` SIZE: ${dimsf} in framed<br> `
    segment2 += ` SIZE: ${dimscmf} cm framed<br>  `
    segment2 += ` SIZE: ${dims} in unframed<br> `
    segment2 += ` SIZE: ${dimscm} cm unframed<br>  `
    segment2 += ` <br>DETAILS:<br>`
    segment2 += ` ${this.currentItem.SignedLocation} <br>`
    segment2 += ` titled verso:${this.currentItem.SignedLocation} <br>`
    segment2 += ` <br><p>EXHIBITION HISTORY: </p>`
    //  this.editor.value('<p>' + artist_name + '</p>');
    this.editor.value('<p>' + artist_name + '</p>' + '<hr><p>' + segment2 + '</p>');

    this.currentItem.rtf1 = this.editor.value()



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

