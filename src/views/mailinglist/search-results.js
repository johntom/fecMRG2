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

import { Promptmess } from '../../services/promptmess';
import { Promptyn } from '../../services/promptyn';

// jrt
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService, DialogService)
export class SearchResults {
  heading = 'Search Results...';
  footer = 'Search Results...';
  recordId = '';
  title = '';
  invcode = '';
  queryParams = '';
  hide1 = true
  hide2 = true

  hide9 = true
  item = {}

  message = ''//Hello Inventory 101- a!';
  // artists

  // dataSourceArtist = new kendo.data.DataSource({
  //     transport: {
  //       read: (options) => {
  //         options.success(this.appService.artistList);
  //       },

  //       parameterMap: function (options, operation) {
  //         if (operation !== "read" && options.models) {
  //           return { models: kendo.stringify(options.models) };
  //         }
  //       }

  //     },
  //     schema: {
  //       model: {
  //         id: "id",
  //         fields: {
  //           "ArtistName": { type: "string" },
  //           "Died": { type: "string" },
  //           "YearofBirth": { type: "string" },
  //         }


  //       }
  //     }
  //   });
  // this is keywords
  // dataSource = new kendo.data.DataSource({
  //   transport: {
  //     read: (options) => {
  //       options.success(this.appService.codesGenre);
  //     },
  //     // create: {
  //     //     url: "https://demos.telerik.com/kendo-ui/service/Products/Create",
  //     //     dataType: "jsonp"
  //     // },
  //     parameterMap: function (options, operation) {
  //       if (operation !== "read" && options.models) {
  //         return { models: kendo.stringify(options.models) };
  //       }
  //     }

  //   },
  //   schema: {
  //     model: {
  //       id: "id",
  //       fields: {
  //         "CodeType": { type: "number" },
  //         "Description": { type: "string" },
  //         "CodeTypeDesc": { type: "string" },
  //       }
  //     }
  //   }
  // });


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
    pageSize: 12,

  })

  constructor(router, api, utilService, appService, dataService, dialogService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.ImageID = '20150921_153441_resized_2'
    this.dialogService = dialogService
    this.appService.rfreshLoaded = false;
    this.search = {}
    this.search.deceased = true
    this.search.nomailings = true
    this.search.noinfo = true
    this.search.keywords = []

  }



  updateData(e) {
    console.log('updateData ', e)
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
    // //http://74.114.164.24/api/v1/inventorycontent?artistl=s%26artistf=c 
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
    this.mailinglist = slname// this.item.savedlist 
    // this.datasource.read()

  }
  performSearch() {
    // let keyword = `${this.keywordDescription}`//.Description}` //aubs-typeahead 
    // let medsupport = `${this.DescriptionMS}`
    // let currentlocation = `${this.DescriptionLoc}`
    // let multikeys = `${this.multikeywords}`
    // let sold = this.search.sold// `${this.search.sold}`

    if (this.search) {
      // if (keyword !== 'undefined' && keyword !== 'null') this.search.keywords = `${this.keywordDescription.Description}`
      console.log('this.search.keywords', this.search.keywords)
      //this.queryParams
      return this.api.findContact(this.search, this.listname)//searchrec)
        .then((jsonRes) => {
          // inv = jsonRes.data;
          this.invdata = jsonRes.data//inv;
          this.recct = inv.length;
          this.datasource.read()
        });


      //   //  if (savedlist !== 'undefined' && savedlist !== 'null') this.search.savedlists = `${this.name.name}`

      //   if (medsupport !== 'undefined') this.search.mediumsupport = `${this.DescriptionMS.Description}`
      //   if (currentlocation !== 'undefined') this.search.currentlocation = `${this.DescriptionLoc.Description}`
      //   if (multikeys !== 'undefined') this.search.multikeywords = `${this.multikeywords}`
      //   if (sold !== 'undefined') this.search.sold = sold
      //   if (selecteddate !== 'undefined') this.search.selectedDateId = selecteddate
      //   if (owndedby !== 'undefined') this.search.owndedby = owndedby //search.owndedby

      //   let qs = this.utilService.generateQueryString(this.search);
      //   console.log('this.search ', this.search)
      //   let counter = this.utilService.counter++
      //   // let path = `Search${counter}${qs}`;
      //   // this.router.navigate(`#/inventory/${path}`);


      //   let path = `searchInv${qs}&tabname=searchInv${this.utilService.counter++}`;
      //   let rt2 = `#/inventory/${path}`
      //   this.router.navigate(rt2);

      //   this.appService.currentSearch = path //`Search${counter}`
    }
  }


  loadGrid() {
    let options = localStorage["kendo-grid-mail"]
    if (options) {
      this.grid.setOptions(JSON.parse(options))
    }
  }

  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;
    this.listname = 'test'
    return this.api.findmailinglist(this.listname).then((jsonRes) => {
      inv = jsonRes.data;
      this.invdata = inv;
      this.recct = inv.length;
      // this.datasource.read()
      return inv
    });

    // return this.api.findContact(this.queryParams, listname)//searchrec)
    //   .then((jsonRes) => {
    //     inv = jsonRes.data;
    //     this.invdata = inv;
    //     this.recct = inv.length;

    //   });
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
    alert('You have selected performRefresh')
    this.appService.rfreshLoaded = true;
    this.datasource.read()
  }
  performAction1() {
    //https://docs.telerik.com/kendo-ui/knowledge-base/persist-row-selection-while-paging
    let sels
    if (this.selectedids === undefined) {
      sels = []

    } else sels = this.selectedids
    console.log('Action1 sels', sels)
    var grid = this.grid;
    var selectedRows = grid.select();
    var maxRows = selectedRows.length / 2;
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
        this.dialogService.open({ viewModel: Promptmess, model: `you are about to remove the following ${this.selectedids} from saved list ${this.savedlist} `, lock: true }).whenClosed(async response => { });

        this.api.deleteSavedlists(this.savedlist, this.selectedids).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);

          this.datasource.read();


        });
      }

    }

  }

  detailsFactSheet(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    //https://artbased.com/api/v1/downloadonepdf/output/SELIGE0327.doc
    let rt2 = `https://artbased.com/api/v1/downloadonepdf/output/${dataItem.InventoryCode}.doc`

    //  alert('rt2 '+rt2)
    window.open(rt2);
  }

  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let rt2 = '#/inventory/data/' + dataItem.InventoryCode;

    this.router.navigate(rt2);// `#/inventory/${path}`);

  }



  action1() {
    this.item = {}

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





  async action9() {
    // this.hide1 = true
    // this.hide2 = true
    // this.hide3 = true
    // this.hide4 = true
    // this.hide5 = true
    // this.hide6 = true
    // this.hide7 = true
    // // this.hide9 ? this.hide9 = false : this.hide9 = true
    // this.hide9 = false
    // this.hide8 = true

    // let segment
    // segment = `<h1 style="text-align:center;">${this.savedlist}</h1> <table><tbody>`
    // for (const invitem of this.datasource._data) {
    //   let ww = invitem.clientWidthRatio
    //   let hh = invitem.clientHeightRatio
    //   if (ww === undefined) ww = 1
    //   if (hh === undefined) hh = 1
    //   ww = 225 * ww
    //   hh = 225 * hh
    //   // we have  the ratio of each image
    //   // ie h=1 w=1
    //   // w h-1 w=.5
    //   // save to    https://artbased.com/api/v1/downloadonepdf/lists/sl2.doc
    //   segment += `<tr style="height:17%;"><td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
    //   segment += `<td style="width:42%;">${invitem.rtf2}</td>`
    //   segment += `<td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
    //   segment += `<td style="width:42%;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
    //   segment += `</tr>`
    // }
    // segment += `</tbody></table>`
    // this.editor.value(segment)
    // this.saveMerge()

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
        sels.push(dataItem.InventoryCode);
        newcount++
      }
      // if (i === maxRows - 1) {
      //   this.selectedids = sels;

      // }

    }

    //  ??
    if (newcount === 0) sels = this.datasource._data
    this.dialogService.open({ viewModel: Promptmerge, model: sels, lock: true }).whenClosed(async response => {

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


  }

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


  changeCallbackOrg(selectedValue) {

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

