import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../utils/servicesApi';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
import { Router } from 'aurelia-router';
// import { Router, Redirect } from 'aurelia-router';
// import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
//import { Prompt } from '../../../services/prompt';
import { Prompt } from './prompt';
import moment from 'moment';
import { DialogImage } from './dialogImage';
// import {
//   ValidationControllerFactory,
//   ValidationController,
//   ValidationRules,
//   validateTrigger
// } from 'aurelia-validation';
// import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';

// @inject(Router, ApiService, ApplicationService, MyDataService, DialogService, ValidationControllerFactory)
@inject(Router, ApiService, ApplicationService, MyDataService, DialogService)
export class DataForm {
  controller = null;
  MediumSupportobj = '';
  Title = '';
  InvYear = '';
  InventoryCode = '';
  // user = new User();

  // currentItem = new currentItem(); // for validate

  // showImage=false;
  heading = 'DataForm HEADER...'
  footer = 'DataForm FOOTER...'
  recordId = '';
  // people = ['Nancy King', 'Nancy Davolio', 'Robert Davolio' ]
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

  // searchsold = [

  //   { id: 0, name: 'Y' },
  //   { id: 1, name: 'N' },
  //   { id: 2, name: 'NFS' },
  //   { id: 3, name: 'DON' },
  // ];
  searchsold = [
    { id: 1, name: 'Y' },
    { id: 2, name: 'N' },
    { id: 3, name: 'NFS' },
    { id: 4, name: 'DON' },
  ];
  products = [
    { id: '0', name: 'Motherboard' },
    { id: '1', name: 'CPU' },
    { id: '2', name: 'Memory' },
  ];

  selectedProductId = 'CPU';//1';
  // products = ['Motherboard', 'CPU', 'Memory'];
  //       selectedProduct = 'CPU';//null;

  //   searchsold = [
  //   {id:-1,name:'Y'},
  //   { id: 0, name: 'N' },
  //   { id: 1, name: 'BLK' },
  //   { id: 2, name: 'NFS' },
  //   { id: 3, name: 'DON' },
  // ];
  // person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };
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
      // create: {
      //     url: "https://demos.telerik.com/kendo-ui/service/Products/Create",
      //     dataType: "jsonp"
      // },
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
  /*
    "CodeType" : NumberInt(3), 
     "CodeTypeDesc" : "Genre"
      */
  // addNew(ctx) {
  addNew() {
    var value = this.multiselect.input.val();
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

  constructor(router, api, appService, dataService, dialogService, controllerFactory) {
    this.api = api
    this.appService = appService
    this.inv = ''
    this.dataService = dataService
    this.router = router
    this.dialogService = dialogService
    this.skippromt = false
    // this.controller = controllerFactory.createForCurrentScope();
    // this.controller.addRenderer(new BootstrapFormRenderer());
    // this.controller.addObject(this);
    // this.controller.addObject(this.currentItem);
    // this.currentItem={}
  }
  showModal(fieldname) {
    this.currentItem.fieldname = fieldname
    this.currentItem.recordId = this.recordId
    if (this.currentItem.OwnerID === 6275) this.currentItem.OwnerID = '5c434cc100a8a1588c6407b7'
    let findOptiono = this.appService.orgsList.find(x => x._id === this.currentItem.OwnerID)
    console.log('appService.orgsList', findOptiono)
    let findOptions = this.appService.orgsList.find(x => x._id === this.currentItem.SoldToID)
    console.log('appService.orgsList', findOptions)
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: true }).whenClosed(response => {
      //  if(this.recordId==='create')  this.currentItem.recordId=
      // if (fieldname === 'Artist') {
      //   let artistsel =   this.currentItem.artist;
      //    if (artistsel===undefined){
      //      artistsel=null
      //  //    this.currentItem.ArtistName=null
      //    }
      //   this.currentItem.artist = artistsel 
      //  //  this.currentItem.ArtistName=  this.currentItem.artistname
      //  //(this.currentItem.artist); 
      // }

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
    // this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

    // this.dialogService.open({ viewModel: DialogImage, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: DialogImage, model: this.currentItem, lock: false }).whenClosed(response => {



      if (!response.wasCancelled) {
        // console.log('Delete')
        // let notes = this.currentItem.notes
        // notes.splice(index, 1)// start, deleteCount)
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
  // findOption = value => {
  //   console.log('value', value)
  //   this.options.find(x => x.name === value);
  // }
  // onChange(selectedartist) {
  //   alert('artist: ' + selectedartist)
  // }

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
          alert(' factsheet  created ')

        } else alert(' factsheet  failed ')
      });
  }


  selectChange(GenreID) {
    // alert('in c ' + opt + GenreID)

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
    //12  this.tabname = this.appService.currentSearch
    if (params.id) {
      this.recordId = params.id;
      this.heading = `DataForm for record ${this.recordId}`;
      //console.log('finihed heading', this.heading)
      if (this.recordId === 'create') {

        this.currentItem = {}
        this.currentItem.id = 'create'
        // this.showImage=true;
        this.appService.testrec = {}
        this.appService.originalrec = {}
        //   this.currentItem.STATUS = 1
        //   this.currentItem.insured = {}
        //   this.currentItem.claimant = {}
        //   this.currentItem.insco = {}
        //   this.currentItem.insaddress = {}
        //   this.currentItem.inscontact = {}
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


      } else {
        console.log('this.recordId ', this.recordId);
        // this.mrubuild()
        // this.getimageinfo()
        // let mruget = localStorage.getItem('mru-mrg');
        // if (mruget === null) {
        //   // tabindex = 0
        //   mruget = 0
        // } else {
        //   mruget = JSON.parse(mruget)
        // }

        // // let get the mru list and bump it
        // function mruinfo(temp) {
        //   this.mru1 = temp[0];
        //   this.mru2 = temp[1];
        //   this.mru3 = temp[2];
        //   this.mru4 = temp[3];
        //   this.mru5 = temp[4];
        //   //  this.tabindex = temp[1];
        // }
        // var temp = [this.recordId, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4];

        // if (this.recordId === mruget.mru1 || this.recordId === mruget.mru2 || this.recordId === mruget.mru3 ||
        //   this.recordId === mruget.mru4 || this.recordId === mruget.mru5) { } else {
        //   mruinfo = new mruinfo(temp);
        //   // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
        //   localStorage.setItem('mru-mrg', JSON.stringify(mruinfo));
        // }
        //////////////////// end mru


        return this.api.findInventoryOne(this.recordId)
          .then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            let inv = jsonRes.data;
            this.currentItem = inv[0]
            // never been saved from view

            // // move to attach
            // if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
            //   // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
            //   // force it all the time
            //   this.currentItem.savedonce = true
            //   this.saveinventory(0)
            // }
  this.mrubuild()
            this.appService.currentItem = this.currentItem//inv[0]
            this.currentItem.isDirty = () => {
              return JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)
            };
            this.currentItem.reset = () => {
              // this.appService.originalrec =   this.currentItem;
              this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
            }
            this.appService.currentView = this.currentItem; // must set on every view
            this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))// inv[0]));

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
    if (newrec.id === prevtemp[0].id || prevtemp[0].InvCode) this.skip = true;
    if (newrec.id === prevtemp[1].id || prevtemp[1].InvCode) this.skip = true;
    if (newrec.id === prevtemp[2].id || prevtemp[2].InvCode) this.skip = true;
    if (newrec.id === prevtemp[3].id || prevtemp[3].InvCode) this.skip = true;
    if (newrec.id === prevtemp[4].id || prevtemp[4].InvCode) this.skip = true;
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
      this.mru1 = temp[0];
      this.mru2 = temp[1];
      this.mru3 = temp[2];
      this.mru4 = temp[3];
      this.mru5 = temp[4];
      //  this.tabindex = temp[1];
    }

    const prevtemp = [mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4, mruget.mru5];
    const temp = [{ id: this.recordId, InvCode: this.currentItem.InventoryCode }, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4];
    const newrec = { id: this.recordId, InvCode: this.currentItem.InventoryCode }

    // this.mrucheck(newrec, prevtemp);
    this.skip = false
    if (!this.skip) {
      // var temp = [this.recordId, mruget.mru1, mruget.mru2, mruget.mru3, mruget.mru4];

      // if (this.recordId === mruget.mru1 || this.recordId === mruget.mru2 || this.recordId === mruget.mru3 ||
      //   this.recordId === mruget.mru4 || this.recordId === mruget.mru5) { } else {
      mruinfo = new mruinfo(temp);
      // localStorage.setItem('tabinfo', JSON.stringify(tabinfo));
      localStorage.setItem('mru-mrg', JSON.stringify(mruinfo));
      // }
    }
  }


  // // using fat arrow
  //ES5
  // array.map(function(item) {
  //   return item * 2;
  // }
  // //ES6
  // array.map(item => item * 2);
  // this.mainimage.onload = function () {
  // async  loadimage() {
  //   let imageWidth, imageHeight

  //   //  this.mainimage.onload(() => {
  //   return new Promise((resolve, reject) => {
  //     this.mainimage.onload = function () { // alert alert("Height: " + this.height+' '+ this.width); 
  //       imageHeight = this.height
  //       imageWidth = this.width
  //       resolve()
  //       // resolve(imageWidth);
  //     }
  //     //    this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
  //   })
  //   this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
  //   return await (imageHeight)
  // }

  // async getimageinfo() {
  //   if (this.currentItem.clientHeight === undefined || this.currentItem.clientHeight === 0) {
  //     let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
  //     let geti = await this.loadimage()
  //     this.currentItem.clientHeight = this.mainimage.clientHeight
  //     this.currentItem.clientWidth = this.mainimage.clientWidth
  //     if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
  //       clientHeightRatio = 1
  //       clientWidthRatio = 1
  //     } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
  //       clientWidthRatio = 1
  //       clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)

  //     } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
  //       clientHeightRatio = 1
  //       clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2)
  //     }
  //     this.currentItem.clientHeightRatio = clientHeightRatio//imageHeight
  //     this.currentItem.clientWidthRatio = clientWidthRatio //
  //   }
  // }

  loadimage() {
    let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio

    return new Promise((resolve, reject) => {
      this.mainimage.onload = function () { // alert alert("Height: " + this.height+' '+ this.width); 
        imageHeight = this.height
        imageWidth = this.width
        resolve(imageWidth);
      }
      this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
    })
  }

  getimageinfo() {
    if (this.currentItem.clientHeight === undefined || this.currentItem.clientHeight === 0) {
      let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
      let Promise = this.loadimage()
        .then(response => {
          this.currentItem.clientHeight = this.mainimage.clientHeight
          this.currentItem.clientWidth = this.mainimage.clientWidth
          if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
            clientHeightRatio = 1
            clientWidthRatio = 1
          } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
            clientWidthRatio = 1
            clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)

          } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
            clientHeightRatio = 1
            clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2)
          }
          this.currentItem.clientHeightRatio = clientHeightRatio
          this.currentItem.clientWidthRatio = clientWidthRatio
        })
    }
  }

  /*
   getimageinfo() {
      if (this.currentItem.clientHeight===undefined){
  let imageWidth, imageHeight, clientHeightRatio, clientWidthRatio
      
   this.mainimage.onload = function() { 
   }
  this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
      this.currentItem.clientHeight =  this.mainimage.clientHeight
      this.currentItem.clientWidth =   this.mainimage.clientWidth
      if (this.currentItem.clientHeight === this.currentItem.clientWidth) {
        clientHeightRatio = 1
        clientWidthRatio = 1
      } else if (this.currentItem.clientHeight > this.currentItem.clientWidth) {
        clientWidthRatio = 1
        clientHeightRatio = (this.currentItem.clientHeight / this.currentItem.clientWidth).toPrecision(2)
  
      } if (this.currentItem.clientWidth > this.currentItem.clientHeight) {
        clientHeightRatio = 1
        clientWidthRatio = (this.currentItem.clientWidth / this.currentItem.clientHeight).toPrecision(2) 
      }
      this.currentItem.clientHeightRatio = imageHeight
      this.currentItem.clientWidthRatio = imageWidth
      }
  
    }
  
  
  */
  attached() {
    // if (this.appService.dataFormOneToOneTabs.length > 0) {
    //   let tab = this.appService.dataFormOneToOneTabs[0];
    //   this.selectOneToOneTab(tab);
    // }

    // move to attach
    // bypass save if in create mode
    if (this.recordId !== 'create') {

      if (!this.currentItem.savedonce || this.currentItem.savedonce === undefined) {
        // if (!this.currentItem.savedonce || this.currentItem.savedonce === true) {
        // force it all the time
        this.currentItem.savedonce = true
        this.saveinventory(0)
      }

      let tabinfo, tabindex
      // tabinfo = localStorage.getItem('tabinfo');

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
      this.getimageinfo()
    }
  }


  saveinventory(option) {
    //this.controller.validate();
    let savetime = moment().format('MM/DD/YY h:mm:ss a')

    if (this.recordId === 'create') {
      // console.log(  this.currentItem, this.currentItem)
      if (this.currentItem.Title === undefined || this.currentItem.InventoryCode === undefined
        || this.currentItem.MediumSupportobj === undefined
        || this.currentItem.artist === undefined) {
        alert('Please fix  Title, InventoryCode, MediumSupport and or artist ')
      } else {
        this.api.createinventory(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          this.recordId = jsonRes.id
          //let tab = this.appService.tabs.find(f => f.isSelected);
          if (this.currentItem.id === 'create') {
            this.currentItem.id = ''
            this.message = "Save successful. Inventory added @ " + savetime
          }
          //this.mrubuild() it will add if when opening
          this.requestclose()
          this.router.navigate(`#/inventory/data/${this.currentItem.InventoryCode}`)
        });
      }
    } else {

      if (JSON.stringify(this.currentItem) !== JSON.stringify(this.appService.originalrec)) {
        // SAVE WITH IMAGE INFO IN CASE ITS MISSING
        // nsure if needed this.getimageinfo()
        this.api.saveinventory(this.currentItem).then((jsonRes) => {
          console.log('jsonRes ', jsonRes)
          let tab = this.appService.tabs.find(f => f.isSelected);
          // window.alert("Save successful!");
          this.message = "Save successful. Inventory updated @ " + savetime
          this.appService.testrec = this.currentItem
          this.appService.currentView = this.currentItem

          /////////////////////
          // this.appService.originalrec = JSON.parse(JSON.stringify(this.currentItem))
          this.appService.originalrec = this.currentItem



          this.skippromt = true
          if (option === 1) {
            // alert('jr')
            this.requestcloseNoCheck()
          } else {

          }
        });
      }
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

  addInventory(images) {
    // alert(images);
    //images is file
    //check for dups 2/21/2018
    //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
    // let docs = this.currentItem.docs
    // let foraddDocsmData = new FormData()
    //let newDate = moment().format('YYYY-MM-DD')
    //let flag = false
    //let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
    //   let newform = values;
    //   console.log('after checkdata1 ',  newform);
    //   // this.status, this.api.fupload(formData, this.currentItem.CLAIM_NO)
    let formData = new FormData()
    formData.append('file', images[0])
    console.log('file', images[0]);
    // var newImage = new Image();
    // newImage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg`;
    this.mainimage.src = null;

    this.api.upload(formData, this.currentItem.InventoryCode)
      // this.api.uploadPARKTOWER(formData, this.currentItem.InventoryCode)



      .then((jsonRes) => {
        this.upmess = jsonRes.data
        //force rediplay not to use browser cache var url = 'http://.../?' + escape(new Date())
        let fd = new Date();
        this.mainimage.src = `https://artbased.com/api/v1/getimage/inv/${this.currentItem.InventoryCode}.jpg?${fd}`;
        // "http://localhost/image/id/image" + count++ + ".jpg";
        this.getimageinfo()
        $("#file").val("");
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
    return true;
  }


}

// export class currentItem {
//   MediumSupportobj;
//   Title;
//   InvYear;
//   InventoryCode;
//   artist;

// }
// ValidationRules
//   .ensure(a => a.MediumSupportobj).required()
//   .ensure(a => a.Title).required()
//   .ensure(a => a.InvYear).required()
//   .ensure(a => a.InventoryCode).required()
//   .ensure(a => a.artist).required()

//   // .ensure(a => a.email).required().email()
//   // .on(DataForm);
//   .on(currentItem);

/////////////////////////////////////////////////////////////////////////
// close() {
  //   let tab = this.appService.tabs.find(f => f.isSelected);
  //   // Next, we navigate to the newly created claim
  //   // Finally, we close out this tab
  //   this.closeTab(tab);
  //   let rt2 = '#/inventory/' + this.tabname ///claim'//Search?'cant use when search has a number 
  //   console.log('this.tabname ', this.tabname)
  //   this.router.navigate(rt2);
  // }
// canDeactivate() {
  //   return new Promise((resolve, reject) => {
  //     if (  this.currentItem &&
  //         this.currentItem.isDirty &&
  //         this.currentItem.isDirty()) {
  //       // Now, we need to query the user... result => makes it a closure
  //       this.appService.asyncHandleDirty().then(result => {
  //         if (!result.wasCancelled) {
  //           resolve(true);
  //         } else {
  //           resolve(false);
  //         }
  //       });
  //     } else {
  //       resolve(true);
  //     }
  //   });
  // }



 // 09/30/2018 Converted data has all the lookups
            // let meds = this.appService.codesListMediumSupport
            // if ((this.currentItem.MediumSupportobj === undefined) || (this.currentItem.MediumSupportobj === null)) {
            // } else {
            //   // if( this.currentItem.MediumSupportobj!==undefined){
            //   let mid = meds.findIndex(x => x.id === this.currentItem.MediumSupportobj.id)
            //   this.currentItem.MediumSupportobj = this.appService.codesListMediumSupport[mid]//10]// test
            // }

            // let oid
            // let orgobj
            // let orgs = this.appService.orgsList
            // if ((this.currentItem.SoldTo === undefined) || (this.currentItem.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.SoldTo)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.soldtoname = orgobj.OrgName
            // }

            // if ((this.currentItem.OwnerID === undefined) || (this.appService.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.OwnerID)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.ownername = orgobj.OrgName
            // }

            // if ((this.currentItem.SoldToID === undefined) || (this.appService.orgsList === null)) {
            // } else {
            //   oid = orgs.findIndex(x => x._id === this.currentItem.SoldToID)
            //   orgobj = this.appService.orgsList[oid]//10]
            //   if (orgobj !== undefined) this.currentItem.soldtoname = orgobj.OrgName
            // }

            // if ((this.currentItem.artist === undefined) || (this.currentItem.artist === null)) {
            //   // this.currentItem={}// for create only
            // } else {
            //   let arts = this.appService.artistList
            //   let aid = arts.findIndex(x => x.id === this.currentItem.artist.id)
            //   let artistobj = this.appService.artistList[aid]//10]
            //   if (artistobj !== undefined) this.currentItem.artist = artistobj//.OrgName
            // }