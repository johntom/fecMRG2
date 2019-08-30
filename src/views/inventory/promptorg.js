
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
  // ConsignedTo ConsignedFromID ConsignmentShippingID OwnerID PhotographerID PurchasedFrom ConservedBy SoldToID LoanTo 


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
  id='';
  findOptionO = value => this.appService.orgsList.find(x => {
    if (x.OrgName === value) {
      let orgName = x.OrgName
      let orgId = x._id
      let selectedValueO = x.OrgName
      console.log('findOptionO value ', orgName, orgId, x.OrgName, value)
    }
    x.OrgName === value
  })



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
    this.hasFocus = true;
    let findOptions
    this.fieldbase = 'ORG'
    let topos = this.orgfields.findIndex(x => x === this.fieldname);
    if (topos !== -1) {
      // orgfields orgfielddesc 
      let odesc = this.orgfielddesc[topos]
      this.heading = `Org/Contact ${odesc} Search`
    }


 
    if (this.fieldname === 'SoldToID') {
this.id=this.currentItem.SoldToID
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.SoldToID)
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.SoldToID = ''
      } else {
        this.myDatalistO.value = this.currentItem.soldtoname

      }


    }
    if (this.fieldname === 'OwnerID') {
      this.id=this.currentItem.OwnerID
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.OwnerID)
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.OwnerID = ''
      }
      else {
        this.myDatalistO.value = this.currentItem.ownername

      }
    }




    if (this.fieldname === 'ConservedBy') {
      this.id=this.currentItem.ConservedBy
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.ConservedBy)
      // if (this.currentItem.ConservedBy === undefined || this.currentItem.ConservedBy === '') {
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.ConservedBy = ''
      } else {
        // this.myDatalistO.value = this.currentItem.soldtoname
        // this.selectedValueO = this.currentItem.conservedbyname
        // this.origorg = this.currentItem.conservedbyname
        this.myDatalistO.value = this.currentItem.conservedbyname
      }
    }




    if (this.fieldname === 'ConsignedFromID') {
       this.id=this.currentItem.ConsignedFromID
     
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.ConsignedFromID)
      // if (this.currentItem.ConsignedFromID === undefined || this.currentItem.ConsignedFromID === '') {
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.ConsignedFromID = ''
      } else { 
        this.myDatalistO.value = this.currentItem.consignedfromname
        this.selectedValueO = this.currentItem.consignedfromname;
        this.origorg = this.currentItem.consignedfromname;
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      
      this.id=this.currentItem.ConsignmentShippingID
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.ConsignmentShippingID)
      // if (this.currentItem.ConsignmentShippingID === undefined || this.currentItem.ConsignmentShippingID === '') {
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.ConsignedFromID = ''
      } else {
        this.myDatalistO.value = this.currentItem.consignmentshippingname
        this.selectedValueO = this.currentItem.consignmentshippingname;
        this.origorg = this.currentItem.consignmentshippingname;
      }
    }

    if (this.fieldname === 'ConsignedTo') {
       this.id=this.currentItem.ConsignedTo
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.ConsignedTo)
      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.ConsignedTo = ''
      } else {
        this.myDatalistO.value = this.currentItem.consignedtoname
        this.selectedValueO = this.currentItem.consignedtoname;
        this.origorg = this.currentItem.consignedtoname;
      }
    }
    // }
    if (this.fieldname === 'PurchasedFrom') {
      this.id=this.currentItem.PurchasedFrom
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.PurchasedFrom)

      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.PurchasedFrom = ''
      } else {
        this.myDatalistO.value = this.currentItem.purchasedfromname
        this.selectedValueO = this.currentItem.purchasedfromname;
        this.origorg = this.currentItem.purchasedfromname;
      }
    }

    if (this.fieldname === 'LoanTo') {
        this.id=this.currentItem.LoanTo
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.loantoname)

      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.PurchasedFrom = ''
      } else {
        this.myDatalistO.value = this.currentItem.loantoname
        this.selectedValueO = this.currentItem.loantoname;
        this.origorg = this.currentItem.loantoname;
      }
    }
    if (this.fieldname === 'PhotographerID') {
        this.id=this.currentItem.PhotographerID
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.PhotographerID)

      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.PurchasedFrom = ''
      } else {
        this.myDatalistO.value = this.currentItem.photographername
        this.selectedValueO = this.currentItem.photographername;
        this.origorg = this.currentItem.photographername;
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
         this.id=this.currentItem.ConsignmentShippingID
      //    findOptiono = this.appService.orgsList.find(x => x._id === this.currentItem.ConsignmentShippingID)

      // if (this.currentItem.ConsignmentShippingID === undefined || this.currentItem.ConsignmentShippingID === '') {
      // } else {
      findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.ConsignmentShippingID)

      if (findOptions === undefined) {
        findOptions = '';
        this.currentItem.ConsignmentShippingID = ''
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

    if (this.fieldname === 'OwnerID') {
      if (this.currentItem.ownername === undefined) this.currentItem.ownername = ''

      this.currentItem.OwnerID = this.orgId // this.OrgName._id
      this.currentItem.ownername = this.OrgName// .OrgName
      // }

    }

    if (this.fieldname === 'ProvOwner') {


      if (this.OrgName !== null && this.origorg !== this.OrgName) {

        this.currentItem.ProvOwnerID = this.orgId
        this.currentItem.ProvOwner = this.orgObject
        this.currentItem.provownername = this.OrgName

      }

    }

    if (this.fieldname === 'ConsignedFromID') {
      if (this.OrgName.OrgName !== this.currentItem.consignedfromname) {

        this.currentItem.ConsignedFromID = this.orgId//OrgName._id
        this.currentItem.consignedfromname = this.OrgName//.OrgName
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      if (this.OrgName.OrgName !== this.currentItem.consignmentshippingname) {

        this.currentItem.ConsignmentShippingID = this.orgId//OrgName._id
        this.currentItem.consignmentshippingname = this.OrgName//.OrgName
      }

    }
    if (this.fieldname === 'ConservedBy') {

      if (this.OrgName !== null && this.origorg !== this.OrgName) {
        this.currentItem.ConservedBy = this.orgId
        this.currentItem.conservedbyname = this.OrgName
      }

    }
    if (this.fieldname === 'ConsignedTo') {
      if (this.OrgName !== this.currentItem.consignedtoname) {

        this.currentItem.ConsignedTo = this.orgId//OrgName._id
        this.currentItem.consignedtoname = this.OrgName//.OrgName
      }
    }

    if (this.fieldname === 'PurchasedFrom') {

      if (this.OrgName !== null && this.origorg !== this.OrgName) {
        this.currentItem.PurchasedFrom = this.orgId
        this.currentItem.purchasedfromname = this.OrgName

      }
    }
    if (this.fieldname === 'LoanTo') {
      if (this.OrgName !== null && this.origorg !== this.OrgName) {
        this.currentItem.LoanTo = this.orgId
        this.currentItem.loantoname = this.OrgName

      }
    }
    if (this.fieldname === 'PhotographerID') {
      if (this.OrgName !== null && this.origorg !== this.OrgName) {

        this.currentItem.PhotographerID = this.orgId//OrgName._id
        this.currentItem.photographername = this.OrgName///.OrgName
      }
    }
    if (this.fieldname === 'ConsignmentShippingID') {
      if (this.OrgName !== null && this.origorg !== this.OrgName) {

        this.currentItem.ConsignmentShippingID = this.orgId//OrgName._id
        this.currentItem.consignmentshippingname = this.OrgName// .OrgName
      }
    }



    this.controller.ok('saved')
  }

}
