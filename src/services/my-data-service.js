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
     { name: 'null', value: '' },
    { name: 'Alabama', value: 'AL' },
    { name: 'Alaska', value: 'AK' },
    { name: 'America Samoa', value: 'america samoa' },
    { name: 'Arizona', value: 'AZ' },
    { name: 'Arkansas', value: 'AR' },
    { name: 'California', value: 'CA' },
    { name: 'Colorado', value: 'CO' },
    { name: 'Connecticut', value: 'CN' },
    { name: 'Delaware', value: 'DE' },
    { name: 'District of Columbia', value: 'DC' },
    // { name: 'Federated States of Micronesia', value: 'federated states of micronesia' },
    { name: 'Florida', value: 'FL' },
    { name: 'Georgia', value: 'GE' },
    // { name: 'Guam', value: 'guam' },
    { name: 'Hawaii', value: 'HA' },
    { name: 'Idaho', value: 'ID' },
    { name: 'Illinois', value: 'IL' },
    { name: 'Indiana', value: 'IN' },
    { name: 'Iowa', value: 'IO' },
    { name: 'Kansas', value: 'KA' },
    { name: 'Kentucky', value: 'KY' },
    { name: 'Louisiana', value: 'LA' },
    { name: 'Maine', value: 'ME' },
    // { name: 'Marshall Islands', value: 'marshall islands' },
    { name: 'Maryland', value: 'MD' },
    { name: 'Massachusetts', value: 'MA' },
    { name: 'Michigan', value: 'MI' },
    { name: 'Minnesota', value: 'MN' },
    { name: 'Mississippi', value: 'MS' },
    { name: 'Missouri', value: 'MO' },
    { name: 'Montana', value: 'MT' },
    { name: 'Nebraska', value: 'NE' },
    { name: 'Nevada', value: 'NV' },
    { name: 'New Hampshire', value: 'NH' },
    { name: 'New Jersey', value: 'NJ' },
    { name: 'New Mexico', value: 'NM' },
    { name: 'New York', value: 'NY' },
    { name: 'North Carolina', value: 'NC' },
    { name: 'North Dakota', value: 'MD' },
    // { name: 'Northern Mariana Islands', value: 'northern mariana islands' },
    { name: 'Ohio', value: 'OH' },
    { name: 'Oklahoma', value: 'OK' },
    { name: 'Oregon', value: 'OR' },
    // { name: 'Palau', value: 'palau' },
    { name: 'Pennsylvania', value: 'PA' },
    { name: 'Puerto Rico', value: 'PR' },
    { name: 'Rhode Island', value: 'RI' },
    { name: 'South Carolina', value: 'SC' },
    { name: 'South Dakota', value: 'SD' },
    { name: 'Tennesee', value: 'TN' },
    { name: 'Texas', value: 'TX' },
    { name: 'Utah', value: 'UT' },
    { name: 'Vermont', value: 'VT' },
    // { name: 'Virgin Islands', value: 'VI' },
    { name: 'Virginia', value: 'VA' },
    { name: 'Washington', value: 'WA' },
    { name: 'West Virginia', value: 'WV' },
    { name: 'Wisconsin', value: 'WI' },
    { name: 'Wyoming', value: 'WY' }
  //   { name: 'Sweden', value: 'sweden' },
  //   { name: 'Poland', value: 'poland' },
  //   { name: 'Bangladesh', value: 'bangladesh' },
  //   { name: 'Bulgaria', value: 'bulgaria' },
  //   { name: 'Netherlands', value: 'netherlands' },
  //   { name: 'Amsterdam', value: 'amsterdam' },
  //   { name: 'Austria', value: 'austria' },
  //   { name: 'Wales', value: 'wales' },
  //   { name: 'Japan', value: 'japan' },
   ];
    loadPayee() {
    return new Promise((resolve, reject) => {
      this.api.findPayees()
        .then((jsonRes) => {
          var payeeList = jsonRes
          console.log('payeeList', payeeList)
          resolve(payeeList);
        });
    });
  }
  
  // async  loadArtistsAsync() {
  //   let artistList
  //   await this.api.findArtists()
  //     .then((jsonRes) => {
  //       artistList = jsonRes.data
  //     });
  //   return await (artistList)
  // }
  // loadArtists() {
  //   return new Promise((resolve, reject) => {
  //     this.api.findArtists()
  //       .then((jsonRes) => {
  //         var artistList = jsonRes.data;
  //         console.log('artistist', artistList)

  //         resolve(artistList);
  //       });

  //   });
  // }
// loadCodesGenre()
  loadArtists() {
    return new Promise((resolve, reject) => {
      this.api.findArtists()
        .then((jsonRes) => {
          var artistList = jsonRes.data
          // console.log('artistList loadArtistsOrig', artistList)
          resolve(artistList);
        });
    });
  } 

//  loadArtists()
// async const artistList = () => {
//   // console.log('await artistList ',await this.api.findArtists())
//   await this.api.findArtists()
//   console.log('await artistList ',artistList)
//   return artistList//"done"
// }


async loadArtistsAA() { 
 const artistList = await this.api.findArtistsAA()
  // console.log('await loadArtistsAA',artistList) 
  return  artistList
// bad return artistList = await this.api.findArtistsAA()
}

//bad  async loadArtistsAA() { 
// console.log('await loadArtists')  

// const artistList = await this.api.findArtistsAA(() => {
//   console.log('await artistList ',artistList)//await this.api.findArtists())
//   return artistList
// })
// }


// let response = await this.http.get(reposUrl);
  // this.repos = response.content
  //   .sort((a, b) => b.stargazers_count - a.stargazers_count);

 


// async loadArtists3() { 
// const artistList = await this.api.findArtists()
//   console.log('await artistList ',artistList)//await this.api.findArtists())
//   return artistList
// }
// return this.http.fetch(url, { mode: 'cors' }).then((res) => res.json())

 loadCatalog() {
    return new Promise((resolve, reject) => {
      this.api.findArtists2()
        .then((jsonRes) => {
          var artistList = jsonRes
          console.log('artistList', artistList)
          resolve(artistList);
        });
    });
  }

// loadCatalog()
// const artistList = async () => {
//   console.log(await this.api.findArtists())
//   return "done"
// }

  async  loadPayeeAsync() {
    let payeeList
    await this.api.findPayees()
      .then((jsonRes) => {
        payeeList = jsonRes.data
        //console.log('async payeeList', resolve(payeeList);)
      });
    return await (payeeList)
  }

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


  loadCodes() {
    return new Promise((resolve, reject) => {
      this.api.findCodes()
        .then((jsonRes) => {
          var codesList = jsonRes.data;
         // console.log('codesList', codesList)
          resolve(codesList)
        })
    })
  }
  
  loadOrgs() {
    return new Promise((resolve, reject) => {
      this.api.findOrgs()
        .then((jsonRes) => {
          var orgsList = jsonRes.data;
         // console.log('orgsList', orgsList)

          resolve(orgsList);
        });

    });
  }

  loadCodesLocation(codesList) {
    return new Promise((resolve, reject) => {
     // console.log('codesList len ', codesList.length)
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
    //  console.log('codesList len ', codesList.length)
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



// inmates=============================================

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

//   loadPayee() {
//     return new Promise((resolve, reject) => {
//       this.api.findPayees()
//         .then((jsonRes) => {
//           var payeeList = jsonRes
//           console.log('payeeList', payeeList)
//           resolve(payeeList);
//         });
//     });
//   }

//   loadArtists() {
//     return new Promise((resolve, reject) => {
//       this.api.findArtists()
//         .then((jsonRes) => {
//           var artistList = jsonRes
//           console.log('artistList', artistList)
//           resolve(artistList);
//         });
//     });
//   }

//   async  loadPayeeAsync() {
//     let payeeList
//     await this.api.findPayees()
//       .then((jsonRes) => {
//         payeeList = jsonRes.data
//         //console.log('async payeeList', resolve(payeeList);)
//       });
//     return await (payeeList)
//   }

//   async  loadArtistsAsync() {
//     let artistList
//     await this.api.findArtists()
//       .then((jsonRes) => {
//         artistList = jsonRes.data
//       });
//     return await (artistList)
//   }

//   getadjusterList() {
//     this.api.findAdjusters()
//       .then((jsonRes) => {
//         var adjusterList = jsonRes// .data;
//         // console.log('adjusterList', adjusterList)
//         return adjusterList
//       });
//   }

//   loadMasrep() {

//     return new Promise((resolve, reject) => {
//       this.api.findMasrep()
//         .then((jsonRes) => {
//           var MasrepList = jsonRes.data;
//           console.log('MasrepList', MasrepList)
//           resolve(MasrepList);
//         });
//     });
//   }

//   loadPayperiod() {
//     // this.api.findPayperiod() payperiod
//     return new Promise((resolve, reject) => {
//       this.api.findPayperiod()
//         .then((jsonRes) => {
//           var PayperiodList = jsonRes.data;
//           console.log('PayperiodList', PayperiodList)
//           resolve(PayperiodList);
//         });
//     });
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
//   loadArprep() {
//     return new Promise((resolve, reject) => {
//       this.api.arprep()
//         .then((jsonRes) => {
//           var ArprepList = jsonRes.data;
//           console.log('arprepList', ArprepList)

//           resolve(ArprepList);
//         });

//     });
//   }

//   loadAdjusterprep() {
//     return new Promise((resolve, reject) => {
//       this.api.adjusterprep()
//         .then((jsonRes) => {
//           var AdjusterprepList = jsonRes.data;
//           console.log('AdjusterprepList', AdjusterprepList)

//           resolve(AdjusterprepList);
//         });

//     });
//   }

//   loadSearchIns(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findinsurancecompanyquery(queryParams)
//         .then((jsonRes) => {
//           var inssearch = jsonRes.data;
//           console.log('inssearch', inssearch)
//           resolve(inssearch);
//         });

//     });
//   }


//   loadSearchInvoice(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findinvoicequery(queryParams)
//         .then((jsonRes) => {
//           var inssearch = jsonRes.data;
//           console.log('findinvoiceyquery', inssearch)
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
//           var marep = jsonRes.data;

//           console.log('loadMarep', jsonRes, marep)
//           resolve(marep);
//         });
//     });
//   }


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


//   loadSearchInsured(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.findinsuredquery(queryParams)
//         .then((jsonRes) => {
//           var InsuredList = jsonRes.data;
//           resolve(InsuredList);

//         });
//     });
//   }

//   loadSearchDaily(queryParams) {
//     return new Promise((resolve, reject) => {
//       this.api.finddailyquery(queryParams)
//         .then((jsonRes) => {
//           var DailyList = jsonRes.data;
//           resolve(DailyList);

//         });
//     });
//   }
//   loadCodes() {
//     return new Promise((resolve, reject) => {
//       this.api.findCodes()
//         .then((jsonRes) => {
//           var codesList = jsonRes.data;
//           console.log('codesList', codesList)
//           resolve(codesList)
//         })
//     })
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


//   loadService() {
//     return new Promise((resolve, reject) => {
//       this.api.findservice()
//         .then((jsonRes) => {
//           var serviceList = jsonRes.data;
//           console.log('serviceList', serviceList)

//           resolve(serviceList);
//         });

//     });
//   }

//   loadExpense() {
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