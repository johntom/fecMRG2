
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
import { PromptServ } from '../../services/promptserv';
import { ApiService } from '../../utils/servicesApi';
import { bindable, inject } from 'aurelia-framework';
import { TaskQueue } from 'aurelia-task-queue';
 // static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];

@inject(DialogController, ApplicationService, MyDataService, DialogService, ApiService ,TaskQueue,Element)
export class Prompt {
  @bindable picker;

  @bindable orgItem;
  @bindable orgValue;

  @bindable condimentItem;
  @bindable condimentValue;
  @bindable searchdoc


   mappingDataStructure = {
    class: 'class',
    option: 'name',
    style: 'style',
    title: 'title',
    tokens: 'tokens'
  }
  mappingorgDataStructure = {
    class: 'class',
    option: 'OrgName'
   
  }
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3',
    actionsBox: true
  };
  allCampingStuffObject = [
    { id: 1, name: 'Tent', company: 'Sweet' },
    { id: 2, name: 'Flashlight', company: 'Sour' },
    { id: 3, name: 'Sleeping Bag', company: 'Spice' },
    { id: 4, name: 'Rum', company: 'Mt Gay' }

  ];
  orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID', 'PhotographerID', 'PurchasedFrom', 'ConservedBy', 'PurchasedFrom', 'ConservedBy', 'SoldToID', 'SoldTo']
showitval=false
  constructor(controller, appService, dataService, dialogService, api,taskQueue,element) {
    this.controller = controller;
    this.answer = null;
    this.appService = appService;
     this.currentItem = this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
    this.element = element;
    this.taskQueue = taskQueue;
  }
 add(){
    alert(this.dd)
  }
 pickerChanged() {
    this.picker.events.onChanged = (e) => console.log('picker onChanged');
  }
mypickerChanged() {
    this.mypicker.events.onChanged = (e) => console.log('mypicker onChanged');
  }
 orgItemChanged() {
    this.orgItem.events.onChanged = (e) => console.log('orgItem  onChanged');
  }
orgValueChanged() {
    this.orgValue.events.onChanged = (e) => console.log('orgValue  onChanged');
  }
 searchdocChanged(value) {
   console.log('value  onChanged',value);
   
    return
  }
 
showit() {
  this.showitval=true
  this.allorgs=this.appService.orgsList
 //  this.taskQueue.queueMicroTask(() => {
      $(this.mypicker).selectpicker("refresh");
   // });
}

  activate(fieldname) {
    this.fieldname = fieldname;
    this.fieldbase = ''
   
    let opos = this.orgfields.findIndex(x => x === fieldname);
    if (opos !== -1) {
      this.fieldbase = 'ORG'

      let orgcbs = this.appService.orgsList
      let origid
      this.orgobj = {}
      if (this.fieldname === this.orgfields[opos]) {
        if ((this.currentItem[this.orgfields[opos]] === undefined) || (this.currentItem[this.orgfields[opos]] === null)) {
        } else {
          origid = orgcbs.findIndex(x => x._id === this.currentItem[this.orgfields[opos]])
          this.orgobj = orgcbs[origid]
        }
      }
      this.orgSelection = {
        selectedOrgItem: this.orgobj,
        selectedOrgValue: this.orgobj._id
      };
      //  alert('act ' + fieldname+ this.orgobj)
    }
   
    this.heading = `Search ${this.fieldname} to select.`
    // setTimeout(()=>{
    //   //  $(this.element).selectpicker("refresh");
    //    this.allorgs=this.appService.orgsList
    //    alert('act ' + this.allorgs.length)
    // },300)


  }

  //attached() {

  // this.doc = `type any characters of the ${this.fieldname} to select.`



  //add DonatedBy
  // if (this.fieldname === 'SavedList') {
  //   // we dont send a name of the list
  //   // let meds = this.appService.savedlists 
  //   // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
  //   // } else {
  //   //   let mid = meds.findIndex(x => x._id === this.currentItem.OwnerID)
  //   //   let orgobj = this.appService.orgsList[mid]//10]
  //   //   // console.log('orgobj', orgobj)
  //   //   this.OrgName = orgobj
  //   //   this.dsaved.value = this.OrgName
  //   // }
  // }


  // }


  //  alert(`${this.addlist} Exists in list already!`)
  addit() {
    let meds = this.appService.savedlists
    let mid = meds.findIndex(x => x.name === this.addlist)
    if (mid !== -1) {
      this.dialogService.open({ viewModel: PromptServ, model: `${this.addlist} Exists in list already!`, lock: false }).whenClosed(response => {
        let orgobj = this.appService.savedlists[mid]
        this.OrgName = orgobj
        this.dsaved.value = this.name//this.addlist
        this.appService.currentsavedlist = this.name
      });

    } else {
      let sl = `${this.addlist}`
      return this.api.createSavedlists(sl)
        .then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          let check = jsonRes.data;
          //  this.inv = inv[0]
          if (check === 'success') {
            this.dialogService.open({ viewModel: PromptServ, model: `${this.addlist} added to list!`, lock: false }).whenClosed(response => {
              // jj 222
              this.appService.currentsavedlist = sl
              return Promise.all([
                this.dataService.loadSavedlists(),
              ]).then(values => {
                this.appService.savedlists = values[0];
              })
            })
            this.controller.cancel()
          }
        })
    }

  }
  save() {
    if (this.fieldbase === 'ORG') {
      //   let orgid = `${this.OrgName._id}`    // let orgname = `${this.OrgName.OrgName}`
      let orgid = this.orgSelection.selectedOrgItem._id//`${this.OrgName.id}`
      let orgname = this.orgSelection.selectedOrgItem.OrgName// `${this.OrgName.OrgName}`
      if (this.fieldname === 'ConservedBy') {
        this.currentItem.ConservedBy = orgid
        this.currentItem.conservedbyname = orgname
      }
      if (this.fieldname === 'OwnerID') {
        this.currentItem.OwnerID = orgid
        this.currentItem.ownername = orgname
      }
      if (this.fieldname === 'SoldToID') {
        this.currentItem.SoldToID = orgid
        this.currentItem.soldtoname = orgname
      }
      if (this.fieldname === 'SoldTo') {
        this.currentItem.SoldTo = orgid
        this.currentItem.soldtoname = orgname
      }
      if (this.fieldname === 'ConsignedFromID') {
        this.currentItem.ConsignedFromID = orgid
        this.currentItem.consignedfromname = orgname
      }
      if (this.fieldname === 'ConsignmentShippingID') {
        this.currentItem.ConsignmentShippingID = orgid
        this.currentItem.consignmentshippingname = orgname
      }

      if (this.fieldname === 'InsuredBy') {
        this.currentItem.InsuredBy = orgid
        this.currentItem.insuredbyname = orgname
      }

      if (this.fieldname === 'ConservedBy') {
        this.currentItem.ConservedBy = orgid
        this.currentItem.conservedbyname = orgname
      }

      if (this.fieldname === 'ConsignedTo') {
        this.currentItem.ConsignedTo = orgid
        this.currentItem.consignedtoname = orgname
      }

      if (this.fieldname === 'PurchasedFrom') {
        this.currentItem.PurchasedFrom = orgid
        this.currentItem.purchasedfromname = orgname
      }

      if (this.fieldname === 'LoanTo') {
        this.currentItem.LoanTo = orgid
        this.currentItem.loantoname = orgname
      }
      if (this.fieldname === 'PhotographerID') {
        this.currentItem.PhotographerID = orgid
        this.currentItem.photographername = orgname
      }
    } else {


      if (this.fieldname === 'SavedList') {
        let name = `${this.name.name}`
        console.log(' dsaved.value', name)//, this.dsaved.value)
         this.appService.currentsavedlist = name// dsaved.value
      }
    }
    this.controller.this.controller.ok('saved')//cancel()
  }
  detached() {
    //  this.businessesSubscription.dispose();
  }
}
