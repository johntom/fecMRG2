
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
  provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  createRTF() {
    // https://www.npmjs.com/package/docxtemplater
    
    //   this.rtf='<bold> john</bold>'
    //  this.editor.value(this.setValueText);
   //gtzFmtLabel
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
      let artist_name = this.currentItem.artist.firstName +' '+this.currentItem.artist.lastName 
        if (this.currentItem.artist.died != undefined) {
          // artist_name += ` (this.currentItem.Artist.yearofBirth -  this.currentItem.Artist.died ) `
          artist_name += ` ( ${this.currentItem.artist.yearofBirth} -  ${this.currentItem.artist.died} ) `
        }
    artist_name += ` <p> ${this.currentItem.Title}, c.${this.currentItem.InvYear} </p> `
       
    artist_name += ` <p> ${this.currentItem.MediumSupportobj.Description} </p> `
    artist_name += ` <p> signed </p>  `
    artist_name += ` <p> ${this.currentItem.SignedLocation} </p>  `
    
    this.editor.value('<p>' +  artist_name + '</p>' );


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

