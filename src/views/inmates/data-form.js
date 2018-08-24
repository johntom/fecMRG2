import { Router } from 'aurelia-router';
import { inject, customAttribute } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ApplicationService } from '../../services/application-service';
import moment from 'moment';
import { ApiService } from '../../utils/servicesApi';
import { observable } from "aurelia-framework";
import { Prompt } from './prompt';
import { Promptyn } from '../../services/promptyn';// /../../../services/promptyn
import { DialogService } from 'aurelia-dialog';
// import { MyDataService } from "../../services/my-data-service";

// import {CssAnimator} from 'aurelia-animator-css';
// import { Prompt } from './prompt';
// import { DialogService } from 'aurelia-dialog';
// @inject(Router, ApiService, ApplicationService, MyDataService, EventAggregator, DialogService)

// @customAttribute('animateonchange')

//,Element, CssAnimator
// import {
//   ValidationControllerFactory,
//   ValidationController,
//   ValidationRules
// } from 'aurelia-validation';
// import {BootstrapFormRenderer} from './bootstrap-form-renderer';

// @inject(Router, ApplicationService, ApiService,ValidationControllerFactory)
@inject(Router, ApplicationService, ApiService, DialogService)

export class DataForm {
  // @observable selectedBooking;
  heading = 'Inmate Entry...';
  footer = 'Inmate Footer...';
  adjusterList = 'adjusterList';
  recordId = '';
  products = [
    { id: 0, name: 'Motherboard' },
    { id: 1, name: 'CPU' },
    { id: 2, name: 'Memory' },
  ];
  message = 'Save & Stay' //&amp;
  // productMatcher = (a, b) => a.id === b.id;
  // selectedProduct = { id: 1, name: 'CPU' };
  firstName = '';
  lastName = '';
  email = '';
  controller = null;


  constructor(router, appService, api, dialogService) {
    //,controllerFactory
    // this.controller = controllerFactory.createForCurrentScope();
    //  this.controller.addRenderer(new BootstrapFormRenderer());
    this.api = api;
    this.appService = appService;
    this.router = router;
    console.log('DataForm')
    this.inv = '';

    this.services = []
    this.invoices = []
    this.bookingindex = 0
    // this.dataService = dataService
    this.dialogService = dialogService
  }

  // valueChanged(newValue) {
  //   if (this.initialValueSet) {
  //     this.animator.addClass(this.element, 'background-animation').then(() => {
  //       this.animator.removeClass(this.element, 'background-animation');
  //     });
  //   }
  //   this.initialValueSet = true;
  // }

  // selectedBookingChanged(newVal, oldVal) {
  //   this.booking.forEach(function (d) { // no longer out of scope
  //     d.isCurrent = d === newValue;
  //   })
  // }
  changeColor(item) {
    // alert(item.classification);
    item.isSelected = !item.isSelected;
  }

  EditBooking(booking, editstate, index) {
    this.currentBooking = booking

    for (let bk of this.currentRecord.booking) {
      // console.log('bk2 ', bk2)
      bk.isSelected = false
    }

    this.currentRecord.booking[index].isSelected = true
    //this.services[0].isSelected = true

    booking.edit = !editstate//this.booking.edit
    this.services = booking.services
    this.getInvoices(this.services[0], 0)
  }

  EditService(service, editstate, index) {
    this.currentService = service
    this.currentServiceIndex = index

    // if update is clicked editstate=false if done is clicked editstate=true
    if (editstate === true && service.serviceProvided === 'Inpatient') {

      var str = service.serviceDateTo
      var a1 = str.substr(0, 4)
      var a2 = str.substr(5, 2)
      var a3 = str.substr(8, 2)

      var str2 = service.serviceDateFrom
      var b1 = str2.substr(0, 4)
      var b2 = str2.substr(5, 2)
      var b3 = str2.substr(8, 2)

      var a = moment([a1, a2, a3]);
      var b = moment([b1, b2, b3]);

      service.serviceDays = a.diff(b, 'days') +1 // 1

    }
    if (editstate === true && service.serviceProvided !== 'Inpatient') service.serviceDays = ''
    service.edit = !editstate//this.booking.edit
    for (let bk of this.services) {
      console.log('bk ', bk)
      bk.isSelected = false
    }
    console.log('bk finish')
    this.services[index].isSelected = true
    //  console.log('getInvoices service:',service)
    //   this.invoices = service.invoices
    // this.getInvoices(service, 0)
    if (this.invoices !== undefined) {
      this.invoices[0].isSelected = true
    }



  }

  EditInvoice(invoice, editstate, index) {
    // if update is clicked editstate=false if done is clicked editstate=true
    if (editstate === true) {
      console.log('payee ', invoice.payee)
      if (invoice.payeeselect === null && invoice.payeename !== '') {
        console.log('null payee ')
        let payee = {
          "payeename": invoice.payeename,
          "payeefein": invoice.payeefein,
          "payeeaddr": invoice.payeeaddr,
          "payeecity": invoice.payeecity,
          "payeestate": invoice.payeestate,
          "payeezip": invoice.payeezip
        }
        this.appService.payeelist.push(payee)
        // write to database and refresh list

        invoice.payee = payee
        this.api.addpayee(payee)
          .then((jsonRes) => {
            this.upmess = jsonRes
            delete invoice.payeename
            delete invoice.payeefein
            delete invoice.payeeaddr
            delete invoice.payeecity
            delete invoice.payeestate
            delete invoice.payeezip
            invoice.payeename = ''
            invoice.payeefein = ''
            invoice.payeeaddr = ''
            invoice.payeecity = ''
            invoice.payeestate = ''
            invoice.payeezip = ''
          })
      } else {
        /*
          <span  >${payee.payeename} </span>
           <select show.bind="invoice.edit" id="pl" class="form-control input-sm" value.two-way="invoice.payeeselect">
              ${payee.payeename}
              <option model.bind="null">Choose...</option>
              <option repeat.for="opt of appService.payeelist" model.bind="opt">
              ${opt.payeename} /  ${opt.payeefein}
              </option>
            </select>
         */

        if (invoice.payeeselect !== null) {
          invoice.payee = invoice.payeeselect
          // invoice.payee.payeename = ''
          // invoice.payee.payeefein = ''
          // invoice.payee.payeeaddr = ''
          // invoice.payee.payeecity = ''
          // invoice.payee.payeestate = ''
          // invoice.payee.payeezip = ''
          invoice.payeename = ''
          invoice.payeefein = ''
          invoice.payeeaddr = ''
          invoice.payeecity = ''
          invoice.payeestate = ''
          invoice.payeezip = ''
        }
      }
    } else {
      // editstate = false
      let payees = this.appService.payeelist
      // let oid = payees.findIndex(x => x.id === invoice.payee.id) //select.id)
      let oid = payees.findIndex(x => x.payeename === invoice.payee.payeename)//id) //select.id)
      console.log('oid ', oid)
      let payeeobj = this.appService.payeelist[oid]//10]
      console.log('payeeobj ', payeeobj)
      // if (payeeobj !== undefined) invoice.payeeselect.payeename = payeeobj.payeename
      if (payeeobj !== undefined) invoice.payeeselect = payeeobj
      // invoice.payee.payeename = ''
      // invoice.payee.payeefein = ''
      // invoice.payee.payeeaddr = ''
      // invoice.payee.payeecity = ''
      // invoice.payee.payeestate = ''
      // invoice.payee.payeezip = ''
      invoice.payeename = ''
      invoice.payeefein = ''
      invoice.payeeaddr = ''
      invoice.payeecity = ''
      invoice.payeestate = ''
      invoice.payeezip = ''
      // let payees = this.appService.payeelist
      //     let oid = payees.findIndex(x => x.payeename === invoice.payeeselect.payeename) //payeeselect.id)
      //     console.log('oid ', oid)
      //     let payeeobj = this.appService.payee[oid]//10] 
      //     console.log('payeeobj ', payeeobj)
      //     // if (payeeobj !== undefined) invoice.payeeselect = payeeobj
      //     if (payeeobj !== undefined) invoice.payeeselect = payeeobj 



    }

    this.currentInvoice = invoice
    invoice.edit = !editstate//this.booking.edit
    for (let bk of this.invoices) {
      //  console.log('bk2 ', bk2)
      bk.isSelected = false
    }

    // this.currentRecord.booking[index].isSelected = true
    this.invoices[index].savings = this.invoices[index].invoiceTotal - this.invoices[index].repricedAmt
    this.invoices[index].isSelected = true
  }
  addBooking() {
    let booking = this.currentRecord.booking //this.appService.currentRecord.booking
    let flag = false
    let item, item2
    let bookingDate = moment().format('YYYY-MM-DD')
    if (booking === undefined) {
      flag = true
      booking = []
      this.bookingindex = 0
    } else this.bookingindex = booking.length
    //, classification: 'friday'
    item = { bookingDate: bookingDate, edit: true }
    booking.unshift(item)

    //    if (flag) this.appService.currentRecord = booking

    this.bookingDate = '';
    this.classification = '';
    // booking[this.bookingindex].services = []
    //booking[this.bookingindex].services = []


    this.services = []
    this.invoices = []

    for (let bk of booking) {
      bk.isSelected = false
    }
    // booking[this.bookingindex].isSelected = true
    booking[0].isSelected = true
    //    this.currentBooking.isSelected = true
    //this.services[0].isSelected = true



    // // booking[0].services.push(item2)
    // // booking[0].services[0]=''
    // //  booking[0].services[0].invoices = []
    //  this.getServices(booking[0], 0)  //booking, 0)

  }
  addService() {
    let service = this.services
    let flag = false
    let indx
    if (service === undefined) {
      flag = true
      indx = 0
      service = []
    } else {
      indx = service.length
    }
    let item
    let serviceDateFrom = moment().format('YYYY-MM-DD')

    item = { serviceDateFrom: serviceDateFrom, serviceDateTo: serviceDateFrom, edit: true }
    service.unshift(item)

    this.services = service
    this.currentRecord.booking[this.bookingindex].services = this.services

    if (flag) {
      //  this.services = service
      this.services[0].invoices = []
      // this.currentRecord.booking[0].services[indx] = this.services
      // this.currentRecord.currentBooking.services = this.services

    } else this.getInvoices(service, 0)
    //this.serviceDateFrom = '';

  }
  addInvoice() {
    let invoice = this.invoices
    let flag = false
    if (invoice === undefined) {
      flag = true
      invoice = []
    }
    let item
    let invDate = moment().format('YYYY-MM-DD')
    // let invno = this.currentBooking.bookingNo
    // item = { invno: invno, invDate: invDate, edit: true }
    item = { invDate: invDate, edit: true }
    invoice.unshift(item)
    // if (flag) this.invoices = invoice
    this.invoices = invoice
    this.currentRecord.booking[this.bookingindex].services[this.currentServiceIndex].invoices = this.invoices

    this.invDate = '';
  }
  getServices(booking, index) {
    // if (booking === 0) {
    //   //  this.getInvoices(0,0)
    //   this.invoices = []
    // } else {
    this.currentBooking = booking
    this.bookingindex = index
    console.log(' this.currentRecord ', index, booking.services);
    this.services = booking.services
    for (let bk of this.currentRecord.booking) {
      // console.log('bk2 ', bk2)
      bk.isSelected = false
    }

    this.currentRecord.booking[index].isSelected = true


    if (booking.services && booking.services[0] !== undefined) {

      for (let bk of this.services) {
        // console.log('bk2 ', bk2)
        bk.isSelected = false
      }

      this.services[0].isSelected = true
      //   this.services[0].isSelected=true

      this.getInvoices(this.services[0], 0)
    }
  }
  getInvoices(service, index) {
    // console.log(' this.currentRecord ', index, service.invoices);
    // if (service.invoices===undefined)
    //  
    this.invoices = service.invoices
    this.currentService = service
    this.currentServiceIndex = index

    for (let bk of this.services) {
      // console.log('bk2 ', bk2)
      bk.isSelected = false
    }

    this.services[index].isSelected = true
    if (this.invoices !== undefined && this.invoices.length !== 0) {
      for (let bk of this.invoices) {

        bk.isSelected = false
      }
      this.invoices[0].isSelected = true
      // if (invoices !== undefined) {

      // } else {

      // }
      console.log(' getInvoices ', this.invoices)
    }

  }

  // ======================================
  // service.edit = !editstate
  // this.invoices = service.invoices
  // this.currentService = service
  // this.currentServiceIndex = index
  // let startDate = moment( service.serviceDateFrom, "DD.MM.YYYY");
  // let endDate  = moment( service.serviceDateTo, "DD.MM.YYYY")
  // let startDate = moment( service.serviceDateFrom).format('M/D/YYYY')
  // let endDate  = moment( service.serviceDateTo).format('M/D/YYYY')
  // var result = 'Diff: ' + endDate.diff(startDate, 'days');

  //     let startDate = moment( service.serviceDateFrom).format('DD.MM.YYYY')
  //     let endDate  = moment( service.serviceDateTo).format('DD.MM.YYYY')
  //   var diff=moment.duration(service.serviceDateTo.diff(service.serviceDateFrom));
  // var diffIndays= diff.asDays()
  // console.log("DiffIndays: "+diffIndays)
  //     service.serviceDays = diffIndays// endDate.diff(startDate, 'days');
  // var a = moment([2007, 0, 29]);
  // var b = moment([2007, 0, 28]);
  // var a = moment( service.serviceDateFrom).format('YYYY.MM.DD');
  // var b = moment( service.serviceDateTo).format('YYYY.MM.DD');
  // var a1 = moment(service.serviceDateTo,"DD/MM/YYYY").format("YYYY")
  // var a2 = moment(service.serviceDateTo,"DD/MM/YYYY").format("MM")
  // var a3 = moment(service.serviceDateTo,"DD/MM/YYYY").format("DD") // var a1 = substring(service.serviceDateTo, 6,2)//  moment(service.serviceDateTo,"DD/MM/YYYY").format("YYYY")
  // var a1 = substring(service.serviceDateTo, 8,2)//  moment(service.serviceDateTo,"DD/MM/YYYY").format("YYYY")
  // var str = "2018-09-07";
  // var res = str.substr(0,4)
  // var res = str.substr(5,2);
  // var res = str.substr(8,2);
  // var b1  = moment(service.serviceDateFrom,"DD/MM/YYYY").format("YYYY")
  // var b2 = moment(service.serviceDateFrom,"DD/MM/YYYY").format("MM")
  // var b3 = moment(service.serviceDateFrom,"DD/MM/YYYY").format("DD")



  // for (let bk of this.services) {
  //   // console.log('bk2 ', bk2)
  //   bk.isSelected = false
  // }

  // this.services[index].isSelected = true


  // if (this.invoices !== undefined) {
  //   this.invoices[0].isSelected = true
  // }



  // getInvoices(service, index) {
  //   // console.log(' this.currentRecord ', index, service.invoices);
  //   // if (service.invoices===undefined)
  //   this.invoices = service.invoices
  //   this.currentService = service
  //   this.currentServiceIndex = index

  //   for (let bk of this.services) {
  //     // console.log('bk2 ', bk2)
  //     bk.isSelected = false
  //   }

  //   this.services[index].isSelected = true


  //   if (this.invoices !== undefined) {
  //     this.invoices[0].isSelected = true
  //   }


  //   console.log(' getInvoices ', this.invoices)
  // }
  close(path) {


    // let tab = this.appService.tabs.find(f => f.isSelected);
    // Next, we navigate to the newly created claim

    // Finally, we close out this tab
    // this.closeTab(tab);\
    let rt2
    this.closeTab
    if (path === undefined) {
      rt2 = `#/inmates`
    } else rt2 = `#/${path}`
    this.router.navigate(rt2);
  }
  closeTab(tab) {
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }

  activate(params, routeConfig) {
    console.log('activate', params)
    if (params.id) {
      this.recordId = params.id;
      if (this.recordId === 'create') {
        //let newrec = {inmate:{lastname: ""},booking: []}
        //this.appService.currentRecord ={}//newrec

        this.message = 'Save & Close'
        this.appService.currentRecord = {}
        this.appService.currentRecord.id = 'create'
        this.appService.testrec = {}
        this.appService.originalrec = {}
        this.appService.currentRecord.inmate = {}

        this.appService.currentRecord.booking = []
        this.appService.currentRecord.docs = []
        this.currentRecord = this.appService.currentRecord


      } else {
        this.message = 'Save & Stay'
        console.log('activate2')
        console.log('this.recordId ', this.recordId, this.appService.currentRecord);
        this.currentRecord = this.appService.currentRecord
        this.docs = this.currentRecord.docs
        console.log(' this.currentRecord ', this.currentRecord.booking.services);
        if (this.currentRecord.booking[0] !== undefined) {
          this.currentRecord.booking[0].isSelected = true
          this.getServices(this.currentRecord.booking[0], 0)
        }
      }
      // } // state
    }
    // click.delegate
    //  this.table.click.delegate('click-row.bs.table', function (e, row, $element) {
    //     $('.success').removeClass('success');
    //     $($element).addClass('success');
    //   });
  }
  addDocs(images) {
    //images is file
    //check for dups 2/21/2018
    //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
    let docs = this.currentRecord.docs
    if (docs === undefined) docs = []
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
      let newform = values;
      console.log('after checkdata1 ', newform);//this.status,
      // this.api.upload(formData, this.currentItem.CLAIM_NO)
      this.api.upload(newform, this.currentRecord.id)
        .then((jsonRes) => {
          this.upmess = jsonRes//.data.message

          $("#file").val("");
        })
    })
  }

  // addDocsInvoice(invoice,image) {
  addDocsInvoice(invoice, image) {
    // not used
    // images is file
    // let docs = this.currentRecord.docs
    // if (docs === undefined) docs = []
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    invoice.fileinvoicename = image[0].name // only 1 allowed
    //let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
    // let newform = values;
    //  console.log('after checkdata1 ',  newform);//this.status,
    // this.api.upload(formData, this.currentItem.CLAIM_NO)
    // delete fileinvoice
    // formData.append('file', image);
    formData.append('fileinvoice', image);
    //    this.api.uploadInvoice(formData, invoice)
    // use same uploader just make sure pdf is uniq within record
    this.api.upload(newform, this.currentRecord.id)
      .then((jsonRes) => {
        this.upmess = jsonRes//.data.message
        $("#fileinvoice").val("");
      })
    // })
  }

  addDocTest() {
    var item = { FILE_NAME: 'fname', FILE_EXT: '.pdf', OVERWRITE: 'N' }
    console.log('item ', item)
    let docs = this.currentRecord.docs
    if (docs === undefined) docs = []
    docs.unshift(item)
    this.docs = docs
  }
  checkData(images, formData) {
    let promises = []
    return new Promise((resolve, reject) => {
      let i = 0;
      let docs = this.currentRecord.docs
      if (docs === undefined) docs = []
      let imagelen = images.length
      for (i = 0; i < images.length; i++) {
        let ext = images[i].name.split('.').pop();
        let fname = images[i].name
        console.log('fname ', fname)
        let mid = -100// not needed
        let ival = i
        console.log('ival ', ival)

        mid = docs.findIndex(x => x.FILE_NAME === fname)
        console.log('mid ', mid)

        if (mid > -1) {
          // if we find file in array pass all values so we can evaluate later
          let obj = { name: fname, val: ival, ext: ext }
          var promise = this.promiseDialog(obj)
          promises.push(promise);
        } else {
          var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          console.log('item ', item)

          docs.unshift(item)
          this.docs = docs
          this.currentRecord.docs = docs
          formData.append('file', images[ival]);
        }
      }
      return Promise.all(promises).then(values => {
        for (i = 0; i < values.length; i++) {
          //console.log(' this.response values[i] ',i,values[i].name,values[i].val,values[i].resp)
          if (!values[i].resp) {
            //true=wasCancelled
            var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext, OVERWRITE: 'Y' }
            // dont add to data docs.unshift(item)
            formData.append('file', images[values[i].val]);
          }
        }
        resolve(formData)
      })
    })
  }


  saveinmate() {
    //  let modrec = this.currentRecord
    // let booking =  this.currentRecord.booking //this.appService.currentRecord.booking
    //this.currentItem//.booking//.services= this.services
    //this.appService.currentItem
    // this.invoices = service.invoices booking.services
    // this.controller.validate();
    console.log(' call save ', this.currentRecord)// JSON.stringify(this.appService.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
    if (this.recordId === 'create') {

      this.api.addinmate(this.currentRecord)
      //  this.recordId = 'modify'
      Promise.all(
        // this.api.saveinmate(this.currentRecord).then((res) => res.json())
        this.api.saveinmate(this.currentRecord).then((res) => this.close('inmates'))

      )

    } else {

      this.api.saveinmate(this.currentRecord)
    }
  }



  attached() {

  }

  bind() {

  }


  detached() {
    // alert('det')
    // this.ratingElement.removeEventListener('change', this.ratingChangedListener);
    // this.selectAdjusterElement.removeEventListener('change', this.adjusterSelectedListener);
  }
  promiseDialog(obj) {
    return new Promise((resolve, reject) => {
      this.dialogService.open({ viewModel: Promptyn, model: 'Press OK to Overwrite or Cancel ' + obj.name + '?', lock: false }).whenClosed(response => {
        let out = { name: obj.name, val: obj.val, ext: obj.ext, resp: response.wasCancelled }
        // send object back with answer
        resolve(out)
      });
    });
  }

  modalDocs() {
    //let obj = { name: 'fname', val: ival, ext: ext }
    let obj = { name: 'fname', val: 'john', ext: '123' }
    var promise = this.promiseDialog(obj)
    // this.dialogService.open({ viewModel: Prompt, model: 'docs', lock: false }).whenClosed(response => {
    //   // if (!response.wasCancelled) {
    //   //   console.log('Delete')
    //   //   let notes = this.currentItem.notes
    //   //   notes.splice(index, 1)// start, deleteCount)
    //   // } else {
    //   //   console.log('cancel');
    //   // }
    //   console.log(response.output);
    // });
  }

  canDeactivate() {
    return new Promise((resolve, reject) => {
      if (this.currentItem &&
        this.currentItem.isDirty &&
        this.currentItem.isDirty()) {
        // Now, we need to query the user... result => makes it a closure
        this.appService.asyncHandleDirty().then(result => {
          if (!result.wasCancelled) {


            resolve(true); // ok to leave
          } else {

            resolve(false); // cancel to stay

          }
        });
      } else {
        resolve(true);
      }
    });

  }
  //    async tryCloseTab(item, tab, route) {
  requestclose() {
    // const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    // let cand = this.canDeactivate()
    // let tab = this.appService.tabs.find(f => f.isSelected);
    // let rt2 = '#/claim/' + this.tabname ///claim'//Search?'cant use when search has a number 
    // this.appService.tryCloseTab(this.currentItem, tab, rt2);

  }



}

// ValidationRules      
//       .ensure('ssn').displayName('SSN')
//         .required().withMessage(`\${$displayName} cannot be blank.`);
//         .matches(/\d{3}-\d{2}-\d{4}/).withMessage(`"\${$value}" is not a valid \${$displayName}.`);

  // ValidationRules
  // .ensure(a => a.firstName).required()
  // .ensure(a => a.lastName).required()
  // .ensure(a => a.email).required().email()
  // .on(DataForm);



// createEventListeners() {
  //   this.adjusterSelectedListener = e => {
  //     if (e && e.detail) {
  //       this.adjuster = e.detail.value;
  //       console.log('this.adjuster  createEventListeners ', this.adjuster)
  //     }
  //   };

  // }

  // saveinmatexx() {
  // let booking =  this.currentRecord.booking //this.appService.currentRecord.booking

  //   console.log(' call save ', JSON.stringify(this.appService.currentItem) === JSON.stringify(this.appService.testrec)) //this.appService.currentClaim)
  //   //return 

    // let pcount = 0
    //  this.appService.currentItem.adjusters.forEach(function (item, index) {

    //   console.log(item);
    //   if (item.TYPE === "Primary") {
    //     pcount++
    //   }
    // });
    // if (pcount > 1) {

    //   return confirm('There can only be one primary adjuster');
    // }
    // if (pcount === 0) {

    //   return confirm('You must add a primary adjuster');
    // }
    // if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)) {

    //   if (this.recordId === 'create') {
    //     this.api.addclaim(this.currentItem).then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);

    //       if (this.appService.currentItem.id === 'create') this.appService.currentItem.id = ''
    //       window.alert("Save successful!");

    //     });
    //   } else {
    //     this.api.saveclaim(this.currentItem).then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);

    //       //  this.router.navigate(rt2);
    //       window.alert("Save successful!");
    //       this.skippromt = true
    //       if (option === 1) {

    //         let tab = this.appService.tabs.find(f => f.isSelected);
    //         // this.closeTab(tab);

    //         //// this.close()
    //         this.requestclose()

    //       } else {
    //         // this.appService.originalrec = this.currentItem
    //          this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));

    //       }
    //     });
    //   }

    // }
  // }
  // closeTab(tab) {

  //   let index = this.appService.tabs.indexOf(tab);
  //   tab.isSelected = false;
  //   this.appService.tabs.splice(index, 1);

  // }
// showModal(fieldname) {

  //   // alert('fieldname' + fieldname, this.appService.currentClaim.DESCRIPTION) currentClaim
  //   console.log('fieldname' + fieldname, this.currentItem.LossDescription)//DESCRIPTION)
  //   this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
  //     //INSURED_ID currentItem.insured.LEGAL_NAME
  //     if (fieldname === 'insco') {
  //       ///let serviceinsco = this.appService.currentClaim.INSURANCE_COMPANY_ID * 1 // or insco.IN...
  //       let serviceinsco = this.appService.currentItem.insco.INSURANCE_COMPANY_ID * 1 // or insco.IN...
  //       let insco = this.appService.InsurancecompanyList
  //       if (serviceinsco !== undefined) {
  //         let aid = insco.findIndex(x => x.INSURANCE_COMPANY_ID === serviceinsco)
  //         let item = insco[aid];
  //         this.inscoAdjusters = item.contacts
  //         this.inscoAddresses = item.addresses
  //         this.currentItem.insco = this.appService.currentItem.insco
  //       }
  //     }

  //     if (fieldname === 'INSURED_ID') {

  //       this.currentItem.insured = this.appService.currentItem.insured
  //     }

  //     if (fieldname === 'LossDescription') {

  //       this.currentItem.LossDescription = this.appService.currentItem.LossDescription
  //     }

  //     console.log(response.output);
  //   });
  // }