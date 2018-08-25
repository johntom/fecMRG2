import { computedFrom } from 'aurelia-framework';
import moment from 'moment';
import { inject } from 'aurelia-framework';
import { ApiService } from './utils/servicesApi';
import { ApplicationService } from './services/application-service';
import { MyDataService } from "./services/my-data-service";

@inject(ApplicationService, ApiService, MyDataService)
export class Welcome {
  // ndate = moment(new Date()).format('M/D/YYYY')
  heading = 'MRG Convert Zone! version: betaC6 / Press Ctrl+F5 for latest version in development'// + ndate;
  // heading2 = ' v3a'// + ndate;

  firstName = 'John ';
  lastName = 'Doe';
  previousValue = this.fullName;

  constructor(appService, api, dataService) {
    this.appService = appService;
    this.api = api;
    this.dataService = dataService;

    const format = moment(new Date()).format('M/D/YYYY');
    console.log('format', format);
  }
  // Cache(){
  //   rememberForever('js_version_number', time())
  //}

  /*
  Google Chrome
  On Windows, use one of the following:
  
  Hold the Ctrl key and press the F5 key.
  Hold the ⇧ Shift key and press the F5 key.
  Hold the Ctrl key and click the Reload button on the navigation toolbar.
  Hold the ⇧ Shift key and click the Reload button on the navigation toolbar.
  
  .plugin('aurelia-bootstrap-tagsinput', config => { config.extra.bootstrapVersion = 4; });
   */
  // Getters can't be directly observed, so they must be dirty checked.
  // However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  // To optimize by declaring the properties that this getter is computed from, uncomment the line below
  // as well as the corresponding import above.
  // @computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  clear() {
    location.reload(true)
  }
  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
  async attached() {
    // this.appService.payeelist = await this.dataService.loadPayeeAsync()
    // this.appService.artistlist = await this.dataService.loadArtistsAsync()

    // console.log(' await payeelist 1', this.appService.payeelist)
    // console.log(' await artistlist  1 ', this.appService.artistlist)

// had it on activate
if (this.appService.LookupDataLoaded) {
      console.log('using data cache from home....')
      return Promise.resolve(true);
    } else {

    return Promise.all([
      //   this.dataService.loadPayee(),
      this.dataService.loadArtists(),
      this.dataService.loadCodes(),
      this.dataService.loadOrgs(),
      this.dataService.loadSavedlists()
    ]).then(values => {
      this.appService.artistlist = values[0];
      this.appService.codesList = values[1];
      this.appService.orgsList = values[2];
      this.appService.savedlists = values[3];
      console.log(' load artistlist 2 ', this.appService.artistlist)
      console.log(' load codesList 2 ', this.appService.codesList)
      console.log(' load orgsList 2 ', this.appService.orgsList)
      console.log(' load savedlists 2 ', this.appService.savedlists)
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
      let codesListMediumSupport = []
      let codesContactType = []//13
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
        ct = item.CodeType //* 1
        newi = {}
        newi.CodeType = ct
        newi.Description = item.Description
        newi.CodeTypeDesc = item.CodeTypeDesc
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
            codesInventoryLocation.push(newi)
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
      this.appService.codesGenre = codesGenre//3,
      this.appService.codesOwnership = codesOwnership//4,
      this.appService.codesFormat = codesFormat//5
      this.appService.codesPaymentMethod = codesPaymentMethod//6
      this.appService.codesYesNoUnknown = codesYesNoUnknown//7
      this.appService.codesPublicationType = codesPublicationType//8
      this.appService.codesReproductionType = codesReproductionType//9
      this.appService.codesView = codesView//  10
      this.appService.codesCountry = codesCountry //11
      this.appService.codesListMediumSupport = codesListMediumSupport //12
      this.appService.codesContactType = codesContactType//13
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
      // console.log(' this.codesList', values[1])

      //bad   this.currentItem = this.items.find(f => f.id == params.id);
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
 }


async attached2() {
  this.appService.payeelist = await this.dataService.loadPayeeAsync()
  this.appService.artistlist = await this.dataService.loadArtistsAsync()

  console.log(' await payeelist 1', this.appService.payeelist)
  console.log(' await artistlist  1 ', this.appService.artistlist)
  return Promise.all([
    // this.dataService.loadPayee(),
    this.dataService.loadArtists(),
    this.dataService.loadCodes(),
    this.dataService.loadOrgs(),
    this.dataService.loadSavedlists(),
  ]).then(values => {
    // this.appService.payeelist2 = values[0];
    // this.appService.artistlist2 = values[1];
    this.appService.artistList = values[0];
    this.appService.codesList = values[1];
    this.appService.orgsList = values[2];
    this.appService.savedlists = values[3];
    //console.log(' await payeelist 2', this.appService.payeelist2)
    console.log(' load artistlist 2 ', this.appService.artistlist)
    console.log(' load codesList 2 ', this.appService.codesList)
    console.log(' load orgsList 2 ', this.appService.orgsList)
    console.log(' load savedlists 2 ', this.appService.savedlists)

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
    let codesListMediumSupport = []
    let codesContactType = []//13
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
      // "Description" : "Art Fair", 
      // "Integer Value" : "", 
      // "String Value" : "", 
      // "Sort Order" : NumberInt(0), 
      // "Security Level" : "", 
      // "Protected" : "N", 
      // "Currency Value" : "", 
      // "CodeType" : NumberInt(17), 
      // "CodeTypeDesc" : "Location"
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
          codesInventoryLocation.push(newi)
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
    this.appService.codesGenre = codesGenre//3,
    this.appService.codesOwnership = codesOwnership//4,
    this.appService.codesFormat = codesFormat//5
    this.appService.codesPaymentMethod = codesPaymentMethod//6
    this.appService.codesYesNoUnknown = codesYesNoUnknown//7
    this.appService.codesPublicationType = codesPublicationType//8
    this.appService.codesReproductionType = codesReproductionType//9
    this.appService.codesView = codesView//  10
    this.appService.codesCountry = codesCountry //11
    this.appService.codesListMediumSupport = codesListMediumSupport //12
    this.appService.codesContactType = codesContactType//13
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
    // console.log(' this.codesList', values[1])

    //bad   this.currentItem = this.items.find(f => f.id == params.id);
  }).catch(error => {
    console.error("Error encountered while trying to get data.", error);
  });

}


// attached() {
// let Promise = this.dataService.loadPayee()
//     .then(response => {
//        this.appService.payeelist = response.data
//        console.log(' this.appService.payeelist ',  this.appService.payeelist)
//       return this.appService.payeelist
//     })
//     // .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
//     // .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)
//    return Promise
// let Promise = this.dataService.loadPayee().then(response => {
//   this.appService.payeelist = response.data
// }).catch(error => {
//   console.error("Error encountered while trying to get data.", error);
// })
// console.log(' this.appService.payeelist ', this.appService.payeelist)

// const payeelist = await this.dataService.loadPayeeAsync()
//  this.appService.payeelist = payeelist

//  await this.dataService.loadPayee().then(response => {
//       this.appService.payeelist = response.data
//     }).catch(error => {
//       console.error("Error encountered while trying to get data.", error);
//     })
//     console.log(' this.appService.payeelist ', this.appService.payeelist)
//  }
activateInmate() {
  console.log('in activate')
  let cCodes = [{ id: 1, code: 'County' }, { id: 2, code: 'ICE' }, { id: 3, code: 'State' }, { id: 4, code: 'Fed' }]
  this.appService.classificationList = cCodes //" model.bind="opt.code
  let cCodes2 = [{ id: 1, code: 'Outpatient' }, { id: 2, code: 'Emergency' }, { id: 3, code: 'Inpatient' }, { id: 4, code: 'ER/IP' }]
  this.appService.serviceprovidedList = cCodes2
  let cCodes3 = [{ id: 1, code: 'Jail Transport' }, { id: 2, code: 'Ambulance Service' }, { id: 3, code: 'Other Agency' }]
  this.appService.transportList = cCodes3
  let cCodes4 = [{ id: 1, code: 'Medical' }, { id: 2, code: 'Behavior Health' }, { id: 3, code: 'Medical/Behavior Health' }]
  this.appService.servicetypeList = cCodes4
  let cCodes5 = [{ id: 1, code: 'Approved' }, { id: 2, code: 'Denied – Medicaid' }, { id: 3, code: 'Denied – Medicare' }, { id: 4, code: 'Denied – Submit to Other Insurer' },
  { id: 5, code: 'Denied – Duplicate' }, { id: 6, code: 'Denied – Awaiting Documentation' }, { id: 7, code: 'Denied – Other' }]
  this.appService.approvedList = cCodes5
  let cCodes6 = [{ id: 'M', code: 'Male' }, { id: 'F', code: 'Female' }
    , { id: 'O', code: 'Other' }]
  this.appService.genderList = cCodes6
  let cCodes7 = [{ id: '1', code: 'NBMC' }, { id: '2', code: 'HUMC' },
  { id: '3', code: 'Holy Name Hospital' }, { id: '4', code: 'Englewood' }, { id: '5', code: 'North Hudson Regional' },
  { id: '6', code: 'Beth Israel' }
  ]
  this.appService.designatedproviderList = cCodes7

  let cCodes8 = [{ id: 1, code: 'BC Jail' }, { id: 2, code: 'Other' }]

  this.appService.sendingproviderList = cCodes8




}

activateX() {
  if (this.appService.LookupDataLoaded) {
    console.log('using data cache from home....')
    return Promise.resolve(true);
  } else {
    return Promise.all([
      this.dataService.loadArtists(),
      this.dataService.loadCodes(),
      this.dataService.loadOrgs(),
      this.dataService.loadSavedlists(),

    ]).then(values => {
      this.appService.artistList = values[0];
      this.appService.codesList = values[1];
      this.appService.orgsList = values[2];
      this.appService.savedlists = values[3];
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
      let codesListMediumSupport = []
      let codesContactType = []//13
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
        // "Description" : "Art Fair", 
        // "Integer Value" : "", 
        // "String Value" : "", 
        // "Sort Order" : NumberInt(0), 
        // "Security Level" : "", 
        // "Protected" : "N", 
        // "Currency Value" : "", 
        // "CodeType" : NumberInt(17), 
        // "CodeTypeDesc" : "Location"
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
            codesInventoryLocation.push(newi)
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
      this.appService.codesGenre = codesGenre//3,
      this.appService.codesOwnership = codesOwnership//4,
      this.appService.codesFormat = codesFormat//5
      this.appService.codesPaymentMethod = codesPaymentMethod//6
      this.appService.codesYesNoUnknown = codesYesNoUnknown//7
      this.appService.codesPublicationType = codesPublicationType//8
      this.appService.codesReproductionType = codesReproductionType//9
      this.appService.codesView = codesView//  10
      this.appService.codesCountry = codesCountry //11
      this.appService.codesListMediumSupport = codesListMediumSupport //12
      this.appService.codesContactType = codesContactType//13
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
      // console.log(' this.codesList', values[1])

      //bad   this.currentItem = this.items.find(f => f.id == params.id);
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
}
}


export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
