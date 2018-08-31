import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";

@inject(ApplicationService, MyDataService)


export class Home {
  heading = "Welcome to the MRG Home page!";
  version = 219.0
  constructor(appService, dataService) {
    this.appService = appService;
    this.dataService = dataService;
  }
  //   this.dataService.loadCodes(values[1]), resolve all lists
  activate() {
     // this.appService.payeelist = await this.dataService.loadPayeeAsync()
    // this.appService.artistlist = await this.dataService.loadArtistsAsync()

    // console.log(' await payeelist 1', this.appService.payeelist)
    // console.log(' await artistlist  1 ', this.appService.artistlist)

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
        console.log(' ===================codes 39', codesPhotographers  )
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
  activateXX() {
    if (this.appService.LookupDataLoaded) {
      console.log('using data cache from home....')
      return Promise.resolve(true);
    } else {
      return Promise.all([
        this.dataService.loadArtists(),
        this.dataService.loadCodes,

      ]).then(values => {
        this.appService.artistList = values[0];
        this.appService.codesList = values[1];

        return Promise.all([
          this.dataService.loadCodesLocation(values[1]),
          this.dataService.loadCodesMediumSupport(values[1]),

        ]).then(values => {
          this.appService.codesListLocation = values[0];
          this.appService.codesListMediumSupport = values[1];
          //   console.log(' values[0]', values[0],values[1])
          //  // this.appService.codesList = values[0];
          //   console.log(' this.artistList', this.appService.artistList.length)
          //   console.log(' this.codesListLocation', this.appService.codesListLocation )
        })

        console.log(' this.artistList', this.appService.artistList.length)
        console.log(' this.codesList', this.appService.codesList)
      }).catch(error => {
        console.error("Error encountered while trying to get data.", error);
      })
    }
  }
}