import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';

import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
// import { DialogImage } from '../inventory/dialogImage'
import { DialogService } from 'aurelia-dialog'
import { Promptexhibit } from '../prompt/promptExhibit';
import { Promptrepro } from '../prompt/promptRepro';
import { Prompttransport } from '../prompt/promptTransport';
import { Promptprov } from '../prompt/promptProv';

import { Promptmerge } from '../prompt/promptMerge';
import { Promptmergeword } from '../prompt/promptMergeword';

import { Promptmess } from '../../services/promptmess';
import { Promptyn } from '../../services/promptyn';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DialogImage } from '../inventory/dialogImage'

// jrt 
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService, EventAggregator)
export class SearchResults {
  heading = 'Search Results...';
  footer = 'Search Results...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  hide1 = true
  hide2 = true
  hide3 = true
  hide4 = true
  hide5 = true
  hide6 = true
  hide7 = true
  hide8 = true
  hide9 = true
  item = {}
  tools = [
    'pdf',
    'html',

    // 'bold',
    // 'italic',
    // 'underline',
    // 'strikethrough',
    // 'justifyLeft',
    // 'justifyCenter',
    // 'justifyRight',
    // 'justifyFull',
    // 'insertUnorderedList',
    // 'insertOrderedList',
    // 'indent',
    // 'outdent',
    // 'createLink',
    // 'unlink',
    // 'insertImage',
    // 'insertFile',
    // 'subscript',
    // 'superscript',
    // 'createTable',
    // 'addRowAbove',
    // 'addRowBelow',
    // 'addColumnLeft',
    // 'addColumnRight',
    // 'deleteRow',
    // 'deleteColumn',
    'viewHtml',
    'formatting',
    'cleanFormatting',
    'fontName',
    'fontSize',
    'foreColor',
    'backColor',
    'print'
  ];
  //  console.log(' inv SearchResults ');
  pdf = {
    fileName: 'NewDocument.pdf',
    proxyURL: '//demos.telerik.com/kendo-ui/service/export',
    paperSize: 'letter',
    margin: {
      bottom: 20,
      left: 66,
      right: 20,
      top: 20
    }
  };
  message = ''//Hello Inventory 101- a!';
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((inv) => {
            console.log(' inv datasource ', inv[0]);
            options.success(inv);
          });
      },
      update: (options) => {
        let updatedItem = options.data;
        updatedItem.offerdate = this.offerdate
        console.log('   updatedItem ', updatedItem)
        this.updateData(updatedItem)
          .then((scans) => {
            options.success(scans)
            this.datasource.read()
          })

        options.success(updatedItem)
      }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          offeramount: { type: "number" }, // scan template
          // Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          InventoryCode: { type: "string", editable: false },
          Title: { type: "string", editable: false },
          Image: { type: "string", editable: false },

          //  "artist.lastName": { type: "string", editable: false },
          // MediumSupport: { type: "string" },
          // CurrentLocation: { type: "string" },
          // Bin: { type: "string" }, // barcode insured
          // Owner: { type: "string" },
          // InvYear: { type: "string" },
          // UnframedHeight: { type: "string" },
        }
      }
    },
    // pageSize: 8,

  })
  // {id:0,name:"check list"},
  listtypes = [{ id: 0, name: "exhibition" }, { id: 1, name: "price list" },
  { id: 2, name: "location list" }, { id: 3, name: "box label" }, { id: 4, name: "condition" },
  { id: 5, name: "registrar" }, { id: 6, name: "presentation" }]



  sortorder = [{ id: 0, name: "InventoryCode" }, { id: 1, name: "artist.ArtistName,Title" }, { id: 2, name: "artist.ArtistName,date" }]


  constructor(router, api, utilService, appService, dataService, dialogService, eventAggregator) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.ImageID = '20150921_153441_resized_2'
    this.dialogService = dialogService
    this.appService.rfreshLoaded = false;
    this.selectedlist = 5 // registra
    this.selectedids = [];
    // this.appService.actionlist ='closed'
    this.eventAggregator = eventAggregator;
  }

  updateData(e) {
    console.log('updateData ', e)
    // return this.api.updatecase(e, this.user)
    //     .then((jsonRes) => {
    //         console.log('this.scans ', jsonRes)
    //         return jsonRes
    //     })
    return this.api.saveinventory(e).then((jsonRes) => {
      // console.log('jsonRes ', jsonRes);
      // window.alert("Save successful!");
      return jsonRes
    });
  }
  onEdit(e) {
    // let grid = e.sender;
    // var targetRow = $(e.container);
    // grid.select(targetRow)
    let flag = false
    let datasource = this.datasource
    e.container.find(".k-grid-cancel").bind("click", function () {
      flag = true
      datasource.read()
    })
  }

  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 
    // 3/19
    // if (  this.appService.actionlist ==='closed'){
    //  if ( this.appService.actionlist ===undefined){
    this.queryParams = this.utilService.parseQueryStringUrl();
    const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
    const pairs = qs.split('&')
    const queryParams = {}
    let slname
    let ct = 0
    pairs.forEach(p => {
      const kv = p.split('=')
      if (ct === 0) slname = kv[1]
      ct++
    });
    //1-27 this.item.savedlist = slname
    // or
    // this.item.savedlist = this.appService.currentActionlist
    if (slname === undefined) {
      alert('Please notify admin as there is aproblem with selection')
    } else {
      this.savedlist = slname// this.item.savedlist 
      // this.appService.currentActionlist
      this.datasource.read()
      // make a dupe of folllowing to accoumodate 2 typeaheads
      this.codesListLocation = this.appService.codesListLocation
      this.performAction1Refresh()


    }
  }



  //  attached(){ 
  // //1=port 0 land
  //    if (this.currentItem.clientHeightRatio>=this.currentItem.clientWidthRatio) {
  //      this.selectedtype=1
  //    } else this.selectedtype=0
  //    this.subscriber = this.eventAggregator.subscribe('rtfpayload', payload => {
  //          console.log('attached in rft.js rtfpayload',payload);
  //         //  this.createRTF(1,selectedtype)
  //              this.createRTF(1,this.selectedtype)
  //       });

  //  }
  attached() {
    //1=port 0 land

    this.subscriber = this.eventAggregator.subscribe('boxlabel', payload => {
      console.log('attached in rft.js boxlabel ', payload);
      this.selectedlist = 3 //boxlabel
      this.action9()
    });

  }
  loadGrid() {
    let options = localStorage["kendo-grid-mail"]
    if (options) {
      this.grid.setOptions(JSON.parse(options))
    }
  }

  async loadData() {
    // console.log('this.loadData ')
    let inv;
    ///api/v1/inventory/getall
    if (this.appService.actionsearchresults && !this.appService.rfreshLoaded) {
      return this.appService.actionsearchresults;
    } else {
      return this.api.findInventory(this.queryParams)
        //return this.api.findInventoryKeywords(this.queryParams)
        .then((jsonRes) => {
          inv = jsonRes.data;
          if (inv === 0 || inv.length === 0) {
            this.dialogService.open({ viewModel: Promptmess, model: `no records found  `, lock: true }).whenClosed(async response => { });
            let tab = this.appService.tabs.find(f => f.isSelected);
            this.closeTab(tab);
            let rt2 = '#/home'// inventory'
            this.router.navigate(rt2);// `#/inventory/${path}`);
          } else {
            this.appService.actionsearchresults = inv;
            return inv
            // return this.appService.actionsearchresults
          }
        });
    }
  }
  detached() {
    //  this.appService.actionsearchresults='';
  }

  closeTab(tab) {

    let index = this.appService.tabs.indexOf(tab);
    tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
  }


  rowSelected(e) {
    console.log('e ' + e.sender)
    let grid = e.sender;
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //   alert(dataItem.assignto);
  }
  performAction1Refresh() {
    //console.log('performRefresh ')
    //   alert('You have selected performRefresh')
    this.appService.rfreshLoaded = true;
    this.datasource.read()
  }
  performAction1() {
    // console.log('Action1 ')
    // alert('You have selected Action 1')
    //https://docs.telerik.com/kendo-ui/knowledge-base/persist-row-selection-while-paging
    let sels
    if (this.selectedids === undefined) {
      sels = []
      // if (!this.selectedids.length > 0) {
      //   sels = []//this.selectedids//[];

    } else sels = this.selectedids
    // console.log('Action1 sels', sels)
    // if (sels.length === 0) {
    // alert('no rows selected')
    // } else {
    // var sels = this.selectedids//[];
    var grid = this.grid;
    var selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;
    // selectedRows.each(function (idx, el) {
    //   let dataItem = grid.dataItem(el);
    // });

    var i;
    var a1;
    for (i = 0; i < maxRows; i++) {
      a1 = selectedRows[i];
      let dataItem = grid.dataItem(a1);
      // let mid = sels.findIndex(x => x.InventoryCode === dataItem.InventoryCode)
      let mid = sels.findIndex(x => x === dataItem.InventoryCode)
      if (mid === -1) {
        sels.push(dataItem.InventoryCode);
      }
      if (i === maxRows - 1) {
        this.selectedids = sels;
        // alert('you are about to remove the following ' + this.selectedids + ' from saved list ' + this.savedlist)
        this.dialogService.open({
          viewModel: Promptmess, model: `you are about to remove the following ${this.selectedids} from saved list ${this.savedlist} `,
          lock: true
        }).whenClosed(async response => {
          this.api.deleteSavedlists(this.savedlist, this.selectedids).then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            this.appService.rfreshLoaded = true;
            this.datasource.read();
          });
        });

      }
    }
    if (sels.length === 0) {
      alert('no rows selected to delete')
    }
  }

  // closeTab(tab) {

  //   let index = this.appService.tabs.indexOf(tab);
  //   // tab.isSelected = false;
  //   this.appService.tabs.splice(index, 1);
  //   tab.isSelected = false;
  //   //  

  //   // this.appService.tabs[0].isSelected = true
  //   this.appService.tabs[index - 1].isSelected = true
  //   let tabn = this.appService.tabs.find(f => f.isSelected);
  //   let rt2 = '#/action/' + tabn.name
  //   this.router.navigate(rt2);// `#/inventory/${path}`);

  //   // this.requestclose(index)
  // }
  // requestclose(index) {
  //   // alert ('in requestclose')

  //   //// const resetFunc = () => { this.appService.originalrec = this.currentItem; };
  //   //// let cand = this.canDeactivate()
  //   //let tab = this.appService.tabs.find(f => f.isSelected);
  //   // let index = this.appService.tabs.findIndex(f => f.isSelected)
  //   let rt2 = '#/action/' + this.tab.name


  //   let newIndex = (index > 0) ? index - 1 : 0;
  //   let newTab = this.appService.tabs[newIndex];
  //   //    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
  //   //  this.appService.tryCloseTab(undefined, index, newTab.href);
  //   this.appService.tabs[newIndex].isSelected = true
  //   this.router.navigate(rt2);// `#/inventory/${path}`);


  // }
  // detailsFactSheet(e) {
  //   let grid = this.grid;
  //   let targetRow = $(e.target).closest("tr");
  //   grid.select(targetRow);
  //   let selectedRow = grid.select();
  //   let dataItem = grid.dataItem(selectedRow);


  //   //https://artbased.com/api/v1/downloadonepdf/output/SELIGE0327.doc
  //   let rt2 = `https://artbased.com/api/v1/downloadonepdf/output/${dataItem.InventoryCode}.doc`

  //   //  alert('rt2 '+rt2)
  //   window.open(rt2);
  // }

  async detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = `#/inventory/data/${dataItem.InventoryCode}`// ?fulledit=true`;

    await this.router.navigate(rt2);// `#/inventory/${path}`);
    this.performAction1Refresh()
  }

  async detailsEditPop(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    // let rt2 = `#/inventory/data/${dataItem.InventoryCode}?itsaquickie=true`;
    let rt2 = `#/inventory/rtfcreate/${dataItem.InventoryCode}`
    await this.router.navigate(rt2);
    this.performAction1Refresh()
  }
  async performRTF() {
    let mlist = []
    for (const item of this.appService.actionsearchresults) {

      let rt2 = `#/inventory/rtfcreate/${item.InventoryCode}`
      await this.router.navigate(rt2);
      ////    // alert('close when record is finished updating')
      mlist.push(item.InventoryCode)
    }
    //  alert('this is a loop') 
    // this.message = `All RTF's are updated `//${mlist} `
    // this.performAction1Refresh() 
  }
  showModalImg(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.dialogService.open({ viewModel: DialogImage, model: dataItem, lock: true }).whenClosed(response => {


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

  //      <button id="factsheet1" action1() >Transport</button>
  // 			<button id="factsheet2" action2()">Exhibit</button>
  // 			<button id="factsheet3" action3()">Reproduction</button>
  // 			<button id="factsheet4" action4()">Provenance</button>
  // 			<button id="factsheet5" action5()">Mrg location</button>
  // 			<button id="factsheet6" action6()">Temp location</button>
  // 			<button id="factsheet7" action8()">Offerings</button>

  action1() {
    this.item = {}
    // this.hide2 = true
    // this.hide3 = true
    // this.hide4 = true
    // this.hide5 = true
    // this.hide6 = true
    // this.hide7 = true
    // this.hide8 = true
    // this.hide9 = true
    // this.hide1 ? this.hide1 = false : this.hide1 = true
    let currentModel = {}
    currentModel.currentItem = this.item
    currentModel.item = this.item

    currentModel.currentItem.hide1 = true

    this.dialogService.open({ viewModel: Prompttransport, model: currentModel, lock: true }).whenClosed(async response => {
      console.log('this.item', response, this.item)
      if (!response.wasCancelled) {
        // this.item.Transport = null

        this.save1()

      } else {
        // if (this.currentItem.artist === null) {

        // }
        console.log('cancel');
      }
      console.log(response)//.output);
    });

  }

  action2() {
    this.item = {}
    // this.hide1 = true
    // this.hide3 = true
    // this.hide4 = true
    // this.hide5 = true
    // this.hide6 = true
    // this.hide7 = true
    // this.hide8 = true
    // this.hide9 = true
    // this.hide2 ? this.hide2 = false : this.hide2 = true
    let currentModel = {}
    currentModel.currentItem = this.item
    currentModel.item = this.item

    currentModel.currentItem.hide1 = true

    this.dialogService.open({ viewModel: Promptexhibit, model: currentModel, lock: true }).whenClosed(async response => {
      // this.dialogService.open({ viewModel: Promptrepro, model: this.item, lock: false }).whenClosed(response => {
      console.log('this.item', response, this.item)
      if (!response.wasCancelled) {
        this.item.Exhibit = null
        // this.item.DescriptionLoc= this.item.ReproductionLocation // for all occurances that hit this

        this.save2()

      } else {
        // if (this.currentItem.artist === null) {

        // }
        console.log('cancel');
      }
      console.log(response)//.output);
    });


  }



  action3() {
    // this.item = {}
    // this.hide1 = true
    // this.hide2 = true
    // this.hide4 = true
    // this.hide5 = true
    // this.hide6 = true
    // this.hide7 = true
    // this.hide8 = true
    // this.hide9 = true
    // this.hide3 ? this.hide3 = false : this.hide3 = true


    //  this.currentItem.fieldname = fieldname
    // this.currentItem.recordId = this.recordId

    // this.item.hide1 = true// dont show exhibit selection

    // let currentModel = {}
    // currentModel.currentItem = this.item

    // see reporduction.js to do it the same way
    let currentModel = {}
    currentModel.currentItem = this.item
    currentModel.item = this.item
    if (this.exhibitionbatchno !== undefined) currentModel.currentItem.ReproductionExhibit = this.exhibitionbatchno
    currentModel.currentItem.hide1 = true
    currentModel.popuptype = 0;// from inventory


    // currentModel.popuptype = 1;// from action
    // currentModel.popuptype = 2;// from actionbatch

    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: false }).whenClosed(async response => {
      console.log('this.item', response, this.item)
      if (!response.wasCancelled) {
        this.item.ReproductionExhibit = null
        // this.item.DescriptionLoc= this.item.ReproductionLocation // for all occurances that hit this
        this.save3()
      } else {
        // if (this.currentItem.artist === null) {
        // }
        console.log('cancel');
      }
      console.log(response)//.output);
    });


  }

  action4() {
    let currentModel = {}
    currentModel.currentItem = this.item
    currentModel.item = this.item

    currentModel.currentItem.hide4 = true

    this.dialogService.open({ viewModel: Promptprov, model: currentModel, lock: true }).whenClosed(async response => {
      console.log('this.item', response, this.item)
      if (!response.wasCancelled) {
        this.item.Provenance = null

        this.save4()

      } else {
        // if (this.currentItem.artist === null) {

        // }
        console.log('cancel');
      }
      console.log(response)//.output);
    });

  }



  action5() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide9 = true
    this.hide5 ? this.hide5 = false : this.hide5 = true

  }

  action6() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide7 = true
    this.hide8 = true
    this.hide9 = true
    this.hide6 ? this.hide6 = false : this.hide6 = true

  }
  action7() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 ? this.hide7 = false : this.hide7 = true
    this.hide8 = true
    this.hide9 = true
  }

  action8() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 ? this.hide8 = false : this.hide8 = true
    this.item.offerdate = moment().format('YYYY-MM-DD')//'04/20/2019' //Date.now()
    this.hide9 = true

  }
  // actionMergeone() {


  //     } 
  async sortmerge() {
    alert('not available yet. Sort grid and select rows to merge')

  }
  async action9() {
    // let provarray=[{id:1,sord:3,id:2,sord:1,id:3,sord:2}]
    //  this.testlodash = _.sortBy(provarray, 'sord');

    //   }

    ////////////////////
    let currentModel = {}
    currentModel.currentItem = this.item
    currentModel.item = this.item
    currentModel.currentItem.hide4 = true

    //////////

    let sels
    if (this.selectedids === undefined) {
      sels = []
      // if (!this.selectedids.length > 0) {
      //   sels = []//this.selectedids//[];

    } else sels = this.selectedids
    console.log('Action1 sels', sels)
    // var sels = this.selectedids//[];
    let grid = this.grid;
    let selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;
    let newcount = 0

    var i;
    var a1;
    for (i = 0; i < maxRows; i++) {
      a1 = selectedRows[i];
      let dataItem = grid.dataItem(a1);
      // let mid = sels.findIndex(x => x.InventoryCode === dataItem.InventoryCode)
      let mid = sels.findIndex(x => x === dataItem.InventoryCode)
      if (mid === -1) {
        sels.push(dataItem)//.InventoryCode);
        newcount++
      }
      // if (i === maxRows - 1) {
      //   this.selectedids = sels;

      // }

    }
    // model.bind="list.id" checked.bind="search.listtype"
    //  ??
    if (newcount === 0) sels = this.datasource._data
    // this.dialogService.open({ viewModel: Promptmerge, model: sels, lock: true }).whenClosed(async response => {
    let listname = this.listtypes[this.selectedlist].name



    //  listtypes = [ { id: 0, name: "exhibition" },  { id: 2, name: "location list" },
    //    { id: 3, name: "box label" }, { id: 5, name: "registrar" },{ id: 8, name: "checklist" }
    if (this.selectedlist === 0 || this.selectedlist === 2 || this.selectedlist === 3 || this.selectedlist === 5 || this.selectedlist === 8) {

      this.dialogService.open({ viewModel: Promptmergeword, model: { head: this.savedlist, listtype: this.selectedlist, listname: listname, detail: sels }, lock: true }).whenClosed(async response => {

        // this.dialogService.open({ viewModel: Promptmerge, model: this.datasource._data, lock: true }).whenClosed(async response => {
        console.log('this.item', response, this.item)
        if (!response.wasCancelled) {
          // this.item.Provenance = null
          // this.save4()
          this.saveMerge
        } else {
          // if (this.currentItem.artist === null) { 
          // }
          console.log('cancel');
        }
        console.log(response)//.output);
      });
    } else {
      this.dialogService.open({ viewModel: Promptmerge, model: { head: this.savedlist, listtype: this.selectedlist, listname: listname, detail: sels }, lock: true }).whenClosed(async response => {

        // this.dialogService.open({ viewModel: Promptmerge, model: this.datasource._data, lock: true }).whenClosed(async response => {
        console.log('this.item', response, this.item)
        if (!response.wasCancelled) {
          // this.item.Provenance = null
          // this.save4()
          this.saveMerge
        } else {
          // if (this.currentItem.artist === null) { 
          // }
          console.log('cancel');
        }
        console.log(response)//.output);
      });
    }
    ////////////
  }

  saveMerge() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    console.log('this.editor.value()', this.savedlist, this.editor.value())
    this.api.saveMerge(this.savedlist, this.editor.value())
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.message = "Save successful. merge added @ " + savetime
        } else this.message = "Save Failed  @ " + savetime
      })

  }

  setInitialValue(edt) {
    // if (this.currentItem.rtf1 !== undefined)
    //  edt.value(this.currentItem.rtf1);
    //  let segment
    //     for (const invitem of this.datasource._data) {

    //  segment+= `<table><tbody><tr style="height:33"><td style="width:50%;">${invitem.InventoryCode}</td> `
    //  segment+=`<td style="width:50%;"><img src="https://artbased.com/api/v1/getonepdf/inv/${invitem.InventoryCode}.jpg" alt="" width="225" height="225" /><img src="https://artbased.com/api/v1/getonepdf/inv/VYTLAC0074.jpg" alt="" width="225" height="225" /></td></tr>`
    //     }
    // segment+= `</tbody></table>`
    // edt.value(segment)

  }
  // actionhide(activeaction){

  // }

  //  "ExhibitTitle" : "", 
  //             "ExhibitSponser" : "Palace of the Legion of Honor", 
  //             "ExhibitLocation" : 1226.0, 
  //             "ExhibitDates" : "", 
  //             "ExhibitSortDate" : "", 
  //             "Traveled" : "N", 
  //             "ExhibitMemo" : ""

  async save1() {

    //     let dtransportto = `${this.Description.Description}`
    //     let dtransportfrom = `${this.Description2.Description}`
    let jsonResna = await this.api.getbatchno();

    this.item.batchno = jsonResna[0].nextavail
    this.item.savedlist = this.savedlist
    this.api.batchTransport(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          // alert(' batch updated  batchno= ' + batchno + ' ' + this.item)
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.item.batchno}  `, lock: true }).whenClosed(async response => { });
          this.item = {}//.TransportDate = ''
        } else {
          this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
        }
      })

  }

  async save2() {
    this.item.savedlist = this.savedlist
    let jsonResna = await this.api.getbatchno();

    let batchno = jsonResna[0].nextavail
    this.exhibitionbatchno = batchno
    this.item.batchno = batchno
    this.lastbatch = batchno
    // this.item.exhibitionbatchno=batchno
    this.api.batchExhibit(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.exhibitionbatchno} `, lock: true }).whenClosed(async response => { });
          this.item = {}
        } else this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
      })
  }

  async save3() {
    // Reproduction Provenance batchMrglocation batchTemplocation batchOfferings
    this.item.savedlist = this.savedlist
    let jsonResna = await this.api.getbatchno();

    let batchno = jsonResna[0].nextavail
    this.item.batchno = batchno
    //this.item.exhibitionbatchno= batchno 
    // this.item.batchno= batchno   
    // this.item.Edition ? this.item.Edition=true :this.item.Edition=false;
    this.api.batchReproduction(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.item.batchno} / ${this.item} `, lock: true }).whenClosed(async response => { });
          this.item = {}
        } else this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
      })
  }


  async save4() {
    // let loc = `${this.Description.Description}`
    // alert(loc)
    this.item.savedlist = this.savedlist
    let jsonResna = await this.api.getbatchno();
    this.item.batchno = jsonResna[0].nextavail
    this.api.batchProvenance(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.item.batchno}  `, lock: true }).whenClosed(async response => { });
          this.item = {}
        } else this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
      })
  }

  async save5() {

    this.item.savedlist = this.savedlist
    let jsonResna = await this.api.getbatchno();
    this.item.batchno = jsonResna[0].nextavail
    console.log('item', this.item)
    this.api.batchMrglocation(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.item.batchno}  `, lock: true }).whenClosed(async response => { });


          this.item = {}
        } else this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
      })
  }

  async save6() {
    // let loc = `${this.Description6.Description}`

    //  alert(loc)
    this.item.savedlist = this.savedlist
    this.api.batchTemplocation(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          this.dialogService.open({ viewModel: Promptmess, model: `batch updated  batchno= ${this.item.batchno} / ${this.item} `, lock: true }).whenClosed(async response => { });

          this.item = {}
        } else this.dialogService.open({ viewModel: Promptmess, model: `batch failed `, lock: true }).whenClosed(async response => { });
      })
  }

  //   save7() {
  // images???
  // batchOfferings
  //   }
  save8() {

    this.item.savedlist = this.savedlist;
    let orgid = this.orgObject._id;
    let orgname = this.orgObject.OrgName;
    let offerdate = this.item.offerdate; //Date.now() //
    let rec
    // loop 
    //  console.log('after orgid orgname', orgid, orgname)
    this.erroroffer = 0
    let offerings = []
    for (const invitem of this.datasource._data) {
      rec = {}
      rec.client = this.orgObject._id//orgid
      rec.clientname = this.orgObject.OrgName  //orgname
      rec.offerdate = offerdate
      rec.InventoryCode = invitem.InventoryCode
      rec.offeramount = invitem.offeramount
      if (rec.offeramount === undefined || rec.offeramount === null) {
        this.erroroffer++;
      } else offerings.push(rec)
      console.log('after item', rec)// item.InventoryCode,+item.offeramount)

    }
    console.log('after offerings', offerings)
    if (this.erroroffer > 0) {
      this.dialogService.open({ viewModel: Promptmess, model: `please fix offer amount col on ${this.erroroffer} row(s) !`, lock: true }).whenClosed(async response => { });

    } else {
      this.api.addOfferings(offerings).then((jsonRes) => {
        this.dialogService.open({ viewModel: Promptmess, model: `Save successful! `, lock: true }).whenClosed(async response => { });
      });
    }
  }
  changeCallbackOrg(selectedValue) {
    // this.OrgName = this.myDatalistO.value
    // let oid
    // let org = this.appService.orgsList.find(x => {
    //   if (x.OrgName === this.OrgName) {
    //     oid = x._id
    //   }
    // })
    // this.orgId = oid
    // this.orgObject = org
    // console.log('this.orgId this.OrgName', this.OrgName, this.orgId, this.orgObject)
    // let findvalue = this.myDatalistO.value //this.selectedValueO.value
    //>${option.OrgName} ; ${option.BusIndivid} ; ${option._id}
    // let semiPos = values.indexOf(";");
    // var res = values.trim();
    let values = this.myDatalistO.value
    var res = values.split(";");

    this.OrgName = res[0].trim();
    this.BusIndivid = res[1].trim();
    this.orgId = res[2].trim();
    this.orgObject = { OrgName: this.OrgName, BusIndivid: this.BusIndivid, _id: this.orgId }

    console.log('this.orgId this.OrgName', this.OrgName, this.orgId, this.BusIndivid)// this.orgObject)
    // let findvalue = this.myDatalistO.value //this.selectedValueO.value
  }


}

// change: function (e, args) {
//         var grid = e.sender;
//         var items = grid.items();
//         items.each(function (idx, row) {
//             var idValue = grid.dataItem(row).get(idField);
//             if (row.className.indexOf("k-state-selected") >= 0) {
//                 selectedOrders[idValue] = true;
//             } else if (selectedOrders[idValue]) {
//                 delete selectedOrders[idValue];
//             }
//         });
//       },
//       dataBound: function (e) {
//         var grid = e.sender;
//         var items = grid.items();
//         var itemsToSelect = [];
//         items.each(function (idx, row) {
//           var dataItem = grid.dataItem(row);
//           if (selectedOrders[dataItem[idField]]) {
//             itemsToSelect.push(row);
//           }
//         });

//         e.sender.select(itemsToSelect);
//       }

    // change: function (e, args) {
    //   var grid = e//.sender; 
    //   var items = grid.items//();
    //   // items.each(function (idx, row) {
    //   // items.forEach(function (idx, row) {
    //    items.forEach(function (row,idx) { 

    //       // var idValue = grid.dataItem(row).get(idField);
    //       var idValue = row.id//get(idField);
    //       if (row.className.indexOf("k-state-selected") >= 0) {
    //           selectedOrders[idValue] = true;
    //       } else if (selectedOrders[idValue]) {
    //           delete selectedOrders[idValue];
    //       }
    //   });


    // },
    // dataBound: function (e) {
    //   var grid = e//.sender;
    //   var items = grid.items//();
    //   var itemsToSelect = [];
    //   items.each(function (idx, row) {
    //     var dataItem = grid.dataItem(row);
    //     if (selectedOrders[dataItem[idField]]) {
    //       itemsToSelect.push(row);
    //     }
    //   });

    //   e.sender.select(itemsToSelect);
    // }
//  let grid = e.sender;
    //   let selectedRow = grid.select();
    //   let dataItem = grid.dataItem(selectedRow);
    //     for (const item of items) {
    //       var idValue = item.id;
    //     //  c.ArtistName = item.LastName + ', ' + item.FirstName
    //       if (item.className.indexOf("k-state-selected") >= 0) {
    //         selectedOrders[idValue] = true;
    //       } else if (selectedOrders[idValue]) {
    //         delete selectedOrders[idValue];
    //       }
    //     }
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]