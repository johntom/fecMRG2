import { ApiService } from '../../utils/servicesApi'
import { inject } from 'aurelia-dependency-injection'
import { Router, Redirect } from 'aurelia-router'
import { UtilService } from '../../services/util-service'
import { ApplicationService } from '../../services/application-service'
import { MyDataService } from "../../services/my-data-service"
import { DialogService } from 'aurelia-dialog'
import { Prompt } from './prompt'
import { DialogImage } from './dialogImage'
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService, EventAggregator)
export class SearchResults {
  heading = 'Search Results...';
  footer = 'Search Results...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  checkedIds = {};
  message = ''//Hello Inventory !';
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        this.loadData()
          .then((inv) => {
            //	console.log(' inv datasource ', inv.length, inv[0]);
            options.success(inv);
            //		console.log('inv.length===1 && this.appService.onlyonce===0 ', inv.length === 1 && this.appService.onlyonce === 0, inv.length, inv.length)
            //10-18 if (inv.length === 1 && this.appService.onlyonce === 0) {
            // if (inv.length === 1 ) {
            // 	let rt2 = '#/inventory/data/' + inv[0].InventoryCode;
            // 	console.log('rt2 ', rt2)
            // 	let tab = this.appService.tabs.find(f => f.isSelected);
            // 	this.closeTab(tab);
            // 	this.router.navigate(rt2);
            // 	//10-18 this.appService.onlyonce = 1
            // }
          });
      },
      // update: (options) => {
      //   let updatedItem = options.data;
      //   console.log('   updatedItem ', updatedItem)
      //   this.updateData(updatedItem)
      //     .then((scans) => {
      //       options.success(scans)
      //     })
      //   options.success()
      // }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          // LegacyID: { type: "number" }, // scan template
          Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          InventoryCode: { type: "string" },
          Title: { type: "string" },
          MediumSupport: { type: "string" },
          CurrentLocation: { type: "string" },
          Bin: { type: "string", sortable: false, menu: false }, // barcode insured
          Owner: { type: "string" },
          InvYear: { type: "string" },
          UnframedHeight: { type: "string" },
          // Image : { type: "string", editable: false },
        }
      }
    },
    pageSize: 10,
    //  serverPaging: true,
    //   serverSorting: true,
    sort: { field: 'Title', dir: 'asc' },
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })
  //Reference the Kendo Grid  


  constructor(router, api, utilService, appService, dataService, dialogService, eventAggregator) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.ImageID = '20150921_153441_resized_2'  //4;
    this.selectedids = [];
    this.allselectedids = [];
    this.checkedIds = {};
    this.selectedOrders = [];
    this.router = router
    this.dialogService = dialogService
    this.eventAggregator = eventAggregator
    //   this.currentsavedlist;

  }

  selectAll() {
    // var movid;
    // var   movies=this.dataSource._data;
    // console.log('selectAll ',this.dataSource)
    // var i=1;
    // for(var i in movies){
    // movid=movies[i].rank;
    // console.log(movid)
    // $('#T'+movid).trigger("click");
    // }  
  }
  onDataBound(e) {
    let grid = e.sender;
    kendo.jQuery('[data-field=Bin].k-header-column-menu', grid.tbody).remove(); ///removeAttr('href');


  }
  showSavedlists() {
    this.currentItem = {}
    this.currentItem.fieldname = 'SavedList'
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {
      if (this.appService.currentsavedlist) {
        console.log('Not Cancelled')
        let meds = this.appService.savedlists
        let mid = meds.findIndex(x => x.name === this.appService.currentsavedlist)//'savedlist1')
        if (mid !== -1) {
          let orgobj = this.appService.savedlists[mid]

        }
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  //https://johntom.github.io/fecMRG2/#/action/Actionlist-?savedlists%3DTest%20List&tabname=actionlist

  openSelection() {
    //  #/action/Actionlist-?savedlists%3DTest%20List&tabname=actionlist
    // name as - at end its a singleton
    this.search = `savedlists:"${this.appService.currentsavedlist}"`
    let qs = this.utilService.generateQueryString(this.search);
    console.log('this.search ', this.search)
    // name as - at end its a singleton
    let path = `Actionlist-${qs}`;

    // see authorize-step.js on how I make this a singleton with saving the result set
    this.router.navigate(`#/action/${path}&tabname=actionlist`);

    //  let rt2 = `#/action/Actionlist-?savedlists=${this.appService.currentsavedlist}&tabname=actionlistInv`
    // this.router.navigate(rt2);// `#/inventory/${path}`);
    // https://johntom.github.io/fecMRG2/#/action/Actionlist-?savedlists%3DTest%20List&tabname=actionlist   openSelection()
  }




  showModal(fieldname) {
    //     this.currentItem = {}
    // //     this.currentItem.fieldname = {}
    // // this.currentItem.recordId = this.recordId
    // this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {
    //       if (this.appService.currentsavedlist) {
    //         console.log('Not Cancelled')
    //         let meds = this.appService.savedlists
    //         // let mid = meds.findIndex(x => x.name === 'savedlist1')
    //         let mid = meds.findIndex(x => x.name === this.appService.currentsavedlist)
    //         if (mid !== -1) {
    //           let orgobj = this.appService.savedlists[mid]
    //           this.selectedids = orgobj.InventoryCodes

    //         }
    //       } else {
    //         console.log('cancel');
    //       }
    //       console.log(response.output);
    //     });
  }
  attached() {
    // this.grid = $("#grid").data("kendoGrid");
    // Removing The Ship Country Column Menu:      
    // By field  
    // this.grid.find("[data-field=Bin]>.k-header-column-menu").remove();
    // $('#GridName .k-header-column-menu').eq(2).hide()
    // this.grid('k-header-column-menu').eq(2).hide()
    // By Index  
    // grid.thead.find("[data-index=1]>.k-header-column-menu").remove();

    // this.grid.column["Bin"].IncludeInMenu(false);// hideColumn(2) NOT AVAIL

  }
  activate(params, routeConfig) {
    //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 
    //let queryParams = this.utilService.parseQueryString();
    //let queryParams2 = this.utilService.generateQueryString(queryParams);
    // queryParams2.replace('%3D','=');
    // queryParams2.split('%3D').join('=');
    // var find = '%3D';
    // var re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '=');
    // find = '%26';
    // re = new RegExp(find, 'g');
    // queryParams2 = queryParams2.replace(re, '&');
    // this.queryParams = queryParams2
    // console.log('squeryParams2', this.queryParams);

    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);
    this.datasource.read()

    // let meds = this.appService.savedlists
    // let orgobj = this.appService.savedlists[0]
    // this.selectedids = orgobj.InventoryCodes

  }

  addinventory() {

    this.router.navigate(`#/inventory/data/create`);
  }
  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }

  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    console.log(this.queryParams)

    // let response = await this.api.findInventory(this.queryParams);
    // let inv = response.data
    // return inv


    return this.api.findInventory(this.queryParams)
      //return this.api.findInventoryKeywords(this.queryParams)

      .then((jsonRes) => {
        inv = jsonRes.data;
        this.inventory = jsonRes.data;
        this.recCount = inv.length;
        if (inv === 0 || inv.length === 0) {
          // alert(' no records found ')
          this.message = ' no records found '
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          let rt2 = '#/home'// inventory'
          this.router.navigate(rt2);// `#/inventory/${path}`);
        } else return inv
      });

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



  performAction1() {
    // console.log('Action1 ')
    // alert('You have selected Action 1')
    this.message = ' You have selected Action 1 '
  }

  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    //  let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/onepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    // #/inventory/data/#=InventoryCode#
    //let rt2 = '#/inventory/data/#=' + dataItem.InventoryCode + '#'
    //  ${datasource._data.length}
    if (this.datasource._data.length === 1) {
      let tab = this.appService.tabs.find(f => f.isSelected);
      this.closeTab(tab);
    }

    let rt2 = '#/inventory/data/' + dataItem.InventoryCode;
    this.router.navigate(rt2);// `#/inventory/${path}`);

  }

  showModalImg(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    this.dialogService.open({ viewModel: DialogImage, model: dataItem, lock: false }).whenClosed(response => {



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
  // attached() {
  //     this.altAKeyPressSubscription = this.eventAggregator.subscribe('keydown:alt-s', this.addinventory.bind(this));

  //   }
  //   detached() {
  //     this.altAKeyPressSubscription.dispose();
  //   }
  ////////////////////

  onDataBound(e) {
    let grid = e.sender;
    kendo.jQuery('a[href*=\'#\']', grid.tbody).removeAttr('href');
  }

  details(e) {
    let grid = this.grid;
    var targetRow = $(e.target).closest("tr");

    grid.select(targetRow);
    // redirect if required
  }

  onEdit(e) {
    let grid = e.sender;
    var targetRow = $(e.container);
    grid.select(targetRow);
  }
  addexistingCB() {
    // alert('cb')
    var maxRows = this.datasource.length - 1;
    for (i = 0; i < maxRows; i++) {
      a1 = selectedRows[i];
      let dataItem = thid.grid.dataItem(a1);

      if (a1.isChecked === true) {
        // alert('a1 ' + a1.InventoryCode)
        // this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {
        //   console.log('jsonRes ', jsonRes);
        //   // let tab = this.appService.tabs.find(f => f.isSelected);
        // });
      }
    }
  }
  addexistingSelection() {

    let sels
    if (this.selectedids === undefined) {
      sels = []


    } else sels = this.selectedids

    var grid = this.grid;
    var selectedRows = grid.select();
    if (selectedRows.length === 0) {
      alert('please select a row to add'
      )
    } else {
      var maxRows = selectedRows.length / 2;
      selectedRows.each(function (idx, el) {
        let dataItem = grid.dataItem(el);
      });
      var i;
      var a1;
      for (i = 0; i < maxRows; i++) {
        a1 = selectedRows[i];
        let dataItem = grid.dataItem(a1);
        let mid = sels.findIndex(x => x === dataItem.InventoryCode)
        if (mid === -1) {
          sels.push(dataItem.InventoryCode);
        }
        if (i === maxRows - 1) {
          this.selectedids = sels;
          // alert('addexistingSelection')
          this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
            // let tab = this.appService.tabs.find(f => f.isSelected);
          });
        }



        // this.allselectedids.push(dataItem.InventoryCode);
        //  this.selectedids.push(dataItem.InventoryCode);
      }

      // this.myMultiSelect.kWidget.dataSource.add(this.selectedids);
      // this.myMultiSelect.kWidget.setDataSource(this.selectedids);
      //   this.allselectedids =   this.allselectedids+sels;
    }
    this.message = `  all items added to list ${this.appService.currentsavedlist} count:${this.appService.currentsavedlist.length}`
  }


  showSelection() {
    var sels = [];
    var grid = this.grid;
    var selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;

    selectedRows.each(function (idx, el) {
      let dataItem = grid.dataItem(el);
      sels.push(dataItem.InventoryCode);
    });


    this.selectedids = sels;
    //   this.allselectedids =   this.allselectedids+sels;
  }

  /////////////////////


  selectAll() {



  }

  selectRow() {
    // debugger;
    // alert('sel')
  }
  clearSelection() {

    this.appService.currentsavedlist = '';
    this.checkedIds = [];

  }
  saveSelection() {
    // alert('saveSelection')
    message = 'selection saved';
  }


}
