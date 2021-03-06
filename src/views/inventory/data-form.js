
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './prompt';
import { Promptorg } from './promptorg';
import { DialogImage } from './dialogImage';
import { bindable } from 'aurelia-framework';
import { RtfService } from '../../services/rtf-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Promptmerge } from '../prompt/promptMerge';
import { UtilService } from '../../services/util-service';
// import { googoose } from './googoose';
import { Promptmergeword } from '../prompt/promptMergeword';
// import { Pusher } from 'pusher';


//  <strong> Owned Status ${currentItem.OwnedByLegacy}/ ${currentItem.OwnedBy}/ ${currentItem.ownedbyname} </strong> -->

@inject(Router, UtilService, ApiService, ApplicationService, MyDataService, DialogService, RtfService, EventAggregator)
// @inject(Router, ApiService, ApplicationService, MyDataService, DialogService)
export class DataForm {
  // @bindable createRTF
  controller = null;
  MediumSupportobj = '';
  Title = '';
  InvYear = '';
  InventoryCode = '';

  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
  // people = ['Nancy fattacKing', 'Nancy Davolio', 'Robert Davolio' ]
  orgfields = ['ConsignedTo', 'ConsignedFromID', 'ConsignmentShippingID', 'OwnerID',
    'PhotographerID', 'PurchasedFrom', 'ConservedBy',
    'SoldToID', 'SoldTo', 'LoanTo', 'ProvOwner']


  measuresOld = [
    { id: 0, name: '1/16' },
    { id: 1, name: '2/16' },
    { id: 3, name: '3/16' },
    { id: 4, name: '4/16' },
    { id: 5, name: '5/16' },
    { id: 6, name: '6/16' },
    { id: 7, name: '7/16' },
    { id: 8, name: '8/16' },
    { id: 9, name: '9/16' },
    { id: 10, name: '10/16' },
    { id: 11, name: '11/16' },
    { id: 12, name: '12/16' },
    { id: 13, name: '13/16' },
    { id: 14, name: '14/16' },
    { id: 15, name: '15/16' },
  ];
  measures = [

    { id: 0, name: '1/8' },
    { id: 1, name: '1/4' },
    { id: 3, name: '3/8' },
    { id: 4, name: '1/2' },
    { id: 5, name: '5/8' },
    { id: 6, name: '3/4' },
    { id: 7, name: '7/8' }
  ];



  searchsold = [
    { id: -1, name: 'Y' },

    { id: 0, name: 'N' },
    { id: 2, name: 'NFS' },
    { id: 3, name: 'DON' },
  ];


  products = [
    { id: '0', name: 'Motherboard' },
    { id: '1', name: 'CPU' },
    { id: '2', name: 'Memory' },
  ];
  // listtypes = [{ id: 0, name: "exhibition(not avail yet)" }, { id: 1, name: "price list" },
  // { id: 2, name: "location list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
  // { id: 5, name: "registrar" }, { id: 6, name: "presentation(not avail yet)" }]
  // listtypes = [{ id: -1, name: 'choose' }, { id: 0, name: "exhibition" }, { id: 1, name: "price list" },
  // { id: 2, name: "location list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
  // { id: 5, name: "registrar" }, { id: 6, name: "presention" },
  // { id: 7, name: "test1" }, { id: 8, name: "test2" }
 
  //  listtypes = [{ id: 0, name: "exh(na)" }, { id: 1, name: "prce-lst" },
  //   { id: 2, name: "loc-list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
  //   { id: 5, name: "registrar" }, { id: 6, name: "pres-na" }]
   listtypes = [ { id: 0, name: "exhibition" },  { id: 2, name: "location list" },
   { id: 3, name: "box label" }, { id: 5, name: "registrar" },{ id: 8, name: "checklist" }   ]
  fieldname = '' 
  error = "";
  division = {
    div_id: 1,
    div_code: "S",
    div_name: "Secondary"
  };
  // this is keywords
  dataSource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        options.success(this.appService.codesGenre);
      },
      parameterMap: function (options, operation) {
        if (operation !== "read" && options.models) {
          return { models: kendo.stringify(options.models) };
        }
      }
    },
    schema: {
      model: {
        id: "id",
        fields: {
          "CodeType": { type: "number" },
          "Description": { type: "string" },
          "CodeTypeDesc": { type: "string" },
        }
      }
    }
  });

  addNew() {
    // strip * as last char of new string
    let slen = this.multiselect.input.val().length
    let lastvalue = this.multiselect.input.val().substring(0, slen);
    var value = this.multiselect.input.val()
    if (lastvalue === '*') {

      value.substring(0, slen - 1).trim();
    }
    console.log('val ', value)
    var dataSource = this.multiselect.dataSource;
    var widget = this.multiselect

    //  if (confirm("Are you sure?")) {
    let bod = {
      "CodeType": 3,
      "Description": value,
      "CodeTypeDesc": "Genre"
    }

    this.api.addmediumsupport(bod)
      .then((jsonRes) => {
        this.appService.codesGenre = jsonRes.data;
        let oid = this.appService.codesGenre.findIndex(x => x.Description === value)
        let codeobj = this.appService.codesGenre[oid]
        let rec = {
          "CodeType": 3,
          "Description": value,
          "CodeTypeDesc": "Genre",
          id: codeobj.id
        }
        this.currentItem.keywords.push(value)
        dataSource.add(rec)
      });



    dataSource.sync();
    widget.refresh();// keep the focus
  }
  //controllerFactory
  constructor(router, utilService, api, appService, dataService, dialogService, rtfService, eventAggregator) {
    //  constructor(router, api, appService, dataService, dialogService, controllerFactory) {
    this.api = api
    this.appService = appService
    this.inv = ''
    this.dataService = dataService
    this.router = router
    this.dialogService = dialogService
    this.skippromt = false
    this.rtfService = rtfService
    this.eventAggregator = eventAggregator;
    this.epoch = moment().unix();
    // this.selectedlist = 5
    this.selectedlist = -1
    this.utilService = utilService;
    this.message = ""
    this.errormessage = ""

    this.appService.Refreshsearchgrid = false
  }
  // publish() { 
  //   var payload = 'This is some data...';
  //   this.eventAggregator.publish('myEventName', payload);
  // }
  // subscribe() {
  //   this.subscriber = this.eventAggregator.subscribe('myEventName', payload => {
  //     console.log('payload',payload);
  //   });
  // }
  // dispose() {
  //   this.subscriber.dispose();
  //   console.log('Disposed!!!'); 
  // } 

  changeLocation(changedValue) {
    console.log('changeLocation ', changedValue, this.currentItem.CurrentLocation);//.id+' '+this.currentItem.CurrentLocation.Description)

    this.appService.Refreshsearchgrid = true
    // currentocationname " value.bind="currentItem.CurrentLocation">

    // this.currentItem.CurrentLocation=this.currentItem.CurrentLocation.id
    let idx = this.appService.codesInventoryLocation.findIndex(x => x.id === this.currentItem.CurrentLocation);
    if (idx === -1) {
      this.currentItem.currentocationname = 'missing. see form'
      this.errormessage = 'error: currentocationname not set for grid'
    } this.currentItem.currentocationname = this.appService.codesInventoryLocation[idx].Description
    // alert(idx + ' ' + this.currentItem.currentocationname)
  }

  soldtoEdit() {
    // save 
    this.saveinventory(0)
    let oid = this.currentItem.SoldToID
    let OrgName = this.currentItem.soldtoname
    let BusIndivid = this.currentItem.SoldToBusIndivid
    let rt2

    (BusIndivid === 'B') ? rt2 = '#/org/data/' + oid + '?' + OrgName : rt2 = '#/contact/data/' + oid + '?' + OrgName


    this.router.navigate(rt2);// `#/inventory/${path}`);

  }

  OwnerIDEdit() {
    // OwnerID ownername  
    this.saveinventory(0)
    let oid = this.currentItem.OwnerID
    let OrgName = this.currentItem.ownername
    let BusIndivid = this.currentItem.OwnerBusIndivid
    let rt2

    (BusIndivid === 'B') ? rt2 = '#/org/data/' + oid + '?' + OrgName : rt2 = '#/contact/data/' + oid + '?' + OrgName


    this.router.navigate(rt2);// `#/inventory/${path}`);

  }

  //  let topos = this.orgfields.findIndex(x => x === fieldname);
  //     if (topos !== -1) {
  //       // orgfields orgfielddesc 
  //       // let odesc = this.orgfielddesc[topos]
  //       // this.heading = `Org/Contact ${odesc} Search`
  //     }


  // if (this.currentItem.OwnerID === 6275) this.currentItem.OwnerID = '5c434cc100a8a1588c6407b7'
  // let findOptiono = this.appService.orgsList.find(x => x._id === this.currentItem.OwnerID)
  // console.log('appService.orgsList', findOptiono)
  // let findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.SoldToID)
  // console.log('appService.orgsList', findOptions)
  //     if (findOptiono === undefined) {
  //       findOptiono = '';
  // this.currentItem.OwnerID=''
  //     }
  //     if (findOptions === undefined) {
  //       findOptions = ''; 
  // this.currentItem.SoldToID=''
  //     }
  // if (fieldname === 'SoldToID') {
  // let topos = this.orgfields.findIndex(x => x === fieldname);
  // if (topos !== -1) {
  // only 2 on main form

  async showModal(fieldname) {
    this.currentItem.fieldname = fieldname
    this.currentItem.recordId = this.recordId
    let refresha = false
    if (fieldname === 'SoldToID') {
      let findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.SoldToID)
      // this.currentItem.recordId = this.currentItem.SoldToID
    } else {

      // if (this.currentItem.OwnerID === 6275) this.currentItem.OwnerID = '5c434cc100a8a1588c6407b7'
      let findOptiono = this.appService.orgsList.find(x => x._id === this.currentItem.OwnerID)
      console.log('appService.orgsList', findOptiono)
    }
    if (fieldname === 'SoldToID' || fieldname === 'OwnerID') {
      this.dialogService.open({ viewModel: Promptorg, model: this.currentItem, lock: true }).whenClosed(response => {
        if (!response.wasCancelled) {
          // console.log('Delete')
          // let notes = this.currentItem.notes
          // notes.splice(index, 1)// start, deleteCount)
        } else {
          if (this.currentItem.artist === null) {
            //// this.currentItem.artist.ArtistName=undefined
            //  this.controller.validate()
          }
          console.log('cancel');
        }
        console.log(response)//.output);
      });
    } else {
      this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: true }).whenClosed(response => {

        if (!response.wasCancelled) {
          // console.log('Delete')
          // let notes = this.currentItem.notes
          // notes.splice(index, 1)// start, deleteCount)

        } else {
          if (this.currentItem.artist === null) {
            //// this.currentItem.artist.ArtistName=undefined
            //  this.controller.validate()
          } else {
            refresha = true
            // let response = await this.api.findArtistsAA(this.artist);
            // this.appService.artistList = response.data
          }
          console.log('cancel');
        }
        console.log(response)//.output);
      });
    }
    if (refresha) {
      let response = await this.api.findArtistsAA(this.artist);
      this.appService.artistList = response.data
    }
  }

  showModalBS() {
    $('#myModal').modal()    // this works
    // this.myModal.modal()    
    // `${this.myModal}`.modal()   

  }

  showModalBS2(id) {
    this.division.div_id = id;
    if (id) {
      this.error = "";
    } else {
      this.error = "Incomplete form...";
    }
    $("#my-input").val("JQuery is working" + Date.now());
    // this.myauinput = "JQuery is working" + Date.now()
    $(this.edit_division).find(".modal").modal();
  }

  showModalBS3(id) {
    this.division.div_id = id;
    if (id) {
      this.error = "";
    } else {
      this.error = "Incomplete form...";
    }
    // $("#my-input").val("JQuery is working" + Date.now());
    this.myauinput = "JQuery is working" + Date.now()
    $(this.edit_division).find(".modal").modal();
  }
  showModalImg() {
    this.dialogService.open({ viewModel: DialogImage, model: this.currentItem, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  saveRecord() {
    window.alert("Save successful!");
  }

  deleteRecord() {
    window.alert("Delete successful!");
  }

  closeModal() {
    $(this.edit_division).modal('hide');
  }


  showKeywords() {
    alert(`GenreTypes: ${this.currentItem.keywords}`);
    //  alert(`Attendees: ${this.required}, \nOptional: ${this.optional}`);
  }

  factsheet() {
    let rt2 = this.currentItem.InventoryCode;
    this.api.createFactSheet(rt2)
      .then((jsonRes) => {
        let success = jsonRes.data;
        // alert('success',success)
        if (success === 'success') {
          // alert(' factsheet  created ')

        } else alert(' factsheet  failed ')
      });
  }
  selectChange(GenreID) {

  }

  showAttendees() {
    // alert(`GenreTypes: ${this.currentItem.genretypes}`);
  }
  // (MediumSupport,currentItem.MediumSupport)
  selectChangedMS(MediumSupport) {
    //  alert('in selectChangedMS  ', MediumSupport, this.MediumSupport1)

  }
  DropdownChanged(changedVal) {
    //  alert(changedVal);
  }
  activate(params, routeConfig) {
    this.queryParams = this.utilService.parseQueryStringUrl();
    if (this.queryParams !== null) {
      const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)

      console.log('qs', qs)

      const pairs = qs.split('&')
      const queryParams = {}
      let slname
      let ct = 0
      //    this.itsaquickie = false
      // pairs.forEach(p => {
      //   const kv = p.split('=')
      //   if (ct === 0) {
      //     if (kv[0] === 'itsaquickie') {

      //       this.itsaquickie = true;// slname = kv[1]
      //     }
      //   }
      //   ct++
      // });
    }

    // this.itsaquickie     this.itsaquickie = true
    //12  this.tabname = this.appService.currentSearch
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      //console.log('finihed heading', this.heading)
      if (this.recordId === 'create') {
        this.currentItem = {}
        this.currentItem.id = 'create'
        // this.showImage=true;
        this.addmode = true
        this.appService.testrec = {}
        this.appService.originalrec = {}

        this.currentItem.artist = undefined//{} 
        this.currentItem.provenance = []
        this.currentItem.notes = []
        this.currentItem.exhibitions = []
        this.currentItem.reproductions = []
        this.currentItem.transport = []
        this.currentItem.conservation = []
        this.currentItem.condition = []
        this.currentItem.purchased = []
        this.currentItem.soldto = []
        this.currentItem.museumloan = []
        this.currentItem.consignedto = []
        this.currentItem.offering = []
        this.currentItem.consigned = []
        this.currentItem.photo = []
        this.currentItem.docs = []
        this.currentItem.keywords = []

      } else {
        console.log('this.recordId ', this.recordId);

        this.addmode = false

        return this.api.findInventoryOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            this.currentItem = inv[0]
            //7-22    delete this.currentItem.updatedAt;
            // delete this.currentItem.conservedbyname
            // never been saved from view
            // // move to attach
            this.rtfService.currentItem = this.currentItem

            //  this.eventAggregator.publish('rtfpayload', 'refresh');
            //  this.saveinventory(0)

            // if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
            //   //   // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
            //   //   // force it all the time
            //   this.currentItem.savedonce = true
            //   this.saveinventory(0)
            // }
            // ffixes to stop dirty
            // http://www.jsondiff.com/
            this.mrubuild()

            if (this.currentItem.PrinterLocation === undefined) this.currentItem.PrinterLocation = null
            if (this.currentItem.PublisherLocation === undefined) this.currentItem.PublisherLocation = null

            this.appService.currentItem = this.currentItem
            this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))

            console.log(this.appService.originalrec, this.currentItem.PrinterLocation)


            this.currentItem.isDirty = () => {
              // this.appService.originalrec.conservedbyname = this.currentItem.conservedbyname// fix dirty
              const currentJSON = JSON.stringify(this.currentItem);
              const originalJSON = JSON.stringify(this.appService.originalrec);
              console.log('currentJSON');
              console.log(currentJSON);
              console.log('==================================');
              console.log('originalJSON');
              console.log(originalJSON);

              return currentJSON !== originalJSON;
            };

            this.currentItem.reset = () => {
              this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
            }
            this.appService.currentView = this.currentItem; // must set on every view


            // move to getimageinfo this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));


            //  console.log(this.originalrec.clientHeight, this.originalrec.clientWidth,this.originalrec.clientHeightRatio,this.originalrec.clientWidthRatio)

            console.log('finihed active1')
            // return inv
          });
        console.log('finihed activ2')
      }
      console.log('finihed active3')
    }
    console.log('finihed active4')
  }
  mrucheck(newrec, prevtemp) {
    this.skip = false

    if (prevtemp[0] != undefined && newrec.id === prevtemp[0].id) this.skip = true;
    if (prevtemp[1] != undefined && newrec.id === prevtemp[1].id) this.skip = true;
    if (prevtemp[2] != undefined && newrec.id === prevtemp[2].id) this.skip = true;
    if (prevtemp[3] != undefined && newrec.id === prevtemp[3].id) this.skip = true;
    if (prevtemp[4] != undefined && newrec.id === prevtemp[4].id) this.skip = true;
    if (prevtemp[5] != undefined && newrec.id === prevtemp[5].id) this.skip = true;
    if (prevtemp[6] != undefined && newrec.id === prevtemp[6].id) this.skip = true;
    if (prevtemp[7] != undefined && newrec.id === prevtemp[7].id) this.skip = true;
    if (prevtemp[8] != undefined && newrec.id === prevtemp[8].id) this.skip = true;
    if (prevtemp[9] != undefined && newrec.id === prevtemp[9].id) this.skip = true;


    // if (newrec.id === temp[5].id) this.skip = true;

    console.log('   this.skip ', this.skip)
  }
  mrubuild() {



    let mruget = localStorage.getItem('mru-mrg');
    if (mruget === null) {
      // tabindex = 0
      mruget = 0
    } else {
      mruget = JSON.parse(mruget)
    }

    // let get the mru list and bump it
    function mruinfo(temp) {
      if (temp[0] != undefined) this.mru1 = temp[0];
      if (temp[1] != undefined) this.mru2 = temp[1];
      if (temp[2] != undefined) this.mru3 = temp[2];
      if (temp[3] != undefined) this.mru4 = temp[3];
      if (temp[4] != undefined) this.mru5 = temp[4];
      if (temp[5] != undefined) this.mru6 = temp[5];
      if (temp[6] != undefined) this.mru7 = temp[6];
      if (temp[7] != undefined) this.mru8 = temp[7];
      if (temp[8] != undefined) this.mru9 = temp[8];
      if (temp[9] != undefined) this.mru10 = temp[9];
      //  this.tabindex = temp[1];
    }

    const prevtemp = [mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const temp = [{ id: this.recordId, InvCode: this.currentItem.InventoryCode }, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5, mruget.mru6, mruget.mru7, mruget.mru8, mruget.mru9, mruget.mru10];
    const newrec = { id: this.recordId, InvCode: this.currentItem.InventoryCode }

    this.mrucheck(newrec, prevtemp);
    // this.skip = false
    if (!this.skip) {
      mruinfo = new mruinfo(temp);
      localStorage.setItem('mru-mrg', JSON.stringify(mruinfo));
    }
  }


  async loadimage() {
    let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
    return new Promise((resolve, reject) => {
      this.mainimage.onload = function () { // alert alert("Height: " + this.height+' '+ this.width); 
        imageHeight = this.height
        imageWidth = this.width
        resolve(imageWidth);
      }
      // this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;

      this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg?random=${this.epoch}`;
    })
  }

  // async getimageinfo(opt) {
  //   return new Promise((resolve, reject) => {
  //   if (this.currentItem.clientHeight === undefined || this.currentItem.clientHeight === 0 || opt === 1) {
  //     let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
  //     let Promise = this.loadimage()
  //       .then(response => {
  //         this.currentItem.clientHeight = this.mainimage.clientHeight
  //         this.currentItem.clientWidth = this.mainimage.clientWidth
  //         if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
  //           clientHeightRatio = 1
  //           clientWidthRatio = 1
  //         } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
  //           clientHeightRatio = 1
  //           clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2)
  //         } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
  //           clientWidthRatio = 1
  //           clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)
  //         }
  //         this.currentItem.clientHeightRatio = clientHeightRatio
  //         this.currentItem.clientWidthRatio = clientWidthRatio
  //         //??? this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));
  //       })
  //   }
  //   resolve( this.currentItem.clientHeightRatio );
  //   })

  // } 
  async getimageinfo(opt) {
    return new Promise((resolve, reject) => {
      if (this.currentItem.clientHeight === undefined || this.currentItem.clientHeight === 0 || opt === 1) {
        let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
        this.currentItem.clientHeight = this.mainimage.clientHeight
        this.currentItem.clientWidth = this.mainimage.clientWidth
        if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
          clientHeightRatio = 1
          clientWidthRatio = 1
        } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
          clientHeightRatio = 1
          clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2)
        } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
          clientWidthRatio = 1
          clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)
        }
        this.currentItem.clientHeightRatio = clientHeightRatio
        this.currentItem.clientWidthRatio = clientWidthRatio
        // this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));
        resolve(imageWidth);
      }
      resolve(0);
    })
    resolve(0);
  }

  async attached() {
    // this.subscriber = this.eventAggregator.subscribe('rtfpayload', payload => {
    //   console.log('attached on data form',payload);
    // });
    if (this.recordId !== 'create') {
      // fix dirty
      this.appService.originalrec.OwnedId = this.appService.currentItem.OwnedId

      // set rtf and save record on open
      let tab = this.appService.dataFormOneToManyTabs[0];
      this.selectOneToManyTab(tab);
      //   this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
      //      return Promise
      // await this.getimageinfo(0)
      return Promise.all([
        this.loadimage(),
        this.getimageinfo(0)
      ]).then(values => {
        console.log('h ', this.currentItem.clientHeight)
        console.log('w ', this.currentItem.clientWidth)
        console.log('hr ', this.currentItem.clientHeightRatio)
        console.log('wr ', this.currentItem.clientWidthRatio)
        let createopt = 2; // 1 is from tab 2 is program
        let rr = this.rtfService.createRTF(createopt)
        this.eventAggregator.publish('rtfpayload', 'refresh');
        //this.itsaquickie = true
        this.saveinventory(0)

        // if (itsaquickie)  {
        //    this.requestcloseNoCheck()
        //   //  this.requestclose()
        // } else {

        this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));
        let tabinfo, tabindex
        tabinfo = localStorage.getItem('tabinfo' + this.currentItem.InventoryCode);
        if (tabinfo === null) {
          tabindex = 0
        } else {
          tabinfo = JSON.parse(tabinfo)
          tabindex = tabinfo.tabindex
        }
        if (this.appService.dataFormOneToManyTabs.length > 0) {
          let tab = this.appService.dataFormOneToManyTabs[tabindex];
          this.selectOneToManyTab(tab);
        }
        //  }
      })

    }
  }
  createRTF(opt) {
    // ,margins left lrtb
    //   size: '8.5in 11.0in', //
    //  size: '11.0in 8.5in',
    let fn = `${this.currentItem.InventoryCode}.doc`// test.doc',

    // footermargin: '.5in',
    // lang: 'en-US',

    // $(document).ready(function () {
    //   var o = {
    //     download: 0,
    //     size: '8.5in 11.0in',
    //     filename: fn,// test.doc',
    //     margins: '0.5in'
    //     //  download: true,
    //   };
    //   $(document).googoose(o);
    // })
  }

  async publish() {
    this.eventAggregator.publish('rtfpayload', 'refresh');
    this.saveinventory(0)
  }
  async saveinventory(option) {
    //this.controller.validate();
    //  class Rtf
    // this.createRTF()
    // this.addRTF(2); HOLD OFF
    //  this.rtfService.currentItem = this.currentItem
    //  let createopt = 2; // 1 is from tab
    //  let rr = await this.rtfService.createRTF(createopt)

    /// to prevent dirty  \\\
    if (this.currentItem.conservation !== undefined && this.currentItem.conservation.length === 0) { delete this.currentItem.conservation }
    if (this.currentItem.museumloan !== undefined && this.currentItem.museumloan.length === 0) { delete this.currentItem.museumloan }
    if (this.currentItem.consignedto !== undefined && this.currentItem.consignedto.length === 0) { delete this.currentItem.consignedto }




    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    if (this.recordId === 'create') {
      // console.log(  this.currentItem, this.currentItem)
      // || this.currentItem.MediumSupportobj === undefined this.currentItem.Title === undefined |
      if (this.currentItem.InventoryCode === undefined
        || this.currentItem.artist === undefined) {
        alert('Please fix. InventoryCode  and/or Artist is missing')
      } else {

        /////////
        // this.rtfService.currentItem = this.currentItem
        // let createopt = 2; // 1 is from tab
        // let rr = await this.rtfService.createRTF(createopt)


        this.api.createinventory(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          this.recordId = jsonRes.id
          //let tab = this.appService.tabs.find(f => f.isSelected);
          if (this.currentItem.id === 'create') {
            this.currentItem.id = ''
            this.message = "Save successful. Inventory added @ " + savetime
          }
          //this.mrubuild() it will add if when opening
          // this.appService.originalrec = 0
          // this.currentItem = 0
          this.appService.currentItem = this.currentItem//inv[0]
          this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
          this.requestclose()
          // this.requestcloseNoCheck
          this.router.navigate(`#/inventory/data/${this.currentItem.InventoryCode}`)
        });
      }
    } else {

      this.getimageinfo(0) // fix issue with isdirty
      if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)) {
        // SAVE WITH IMAGE INFO IN CASE ITS MISSING ensure if needed this.getimageinfo()


        // I used eventaggrgator insteead
        // this.rtfService.currentItem = this.currentItem
        // let createopt = 2; // 1 is from tab
        // let rr = await this.rtfService.createRTF(createopt)

        this.eventAggregator.publish('rtfpayload', 'refresh');


        // if on rtf tab move off
        // let tabindex = this.appService.dataFormOneToManyTabs.findIndex(f => f.isSelected)
        //tabindex this.tabindex =


        // idea to move off code if rtf changed so we can see it
        // if (this.tabindex === 0) {
        //   let tab = this.appService.dataFormOneToManyTabs[this.tabindex];
        //   let tab2 = this.appService.dataFormOneToManyTabs[1];
        //   this.selectOneToManyTab(tab2);
        //   this.selectOneToManyTab(tab);
        // }

        this.api.saveinventory(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes)
          let tab = this.appService.tabs.find(f => f.isSelected);
          // window.alert("Save successful!");
          this.message = "Save successful. Inventory updated @ " + savetime
          // if (this.itsaquickie) {

          //   this.requestcloseNoCheck()
          // }
          this.appService.testrec = this.currentItem
          this.appService.currentView = this.currentItem
          this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
          this.skippromt = true
          if (option === 1) {
            // alert('jr')
            this.requestcloseNoCheck()
          } else {
          }
        });
      } else this.message = "No changes detected to save. "
      // if (this.itsaquickie) {
      //   this.requestcloseNoCheck()
      // }
      if (option === 1) {
        //     this.requestclose()
      }
    }
  }

  checkData(images, formData) {
    let promises = []
    return new Promise((resolve, reject) => {
      let i = 0;
      let docs = this.currentItem.docs
      if (docs === undefined) docs = []
      let imagelen = images.length
      for (i = 0; i < images.length; i++) {
        let ext = images[i].name.split('.').pop();
        let fname = images[i].name
        let mid = -100// not needed
        let ival = i
        mid = docs.findIndex(x => x.FILE_NAME === fname)
        if (mid > -1) {
          // if we find file in array pass all values so we can evaluate later
          let obj = { name: fname, val: ival, ext: ext }
          var promise = this.promiseDialog(obj)
          promises.push(promise);
        } else {
          var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          docs.unshift(item)
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
  getnow() {
    return moment().unix();
  }
  addInventory(images) {
    this.epoch = moment().unix();// image cache buster

    if (this.appService.loginuser === 'ryan') {
    } else {
      let tab = this.appService.dataFormOneToManyTabs[1];
      this.selectOneToManyTab(tab);
    }



    let formData = new FormData()
    formData.append('file', images[0])
    console.log('file', images[0]);
    // var newImage = new Image();
    // newImage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
    this.mainimage.src = null;
    this.api.upload(formData, this.currentItem.InventoryCode)
      .then((jsonRes) => {
        this.upmess = jsonRes.data
        //force rediplay not to use browser cache var url = 'http://.../?' + escape(new Date())
        let fd = new Date();
        // this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg?${fd}`;
        this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg?random=${this.epoch}`;
        // "http://localhost/image/id/image" + count++ + ".jpg";
        this.getimageinfo(0)
        $("#myfile").val("");
      })
    //})

    // this is not a good way to get value this.items = Promise.resolve(this.checkData(images));
    //  console.log('after checkdata1 just a promise cant pick off value ',  this.status,this.items);
    //  return Promise.all([  this.checkData(images)]).then(values => {
    //     this.items = values[0];
    //      console.log('after checkdata1 ',  this.status,this.items);
    //   }).catch(error => {
    //     console.error("Error encountered while trying to get data.", error);
    //   });

  }

  // createRTF(createopt) {
  //   alert('crt')
  //   this.rtfService.createRTF()
  // }
  // async addRTF() {
  //   this.rtfService.currentItem = this.currentItem
  //   let createopt = 2; // 1 is from tab
  //   let rr = await this.rtfService.createRTF(createopt)
  // }



  canDeactivate() {
    return new Promise((resolve, reject) => {

      console.log('canDeactivate ')
      if (this.appService.currentView !== undefined && this.appService.originalrec !== {} &&
        this.currentItem.id !== 'create' &&
        this.appService.currentView && this.appService.currentView.isDirty &&
        this.appService.currentView.isDirty()) {

        // Now, we need to query the user... result => makes it a closure
        this.appService.asyncHandleDirty().then(result => {
          if (!result.wasCancelled) {
            // need whenu have multi claims opened
            // this.appService.currentClaim = this.appService.originalrec
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



  requestclose() {
    //console.log(this.appService.originalrec, this.currentItem)

    const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/inventory/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


  }

  requestcloseNoCheck() {
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/inventory/' + this.tabname
    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


  }



  closeTab(tab) {
    this.subscriber.dispose();
    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);

  }
  selectOneToOneTab(tab) {
    this.appService.dataFormOneToOneTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToOneTab = tab;
    return true;
  }
  selectOneToManyTab(tab) {
    this.appService.dataFormOneToManyTabs.forEach(t => t.isSelected = false);
    tab.isSelected = true;
    this.currentOneToManyTab = tab;
    let tabindex = this.appService.dataFormOneToManyTabs.findIndex(f => f.isSelected)
    function tabinfo(temp) {
      this.recid = temp[0];
      this.tabindex = temp[1];

    }
    var temp = [this.currentItem.InventoryCode, tabindex];
    tabinfo = new tabinfo(temp);
    // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
    localStorage.setItem('tabinfo' + this.currentItem.InventoryCode, JSON.stringify(tabinfo));
    this.tabindex = tabindex// get clearded from line above
    return true;
  }

  // wordmerge(selectedlist) {

  wordmerge() {
    let detail = []
    detail.push(this.currentItem)
    this.dialogService.open({
      viewModel: Promptmergeword, model: {
        head: 'inventory',
        // listtype: this.selectedlist, listname: 'inventory', detail: detail
        listtype: 'factsheet', listname: 'inventory', detail: this.currentItem//.id// this.selectedids
      }, lock: true
    }).whenClosed(async response => {
      console.log('this.item', response, this.item)
      if (!response.wasCancelled) {
        this.saveMerge
      } else {
        console.log('cancel');
      }
      // this.selectedlist = -1
      console.log(response)//.output);
    });

  }

  listChanged() {
    // $(this.selectedlist)
    // .toggleClass('black-cap', this.capColor === '1')
    // .toggleClass('orange-cap', this.capColor === '2')
    // .toggleClass('grey-cap', this.capColor === '3');
  }



}

 // // await this.getimageinfo(0)
      // //  this.rtfService.currentItem = this.currentItem
      // let createopt = 1;//2; // 1 is from tab 2 is program
      // let rr = await this.rtfService.createRTF(createopt)
      // await this.eventAggregator.publish('rtfpayload', 'refresh');
      // await this.saveinventory(0)
      // let tabinfo, tabindex
      // tabinfo = localStorage.getItem('tabinfo' + this.currentItem.InventoryCode);
      // if (tabinfo === null) {
      //   tabindex = 0
      // } else {
      //   tabinfo = JSON.parse(tabinfo)
      //   tabindex = tabinfo.tabindex
      // }
      // if (this.appService.dataFormOneToManyTabs.length > 0) {
      //   let tab = this.appService.dataFormOneToManyTabs[tabindex];
      //   this.selectOneToManyTab(tab);
      // }
      // //    this.getimageinfo(0)
      // // this.tabindex=tabindex
      // // this.eventAggregator.publish('rtfpayload', 'refresh');
      // //            this.saveinventory(0)

      //  $(document).ready(function () {
      //      var o = {
      //         // size: '8.5in 11.0in', 
      //        filename: 'test.doc'
      //      };
      //      $(document).googoose(o);
      //    });


        // var canvas = document.getElementById("hello-canvas");
        // var ctx = canvas.getContext("2d");
        // function r(ctx, x, y, w, h, c) {
        //   ctx.beginPath();
        //   ctx.rect(x, y, w, h);
        //   ctx.strokeStyle = c;
        //   ctx.stroke();
        // }
        // r(ctx, 0, 0, 32, 32, "black");
        // r(ctx, 4, 4, 16, 16, "red");
        // r(ctx, 8, 8, 16, 16, "green");
        // r(ctx, 12, 12, 16, 16, "blue");
        // var o = {
        //   download: 0,
        //   filename: 'test.doc'
        // };
        // $(document).googoose(o);

        // this.grid = $("#grid").data("kendoGrid");
        // Removing The Ship Country Column Menu:      
        // By field  
        // this.grid.find("[data-field=Bin]>.k-header-column-menu").remove();
        // $('#GridName .k-header-column-menu').eq(2).hide()
        // this.grid('k-header-column-menu').eq(2).hide()
        // By Index  
        // grid.thead.find("[data-index=1]>.k-header-column-menu").remove();
        // this.grid.column["Bin"].IncludeInMenu(false);// hideColumn(2) NOT AVAIL
        // this.loadGrid() 
        // this.grid.hideColumn("Image");
        // this.grid.hideColumn("purchasedfromname");
        // this.grid.hideColumn("PurchasedDate");
      // 