import { ApiService } from '../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
import { ApplicationService } from './application-service';
@inject(ApiService, ApplicationService)
export class MyDataService {
  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
  }
  personList = [
    {
      id: 0,
      firstName: "Rob",
      lastName: "Eisenberg",
      gender: "male",
      email: "rob@email.com",
      imgUrl: "assets/business-man.png",
      address: "",
      city: "Redmond",
      state: "washington",
      zip: "",
      orders: [
        {
          product: "Halo Wars",
          datePurchased: "09/14/2016",
          quantity: 1,
          unitPrice: 29.99
        },
        {
          product: "Minecraft",
          datePurchased: "09/01/2016",
          quantity: 1,
          unitPrice: 24.99
        }
      ]
    }
  ];
  genderList = [
    "male",
    "female"
  ];
  statusList = [
    { name: 'open', value: 1 },
    { name: 'closed', value: 2 },
    { name: 'reopened', value: 3 }

  ];
  stateList = [
    { name: 'Alabama', value: 'alabama' },
    { name: 'Alaska', value: 'alaska' },
    { name: 'America Samoa', value: 'america samoa' },
    { name: 'Arizona', value: 'arizona' },
    { name: 'Arkansas', value: 'arkansas' },
    { name: 'California', value: 'california' },
    { name: 'Colorado', value: 'colorado' },
    { name: 'Connecticut', value: 'connecticut' },
    { name: 'Delaware', value: 'delaware' },
    { name: 'District of Columbia', value: 'district of columbia' },
    { name: 'Federated States of Micronesia', value: 'federated states of micronesia' },
    { name: 'Florida', value: 'florida' },
    { name: 'Georgia', value: 'georgia' },
    { name: 'Guam', value: 'guam' },
    { name: 'Hawaii', value: 'Hawaii' },
    { name: 'Idaho', value: 'idaho' },
    { name: 'Illinois', value: 'illinois' },
    { name: 'Indiana', value: 'indiana' },
    { name: 'Iowa', value: 'iowa' },
    { name: 'Kansas', value: 'kansas' },
    { name: 'Kentucky', value: 'kentucky' },
    { name: 'Louisiana', value: 'louisiana' },
    { name: 'Maine', value: 'maine' },
    { name: 'Marshall Islands', value: 'marshall islands' },
    { name: 'Maryland', value: 'maryland' },
    { name: 'Massachusetts', value: 'massachusetts' },
    { name: 'Michigan', value: 'michigan' },
    { name: 'Minnesota', value: 'minnesota' },
    { name: 'Mississippi', value: 'mississippi' },
    { name: 'Missouri', value: 'missouri' },
    { name: 'Montana', value: 'montana' },
    { name: 'Nebraska', value: 'nebraska' },
    { name: 'Nevada', value: 'nevada' },
    { name: 'New Hampshire', value: 'new hampshire' },
    { name: 'New Jersey', value: 'new jersey' },
    { name: 'New Mexico', value: 'new mexico' },
    { name: 'New York', value: 'new york' },
    { name: 'North Carolina', value: 'north carolina' },
    { name: 'North Dakota', value: 'north dakota' },
    { name: 'Northern Mariana Islands', value: 'northern mariana islands' },
    { name: 'Ohio', value: 'ohio' },
    { name: 'Oklahoma', value: 'oklahoma' },
    { name: 'Oregon', value: 'oregon' },
    { name: 'Palau', value: 'palau' },
    { name: 'Pennsylvania', value: 'Pennsylvania' },
    { name: 'Puerto Rico', value: 'puerto rico' },
    { name: 'Rhode Island', value: 'rhode island' },
    { name: 'South Carolina', value: 'south carolina' },
    { name: 'South Dakota', value: 'south dakota' },
    { name: 'Tennesee', value: 'tennesee' },
    { name: 'Texas', value: 'texas' },
    { name: 'Utah', value: 'utah' },
    { name: 'Vermont', value: 'vermont' },
    { name: 'Virgin Islands', value: 'virgin islands' },
    { name: 'Virginia', value: 'virginia' },
    { name: 'Washington', value: 'washington' },
    { name: 'West Virginia', value: 'west virginia' },
    { name: 'Wisconsin', value: 'wisconsin' },
    { name: 'Wyoming', value: 'wyoming' },
    { name: 'Sweden', value: 'sweden' },
    { name: 'Poland', value: 'poland' },
    { name: 'Bangladesh', value: 'bangladesh' },
    { name: 'Bulgaria', value: 'bulgaria' },
    { name: 'Netherlands', value: 'netherlands' },
    { name: 'Amsterdam', value: 'amsterdam' },
    { name: 'Austria', value: 'austria' },
    { name: 'Wales', value: 'wales' },
    { name: 'Japan', value: 'japan' },
  ];
  // getadjusterList() {

  //   this.api.findAdjusters()
  //     .then((jsonRes) => {
  //       var adjusterList = jsonRes// .data;
  //       console.log('mydataser', adjusterList)
  //       return adjusterList
  //     });
  // }
  // loadPeople() {
  //   return new Promise((resolve, reject) => {
  //     resolve(this.personList);
  //   });
  // }

  loadGenders() {
    return new Promise((resolve, reject) => {
      resolve(this.genderList);
    });
  }
  loadStatus() {
    return new Promise((resolve, reject) => {
      resolve(this.statusList);
    });
  }
  loadStates() {
    return new Promise((resolve, reject) => {
      resolve(this.stateList);
    });
  }

  loadArtists() {
    return new Promise((resolve, reject) => {
      this.api.findArtists()
        .then((jsonRes) => {
          var artistList = jsonRes.data;
          console.log('artistist', artistList)

          resolve(artistList);
        });

    });
  }
  loadCodes() {
    return new Promise((resolve, reject) => {
      this.api.findCodes()
        .then((jsonRes) => {
          var codesList = jsonRes.data;
          console.log('codesList', codesList)
          resolve(codesList)
        })
    })
  }
  
  loadOrgs() {
    return new Promise((resolve, reject) => {
      this.api.findOrgs()
        .then((jsonRes) => {
          var orgsList = jsonRes.data;
          console.log('codesList', orgsList)

          resolve(orgsList);
        });

    });
  }

  loadCodesLocation(codesList) {
    return new Promise((resolve, reject) => {
      console.log('codesList len ', codesList.length)
      let codesListLocation = []

      codesList.filter((item) => {
        if (item.CodeType === 17) {
          codesListLocation.push(item)
        }
        resolve(codesListLocation)
      })
    })
  }

  // Medium/Support 12
  loadCodesMediumSupport(codesList) {
    return new Promise((resolve, reject) => {
      console.log('codesList len ', codesList.length)
      var codesListMediumSupport = []
      codesList.filter((item) => {
        if (item.CodeType === 12) {
          codesListMediumSupport.push(item)
        }
      })
      resolve(codesListMediumSupport)
    })
  }
  loadKeywords() {
    return new Promise((resolve, reject) => {
      var keywords = this.appService.codesGenre
      resolve(keywords)
    })
  }
  loadSavedlists() {
    return new Promise((resolve, reject) => {
      //   var savedlists = this.appService.savedlists
      //   resolve(savedlists)
      // })
      this.api.findSavedlists()
        .then((jsonRes) => {
          var savedlists = jsonRes.data;
          console.log('savedlists', savedlists)

          resolve(savedlists);
        });

    });
  }
  loadKeywordsArch(codeList) {
    return new Promise((resolve, reject) => {
      //   console.log('codesList len ', codeList.length)
      //   var keywords = []
      //   codeList.filter((item) => {
      //     if (item.CodeType === 3) {
      //       keywords.push(item)
      //     }
      //   })
      //   resolve(keywords)
      // })
      var keywords = this.appService.codesGenre
      resolve(keywords)
    })
  }

  camelCaseToProperCase(input) {
    return input.replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

}

 //  codesInventoryLocation = []//1,
  //   codesInventoryType = []//2,
  //   codesGenre = []//3,
  //   codesOwnership = []//4,
  //   codesFormat = []//5
  //   codesPaymentMethod = []//6
  //   codesYesNoUnknown = []//7
  //   codesPublicationType = []//8
  //   codesReproductionType = []//9
  //   codesView = []//  1 0
  //   codesCountry = []//11
  //   codesMediumSupport //12
  //   codesContactType = []//13
  //   codesProvenanceLocation = []//14
  //   codesConditon = []//15
  //   codesMailingType = []//16
  //   codesListLocation = [];//17
  //   codesSalutation = []//18
  //   codesPeriod = []//19
  //   codesvPhoneType = []//20
  //   codesTitle = []//21
  //   codesDepartment = []//22
  //   codesCity = []//23
  //   codesTermsType = []//24
  //   codesFraction = []//25
  //   codesOrganizationStatus = []//26
  //   codesArtist = []//27
  //   codesTermsInvoice = []//28
  //   codesExpense = []//29
  //   codesBin = []//30
  //   codesCoverType = []//31
  //   codesPaymentType = []//32
  //   codesOrderType = []//33
  //   codesShipType = []//34
  //   codesReceivedType = []//35
  //   codesWarehouselocation = []//36
  //   codesCatalogSendType = []//37
  //   codesPhotoFormat = []//38
  //   codesPhotographers = []//39
  //   codesSuffix = []//40,
  //   codesAdmin = []//41,
  // loadCodes(codesList) {
  //   return new Promise((resolve, reject) => {
  //     console.log('codesList len ', codesList.length)
  //     let codesListLocation = []
  //     let codesMediumSupport = []

  //     codesList.filter((item) => {
  //       if (item.CodeType === 17) {
  //         codesListLocation.push(item)
  //       }
  //       if (item.CodeType === 12) {
  //         codesMediumSupport.push(item)
  //       }
  //       console.log('codesList len ', codesListLocation ,codesMediumSupport)
  //       resolve(codesListLocation, codesMediumSupport)
  //     })
  //   })
  // }
// import { ApiService } from '../utils/servicesApi';
// import { inject } from 'aurelia-dependency-injection';
// @inject(ApiService)
// export class MyDataService {
//   constructor(api) {
//     this.api = api;
//   }
//   personList = [
//     {
//       id: 0,
//       firstName: "Rob",
//       lastName: "Eisenberg",
//       gender: "male",
//       email: "rob@email.com",
//       imgUrl: "assets/business-man.png",
//       address: "",
//       city: "Redmond",
//       state: "washington",
//       zip: "",
//       orders: [
//         {
//           product: "Halo Wars",
//           datePurchased: "09/14/2016",
//           quantity: 1,
//           unitPrice: 29.99
//         },
//         {
//           product: "Minecraft",
//           datePurchased: "09/01/2016",
//           quantity: 1,
//           unitPrice: 24.99
//         }
//       ]
//     }
//   ];
//   genderList = [
//     "male",
//     "female"
//   ];
//   statusList = [
//     { name: 'open', value: 1 },
//     { name: 'closed', value: 2 },
//     { name: 'reopened', value: 3 }

//   ];
//   stateList = [
//     { name: 'Alabama', value: 'AL' },
//     { name: 'Alaska', value: 'AK' },
//     { name: 'America Samoa', value: 'america samoa' },
//     { name: 'Arizona', value: 'AZ' },
//     { name: 'Arkansas', value: 'AR' },
//     { name: 'California', value: 'CA' },
//     { name: 'Colorado', value: 'CO' },
//     { name: 'Connecticut', value: 'CN' },
//     { name: 'Delaware', value: 'DE' },
//     { name: 'District of Columbia', value: 'DC' },
//     { name: 'Federated States of Micronesia', value: 'federated states of micronesia' },
//     { name: 'Florida', value: 'FL' },
//     { name: 'Georgia', value: 'GA' },
//     { name: 'Guam', value: 'guam' },
//     { name: 'Hawaii', value: 'HI' },
//     { name: 'Idaho', value: 'ID' },
//     { name: 'Illinois', value: 'IL' },
//     { name: 'Indiana', value: 'ID' },
//     { name: 'Iowa', value: 'IA' },
//     { name: 'Kansas', value: 'kansas' },
//     { name: 'Kentucky', value: 'kentucky' },
//     { name: 'Louisiana', value: 'louisiana' },
//     { name: 'Maine', value: 'maine' },
//     { name: 'Marshall Islands', value: 'marshall islands' },
//     { name: 'Maryland', value: 'maryland' },
//     { name: 'Massachusetts', value: 'massachusetts' },
//     { name: 'Michigan', value: 'michigan' },
//     { name: 'Minnesota', value: 'minnesota' },
//     { name: 'Mississippi', value: 'mississippi' },
//     { name: 'Missouri', value: 'missouri' },
//     { name: 'Montana', value: 'montana' },
//     { name: 'Nebraska', value: 'nebraska' },
//     { name: 'Nevada', value: 'nevada' },
//     { name: 'New Hampshire', value: 'new hampshire' },
//     { name: 'New Jersey', value: 'NJ' },
//     { name: 'New Mexico', value: 'new mexico' },
//     { name: 'New York', value: 'NY' },
//     { name: 'North Carolina', value: 'north carolina' },
//     { name: 'North Dakota', value: 'north dakota' },
//     { name: 'Northern Mariana Islands', value: 'northern mariana islands' },
//     { name: 'Ohio', value: 'ohio' },
//     { name: 'Oklahoma', value: 'oklahoma' },
//     { name: 'Oregon', value: 'oregon' },
//     { name: 'Palau', value: 'palau' },
//     { name: 'Pennsylvania', value: 'Pennsylvania' },
//     { name: 'Puerto Rico', value: 'puerto rico' },
//     { name: 'Rhode Island', value: 'rhode island' },
//     { name: 'South Carolina', value: 'south carolina' },
//     { name: 'South Dakota', value: 'south dakota' },
//     { name: 'Tennesee', value: 'tennesee' },
//     { name: 'Texas', value: 'texas' },
//     { name: 'Utah', value: 'utah' },
//     { name: 'Vermont', value: 'VT' },
//     { name: 'Virgin Islands', value: 'virgin islands' },
//     { name: 'Virginia', value: 'VI' },
//     { name: 'Washington', value: 'WA' },
//     { name: 'West Virginia', value: 'west virginia' },
//     { name: 'Wisconsin', value: 'WI' },
//     { name: 'Wyoming', value: 'WY' },
//     { name: 'Sweden', value: 'sweden' },
//     { name: 'Poland', value: 'poland' },
//     { name: 'Bangladesh', value: 'bangladesh' },
//     { name: 'Bulgaria', value: 'bulgaria' },
//     { name: 'Netherlands', value: 'netherlands' },
//     { name: 'Amsterdam', value: 'amsterdam' },
//     { name: 'Austria', value: 'austria' },
//     { name: 'Wales', value: 'wales' },
//     { name: 'Japan', value: 'japan' },
//   ];
//   getadjusterList() {

//     this.api.findAdjusters()
//       .then((jsonRes) => {
//         var adjusterList = jsonRes// .data;
//         console.log('adjusterList', adjusterList)
//         return adjusterList
//       });
//   }
//   loadPeople() {
//     return new Promise((resolve, reject) => {
//       resolve(this.personList);
//     });
//   }

//   loadGenders() {
//     return new Promise((resolve, reject) => {
//       resolve(this.genderList);
//     });
//   }
//   loadStatus() {
//     return new Promise((resolve, reject) => {
//       resolve(this.statusList);
//     });
//   }
//   loadStates() {
//     return new Promise((resolve, reject) => {
//       resolve(this.stateList);
//     });
//   }
//   loadAdjusters() {
//     return new Promise((resolve, reject) => {
//       this.api.findAdjusters()
//         .then((jsonRes) => {
//           var adjusterList = jsonRes.data;
//           console.log('adjusterList', adjusterList)

//           resolve(adjusterList);
//         });

//     });
//   }
//   loadClaimtype() {
//     return new Promise((resolve, reject) => {
//       this.api.findclaimType()
//         .then((jsonRes) => {
//           var claimTypeList = jsonRes;//.data;
//           console.log('claimTypeList', claimTypeList)

//           resolve(claimTypeList);
//         });

//     });
//   }

//   loadLocation() {
//     return new Promise((resolve, reject) => {
//       this.api.findLocation()
//         .then((jsonRes) => {
//           var locationList = jsonRes;//.data;
//           console.log('mydataser', locationList)

//           resolve(locationList);
//         });

//     });
//   }


//   loadInsurancecompany() {
//     return new Promise((resolve, reject) => {
//       this.api.findinsurancecompany()
//         .then((jsonRes) => {
//           var InsurancecompanyList = jsonRes.data;
//           console.log('InsurancecompanyList', InsurancecompanyList)

//           resolve(InsurancecompanyList);
//         });

//     });
//   }
//  loadArprep() {
//     return new Promise((resolve, reject) => {
//       this.api.arprep()
//         .then((jsonRes) => {
//           var ArprepList = jsonRes.data;
//           console.log('arprepList', ArprepList)

//           resolve(ArprepList);
//         });

//     });
//   }

//  loadAdjusterprep() {
//     return new Promise((resolve, reject) => {
//       this.api.adjusterprep()
//         .then((jsonRes) => {
//           var AdjusterprepList = jsonRes.data;
//           console.log('AdjusterprepList', AdjusterprepList)

//           resolve(AdjusterprepList);
//         });

//     });
//   }

//  loadSearchIns(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findinsurancecompanyquery(queryParams)
//         .then((jsonRes) => {
//           var inssearch = jsonRes.data;
//           console.log('inssearch', inssearch)
//           resolve(inssearch);
//         });

//     });
//   }


//   loadInsured() {
//     return new Promise((resolve, reject) => {
//       this.api.findinsured()
//         .then((jsonRes) => {
//           var insuredList = jsonRes.data;
//           console.log('insuredList', insuredList)
//           resolve(insuredList);
//         });
//     });
//   }
//   loadMarep() {
//     return new Promise((resolve, reject) => {
//       this.api.marep()
//         .then((jsonRes) => {
//           var marep = jsonRes;//.data;

//           console.log('loadInsured', marep)
//           resolve(marep);
//         });
//     });
//   }


//   // loadSearch(queryParams) {
//   //   return new Promise((resolve, reject) => {
//   //     this.api.findclaim(queryParams)
//   //       .then((jsonRes) => {
//   //         var searchList = jsonRes.data
//   //         resolve(searchList)
//   //          this.origItems = claim
//   //         this.appService.searchDataLoaded = true
//   //         // console.log('jsonRes ', jsonRes);
//   //         console.log('this.claim loadData 0 ', claim.length)//claim[0]);
//   //         return claim
//   //       });
//   //   });

//   // }
// // this is search for claims
//   loadSearch(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findclaim(queryParams)
//         .then((jsonRes) => {
//           var searchList = jsonRes.data
//           resolve(searchList) //claimList
//           //  this.origItems = claim
//           // this.appService.searchDataLoaded = true
//           console.log('jsonRes ', jsonRes);
//           // console.log('this.claim loadData 0 ', claim.length)//claim[0]);
//           // return claim
//         });
//     });

//   }


// loadSearchInsured(queryParams) {
//     return new Promise((resolve, reject) => {
//        this.api.findinsuredquery(queryParams)
//         .then((jsonRes) => {
//           var InsuredList = jsonRes.data;
//           resolve(InsuredList);

//         });
//     });
//   }

// loadSearchDaily(queryParams) {
//     return new Promise((resolve, reject) => {
//        this.api.finddailyquery(queryParams)
//         .then((jsonRes) => {
//           var DailyList = jsonRes.data;
//           resolve(DailyList);

//         });
//     });
//   }




//   loadSearchClaimant(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findclaimantquery(queryParams)
//         .then((jsonRes) => {
//           var ClaimantList = jsonRes.data
//           resolve(ClaimantList)

//         });
//     });
//   }


// loadService() {
//     return new Promise((resolve, reject) => {
//       this.api.findservice()
//         .then((jsonRes) => {
//           var serviceList = jsonRes.data;
//           console.log('serviceList', serviceList)

//           resolve(serviceList);
//         });

//     });
//   }

// loadExpense() {
//     return new Promise((resolve, reject) => {
//       this.api.findexpense()
//         .then((jsonRes) => {
//           var expenseList = jsonRes.data;
//           console.log('expenseList', expenseList)

//           resolve(expenseList);
//         });

//     });
//   }
//   loadClaimlist() {
//     return new Promise((resolve, reject) => {
//       this.api.findclaimlist()
//         .then((jsonRes) => {
//           var claimList = jsonRes.data;
//           console.log('claimList', claimList)

//           resolve(claimList);
//         });

//     });
//   }


//   camelCaseToProperCase(input) {
//     return input.replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase());
//   }

// }