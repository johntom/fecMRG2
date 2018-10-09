import { ApiService } from '../../utils/servicesApi';
import { inject } from 'aurelia-dependency-injection';
// import { Router } from 'aurelia-router';
import { Router, Redirect } from 'aurelia-router';
import { UtilService } from '../../services/util-service';
// import moment from 'moment';
import { ApplicationService } from '../../services/application-service';
import { MyDataService } from "../../services/my-data-service";
// jrt
@inject(Router, ApiService, UtilService, ApplicationService, MyDataService)
export class SearchResults {
  heading = 'Search Results HEADER...';
  footer = 'Search Results FOOTER...';
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
  item = {}

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
    pageSize: 5,
    // aggregate: [{ field: "type", aggregate: "count" },
    //   { field: "template", aggregate: "count" }
    // ]
  })

  constructor(router, api, utilService, appService, dataService) {
    this.router = router;
    this.api = api;
    this.utilService = utilService;
    this.appService = appService;
    this.dataService = dataService;
    this.ImageID = '20150921_153441_resized_2'
    // this.appService.actionlist ='closed'
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
    // const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
    //   const pairs = qs.split('&')
    //   const queryParams = {}
    //   let slname
    //   pairs.forEach(p => {
    //     const kv = p.split('=')
    //     slname = kv[1]
    //   });
    //   this.item.savedlist = slname 
    // or
    this.item.savedlist = this.appService.currentActionlist

    this.savedlist = this.appService.currentActionlist

    this.datasource.read()
    // make a dupe of folllowing to accoumodate 2 typeaheads
    this.codesListLocation = this.appService.codesListLocation

    // this.appService.actionlist ='opened'
    // } 
    // else     this.datasource.read()

  }

  loadGrid() {
    let options = localStorage["kendo-grid-mail"]
    if (options) {
      this.grid.setOptions(JSON.parse(options))
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
    // console.log(this.queryParams)

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
    // console.log('Action1 ')
    // alert('You have selected Action 1')
    let sels
    if (this.selectedids === undefined) {
      sels = []
      // if (!this.selectedids.length > 0) {
      //   sels = []//this.selectedids//[];

    } else sels = this.selectedids
    console.log('Action1 sels', sels)
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
        alert('you are about to remove the following ' + this.selectedids + ' from saved list ' + this.savedlist)
        this.api.deleteSavedlists(this.savedlist, this.selectedids).then((jsonRes) => {
          console.log('jsonRes ', jsonRes);
          // let tab = this.appService.tabs.find(f => f.isSelected);
          let tab = this.appService.tabs.find(f => f.isSelected);
          this.closeTab(tab);

         // this.requestclose()

        });
      }
      // this.allselectedids.push(dataItem.InventoryCode);
      //  this.selectedids.push(dataItem.InventoryCode);
    }
    // this.myMultiSelect.kWidget.dataSource.add(this.selectedids);
    // this.myMultiSelect.kWidget.setDataSource(this.selectedids);
    //   this.allselectedids =   this.allselectedids+sels;
  }
  closeTab(tab) {
  
    let index = this.appService.tabs.indexOf(tab);
    // tab.isSelected = false;
    this.appService.tabs.splice(index, 1);
   //   tab.isSelected = false;
  // this.appService.tabs[index - 1].isSelected = true
   this.requestclose(index)
  }
  requestclose(index) {
    // alert ('in requestclose')
 
   //// const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    //// let cand = this.canDeactivate()
   //let tab = this.appService.tabs.find(f => f.isSelected);
    // let index = this.appService.tabs.findIndex(f => f.isSelected)
    let rt2 = '#/action/' + this.tabname


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    //    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);
    //  this.appService.tryCloseTab(undefined, index, newTab.href);
this.appService.tabs[newIndex].isSelected = true

  }
  detailsFactSheet(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    let rt2 = dataItem.InventoryCode;
    this.api.createFactSheet(rt2)
      .then((jsonRes) => {
        let success = jsonRes.data;
        if (success === true) {
          alert(' factsheet  created ')

        } alert(' factsheet  failed ')
      });

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
  //      <button id="factsheet1" action1() >Transport</button>
  // 			<button id="factsheet2" action2()">Exhibit</button>
  // 			<button id="factsheet3" action3()">Reproduction</button>
  // 			<button id="factsheet4" action4()">Provenance</button>
  // 			<button id="factsheet5" action5()">Mrg location</button>
  // 			<button id="factsheet6" action6()">Temp location</button>
  // 			<button id="factsheet7" action8()">Offerings</button>

  action1() {
    this.item = {}
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide1 ? this.hide1 = false : this.hide1 = true

  }

  action2() {
    this.item = {}
    this.hide1 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide2 ? this.hide2 = false : this.hide2 = true

  }

  action3() {
    this.item = {}
    this.hide1 = true
    this.hide2 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide3 ? this.hide3 = false : this.hide3 = true

  }

  action4() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide4 ? this.hide4 = false : this.hide4 = true

  }

  action5() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
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
  }

  //  "ExhibitTitle" : "", 
  //             "ExhibitSponser" : "Palace of the Legion of Honor", 
  //             "ExhibitLocation" : 1226.0, 
  //             "ExhibitDates" : "", 
  //             "ExhibitSortDate" : "", 
  //             "Traveled" : "N", 
  //             "ExhibitMemo" : ""

  save1() {
    //     //  let orgid = `${this.OrgName._id}`
    //     //   let orgname = `${this.OrgName.OrgName}`
    //     //   this.currentItem.OwnerID = orgid
    //     //   this.currentItem.ownername = orgname
    //  //  let dtransportto = `${this.dtransportto._id}`

    //     this.item.savedlist = this.savedlist
    //     let dtransportto = `${this.Description.Description}`
    //     let dtransportfrom = `${this.Description2.Description}`

    // alert(dtransportto + '-' + dtransportfrom)
    this.api.batchTransport(this.item)
    this.item.savedlist = this.savedlist
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}//.TransportDate = ''
          //  this.Description =''
          //  this.Description2 =''
          // this.item.Description = ''
          // this.item.Description2 = ''


          // this.item.TransportNotes = ''

        } else alert(' batch failed ')
      })
  }

  save2() {
    this.item.savedlist = this.savedlist
    this.api.batchExhibit(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}
          // this.item.ExhibitTitle = ''
          // this.item.ExhibitSponser = ''
          // this.item.Description2 = ''
          // this.item.exhibitlocation = ''
          // this.item.ExhibitDates = ''
          // this.item.ExhibitSortDate = ''
          // this.item.Traveled = ''
          // this.item.ExhibitMemo = ''

        } else alert(' batch failed ')
      })
  }

  save3() {
    // Reproduction Provenance batchMrglocation batchTemplocation batchOfferings
    this.item.savedlist = this.savedlist
    this.api.batchReproduction(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}
        } else alert(' batch failed ')
      })
  }

  save4() {
    // let loc = `${this.Description.Description}`

    // alert(loc)
    this.item.savedlist = this.savedlist
    this.api.batchProvenance(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}
        } else alert(' batch failed ')
      })
  }

  save5() {
    //  let loc = `${this.Description5.Description}`

    //alert(loc)
    this.item.savedlist = this.savedlist
    this.api.batchMrglocation(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}
        } else alert(' batch failed ')
      })
  }

  save6() {
    // let loc = `${this.Description6.Description}`

    //  alert(loc)
    this.item.savedlist = this.savedlist
    this.api.batchTemplocation(this.item)
      .then((jsonRes) => {
        if (jsonRes.data === 'success') {
          alert(' batch updated ')
          this.item = {}
        } else alert(' batch failed ')
      })
  }

  //   save7() {
  // images???
  // batchOfferings

  //   }
  save8() {
    this.item.savedlist = this.savedlist
    let orgid = this.item.OrgName._id //`${this.OrgName._id}`
    let orgname = this.item.OrgName.OrgName // `${this.OrgName.OrgName}`
    let offerdate = this.item.offerdate //`${this.date}`
    let rec
    // loop 
    //  console.log('after orgid orgname', orgid, orgname)
    let offerings = []
    for (const invitem of this.datasource._data) {
      rec = {}
      rec.client = orgid
      rec.clientname = orgname
      rec.offerdate = offerdate
      rec.InventoryCode = invitem.InventoryCode
      rec.offeramount = invitem.offeramount
      offerings.push(rec)
      console.log('after item', rec)// item.InventoryCode,+item.offeramount)

    }
    console.log('after offerings', offerings)

    this.api.addOfferings(offerings).then((jsonRes) => {
      // let tab = this.appService.tabs.find(f => f.isSelected);
      // this.closeTab(tab);
      window.alert("Save successful!");
    });
  }


}


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