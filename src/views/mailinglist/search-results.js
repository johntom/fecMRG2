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
  hide1 = true;
  hide2 = true;

  hide9 = true;
  item = {};
  message = '';
  showhelp = false;
  mailingstatus = [
    { id: 1, name: 'Mailing list' },
    { id: 2, name: 'No Mailings' },
    { id: 3, name: 'Unsubscribed' }

  ]

  deceasedstatus = [
    { id: 1, name: 'not deceased' },
    { id: 2, name: 'deceased' },
    { id: 3, name: 'either' }
  ]
  //  excelExport(e) {
  //       //   var rows = e.workbook.sheets[0].rows;
  //       //  var sheet = e.workbook.sheets[0];
  //       //  var savedTemplate = kendo.template(this.columns[8].template);
  //       //  var data = this.dataSource.view();

  //       var sheet = e.workbook.sheets[0];
  //       var template = kendo.template(this.columns[8].template);

  //       for (var i = 1; i < sheet.rows.length; i++) {
  //           var row = sheet.rows[i];

  //           let diff = 'test'
  //           row.cells.push({ 'value': diff })
  //       }
  //   }



  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        //  this.loadData(this.capColor, this.prevtown)
        // this.loadData()
        //   .then((inv) => {
        //     // console.log(' inv datasource ', inv[0]);
        //     options.success(inv);
        //   });
        options.success(this.invdata);
      },
      update: (options) => {
        let updatedItem = options.data;
        options.success(updatedItem)
      },
      destroy: (options) => {
        let updatedItem = options.data;
        this.deleteData(updatedItem)
          .then((scans) => {
            options.success(scans)
            // this.dataSource.read()
          })
        options.success()
      },
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          offeramount: { type: "number" }, // scan template
          // Artist: { type: "string" }, // barcode insured
          //  ArtistRegistra: { type: "string" },
          listName: { type: "string", editable: false },
          FirstName: { type: "string", editable: false },
          LastName: { type: "string", editable: false },
          contactid: { type: "string", editable: false }
          //  ,interests: { type: "textarea"} //eq error
          //       "listName" : "test", 
          // "contactid" : "5c146faed2c10b602e3515fa", 
          // "FirstName" : "Dennis", 
          // "LastName" : "Gleason", 
          // "createdAt" : ISODate("2019-05-20T06:53:07.972+0700"), 
          // "updatedAt" : ISODate("2019-05-20T06:53:07.972+0700")
        }
      }
    },
    excelExport: function (e) {
      e.workbook.fileName = "Grid.xlsx";
      e.allPages = true;
      var sheet = e.workbook.sheets[0];
      var template = kendo.template(this.columns[8].template);

      for (var i = 1; i < sheet.rows.length; i++) {
        var row = sheet.rows[i];

        let diff = 'test'
        row.cells.push({ 'value': diff })
      }
    },
    pageSize: 15,
    // height: 500,
    sort: [{ field: 'LastName', dir: 'asc' }, { field: 'FirstName', dir: 'asc' }],

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
    this.search.state = 'null'
    this.search.catalogid = 'null'
    // search.state='';
    // search.state 'null'
    // this.search.deceased = true
    // this.search.nomailings = true
    // this.search.noinfo = true
    this.search.keywords = []
    this.search.genres = []
    this.search.mailingStatus = 0
    this.search.searchedCriteria = ''
    //http://www.sobell.net/busy-spinner-in-aurelia/
    this.busy = {}
    this.busy.active = true
    this.showhelp = false
    // this.selectedContent = '<b>' + imageCat[this.imageindex].Title + '</b> </br>' + imageCat[this.imageindex].Caption;

    let help = 'Each Seperate search is build with <b>And Logic</b> except where noted in label with [or]</br>'
    help = help + 'Each Addional search is build with <b>Or Logic</b></br>'
    help = help + 'i.e Select Mailing Status=nomail, domestic and type= Art Fair & Billionaire</br>'
    help = help + 'will fetch every contact with all those consitions using <b>And Logic</b></br>'
    help = help + 'if you select i.e Select Mailing Status=nomail, domestic and type= Art Fair & Billionare</br>'
    help = help + 'press search </br>'
    help = help + 'then if you select i.e Select Mailing Status=nomail, domestic and type=Billionaire</br>'
    help = help + 'you will have a larger result set where each contact will have one or both types using <b>Or Logic</b></br>'
    help = help + '</br>'
    help = help + 'Some large searches might require closing form and reopening</br>'

    this.help = help;
  }

  textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
  }
  async deleteData(updatedItem) {

    let response = await this.api.deletemlrow(updatedItem);
    await this.loadData();
    this.datasource.read()


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

    let flag = false
    let datasource = this.datasource
    e.container.find(".k-grid-cancel").bind("click", function () {
      flag = true
      datasource.read()

    })
  }
  async deletelist() {
    // 2020
    let name = this.mailinglist;

    let obj = {}
    obj.type = 1 //question.type 
    obj.name = `You are about to delete all items in the mailinglist ${name} Press Cancel or Delete?`
    let ans = ''
    let res = await this.dialogService.open({ viewModel: Promptyn, model: obj, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        // this.addnewms(findvalue)
        ans = false
      } else {
        console.log('cancel');
        ans = true
      }
      return ans
      console.log(response.output);
    });

    // alert('res '+res+' ans '+ans) 
    if (!ans) {
      let response = await this.api.deletemlistname(name);
      await this.loadData();
      this.datasource.read()
    }

    // let response = await this.api.deletemlistname(name);
    // this.datasource.read()
  }
  async activate(params, routeConfig) {
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
    this.search.mailinglist = slname

    //     // alert(this.mailinglist)
    //     console.log('activate this.mailinglist queryParams', this.mailinglist, this.queryParams)
    //   await  this.loadData();
    //     this.busy.active = false
    //  this.datasource.read()
    await this.loadData();
    this.busy.active = false
    this.search.deceasedStatus = 1
  }
  async attached() {
    // await this.loadData();
    //   this.busy.active = false

    this.datasource.read()
  }
  performClear() {
    this.search.keywords = []
    //  this.multiselect-keywords=''
    this.search.genres = []
    this.search.mailingStatus = 0
    this.search.searchedCriteria = ''
    this.search.mailingStatus = 0
    this.busy.active = false
  }
  performDefault() {
    this.search.mailingStatus = 1
    this.search.notinternational = true


  }
  async performSearch() {
    // this.spinner.class 
    this.busy.active = true
    if (this.search) {

      let search = this.search //JSON.stringify(this.search)    
      ///// let str = `?mailinglist=${search.mailinglist}`
      let strStart = `?billinglist=${search.mailinglist}`
      let str = ''
      //  let str =''
      if (search.artists !== undefined) {
        str += `&artists=${search.artists}`
        // str += `&artists="Bellows, George", "Lewis, Norman"`
      }
      if (search.keywords.length !== 0) {
        str += `&keywords=${search.keywords}`
      }
      if (search.genres.length !== 0) {
        str += `&genres=${search.genres}`
      }
      if (search.city !== undefined) {
        str += `&city=${search.city}`
      }
      if (search.state !== undefined && search.state !== null) {
        str += `&state=${search.state}`
      }
      if (search.contactl !== undefined) {
        str += `&contactl=${search.contactl}`
      }
      if (search.contactf !== undefined) {
        str += `&contactf=${search.contactf}`
      }
      if (search.holidaylist === true) {
        str += `&holidaylist=${search.holidaylist}`
      }
      if (search.masterlist === true) {
        str += `&masterlist=${search.masterlist}`
      }

      if (search.mailingStatus === undefined || search.mailingStatus === 0) {
      } else str += `&mailingStatus=${search.mailingStatus}`

      console.log('\n\n================= ', str)
      // if (search.nomailings === true) {
      //   str += `&nomailings=${search.nomailings}`
      // }
      if (search.deceasedStatus !== undefined) {
        // str += `&deceased=${search.deceased}`
        str += `&deceasedStatus=${search.deceasedStatus}`
      }
      console.log('\n\n===search.deceasedStatus============== ', search.deceasedStatus, str)
      // if (search.noinfo === true) {
      //   str += `&noinfo=${search.noinfo}`
      // }
      if (search.international === true) {
        str += `&international=${search.international}`
      }
      if (search.notinternational === true) {
        str += `&notinternational=${search.notinternational}`
      }

      if (search.nolongerherecatalogssent === true) {
        str += `&nolongerherecatalogssent=${search.nolongerherecatalogssent}`
      }
      // if (search.catalogid !== undefined null) {
      //         // only allowed
      //          str = `?billinglist=${search.mailinglist}`
      //         str += `&catalogid=${search.catalogid}`
      //       }  
      ///// this.search.deceased = this.search.deceasedStatus// bring up eveyone

      if (str === '') {
        alert(' you must add a filter')
        this.busy.active = false
      } else {
        str = strStart + str
        this.previnv = this.invdata
        ////  this.performClear();
        // this.search.keywords = []
        // this.search.genres = []
        // this.search.mailingStatus = 0
        // this.search.searchedCriteria = ''
        // this.search.mailingStatus = 0
        // this.busy.active = false
        console.log('str ', str)
        //       doWork(callback) {
        //  setTimeout(() => callback(this.name), 15); 
        // }
        await this.api.findContact(str, this.mailinglist)//this.listname)
          .then((jsonRes) => {
            this.invdata = jsonRes.data;
            this.recct = this.invdata.length;
            // alert('rec ct '+ this.recct)
            console.log('str ', this.recct)
            if (this.recct !== 0) this.search.searchedCriteria += ';' + str + ' ct=' + this.recct
            // mar16     this.search = {}
            // mar16     this.search.state = 'null'
            // mar16     this.search.catalogid = 'null'
            // mar16     this.search.mailingStatus = 0
            // mar16     this.search.searchedCriteria = ''

          });

        // alert('loadData ')
        await this.loadData();
        this.busy.active = false
        // mar16 this.performClear(); // jan 2020
        return this.datasource.read()


      }
    }
  }
  async showhelpfunc() {
    this.showhelp = !this.showhelp;
  }

  loadGrid() {
    let options = localStorage["kendo-grid-mail"]
    if (options) {
      this.grid.setOptions(JSON.parse(options))
    }
  }
  async loadDataP() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    let inv;

    return this.api.findmailinglist(this.mailinglist).then((jsonRes) => {

      inv = jsonRes.data;
      this.invdata = inv;
      this.recct = inv.length;
      this.busy.active = false
      // this.datasource.read()
      return inv
    });
  }
  async loadData() {
    console.log('this.loadData ')
    let s2 = '1-1-2016';
    let s3 = '10-21-2016';
    //let inv;

    return this.api.findmailinglist(this.mailinglist).then((jsonRes) => {

      this.invdata = jsonRes.data;
      // this.invdata = inv;
      this.recct = this.invdata.length;
      // this.busy.active = false

      // return this.invdata
    });
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



  detailsEdit(e) {
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);

    // if (this.datasource._data.length === 1) {
    //   let tab = this.appService.tabs.find(f => f.isSelected);
    //   this.closeTab(tab);
    // }
    // find index
    //  let garray = this.datasource._data;
    let gid = this.invdata.findIndex(x => x.id === dataItem.id)
    let rt2 = '#/contact/data/' + dataItem.contactid + '?' + dataItem.LastName + ',' + dataItem.FirstName + '-' + gid///+' '+dataItem.ID

    // let rt2 = '#/contact/data/' + dataItem.id;
    this.router.navigate(rt2);

  }
  requestclose() {
    //console.log(this.appService.originalrec, this.currentItem)

    const resetFunc = () => { this.appService.originalrec = this.currentItem; };
    let tab = this.appService.tabs.find(f => f.isSelected);
    let index = this.appService.tabs.findIndex(f => f.isSelected)


    let newIndex = (index > 0) ? index - 1 : 0;
    let newTab = this.appService.tabs[newIndex];
    this.appService.tryCloseTab(this.appService.currentView, tab, newTab.href);


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