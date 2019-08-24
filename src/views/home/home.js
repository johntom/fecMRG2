import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { ApiService } from '../../utils/servicesApi';

@inject(ApplicationService, MyDataService, ApiService)
 
export class Home { 
  heading = "MRG Home Page";
  version = ' 303.65.39 ' 
  versionDate = 'Fri 8/21/2019 2pm'
  prevversion = ' 303.52 ' 
  prevversionDate = 'Mon 8/5/2019 5pm'
 
  issues = [
    `1. Open Word. Click the “File” tab on the ribbon. Click “Options” at the bottom of the drop-down menu.`,
    `2. Click "Advanced" in the left pane. In the right pane, scroll down to the General area. Select the "Confirm File Format Conversion on Open" check box and then click "OK."`,
    `3. Click File > Options.Click Trust Center > Trust Center Settings >`,
    `4. Protected View.Uncheck Enable Protected View for files originating from the internet.Mar 22, 2018`,
    // https://www.tutorialspoint.com/aurelia/aurelia_event_aggregator.htm
    // 'JUNE 15 CONV fix org/contacts save both cols before redo',
    // ' check out mailing list check contact conversion ',
    // 'a action abs exp',
    // 'mailing list 111test',
    // 'contact conversion ',
    // 'contact merge conversion ',
//  orgi			new
//  "ProvLoc": 0   not exits
// "ReproductionExhibit": null,				   "ReproductionExhibit": "",

// unsaved changes tab pop up: 
// Bontecou Purchased From tab

// consigned to 
// no consignee comes in: grossman, crawford

// museum loan
// Bontecou not coming in

// purchased from
// Bontecou, Crawford: no purchased from org, payment id still code
// Crawford: no date

// Edition Tab
// Grossman:
// When you build the Edition text, the note is coming in with <em></em> and not displaying last character
// Edition is not coming into Inventory text
//  `finishe ContactController see await Inv`,
//     `not data for tax or insurance`,
//     'fix open on inv',
//     ' convert images again for docs also',
//     'ui to combine contacts ie ',
//     'mailing list state not working',
//     'org breaks getting contacts tab not displayed   con',
//     'MediumSupportobj.Description issue cjeck stat n address',
//     'contact note see roberta smith',
//     'A1 roberta smith b had mailing code mailing list should have mail status 1 ',
//     'roberta smith b has contact type vip should be part of contact type',
//     'a2 RS comp cat sent missing cat name ',
//     'look at legacy phone tab and split phone/email ',
//     'RS B from legacy shd have ORNAME and ORG Addr  in Adddres tab on new systme ',
//     'RS I missing Phone/Email Info from header  ',
//     'RS I MISSING MAILING STATUS SEE A1 ',
//     'NO MAILING 2  ',
//     'a2 CONTACT RS comp cat sent missing cat name ',
//     'grossm0018 grossm0188  OWED Status=consign, owned by=NGrosssan, see sik ',
//     ' fixed SoldStatus making 0,1 the same fix on next conv',
//     ' fixed OwnedId OwnedBy 59d282beb777d41f42a5a2c3',
//     `catalog kendogrid responive others not`,
//     `"international": false for us new rec = false`,
//     'on convert international mailing/international press international=true else false ',
//     `convert org dont use address only adress1/2 3?`,
//     ` use text area for address on org`,
//     `dirty: "phones": ["type": null" not type:0 {"phones.type":  0} fixContactType`,
//     `dirty: this.appService.originalrec.conservedbyname = this.currentItem.conservedbyname fix dirty`,
//     ` dirty:this.appService.originalrec.OwnedId =  this.appService.currentItem.OwnedId`,
//     " finish action exhi/repro ",
//     `"@progress/kendo-ui": "^2017.2.504"`,
//     ' python -m SimpleHTTPServer D:\Frameworks\fecMRG2-Staging\www\pythonserver.bat',
//     "to test what lib to use in package.json",
//     `"https://unpkg.com/lodash@4.17.11/" Change all ref from lodash to _`,
//     "Remove auto-complete field entries in Google Chrome",
//     "never pass id to put or post /:id",
//     "to trip cci do a commit",
//     "https://circleci.com/gh/johntom/fecMRG2/edit  https://circleci.com/gh/johntom/fecMRG2/21 build and deploy"
//     , "SAVE THIS AS LST REPO BEFORE ALL CHANGES"
//     , "deleted select2...selectize"
//     , "git config --global user.email jrt@gtz.com"
//     , "git config --global user.name johntom"
//     , "git config --list  git config user.name displays"
//     , ' let d1 = Date.now()'
//     , '      let d2 = (new Date).toISOString()'
//     , '      // month starts at 0 so 6 = may not june'
//     , '      let d3 = new Date(Date.UTC(2019, 6, 7, 7));'
//     , '      let dd = 2019-06-07'
//     , '      let d4 = new Date(dd);'
//     , '      let d5 = new Date("2019-06-07 11:13:00");'
//     , '      let array2 = dol1.split("-");'
//     , '      let yy = array2[0]  //DATE_OF_LOSS.getFullYear();'
//     , '      let mm = array2[1] - 1  //month is 0 based'
//     , '      let dd = array2[2] + 1// DATE_OF_LOSS.getDate();// l this will use time to convert date so if time <5 then date will -1'
//     , '      let dol_2 = new Date(Date.UTC(yy, mm, dd, 10));'
//     , '      let paramDate = req.param(DATE_OF_LOSS)'
//     , '      let d6 = new Date(`${paramDate}  10:00:00`);'// set the time easist way to make sure date does not change
//     , '      model.DATE_OF_LOSS = d6'
  ]

  majorfix = [
    "300.36 - rtf"
  ]
  ninalist = [
    'when selecting saved list inv/actions/batch go directly ...',
  ]
  features = [
    'CTRL+SHIFT+F',
    "To insert an ASCII character, press and hold down ALT while typing the character code. For example, to insert the degree (º) symbol, press and hold down ALT while typing 0176 on the numeric keypad. You must use the numeric keypad to type the numbers, and not the keyboard.",
    , "https://support.office.com/en-us/article/insert-ascii-or-unicode-latin-based-symbols-and-characters-d13f58d3-7bcb-44a7-a4d5-972ee12e50e0"
  ]
  todo = [

    'repo color type',


  ]
  todocomplete = [



  ]


  constructor(appService, dataService, api) {
    this.appService = appService;
    this.dataService = dataService;
    this.api = api;
  }
  //   this.dataService.loadCodes(values[1]), resolve all lists

  sendMessage() {
    channel.publish('greeting', 'Hello from the browser');

  }



  async activate() {

    let response = await this.api.getCatalogsAA();
    this.appService.catalogList = response.data
    console.log('https://artbased.com/api/v1/catalog catalogList ', this.appService.catalogList )

    if (this.appService.LookupDataLoaded) {
      console.log('using data cache from home....')
      return Promise.resolve(true);
    } else {
      return Promise.all([
        this.dataService.loadArtists(),
        this.dataService.loadCodes(),
        this.dataService.loadOrgs(),
        this.dataService.loadSavedlists(),
        this.dataService.loadStates(),
        // this.dataService.loadCatalog(),  

      ]).then(values => {
        this.appService.artistList = values[0];
        this.appService.codesList = values[1];
        this.appService.orgsList = values[2]; // merge of org and contact
        this.appService.savedlists = values[3];
        this.appService.stateList = values[4];
        //            this.appService.catalogList = values[5];

        console.log('using data orgsList....', this.appService.orgsList)


        let i, item, ct
        this.appService.LookupDataLoaded = true;
        let codesInventoryLocation = []//1,
        let codesInventoryType = []//2, ArtType
        let codesGenre = []//3, change to keyword
        let allothers = []
        let codesOwnership = []//4,
        let codesFormat = []//5
        let codesPaymentMethod = []//6
        let codesYesNoUnknown = []//7
        let codesPublicationType = []//8
        let codesReproductionType = []//9
        let codesView = []//  1 0
        let codesCountry = []//11
        let codesListMediumSupport = [] //12
        // let codesContactType = []//13

        let codesOrgContactTypes = []//13
        let codesProvenanceLocation = []//14
        let codesConditon = []//15
        let codesMailingType = []//16
        let codesListLocation = [];//17
        let codesSalutation = []//18
        let codesPeriod = []//19
        let codesPhoneType = []//20
        let codesTitle = []//21
        let codesDepartment = []//22
        let codesCity = []//23
        let codesTermsType = []//24
        let codesFraction = []//25
        let codesOrganizationStatus = []//26
        let codesArtist = []//27
        let codesTermsInvoice = []//28
        let codesExpense = []//29
        let codesBin = []//30
        let codesCoverType = []//31
        let codesPaymentType = []//32
        let codesOrderType = []//33
        let codesShipType = []//34
        let codesReceivedType = []//35
        let codesWarehouselocation = []//36
        let codesCatalogSendType = []//37
        let codesPhotoFormat = []//38
        let codesPhotographers = []//39
        let codesSuffix = []//40,
        let codesAdmin = []//41,

        let codesEmailType = []//new,



        let newi //= {}

        for (i = 0; i < this.appService.codesList.length; i++) {
          item = this.appService.codesList[i]
          // console.log(' item ', item)
          ct = item.CodeType //* 1

          newi = {}
          newi.CodeType = ct
          newi.Description = item.Description
          newi.CodeTypeDesc = item.CodeTypeDesc
          // newi._id=item._id
          newi.ID = item.ID
          newi.id = item.id

          switch (ct) {
            case 1:
              codesInventoryLocation.push(newi)
              break;
            case 2:
              // codesInventoryType.push(newi)
                  codesGenre.push(newi)
              break;
            case 3:
              codesGenre.push(newi)
              break;
            case 4:
              codesOwnership.push(newi)
              break;
            case 5:
              codesFormat.push(newi)
              break;
            case 6:
              codesPaymentMethod.push(newi)
              break;
            case 7:
              codesYesNoUnknown.push(newi)
              break;
            case 8:
              codesPublicationType.push(newi)
              break;
            case 9:
              codesReproductionType.push(newi)
              break;
            case 10:
              codesView.push(newi)
              break;
            case 11:
              codesCountry.push(newi)
              break;
            case 12:
              codesListMediumSupport.push(newi)
              break;
            case 13:
              codesOrgContactTypes.push(newi)
              break;
            case 14:
              codesProvenanceLocation.push(newi)
              break;
            case 15:
              codesConditon.push(newi)
              break;
            case 16:
              codesMailingType.push(newi)
              break;
            case 17:
              codesListLocation.push(newi)
              break;
            case 18:
              codesSalutation.push(newi)
              break;

            case 19:
              codesPeriod.push(newi)
              break;
            // case 20:
            //   codesPhoneType.push(newi)
            //   break;
            case 21:
              codesTitle.push(newi)
              break;
            case 22:
              codesDepartment.push(newi)
              break;
            case 23:
              codesCity.push(newi)
              break;
            case 24:
              codesTermsType.push(newi)
              break;
            case 25:
              codesFraction.push(newi)
              break;
            case 26:
              codesOrganizationStatus.push(newi)
              break;
            case 27:
              codesArtist.push(newi)
              break;
            case 28:
              codesTermsInvoice.push(newi)
              break;
            case 29:
              codesExpense.push(newi)
              break;
            case 30:
              codesBin.push(newi)
              break;

            case 31:
              codesCoverType.push(newi)
              break;
            case 32:
              codesPaymentType.push(newi)
              break;
            case 33:
              codesOrderType.push(newi)
              break;
            case 34:
              codesShipType.push(newi)
              break;
            case 35:
              codesReceivedType.push(newi)
              break;
            case 36:
              codesWarehouselocation.push(newi)
              break;
            case 37:
              codesCatalogSendType.push(newi)
              break;
            case 38:
              codesPhotoFormat.push(newi)
              break;
            case 39:
              codesPhotographers.push(newi)
              break;
            case 40:
              codesSuffix.push(newi)
              break;
            case 41:
              codesAdmin.push(newi)
              break;
            default:
            // allothers.push(newi)
          }
        }
        console.log(' ===================codes 39', codesPhotographers)
        let pt = [{ id: 1, Description: 'work' }, { id: 2, Description: 'mobile' }, { id: 3, Description: 'home' }, { id: 4, Description: 'fax' }, { id: 5, Description: 'na' }];
        let et = [{ id: 1, Description: 'work' }, { id: 2, Description: 'personal' }, { id: 3, Description: 'na' }];
        this.appService.codesPhoneType = pt;
        this.appService.codesEmailType = et;
        this.appService.codesInventoryLocation = codesInventoryLocation//1,
        this.appService.codesInventoryType = codesInventoryType//2,
        this.appService.codesGenre = codesGenre//3,  codesGenre.push(newi)
        this.appService.codesOwnership = codesOwnership//4,
        this.appService.codesFormat = codesFormat//5
        this.appService.codesPaymentMethod = codesPaymentMethod//6
        this.appService.codesYesNoUnknown = codesYesNoUnknown//7
        this.appService.codesPublicationType = codesPublicationType//8
        this.appService.codesReproductionType = codesReproductionType//9
        this.appService.codesView = codesView//  10
        this.appService.codesCountry = codesCountry //11
        this.appService.codesListMediumSupport = codesListMediumSupport //12
        this.appService.codesOrgContactTypes = codesOrgContactTypes //codesContactType//13
        this.appService.codesProvenanceLocation = codesProvenanceLocation //14 
        this.appService.codesConditon = codesConditon//15
        this.appService.codesMailingType = codesMailingType//16
        this.appService.codesListLocation = codesListLocation//17
        this.appService.codesSalutation = codesSalutation//18
        this.appService.codesPeriod = codesPeriod//19
        // this.appService.codesPhoneType = codesPhoneType//20
        this.appService.codesTitle = codesTitle //21
        this.appService.codesDepartment = codesDepartment //22
        this.appService.codesCity = codesCity//23
        this.appService.codesTermsType = codesTermsType / 24
        this.appService.codesFraction = codesFraction //25
        this.appService.codesOrganizationStatus = codesOrganizationStatus//26
        this.appService.codesArtist = codesArtist//27
        this.appService.codesTermsInvoice = codesTermsInvoice //28
        this.appService.codesExpense = codesExpense//29
        this.appService.codesBin = codesBin //30
        this.appService.codesCoverType = codesCoverType //31
        this.appService.codesPaymentType = codesPaymentType//32
        this.appService.codesOrderType = codesOrderType//33
        this.appService.codesShipType = codesShipType//34
        this.appService.codesReceivedType = codesReceivedType //35
        this.appService.codesWarehouselocation = codesWarehouselocation//36
        this.appService.codesCatalogSendType = codesCatalogSendType//37
        this.appService.codesPhotoFormat = codesPhotoFormat //38
        this.appService.codesPhotographers = codesPhotographers //39
        this.appService.codesSuffix = codesSuffix//40,
        this.appService.codesAdmin = codesAdmin//41,
        // console.log(' this.orgsList', this.appService.orgsList)
        console.log(' this.appService.codesGenre', this.appService.codesGenre)
        console.log(' this.artistList', this.appService.artistList.length)
        console.log(' this.codesPhotoFormat', this.appService.codesPhotoFormat)//codesProvenanceLocation) 


        // bad   this.currentItem = this.items.find(f => f.id == params.id);
        // for (i = 0; i < this.appService.artistList.length; i++) {
        //   this.appService.artistList[i].ArtistName = this.appService.artistList[i].lastName + ', ' + this.appService.artistList[i].firstName
        // }
        let nlist = []
        for (const item of this.appService.artistList) {
          item.ArtistName = item.LastName + ', ' + item.FirstName
          nlist.push(item)
        }
        this.appService.artistList = _.sortBy(nlist, 'ArtistName');
        // this.appService.artistList = nlist.sort(function (a, b) {
        //   var textA = a.ArtistName.toUpperCase();
        //   var textB = b.ArtistName.toUpperCase();
        //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        // });
        console.log('artistList ', this.appService.artistList)
        // let pct
        // for (let bk of this.appService.artistList) {
        //       //  console.log('bk2 ', bk2)
        //       bk.ArtistName = bk.lastName+', '+bk.firstName
        //}


      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });
    }
  }
  // activateXX() {
  //   if (this.appService.LookupDataLoaded) {
  //     console.log('using data cache from home....')
  //     return Promise.resolve(true);
  //   } else {
  //     return Promise.all([
  //       this.dataService.loadArtists(),
  //       this.dataService.loadCodes,
  //     ]).then(values => {
  //       this.appService.artistList = values[0];
  //       this.appService.codesList = values[1];
  //       return Promise.all([
  //         this.dataService.loadCodesLocation(values[1]),
  //         this.dataService.loadCodesMediumSupport(values[1]),
  //       ]).then(values => {
  //         this.appService.codesListLocation = values[0];
  //         this.appService.codesListMediumSupport = values[1];
  //         //   console.log(' values[0]', values[0],values[1])
  //         //  // this.appService.codesList = values[0];
  //         //   console.log(' this.artistList', this.appService.artistList.length)
  //         //   console.log(' this.codesListLocation', this.appService.codesListLocation )
  //       })
  //       console.log(' this.artistList', this.appService.artistList.length)
  //       console.log(' this.codesList', this.appService.codesList)
  //     }).catch(error => {
  //       console.error("Error encountered while trying to get data.", error);
  //     })
  //   }
  // }
}


/*
Nancy Grossman (b.1940)
(bdateNOSPCE-Died)
Dimens DIMD
Add SIZE back in
SIZE
IMAGE
SEIGHT
FRAMED
Inv Code  > Code
Inv year > Year
put space btween words on labels
 gueNo gue No
 Alt ID
 
 Put same login from Incribed to
 cm round up to 1 decimal
 FIX DEPTH
 
FACK SHEET see GROSSSM0029

Nancy Grossman (b.1940)


Gunhead, 1991
bronze with patina and copper wire 
16 x 8 in. / 40.64 x 20.32 cm 
signed, dated and numbered at bottom rear 
Nancy Grossman 1991 1/8

EDITION

﻿

Edition: 1/8 
The intended edition of Gunhead 
was 8 casts but only 6 casts were executed. This cast is number 1/8. The edition was cast at Tallis Fine Art Foundry in Rock Tavern, NY. A number of artist’s proofs, at least 4, were also made.  A cast of Gunhead, number 3/8, is in the collection of the National Academy Museum, National Academy of Design, New York, NY.



PROVENANCE

Nancy Grossman, Brooklyn, NY

Michael Rosenfeld Gallery LLC, New York, NY
EXHIBITION & PUBLICATION HISTORY

Nancy Grossman: Collages and Heads 1970-1991, Sculpture Center, New York, NY, October 8 - November 9, 1991 
Eighteenth Year Retrospective, Beacon Street Gallery, Chicago, IL, February 24 - April 20, 2001 
Upstarts and Matriarchs: Jewish Women Artists and the Transformation of American Art, Mizel Center for Arts and Culture, Denver, CO, January 13 - March 27, 2005 
Codinha, Alessandra, author and Bjarne Jonasson, photographer,[CHANGE TO PERIOD] Working Deep Beneath the Think London, England: Intermission Magazine vol. VIII, Winter 2013-14 
Illustrated with the artist interview on page 64 ]

ADD CHECKBO AFTER LAST NAME ON REPRO Editor (Ed) Move Autoer after Ed,
Add String Field called Number (No.) after date b4 page
ADD BOTH FIELDS TO POPUP
ADD POP TO Exhibition and Change SPONOPR TO INSITUTION

﻿Change Catalog No: to No. CAT#

Add all field to EDITION with Pub, LOC all other NL
from 
Nancy Grossman: Collages and Heads 1970-1991, Sculpture Center, New York, NY, October 8 - November 9, 1991, p. 15, testing note field
to
Nancy Grossman: Collages and Heads 1970-1991, Sculpture Center, New York, NY, October 8 - November 9, 1991, testing note field for spacing
p. 15 

COLOR
B&W
N/A
not known

Special foreigh charaters


*/