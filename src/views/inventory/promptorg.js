
import { DialogController } from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { DialogService } from 'aurelia-dialog';
// import { PromptServ } from '../../services/promptserv';
import { Promptyn } from '../../services/promptyn';
import { ApiService } from '../../utils/servicesApi';
import { bindable, observable } from 'aurelia-framework';
//, bindingMode
// @bindable attachFocus - you will be able to use it in you views as attach-focus.bind="true".

export class Promptorg {
  @bindable searchdoc
  @bindable attachFocus
  @observable query;
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  static inject = [DialogController, ApplicationService, MyDataService, DialogService, ApiService];

  fruits = ['Apple', 'Orange', 'Grapes', 'Pineaple', 'Peach', 'Bananas'];
  monthsOfTheYear = [
    { name: 'January', short: 'Jan', number: 1 },
    { name: 'February', short: 'Feb', number: 2 },
    { name: 'March', short: 'Mar', number: 3 },
    { name: 'April', short: 'Apr', number: 4 },
    { name: 'May', short: 'May', number: 5 },
    { name: 'June', short: 'Jun', number: 6 },
    { name: 'July', short: 'Jul', number: 7 },
    { name: 'August', short: 'Aug', number: 8 },
    { name: 'September', short: 'Sep', number: 9 },
    { name: 'October', short: 'Oct', number: 10 },
    { name: 'November', short: 'Nov', number: 11 },
    { name: 'December', short: 'Dec', number: 12 }
  ];


 selectedProduct = '';
  selectedOrg = '';
  orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID',
    'PhotographerID', 'PurchasedFrom', 'ConservedBy',
    'SoldToID', 'SoldTo', 'LoanTo', 'ProvOwner']
  orgfielddesc = ['Consigned To', 'Consigned From', 'Consignment From (Shipping)', 'Owner',
    'Photographer', 'Purchased From', 'Conserved By',
    'Sold To', 'Sold To', 'Museum Loan To', 'Provenance Owner']

  // for the datalist with insuredList
  // selectedValue = null;
  // findOption = value => this.appService.insuredList.find(x => x.LEGAL_NAME === value);
  // //  let findObject = this.appService.insuredList.find(x => x.LEGAL_NAME === findvalue)


  // // selectedInscoValue = null;
  // // findOptionInsco = value => this.appService.InsurancecompanyList.find(x => x.NAME === value);


  selectedValueI = null;
  findOptionI = value => this.appService.insuredList.find(x => x.LEGAL_NAME === value);


  selectedValue = null;
  findOption = value => this.appService.InsurancecompanyList.find(x => x.FullName === value);

  selectedValueLoc = null;
  findOptionLoc = value => this.appService.codesLocation.find(x => x.Description === value);

  // this.myDatalistLocation.value = this.currentItem.location.description
// orgs
  selectedValueO = null;
  orgName = '';
  ordId = '';
  myDatalistO = null;
  findOptionO = value => this.appService.orgsList.find(x => {
    if (x.OrgName === value) {
      let orgName = x.OrgName
      let orgId = x._id
      let selectedValueO = x.OrgName
      console.log('findOptionO value ', orgName, orgId, x.OrgName, value)
    }
    x.OrgName === value
  } )



  constructor(controller, appService, dataService, dialogService, api) {
    this.controller = controller;
    this.answer = null;

    this.appService = appService;
    //  this.inv = '';
    this.currentItem = this.appService.testrec;
    this.thefield = 1
    this.dataService = dataService;
    controller.settings.lock = false;
    this.addlist//='aaa'
    this.dialogService = dialogService
    this.api = api
    this.insuredList = this.appService.insuredList
  }

  
  search() {
    console.log(this.query);
    return true;
  }
  // queryChanged(newval, oldval) {
  //   console.log(newval);
  // }
  queryChanged(newval, oldval) {
    // this.http.fetch('https://api.github.com/users')
    //   .then(res => res.json())
    //   .then(result => {
    //     this.users = result.filter(usr => usr.login.includes(newval));
    //   });
    // let result = this.appService.insuredList;
    this.insuredList = this.appService.insuredList.filter(usr => {
      //  console.log('usr ',usr)
      if (usr.LEGAL_NAME !== null) usr.LEGAL_NAME.includes(newval)
      // usr.LEGAL_NAME.includes(newval)
    }
    );
    console.log(' this.insuredList ', this.insuredList)

  }

  searchdocChanged(value) {
    //console.log('the value ', value)

    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }
  getStates(filter, limit) {
    let filterlc = filter.toLowerCase()
    let states
    let Promise = this.dataService.loadStates()
      .then(response => {
        states = response
        console.log('states', states)
        return states //response // .json();
      })
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : states)
      .then(states => filter.length > 0 ? states.filter(item => item.name.toLowerCase().indexOf(filterlc) > -1) : states)

    return Promise
  }

  testfruit() {
    alert(this.fruit + ' this.fn' + this.FullName)
  }
  monthSelected(item) {
    if (item) {
      console.log('Month Selected: ' + item.short);
    } else {
      console.log('Month cleared');
    }
  }
  // activate(question) {
  //    this.question = question;
  //} person
  // activate(fieldname) {
  //   this.fieldname = fieldname;
  // }

  activate(currentitem) {
    this.currentItem = currentitem;
    this.fieldname = currentitem.fieldname;
  }
  addInsured(findvalue) {
    let ibod = { 'LEGAL_NAME': findvalue }
    this.api.addinsured(ibod).then((jsonRes) => {
      let ins = jsonRes.data;
      this.appService.currentItem.insured.id = ins.id
      this.appService.currentItem.insured.LEGAL_NAME = ins.LEGAL_NAME
      this.appService.insuredList.push(this.selectedValue)
      this.controller.cancel()
      // return Promise.resolve(this.dataService.loadInsured()) //.then(values => {})
    })
  }
  changeCallbackInsured(selectedValueI) {
    // console.log('selectedvalue has undefined ', selectedvalue, "myDatalist this.myDatalist.value has the value", this.myDatalist.value);
    // let findvalue = this.myDatalist.value
    let findvalue = this.myDatalistI.value



    // no need as we have it in this.selectedValue
    // let findObject = this.appService.insuredList.find(x => x.LEGAL_NAME === findvalue)
    //  if (findObject === undefined) {
    if (this.selectedValueI === undefined) {
      //     alert(`you are about to add ${findvalue} to Insured`)
      this.dialogService.open({ viewModel: Promptyn, model: `Add ${findvalue} to insured list or Cancel?`, lock: false }).whenClosed(response => {

        if (!response.wasCancelled) {
          this.addInsured(findvalue)
        } else {
          console.log('cancel');
        }
        console.log(response.output);
      });


    }
  }


  changeCallbackInsco(selectedvalue) {
    // console.log('selectedvalue has undefined ', selectedvalue, "myDatalist this.myDatalist.value has the value", this.myDatalist.value);
    //  let findvalue = this.myDatalistInsco.value
    // if (this.selectedInscoValue === undefined) {   
    //     alert(`you are about to add ${findvalue} to Insured`)
    // this.dialogService.open({ viewModel: Promptyn, model: `Add ${findvalue} to insured list or Cancel?`, lock: false }).whenClosed(response => {

    //   if (!response.wasCancelled) {
    //     this.addInsured(findvalue)
    //   } else {
    //     console.log('cancel');
    //   }
    //   console.log(response.output);
    // });
    let findvalue = this.myDatalistInsco.value
    console.log('findvalue ', findvalue, this.selectedValue);
    // console.log('findvalue ',findvalue,this.selectedInscoValue);
    //  if (this.selectedInscoValue !== undefined) {   
    //   console.log('findvalue ',findvalue,this.selectedInscoValue);
    //  }
  }

  changeCallbackLocation(selectedvalue) {

    let findvalue = this.myDatalistLoc.value
    console.log('findvalue ', findvalue, this.selectedValueLoc);

  }

  attached() {

      if (findOptiono === undefined) {
      findOptiono = '';
      this.currentItem.OwnerID = ''
    }
    if (findOptions === undefined) {
      findOptions = '';
      this.currentItem.SoldToID = ''
    }

    let opos = this.orgfields.findIndex(x => x === this.fieldname);
    if (opos !== -1) {
      this.orgfielddescription = this.orgfielddesc[opos]

    } else {
      this.orgfielddescription = this.fieldname
    }
    let topos = this.textfields.findIndex(x => x === this.fieldname);
    if (topos !== -1) {
      this.textfielddescription = this.textfielddesc[topos]
      this.doc = ` ${this.textfielddescription} .`
      this.heading = ` ${this.textfielddescription} .`
      this.placeholder = `${this.textfielddescription}`
    } else {
      this.doc = `Select ${this.orgfielddescription} .`
      this.heading = `Select ${this.orgfielddescription}`
      this.placeholder = `select ${this.orgfielddescription} .`

    }
if (this.fieldname === 'SoldToID') {
        this.hasFocus = true;
        if (this.currentItem.SoldToID === undefined || this.currentItem.SoldToID === '') {
        } else {
           this.myDatalistO.value = this.currentItem.soldtoname
          // this.selectedValueO = this.currentItem.soldtoname;
          // this.origorg = this.currentItem.soldtoname;
        }
      }
 
 if (this.fieldname === 'ConservedBy') {
        if (this.currentItem.ConservedBy === undefined || this.currentItem.ConservedBy === '') {
        } else {
          this.myDatalistO.value = this.currentItem.conservedbyname
          this.selectedValueO = this.currentItem.conservedbyname
          this.origorg = this.currentItem.conservedbyname

        }
      }
      if (this.fieldname === 'ConsignedFromID') {
        if (this.currentItem.ConsignedFromID === undefined || this.currentItem.ConsignedFromID === '') {
        } else {
          this.myDatalistO.value = this.currentItem.consignedfromname
          this.selectedValueO = this.currentItem.consignedfromname;
          this.origorg = this.currentItem.consignedfromname;
        }
      }
      if (this.fieldname === 'ConsignmentShippingID') {
        if (this.currentItem.ConsignmentShippingID === undefined || this.currentItem.ConsignmentShippingID === '') {
        } else {
          this.myDatalistO.value = this.currentItem.consignmentshippingname
          this.selectedValueO = this.currentItem.consignmentshippingname;
          this.origorg = this.currentItem.consignmentshippingname;
        }
      }

      if (this.fieldname === 'ConsignedTo') {
        if (this.currentItem.ConsignedTo === undefined || this.currentItem.ConsignedTo === '') {
        } else {
          this.myDatalistO.value = this.currentItem.consignedtoname
          this.selectedValueO = this.currentItem.consignedtoname;
          this.origorg = this.currentItem.consignedtoname;
        }
      }
      // }
      if (this.fieldname === 'PurchasedFrom') {
        if (this.currentItem.PurchasedFrom === undefined || this.currentItem.PurchasedFrom === '') {
        } else {
          this.myDatalistO.value = this.currentItem.purchasedfromname
          this.selectedValueO = this.currentItem.purchasedfromname;
          this.origorg = this.currentItem.purchasedfromname;
        }
      }

      if (this.fieldname === 'LoanTo') {
        if (this.currentItem.LoanTo === undefined || this.currentItem.LoanTo === '') {
        } else {
          this.myDatalistO.value = this.currentItem.loantoname
          this.selectedValueO = this.currentItem.loantoname;
          this.origorg = this.currentItem.loantoname;
        }
      }
      if (this.fieldname === 'PhotographerID') {
        if (this.currentItem.PhotographerID === undefined || this.currentItem.PhotographerID === '') {
        } else {
          this.myDatalistO.value = this.currentItem.photographername
          this.selectedValueO = this.currentItem.photographername;
          this.origorg = this.currentItem.photographername;
        }
      }
      if (this.fieldname === 'ConsignmentShippingID') {
        if (this.currentItem.ConsignmentShippingID === undefined || this.currentItem.ConsignmentShippingID === '') {
        } else {
          this.myDatalistO.value = this.currentItem.consignmentshippingname
          this.selectedValueO = this.currentItem.consignmentshippingname;
          this.origorg = this.currentItem.consignmentshippingname;
        }
      }



  }
  changeCallbackOrg(selectedValue) {

    let values = this.myDatalistO.value
    // let semiPos = values.indexOf(";");
    // var res = values.trim();
    var res = values.split(";");

    this.OrgName = res[0].trim();
    this.BusIndivid = res[1].trim();
    this.orgId = res[2].trim();
    this.orgObject = { OrgName: this.OrgName, BusIndivid: this.BusIndivid, _id: this.orgId }

    console.log('this.orgId this.OrgName', this.OrgName, this.orgId, this.BusIndivid)// this.orgObject)
    // let findvalue = this.myDatalistO.value //this.selectedValueO.value
  }


  save() {


    if (this.fieldname === 'SoldToID') {

      console.log('orgName id', this.orgName, this.ordId)

      if (this.OrgName !== null && this.origorg !== this.OrgName) {

        this.currentItem.SoldToBusIndivid = this.BusIndivid

        this.currentItem.SoldToID = this.orgId
        this.currentItem.soldtoname = this.OrgName
      }
    }

    if (this.fieldname === 'insco') {

      this.currentItem.insco = {}

      this.currentItem.insco.NAME = this.selectedValue.NAME
      this.currentItem.insco.ADDRESS = this.selectedValue.ADDRESS
      this.currentItem.insco.CITY = this.selectedValue.CITY
      this.currentItem.insco.STATE = this.selectedValue.STATE
      this.currentItem.insco.ZIP = this.selectedValue.ZIP
      this.currentItem.insco.id = this.selectedValue._id
      this.currentItem.insco.FullName = this.selectedValue.FullName
      this.currentItem.insco.INSURANCE_COMPANY_ID = this.selectedValue.INSURANCE_COMPANY_ID


    }
    this.controller.ok('saved')
  }

}
