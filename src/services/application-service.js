// import { DialogService } from 'aurelia-dialog';
// import { Prompt } from './prompt';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-dependency-injection';

@inject(Router) //, DialogService
export class ApplicationService {
  constructor(router) { //, dialogService
  //  this.dialogService = dialogService
    this.router = router
  }
  currentView;
  tabs = [];

  // async asyncHandleDirty() {
  //   const model = { 'question': 'Do you really want to discard your changes?' }
  //   const options = { viewModel: Prompt, model: model, lock: false };
  //   const closeResult = await this.dialogService.open(options).then(result => result.closeResult);
  //   return closeResult;
  // }
  // const model = 'Do you really want to discard your changes?';

  asyncHandleDirty() {
    const model = 'You have unsaved changes. Cancel to stay OK to leave';
    const options = { viewModel: Prompt, model: model, lock: false };
   // return this.dialogService.open(options).whenClosed(response => response);
  }

  navigate(route) {
    this.router.navigate(route);
  }

  dataFormOneToOneTabs = [
    {
      name: "extend",
      viewModel: "./one-to-one/extend",
      isSelected: false
    },
    {
      name: "Pdfupload",
      viewModel: "./one-to-one/pdfupload",
      isSelected: false
    }
  ];
  // dataFormOneToManyTabs = [
  //   {
  //     name: "Adjusters",
  //     viewModel: "./one-to-many/adjusters",
  //     isSelected: false,
      
    // }, {
    //   name: "Adjuster Notes",
    //   viewModel: "./one-to-many/adjusternotes",
    //   isSelected: false
    // },
    // {
    //   name: "Diary",
    //   viewModel: "./one-to-many/diary",
    //   isSelected: false
    // },
    // {
    //   name: "Docs",
    //   viewModel: "./one-to-many/docs",
    //   isSelected: false
    // },
    // {
    //   name: "Invoices",
    //   viewModel: "./one-to-many/invoices",
    //   isSelected: false
    // },
  
    // {
    //   name: "Carrieremails",
    //   viewModel: "./one-to-many/carrieremails",
    //   isSelected: false
    // },
    // {
    //   name: "Claimemails",
    //   viewModel: "./one-to-many/claimemails",
  //     isSelected: false
  //   }
  // ];

  // dataFormOneToManyTabs2 = [
   
  //   {
  //     name: "Contacts",
  //     viewModel: "./one-to-many/adjuster",
  //     isSelected: false
  //   }]

  // dataFormOneToManyTabs3 = [
  //   {
  //     name: "Payments",
  //     viewModel: "./one-to-many/payments",
  //     isSelected: true
  //   }
   
  // ]

  //null;
  testrec = 0;
  originalrec = 0;
  claimLookupDataLoaded = false;
  searchDataLoaded = false;
  curentClaim;
  currentRecord;
 classificationList = []
    serviceprovidedList = []
    transportList = []
    servicetypeList = []
    approvedList = []
  // curentDaily;
  // currentAdjuster;
  // currentSearchadj = {}
  // currentpayperiod;
  // currentpaymentAdjuster;
  // testinscorec = 0;
  // currentInsco;
  // originalinscorec = 0;
  // testinsuredrec = 0;
  // currentInsured;
  // originalinsuredrec = 0;
  // testclaimantrec = 0;
  // currentClaimant;
  // originalclaimant = 0;
  // genderList = [];
  // stateList = [];
  // adjusterList = [];
  // adjusterActiveList = [];
  // claimtypeList = [];
  // dailyList = [];
  // InsurancecompanyList = [];
  // InsurancecompanycontactList = [];
  // insuredList = [];
  // statusList = [];
  // searchList = [];
  // serviceList = [];
  // expenseList = [];
  // claimList = []
  // arprepList = []
  // adjusterprepList = []
  // arpreponeList = []
  // currentSearch // needed to close claim s
  // MasrepList = []

}