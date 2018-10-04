import { ApiService } from '../../utils/servicesApi'
import { inject } from 'aurelia-dependency-injection'
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router'
import { UtilService } from '../../services/util-service'
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service'
import { MyDataService } from "../../services/my-data-service"
import { DialogService } from 'aurelia-dialog'
import { Prompt } from './prompt'
import { DialogImage } from './dialogImage'

@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  checkedIds = {};
  //  console.log(' inv SearchResults ');
  message = 'Hello Inventory 101- a!';
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
          Bin: { type: "string" }, // barcode insured
          Owner: { type: "string" },
          InvYear: { type: "string" },
          UnframedHeight: { type: "string" },


        }
      }
    },
    pageSize: 12,
    sort: { field: 'Title', dir: 'asc' },
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })


  constructor(router, api, utilService, appService, dataService, dialogService) {
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

  showSavedlists() {
    //// alert(`selectedids: ${this.selectedids}`);
    this.currentItem = {}
    this.currentItem.fieldname = 'SavedList'
    //this.currentItem.recordId = this.recordId
    this.dialogService.open({ viewModel: Prompt, model: this.currentItem, lock: false }).whenClosed(response => {

// this.appService.currentsavedlist
// this.appService.selectedids = this.selectedids
     // this.dialogService.open({ viewModel: Prompt, model: 'selectedids', lock: false }).whenClosed(response => {
        if (this.appService.currentsavedlist) {
          console.log('Not Cancelled')
          let meds = this.appService.savedlists
          let mid = meds.findIndex(x => x.name === this.appService.currentsavedlist)//'savedlist1')
          if (mid !== -1) {
            let orgobj = this.appService.savedlists[mid]
            /////// ? jrt 
            //3-19 this.selectedids = orgobj.InventoryCodes

          }
        } else {
          console.log('cancel');
        }
        console.log(response.output);
      });
    }
 
  // showModal(fieldname) {



  //   this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {


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



  loadGrid() {
    let options = localStorage["kendo-grid-mail"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    }
  }

  loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    ///api/v1/inventory/getall
    // let searchrec={}
    // if (this.title)  searchrec.title=this.title;
    // if (this.invcode) searchrec.invcode=this.invcode;
    console.log(this.queryParams)
    /**  if (multikeys !== 'undefined') this.search.multikeywords = `${this.currentItem.multikeywords}`
  */

    return this.api.findInventory(this.queryParams)
      //return this.api.findInventoryKeywords(this.queryParams)

      .then((jsonRes) => {
        inv = jsonRes.data;
        if (inv === 0 || inv.length === 0) {
          alert(' no records found ')
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
    console.log('Action1 ')
    alert('You have selected Action 1')
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
    let rt2 = '#/inventory/data/' + dataItem.InventoryCode;
    this.router.navigate(rt2);// `#/inventory/${path}`);

  }
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
    alert('cb')
    var maxRows = this.datasource.length - 1;
    for (i = 0; i < maxRows; i++) {
      a1 = selectedRows[i];
      let dataItem = thid.grid.dataItem(a1);

      if (a1.isChecked === true) {
        alert('a1 ' + a1.InventoryCode)
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
      // if (!this.selectedids.length > 0) {
      //   sels = []//this.selectedids//[];

    } else sels = this.selectedids

    // var sels = this.selectedids//[];
    var grid = this.grid;
    var selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;
    //  this.allselectedids.push('JOHNTOM01')
    selectedRows.each(function (idx, el) {
      let dataItem = grid.dataItem(el);
    });
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
         alert('addexistingSelection')
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

  //saveSelection()">Save Selection</button>			Selected IDs: ${selectedids}
  // addnewSelection() {
  //   var sels = [];
  //   var grid = this.grid;
  //   var selectedRows = grid.select();
  //   var maxRows = selectedRows.length / 2;

  //   selectedRows.each(function (idx, el) {
  //     let dataItem = grid.dataItem(el);
  //   });

  //   var i;
  //   var a1;
  //   for (i = 0; i < maxRows; i++) {
  //     a1 = selectedRows[i];
  //     let dataItem = grid.dataItem(a1);

  //     sels.push(dataItem.InventoryCode);
  //     this.allselectedids.push(dataItem.InventoryCode);
  //   }

  //   this.selectedids = sels;
  //   //   this.allselectedids =   this.allselectedids+sels;
  // }

  showSelection() {
    var sels = [];
    var grid = this.grid;
    var selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;

    selectedRows.each(function (idx, el) {
      let dataItem = grid.dataItem(el);
      sels.push(dataItem.InventoryCode);
    });

    // var i;
    // var a1;
    // for (i = 0; i < maxRows; i++) {
    //   a1 = selectedRows[i];
    //   let dataItem = grid.dataItem(a1);

    //   sels.push(dataItem.InventoryCode);
    //   this.allselectedids.push(dataItem.InventoryCode);
    // }

    this.selectedids = sels;
    //   this.allselectedids =   this.allselectedids+sels;
  }

  /////////////////////


  selectAll() {

    // var movid;
    // // var   movies=this.movies;
    // var   movies=this.dataSource._data;
    // console.log('selectAll ',this.dataSource)
    // var i=1;
    // for(var i in movies){
    // movid=movies[i].rank;
    // console.log(movid)
    // $('#T'+movid).trigger("click");

    // }  

  }
  // showSelection() {
  //   console.log('this.selectedids' + this.selectedids);
  //   for (var i in this.selectedids) {
  //     console.log(this.selectedids[i]);
  //     console.log(this.selectedOrders[i]);

  //   }
  // }

  //on click of the checkbox:
  selectRow() {
    // debugger;
    alert('sel')
  }
  clearSelection() {
    //  alert('clearSelection')
    this.appService.currentsavedlist = '';
    this.checkedIds = [];
    // this.selectedOrders = [];
  }
  saveSelection() {
    alert('saveSelection')
  }

  onDataBoundx(e, that) {
    alert('in ob')

    console.log('e', e);
    console.log('that', that);
    // alert('on onDataBound loading 1 time '+e)
    // alert('on o that'+that)
    let checkedIds = [];

    let grid = e.sender;
    kendo.jQuery('a[href*=\'#\']', grid.tbody).removeAttr('href');
    //grid.element.on("click", ".checkbox" ,selectRow()));// does not work

    grid.element.on("click", ".checkbox", function () {
      var checked = this.checked,
        row = $(this).closest("tr"),
        dataItem = grid.dataItem(row);

      var idValue = grid.dataItem(row).get(this.idField);
      console.log('idValue', idValue);

      if (checked) {
        //-select the row 
        checkedIds.push(dataItem.InventoryCode);
        that.selectedids = checkedIds;
        that.selectedOrders.push(dataItem);


        $("[data-uid='" + dataItem.uid + "']").addClass("k-state-selected");
      } else {
        delete that.selectedOrders[idValue];

        that.selectedids = lodash.pull(that.selectedids, dataItem.InventoryCode);
        that.selectedOrders = lodash.pull(that.selectedOrders, dataItem);


        $("[data-uid='" + dataItem.uid + "']").removeClass("k-state-selected");
        //row.removeClass("k-state-selected");
        $("[data-uid='" + dataItem.uid + "']")

      }
    });
  }

}
//   onDataBound(e, that) {
//     console.log('e', e);
//     console.log('that', that);
//     // alert('on onDataBound loading 1 time '+e)
//     // alert('on o that'+that)
//     let checkedIds = [];//this.checkedIds;// []; // that.selectedOrders

//     let grid = e.sender;
//     kendo.jQuery('a[href*=\'#\']', grid.tbody).removeAttr('href');
//     //grid.element.on("click", ".checkbox" ,selectRow()));// does not work

//     grid.element.on("click", ".checkbox", function () {
//       var checked = this.checked,
//         row = $(this).closest("tr"),
//         dataItem = grid.dataItem(row);

//       var idValue = grid.dataItem(row).get(this.idField);
//       console.log('idValue', idValue);

//       if (checked) {
//         //-select the row 
//         checkedIds.push(dataItem.InventoryCode);
//         that.selectedids = checkedIds;
//         that.selectedOrders.push(dataItem);
//         $("[data-uid='" + dataItem.uid + "']").addClass("k-state-selected");
//       } else {
//         delete that.selectedOrders[idValue];
//         that.selectedids = lodash.pull(that.selectedids, dataItem.InventoryCode);
//         that.selectedOrders = lodash.pull(that.selectedOrders, dataItem);
//         this.checkedIds = this.checkedIds + checkedIds;
//         $("[data-uid='" + dataItem.uid + "']").removeClass("k-state-selected");
//         //row.removeClass("k-state-selected");
//         $("[data-uid='" + dataItem.uid + "']")
//       }
//     });
//   }

// }

//////////////

  // performSearch() {
  //   if (this.search) {
  //     let qs = this.utilService.generateQueryString(this.search);
  //     let path = `Search${this.utilService.counter++}${qs}`;
  //     this.router.navigate(`#/inventory/${path}`);
  //     // this.router.navigate(`#/inventory/${this.search}`);
  //     // this.router.navigate(`#/inventory/InvSearch`);
  //   }
  // }


  /////////

  // updateData(e) {

  //   return api.updatecase(e)
  //     .then((jsonRes) => {
  //       console.log('this.scans ', jsonRes)
  //       return jsonRes

  //     })
  // }
          // OwnershipStatus: { type: "string" },
          // RetailPriceAlpha: { type: "string" },
          // RetailPrice: { type: "string" },
          // RetailPriceDate: { type: "date" },
          // DateAdded: { type: "date" },
          // PurchasedDate: { type: "string" },
          // PurchasedFrom: { type: "string" },
          // PurchasedPrice: { type: "string" },
          // PurchasedForPrice: { type: "string" },
          // Sold: { type: "string" },
          // // Not Sold": { type: "string" },,
          // SoldToID: { type: "string" },
          // // Sold Date : { type: "date" },
          // SoldFor:  { type: "string" },
          // SoldPrice:  { type: "string" },
          // //Min SellingPrice : "",
          // NetToOwner: { type: "string" },
          // ConsignedStartDate:  { type: "string" },
          // ConsignedEndDate:  { type: "date" },
          // MRGLocation: { type: "string" },
          // SoldDesc:  { type: "string" },

          // link: { type: "string" },workername  workeraddr workercity
          //  "First Name": { type: "string" },
          // workeraddr: { type: "string" },
          // workercity: { type: "string" },
          // filename: { type: "string" },
          // contents: { type: "string" },
          // createdAt: { type: "date" },
          //  billedamt: { type: "number" },
          //    payamt: { type: "number" },      
          // // assignto:{ type: "string" },
          // assignto: { defaultValue: { staffid: 1, username: 'jrt' } }
          // // contents: { type: "memo" } billedamt payamt