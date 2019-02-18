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

    'bold',
    'italic',
    'underline',
    'strikethrough',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'insertUnorderedList',
    'insertOrderedList',
    'indent',
    'outdent',
    'createLink',
    'unlink',
    'insertImage',
    'insertFile',
    'subscript',
    'superscript',
    'createTable',
    'addRowAbove',
    'addRowBelow',
    'addColumnLeft',
    'addColumnRight',
    'deleteRow',
    'deleteColumn',
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
          Image : { type: "string", editable: false },
          
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
    this.ImageID = '20150921_153441_resized_2'
    this.dialogService = dialogService
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
    const qs = this.queryParams.substring(this.queryParams.indexOf('?') + 1)
    const pairs = qs.split('&')
    const queryParams = {}
    let slname
    let ct =0
    pairs.forEach(p => {
      const kv = p.split('=')
      if (ct===0) slname = kv[1]
      ct++
    });
    //1-27 this.item.savedlist = slname
    // or
    // this.item.savedlist = this.appService.currentActionlist
    this.savedlist = slname// this.item.savedlist 
    // this.appService.currentActionlist
    this.datasource.read()
    // make a dupe of folllowing to accoumodate 2 typeaheads
    this.codesListLocation = this.appService.codesListLocation
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
    if (this.appService.actionsearchresults) {
      return this.appService.actionsearchresults;
    } else {
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

          //  this.loadData(); 
          this.datasource.read();
          // let tab = this.appService.tabs.find(f => f.isSelected);
          // this.closeTab(tab);
          // // this.requestclose()

        });
      }
      // this.allselectedids.push(dataItem.InventoryCode);
      //  this.selectedids.push(dataItem.InventoryCode);
    }
    // this.myMultiSelect.kWidget.dataSource.add(this.selectedids);
    // this.myMultiSelect.kWidget.setDataSource(this.selectedids);
    //   this.allselectedids =   this.allselectedids+sels;
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
  detailsFactSheet(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    // let rt2 = dataItem.InventoryCode;
    // this.api.createFactSheet(rt2)
    //   .then((jsonRes) => {
    //     let success = jsonRes.data;
    //     if (success === true) {
    //       alert(' factsheet  created ')

    //     } alert(' factsheet  failed ')
    //   });
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
    this.hide9 = true
    this.hide1 ? this.hide1 = false : this.hide1 = true

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

    this.dialogService.open({ viewModel: Promptexhibit, model: currentModel, lock: false }).whenClosed(response => {
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

    currentModel.currentItem.hide1 = true

    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: false }).whenClosed(response => {
      // this.dialogService.open({ viewModel: Promptrepro, model: this.item, lock: false }).whenClosed(response => {
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
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    this.hide8 = true
    this.hide9 = true
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
    this.hide9 = true
  }

  action9() {
    this.hide1 = true
    this.hide2 = true
    this.hide3 = true
    this.hide4 = true
    this.hide5 = true
    this.hide6 = true
    this.hide7 = true
    // this.hide9 ? this.hide9 = false : this.hide9 = true
    this.hide9 = false
    this.hide8 = true

    let segment

    segment = `<h1 style="text-align:center;">${this.savedlist}</h1> <table><tbody>`

    for (const invitem of this.datasource._data) {
      //this.currentImage=`${invitem.InventoryCode}.jpg`
      // let ww = this.mainimage.clientWidth //* fac.factor
      // lmaet hh = this.mainimage.clientHeight //* fac.factor
      // "imageWidth":.5,
      // "imageHeight":1

      let ww = invitem.clientWidthRatio
      let hh = invitem.clientHeightRatio

      // this.currentItem.clientHeightRatio  = imageHeight
      // this.currentItem.clientWidthRatio  = imageWidth
      //  this.currentItem.clientHeightRatio  = his.mainimage.clientHeight
      //     this.currentItem.clientWidthRatio  =  this.mainimage.clientWidth

      if (ww === undefined) ww = 1
      if (hh === undefined) hh = 1
      ww = 225 * ww
      hh = 225 * hh

      // we have  the ratio of each image
      // ie h=1 w=1
      // w h-1 w=.5
      // save to    https://artbased.com/api/v1/downloadonepdf/lists/sl2.doc
      segment += `<tr style="height:17%;"><td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
      segment += `<td style="width:42%;">${invitem.rtf2}</td>`
      segment += `<td style="width:8%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
      segment += `<td style="width:42%;"><img src="https://artbased.com/api/v1/getimage/inv/${invitem.InventoryCode}.jpg" alt="" width="${ww}" height=${hh} /></td>`
      segment += `</tr>`



    }
    segment += `</tbody></table>`
    // edt.value(segment)
    this.editor.value(segment)
    this.saveMerge()


  }
  saveMerge() {
    let savetime = moment().format('MM/DD/YY h:mm:ss a')
    console.log('this.editor.value()',this.savedlist, this.editor.value())
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

  save1() {

    //     let dtransportto = `${this.Description.Description}`
    //     let dtransportfrom = `${this.Description2.Description}`
    this.api.getbatchno().then((jsonResna) => {
      let batchno = jsonResna[0].nextavail
      this.item.batchno = batchno
      this.item.savedlist = this.savedlist
      this.api.batchTransport(this.item)
        .then((jsonRes) => {
          if (jsonRes.data === 'success') {
            alert(' batch updated  batchno= ' + batchno)
            this.item = {}//.TransportDate = ''
            //  this.Description =''
            //  this.Description2 =''
            // this.item.Description = ''
            // this.item.Description2 = ''
            // this.item.Description2 = ''
            // this.item.TransportNotes = ''

          } else alert(' batch failed ')
        })
    })
  }

  save2() {
    this.item.savedlist = this.savedlist
    this.api.getbatchno().then((jsonResna) => {
      let batchno = jsonResna[0].nextavail
      this.item.batchno = batchno
      this.api.batchExhibit(this.item)
        .then((jsonRes) => {
          if (jsonRes.data === 'success') {
            alert(' batch updated batchno= ' + batchno)
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
    })
  }

  save3() {
    // Reproduction Provenance batchMrglocation batchTemplocation batchOfferings
    this.item.savedlist = this.savedlist
    this.api.getbatchno().then((jsonResna) => {
      let batchno = jsonResna[0].nextavail
      this.item.batchno = batchno
      this.api.batchReproduction(this.item)
        .then((jsonRes) => {
          if (jsonRes.data === 'success') {
            alert(' batch updated  batchno= ' + batchno)
            this.item = {}
          } else alert(' batch failed ')
        })
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

