import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-dependency-injection';

@inject(Router, DialogService)
export class ApplicationService {
  constructor(router, dialogService) {
    this.dialogService = dialogService
    this.router = router
  }
  currentItem;
  currentView;
  tabs = [];
  asyncHandleDirty() {
    const model = 'You have unsaved changes. '//Cancel to stay OK to leave';

    const options = { viewModel: Prompt, model: model, lock: false };
    return this.dialogService.open(options).whenClosed(response => response);
  }

  navigate(route) {
    this.router.navigate(route);
  }

 
  tryCloseTab(item, tab, route) {
     if (this.currentView !== undefined && this.originalrec !== {} && this.currentView && this.currentView.isDirty && this.currentView.isDirty()) {
      this.asyncHandleDirty().then(result => {
        if (!result.wasCancelled) {
          this.closeTab(tab, item);
          if (route) {
            this.navigate(route);
          }
        }
      });
    } else {
      this.closeTab(tab, item);
      if (route) {
        this.navigate(route);
      }
    }
  }
  closeTab(tab, item) {
    if (item && item.reset) {
      item.reset();
    }

    let index = this.tabs.indexOf(tab);
    tab.isSelected = false;
    this.tabs.splice(index, 1);
  }

  // Feb 2018 WE are not using onetoone tab but the forms are stored there
  dataFormOneToOneTabs = [

  ];

  dataFormOneToManyTabs = [
    {
      name: "Inventory Text",
      viewModel: "./one-to-many/rtf",
      isSelected: true
    },
    {
      name: "Note",
      viewModel: "./one-to-many/adjusternotes",
      isSelected: false
    },
    {
      name: "Provenance",
      viewModel: "./one-to-many/provenance",
      isSelected: false
    },
    {
      name: "Exhibitions",
      viewModel: "./one-to-many/exhibition",
      isSelected: false
    },

    {
      name: "Reproductions",
      viewModel: "./one-to-many/reproduction",
      isSelected: false
    },
    {
      name: "Transport",
      viewModel: "./one-to-many/transport",
      isSelected: false
    },
    {
      name: "Conservation",
      viewModel: "./one-to-many/conservation",
      isSelected: false
    },
    {
      name: "Condition",
      viewModel: "./one-to-many/condition",
      isSelected: false
    },

    {
      name: "Purchased From",
      viewModel: "./one-to-one/purchased",
      isSelected: false
    },
    {
      name: "Sold To",
      viewModel: "./one-to-one/soldto",
      isSelected: false
    },

    {
      name: "Museum Loan",
      viewModel: "./one-to-many/museumloan",
      isSelected: false
    },
    {
      name: "Consigned To",
      viewModel: "./one-to-many/consignedto",
      isSelected: false
    },
    {
      name: "Offering",
      viewModel: "./one-to-many/offering",
      isSelected: false
    },
    {
      name: "Consigned From",
      viewModel: "./one-to-one/consigned",
      isSelected: false
    },
    {
      name: "Photo",
      viewModel: "./one-to-many/photo",
      isSelected: false
    },
    {
      name: "Docs",
      viewModel: "./one-to-many/docs",
      isSelected: false
    },
    {
      name: "Edition",
      viewModel: "./one-to-one/editions",
      isSelected: false
    },
//     {
//       name: "Vat",
//       viewModel: "./one-to-one/vat",
//       isSelected: false
//     },
// {
//       name: "Insurance",
//       viewModel: "./one-to-one/insurance",
//       isSelected: false
//     },


  ];

  dataFormOneToOneTabs2 = [
    {
      name: "Consignedfrom",
      viewModel: "./one-to-one/consigned",
      isSelected: false
    },
    {
      name: "Purchasedfrom",
      viewModel: "./one-to-one/purchased",
      isSelected: false
    },
    {
      name: "Soldto",
      viewModel: "./one-to-one/sold",
      isSelected: false
    },
    
    {
      name: "Edition",
      viewModel: "./one-to-one/editions",
      isSelected: false
    },
    {
      name: "Insurance",
      viewModel: "./one-to-one/insurance",
      isSelected: false
    }
  ];
  dataFormOneToManyTabs2 = [
    {
      name: "Exhibition",
      viewModel: "./one-to-many/exhibition",
      isSelected: false
    },
    {
      name: "Provenance",
      viewModel: "./one-to-many/provenance",
      isSelected: false
    },
    {
      name: "Reproduction",
      viewModel: "./one-to-many/reproduction",
      isSelected: false
    },
   
    {
      name: "Docs",
      viewModel: "./one-to-many/docs",
      isSelected: false
    },
    {
      name: "Consignedto",
      viewModel: "./one-to-many/consignedto",
      isSelected: false
    },
    {
      name: "Conservation",
      viewModel: "./one-to-many/conservation",
      isSelected: false
    },
    {
      name: "Edition",
      viewModel: "./one-to-many/edition",
      isSelected: false
    },
    {
      name: "Publication",
      viewModel: "./one-to-many/publication",
      isSelected: false
    },
    {
      name: "Photo",
      viewModel: "./one-to-many/photo",
      isSelected: false
    },
    {
      name: "Museumloan",
      viewModel: "./one-to-many/museumloan",
      isSelected: false
    }
  ];

  dataFormOneToManyTabs3 = [
    {
      name: "Address",
      viewModel: "./one-to-many/address",
      isSelected: true
    },
    {
      name: "Artists",
      viewModel: "./one-to-many/artists",
      isSelected: false
    },
    {
      name: "Cat Sold",
      viewModel: "./one-to-many/catsold",
      isSelected: false
    },

    {
      name: "Comp Cat Sent",
      viewModel: "./one-to-many/compcatsent",
      isSelected: false
    },
    {
      name: "Offering",
      viewModel: "./one-to-many/offering",
      isSelected: false
    },
    {
      name: "Phone",
      viewModel: "./one-to-many/phone",
      isSelected: false
    },
    {
      name: "Previous Orgs",
      viewModel: "./one-to-many/org",
      isSelected: false
    },
     {
      name: "Inventory",
      viewModel: "./one-to-many/inventory",
      isSelected: false
    },
     {
      name: "Genre",
      viewModel: "./one-to-many/genre",
      isSelected: false
    }
  ];

  dataFormOneToManyTabs4 = [
    {
      name: "Phone",
      viewModel: "./one-to-many/phone",
      isSelected: true
    },
    {
      name: "Contact (read-only)",
      viewModel: "./one-to-many/contact",
      isSelected: false
    }
  ];
  dataFormOneToManyTabs5 = [
    {
      name: "Catalogs Sent To",
      viewModel: "./one-to-many/catalogssentto",
      isSelected: true
    }
    //,  {
    //   name: "Build",
    //   viewModel: "./one-to-many/build",
    //   isSelected: false
    // }
  ];
 
  ConsignedTo = ''
  ConservedBy = ''
  currentRecord = 0;//null;
  currentsavedlist = ''
  currentActionlist = ''

  LookupDataLoaded = false;
  searchDataLoaded = false;
  curentInventory;
  genderList = [];
  stateList = [];
  artistList = [];
  codesList = [];
  savedlists = [];
  selectedids = [];
  codesInventoryLocation = []//1,
  codesInventoryType = []//2,
  codesGenre = []//3,
  codesOwnership = []//4,
  codesFormat = []//5
  codesPaymentMethod = []//6
  codesYesNoUnknown = []//7
  codesPublicationType = []//8
  codesReproductionType = []//9
  codesView = []//  1 0
  codesCountry = []//11
  codesOrgContactTypes = []
  codesProvenanceLocation = []//14
  codesConditon = []//15
  codesMailingType = []//16
  codesListLocation = [];//17
  codesSalutation = []//18
  codesPeriod = []//19
  codesPhoneType = []//20
  codesTitle = []//21
  codesDepartment = []//22
  codesCity = []//23
  codesTermsType = []//24
  codesFraction = []//25
  codesOrganizationStatus = []//26
  codesArtist = []//27
  codesTermsInvoice = []//28
  codesExpense = []//29
  codesBin = []//30
  codesCoverType = []//31
  codesPaymentType = []//32
  codesOrderType = []//33
  codesShipType = []//34
  codesReceivedType = []//35
  codesWarehouselocation = []//36
  codesCatalogSendType = []//37
  codesPhotoFormat = []//38
  codesPhotographers = []//39
  codesSuffix = []//40,
  codesAdmin = []//41,
  orgsList = []
  searchList = [];
  currentSearch;
  // important to set
  originalrec = 0;
  testrec = 0;
  currentItem = 0;
  currentContactItem = 0;

}

