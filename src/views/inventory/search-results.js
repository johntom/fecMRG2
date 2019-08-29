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
import { Promptmess } from '../../services/promptmess';
import { Promptyn } from '../../services/promptyn';
// jrt
// @inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService)

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
    //  toolbar: [{
    //       name: 'saveGrid',
    //       text: "Save Grid Settings"
    //     }],
    // toolbar: ["excel"],
    // excel: {
    //   fileName: "Kendo UI Grid Export.xlsx",
    //   proxyURL: "//demos.telerik.com/kendo-ui/service/export",
    //   filterable: true,
    //   allPages: true
    // },
    // pdf: {
    //   allPages: true,
    //   avoidLinks: true,
    //   paperSize: "A4",
    //   margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
    //   landscape: true,
    //   repeatHeaders: true,
    //   template: $("#page-template").html(),
    //   scale: 0.8
    // },
    transport: {
      read: (options) => {
        this.loadData()
          .then((inv) => {
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
          Artist: { type: "string" },
          artist: [
            {
              "ArtistName": { type: "string" },
              "yearofBirth": { type: "string" }
            }],
          MediumSupportobj: { "Description": { type: "string" } },
          "currentocationname": { type: "string" },
          "ownedbyname": { type: "string" },// ownerstatus
          SoldDate: { type: "date" },
          "Sold": { type: "string" },
          "soldtoname": { type: "string" },
          UnframedHeight: { type: "number" },
          UnframedHeight16: { type: "string" },
          UnframedWidth: { type: "number" },
          UnframedWidth16: { type: "string" },
          UnframedDepth: { type: "number" },
          UnframedDepth16: { type: "string" },
          // Purchased From -->
          //  ArtistRegistra: { type: "string" },
          InventoryCode: { type: "string" },
          Title: { type: "string" },
          CurrentLocation: { type: "string" },
          Bin: { type: "string", sortable: false, menu: false }, // barcode insured
          Owner: { type: "string" },
          InvYear: { type: "string" },
          groupedColumns: [{
            field: 'UnframedHeight',
            title: 'Hght',
            width: 50,
            type: "number"
          }, {
            field: 'UnframedHeight16',
            title: ' ',
            width: 50,
            type: "string"
          }, {
            field: 'UnframedWidth',
            title: 'Wdth',
            width: 50,
            type: "number"
          }, {
            field: 'UnframedWidth16',
            title: ' ',
            width: 50,
            type: "string"
          },
          {
            field: 'UnframedDepth',
            title: 'Dpth',
            width: 50,
            type: "number"
          }, {
            field: 'UnframedDepth16',
            title: ' ',
            width: 50,
            type: "string"
          }
          ],
          // Image : { type: "string", editable: false },
        }
      }
    },
    // pageSize: 10,

    height: 400,

    //  serverPaging: true,
    //   serverSorting: true,
    sort: { field: 'InventoryCode', dir: 'asc' },


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
    this.appService.refreshinvLoaded = false;
    //   this.currentsavedlist;
    this.epoch = moment().unix();
     this.busy = {}
    this.busy.active = true
  }
  save() {
    localStorage["kendo-grid-options"] = kendo.stringify(this.grid.getOptions());
    alert("Saved to storage. Reload now and click the Load button");
  }

  load() {
  //  this.busy.active = true
    var options = localStorage["kendo-grid-options"];
    if (options) {
      this.grid.setOptions(JSON.parse(options));
    //  this.busy.active = false
    }
  }

  reloadPage() {
    // this.busy.active = true
    // location.reload();
    // this.router.navigate(rt + '?town=' + this.capColor + '&d1=' + s1 + '&d2=' + s2);

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
    this.queryParams = this.utilService.parseQueryStringUrl();
    console.log('queryParams', this.queryParams);

    //  this.datasource.read()
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
    let inv;
    ///api/v1/inventory/getall
    if (this.appService.inventorysearchresults && !this.appService.refreshinvLoaded) {
      // this.spinner.remove()
        this.busy.active = false
      return this.appService.inventorysearchresults;

    } else {
      return this.api.findInventory(this.queryParams)
        .then((jsonRes) => {
          inv = jsonRes.data;
          this.inventory = jsonRes.data;
          this.recCount = inv.length;
          // this.spinner.remove()
           this.busy.active = false
          if (inv === 0 || inv.length === 0) {
            this.dialogService.open({ viewModel: Promptmess, model: `no records found  `, lock: true }).whenClosed(async response => { });
            let tab = this.appService.tabs.find(f => f.isSelected);
            this.closeTab(tab);
            let rt2 = '#/inventory';
            this.router.navigate(rt2);
          } else {
            this.appService.inventorysearchresults = inv;
            return inv
          }
        });
    }
  }



  performAction1Refresh() {
    //console.log('performRefresh ')
    // alert('You have selected performRefresh')
    this.appService.refreshinvLoaded = true;
    this.datasource.read()
  }
  async loadDatanocache() {
    let inv;
    return this.api.findInventory(this.queryParams)
      .then((jsonRes) => {
        inv = jsonRes.data;
        this.inventory = jsonRes.data;
        this.recCount = inv.length;
        // this.spinner.remove()
         this.busy.active = false
        
        if (inv === 0 || inv.length === 0) {
          this.message = ' no records found '
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);
          let rt2 = '#/inventory'
          this.router.navigate(rt2);
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
  // addexistingSelection() {

  //   let sels
  //   if (this.selectedids === undefined) {
  //     sels = []


  //   } else sels = this.selectedids

  //   var grid = this.grid;
  //   var selectedRows = grid.select();
  //   if (selectedRows.length === 0) {
  //     alert('please select a row to add'
  //     )
  //   } else {
  //     var maxRows = selectedRows.length / 2;
  //     selectedRows.each(function (idx, el) {
  //       let dataItem = grid.dataItem(el);
  //     });
  //     var i;
  //     var a1;
  //     for (i = 0; i < maxRows; i++) {
  //       a1 = selectedRows[i];
  //       let dataItem = grid.dataItem(a1);
  //       let mid = sels.findIndex(x => x === dataItem.InventoryCode)
  //       if (mid === -1) {
  //         sels.push(dataItem.InventoryCode);
  //       }
  //       if (i === maxRows - 1) {
  //         this.selectedids = sels;
  //         // alert('addexistingSelection')
  //         this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {
  //           console.log('jsonRes ', jsonRes);
  //           // let tab = this.appService.tabs.find(f => f.isSelected);
  //         });
  //       }



  //       // this.allselectedids.push(dataItem.InventoryCode);
  //       //  this.selectedids.push(dataItem.InventoryCode);
  //     }

  //     // this.myMultiSelect.kWidget.dataSource.add(this.selectedids);
  //     // this.myMultiSelect.kWidget.setDataSource(this.selectedids);
  //     //   this.allselectedids =   this.allselectedids+sels;
  //   }
  //   this.message = `  all items added to list ${this.appService.currentsavedlist} count:${this.appService.currentsavedlist.length}`
  // }


  async addexistingSelection() {
    if (this.appService.currentsavedlist === "") {
      this.dialogService.open({ viewModel: Promptmess, model: `please select a saved list  `, lock: true }).whenClosed(async response => { });
    }

    let sels
    let newcount = 0
    if (this.selectedids === undefined) {
      sels = []
    } else sels = this.selectedids

    var grid = this.grid;
    var selectedRows = grid.select();
    if (selectedRows.length === 0) {

      this.dialogService.open({ viewModel: Promptmess, model: `please select a row to add  `, lock: true }).whenClosed(async response => { });




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
          newcount++
          sels.push(dataItem.InventoryCode);
        }
        if (i === maxRows - 1) {
          this.selectedids = sels;
          await this.api.updateSavedlists(this.appService.currentsavedlist, this.selectedids).then((jsonRes) => {
            console.log('jsonRes ', jsonRes);
          });
        }
      }

    }


    let response = await this.api.findInventorySavedLists(this.appService.currentsavedlist);
    this.sllen = response.data.length
    console.log('this.repos ', this.api.currentsavedlist)
    this.message = ` ${newcount} items added to list ${this.appService.currentsavedlist} count:${this.sllen}`
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
