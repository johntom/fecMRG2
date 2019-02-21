import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import lodash from 'lodash';
import { ApiService } from '../../utils/servicesApi';

@inject(ApplicationService, MyDataService, ApiService)

export class Home {
  heading = "MRG Home Page";
  version = 242.74  
  versionDate = 'Fri 2/15/2019'

  issues = [
    // "add Artist and Org views",
    // '"{"contacttypes.Description":{$ne:"Vendor"}}',
    // "MUST CHAGE LEGACY OwnerID TO _ID in inventory",
    // "1-20 all B with nolongerherecatalogssent shd got previos worked at without a link   ",
    // "OrgID is a lookup  get salutaion  multilien add1,2,3 and not addess",
    // "manual convert fo suffix 12 recs",
    // " when changing org add to history of work with a prompt?",
    // "1402 from org is an I and address shd move to contact address and phone move to phont type on contact",
    // "1119 is B type",
    // "If org is an I no org append notes to contact section ",
    // "update button to replace changes for currently emps ",
    // "make org a popup modal with textbox for addess  Address : Mr. Jerry Saltz\r\n40 East 9 Street, 3D,  and get rid of tab",
    // "have tab on contact prev work...no longer here Mr. Jerry Saltz",
    // " on org 1126 , select jerry and see no longer under mailing ",
    // "or",
    // "create an org view and open it",
    // '"Ext" : "rosmith@nytimes.com\r\nrosmith@nytimes.com\r\nrosmith@", ',
    // 'add phone type id to convert',
    // 'fix cat contact send see {ContactID:18235}',
    // 'TEXTBOX in popups',
    // 'Make tabs like mas w/scrollbar with sticky header',
    // 'shortcut keys',
    // 'tab hilite in detail',
    // 'fix dirty',
    // 'when going to home not refreshed',
    // 'lower tab shows on dialog- see styles .tab.tab-selected {  /* z-index:40; */',
    // 'HOFMAN0015 POLLOCJ005 PORTERC007 PORTERC009 PORTERC008 PORTERC013',
    // 'radio has issue with flex only primitive string works',
    // 'reloading an inventory image, must goto home page press f5',
    // 'have only 1 action list',
    // 'https://bl.ocks.org/lstarky/11cd1e90dd912f07a60afaedb9c2613b',
    // 'git commit -am "200.70 " / git push',
    // "clean dup InventoryCode and make uniq",
    // "deleting ref= fixes dirty checking <div class='form-control input-sm' ref='catname' ",
    // "also <option model.bind='null'>",
    // 'ReproductionLocation missing as ""',
    " Remove auto-complete field entries in Google Chrome",
    "never pass id to put or post /:id",
    "to trip cci do a commit",
    "https://circleci.com/gh/johntom/fecMRG2/edit   https://circleci.com/gh/johntom/fecMRG2/21 build and deploy",
    //     Select the "Username" field and make sure it is blank
    // Press ↓ on your keyboard, a list of all of the "remembered" entries should appear.
    // Using ↑ & ↓ highlight an entry you would like to delete.
    // Press delete. (Note that you may need to use shift+delete, fn+delete, ctrl+delete (Ubuntu) in some instances, like if the remembered entry is in the address / URL bar).
    // Repeat steps 2-4 until satisfied.
    // "clean ARTISTS null reocrds",
    // "",
    // "",
    // "",
    // "fix 3 dates   { id: 0, name: 'DateAdded' }, { id: 1, name: 'DateModified' },  { id: 2, name: 'SoldDate' }",
    // "contact specs",
    // "Dec 12 2018 ",
    // "Inventory",
    // "We combined ArtType and genre (many side) into keywords",
    // "Convert Comments to mang notes",
    // "identify all newfields added to db without converting any data",
    // "AltID = Description",
    // "",
    // "Contacts",
    // "Mailtypes",
    // "             VALUES (1193, 16, 'No mailings'); ",
    // "             VALUES (4492, 16, 'Press');",
    // "             VALUES (2185, 16, 'Deceased');",
    // "             VALUES (4424, 16, 'Email');",
    // "             VALUES (4431, 16, 'Mailing List');",
    // "             VALUES (4495, 16, 'Unassigned');",
    // "             VALUES (4564, 16, 'No longer here but catalogs sent');",
    // "             VALUES (4671, 16, 'CMOM');",
    // "             VALUES (4957, 16, 'International Mailing List');",
    // "             VALUES (4958, 16, 'International Press');",
    // "No longer useing Mailing Type, call data moved to ContactType Array if MT=Press or International Press add to arraay[Press,CMOM] plus another CB:International ",
    // "checkboxs:",
    // "decesed: X if coded `Deceased`",
    // "email: X if coded `Email`",
    // "Mailing : X if coded Mailing List or if coded Mailing ListInternational Mailing List plus another CB: International",
    // "No Info : X if coded Unassigned",
    // "Prev Emped at Org: X if coded No longer here but catalogs sent",
    // "add to emp-history",
    // "and dont add the org info",
    // "No mailings: X They wpnt get annoucements ",
    // "if one value is Press then  ",
    // "mailings, checkbox:international ",
    // "Deceased: informative & checkbox:no mailings Type Code=16",
    // "international: during conversion need to check this for anyone not in US",
    // "unsubscribed email checkbox (this is really for information purposes since they will most likely have unsubscribed in MailChimp)",
    // "no info: when converting a contact who is “no longer at org” (No longer here), there might not have personal contact info but we don’t want to lose them, so this designation will flag them for research (they retain the catalogs sent to them & a list of former orgs)",
    // "no mailings: this code should still show on Michael’s printout but they don’t get announcements",
    // "Master Catalog (for Michaels’s list)",
    // "vendor",
  ]
  ninalist = [
    'when selecting saved list inv/actions/batch go directly ...',
    // 'shortcut keys',
    // 'tab hilite in detail',
    // 'fix dirty',
    // 'when going to home not refreshed',
    // 'lower tab shows on dialog- see styles .tab.tab-selected {  /* z-index:40; */',
    // 'version = 240.20 uses   this.currentItem not this.appService.currentItem (which is a singleton)',
    // '* working on local storage with invcode',
    // 'HOFMAN0015 POLLOCJ005 PORTERC007 PORTERC009 PORTERC008 PORTERC013',
  ]
  features = [
    'CTRL+SHIFT+F',
    "To insert an ASCII character, press and hold down ALT while typing the character code. For example, to insert the degree (º) symbol, press and hold down ALT while typing 0176 on the numeric keypad. You must use the numeric keypad to type the numbers, and not the keyboard.",
    , "https://support.office.com/en-us/article/insert-ascii-or-unicode-latin-based-symbols-and-characters-d13f58d3-7bcb-44a7-a4d5-972ee12e50e0"
    //   'GUARD CLOSURE FOR MATACHER',
    //   'for (const item of items) {  console.log("loopitem ====")  sav = await saveMongoPermits(ctx, item) console.log("",sav))          }',
    //   'open html in word https://smallbusiness.chron.com/edit-html-word-54837.html',
    //   'Open the Word Options. (Word 2007: click the Office button and then click Word Options ',
    //   'At the left side of the dialog box click Advanced.',
    //   'Scroll through the options until you see the General section.',
    //   'Make sure the Confirm File Format Conversion On Open check box is selected.',
    //   'Click on OK.',
    //   'https://bl.ocks.org/lstarky/11cd1e90dd912f07a60afaedb9c2613b',
    //   'if then in kendo grid 		<ak-col k-field="org.OrgName    k-template="#= (org.OrgName) ? org.OrgName : `` #"></ak-col>'
    // ,  `force rediplay not to use browser cache var url = 'http://.../?' + escape(new Date())`

  ]
  todo = [

    'repo color type',
    // 'leave prov open (edit save)',
    // 'add keyword',
    // 'inv code not change',
    // 'catno, alitid edition ed commnet ret proceno type a head',
    // 'Edit Inscribed not swearch',
    // 'med support prompt add on fly',
    // 'mod date header',
    // 'sort date',
    // 'Set Ex not work display sponser with exhi ',
    // 'restore GROSSM0029 and jpollack untitled ',
    // 'convert images id: 21248 with 20289 images ',

    // 'Special foreigh charaters',
    // "Next avail repro tab",

  ]
  todocomplete = [

   
  ]
  //  askmatt = [
  //     'why google code complete stops',
  //     'select2 ',

  //   ]

  constructor(appService, dataService, api) {
    this.appService = appService;
    this.dataService = dataService;
    this.api = api;
  }
 
  sendMessage() {
    channel.publish('greeting', 'Hello from the browser');

  }



  async activate() {

   

    let response = await this.api.getCatalogsAA();
    this.appService.catalogList = response.data
    console.log('this.repos ', this.api.catalogList)


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
       

      ]).then(values => {
        this.appService.artistList = values[0];
        this.appService.codesList = values[1];
        this.appService.orgsList = values[2];
        this.appService.savedlists = values[3];
        this.appService.stateList = values[4];
        let i, item, ct
        this.appService.LookupDataLoaded = true;
        let codesInventoryLocation = []//1,
        let codesInventoryType = []//2,
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
        let newi //= {}

        for (i = 0; i < this.appService.codesList.length; i++) {
          item = this.appService.codesList[i]
          // console.log(' item ', item)
          ct = item.CodeType //* 1
          //  console.log(' ct ', ct)
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
              codesInventoryType.push(newi)
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
            case 20:
              codesPhoneType.push(newi)
              break;
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
        this.appService.codesPhoneType = codesPhoneType//20
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
       

        let nlist = []
        for (const item of this.appService.artistList) {
          item.ArtistName = item.LastName + ', ' + item.FirstName
          nlist.push(item)
        }
        this.appService.artistList = lodash.sortBy(nlist, 'ArtistName');




      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      });
    }
  }
 
}
