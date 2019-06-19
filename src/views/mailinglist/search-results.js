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
  message = ''
  mailingstatus = [
    { id: 1, name: 'Mailing list' },
    { id: 2, name: 'No Mailings' },
    { id: 3, name: 'Unsubscribed' }
  ]


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
      },
      destroy: (options) => {

        let updatedItem = options.data;
        // alert(`delete ${updatedItem.LastName}, ${updatedItem.LastName} `)
        // console.log('   updatedItem ', updatedItem)
        this.deleteData(updatedItem)
          .then((scans) => {
            options.success(scans)
            this.dataSource.read()
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
    this.search.state='null'

    // this.search.deceased = true
    // this.search.nomailings = true
    // this.search.noinfo = true
    this.search.keywords = []
    this.search.genres = []
     this.search.mailingStatus = 0

  }
  //   setInitialValue(edt) {
  //     if (this.currentItem.interests !== undefined) 
  //     edt.value(this.currentItem.interests);
  //   }
  //   textAreaEditor(container, options) {
  //     alert ('ta')
  //   //  $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
  //    $('<textarea class="k-textbox" name="interests" style="width:100%;height:100%;" />').appendTo(container);
  //   // $('<textarea name="interests" cols="100"  rows="6" />').appendTo(container);

  //     // $('<textarea name="' + options.field + '" cols="100"  rows="6" />').appendTo(container);
  //   }
  //  nonEditor(container, options) {
  //   //  console.log('in nonEditor', options.field)

  //         // container.text(options.model[options.field]);
  //         // container.interests.textarea(container.interests);
  //       //  container.interests(container.interests);
  //        //    container.interests.text=container.interests
  //         // let grid = this.grid;
  //         // let targetRow = $(container.target).closest("tr");
  //         // grid.select(targetRow);

  //     }
  async deleteData(updatedItem) {

    let response = await this.api.deletemlrow(updatedItem);
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
    // this.datasource.read()
    // alert(this.mailinglist)
    console.log('activate this.mailinglist queryParams', this.mailinglist, this.queryParams)

    // let response = await this.api.findCatalogone(this.mailinglist);
    // this.catalog = response.data[0]

  }

  performClear() {
    this.search.mailingStatus = 0

  }
  performDefault() {
    this.search.mailingStatus = 1
    this.search.notinternational = true


  }
  async performSearch() {

    if (this.search) {

      let search = this.search //JSON.stringify(this.search)    
      let str = `?mailinglist=${search.mailinglist}`
      if (search.artists !== undefined) {
        str += `&artists=${search.artists}`
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
      if (search.state !== undefined) {
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
      if (search.mailingStatus !== undefined) {
        str += `&mailingStatus=${search.mailingStatus}`
      }
      console.log('\n\n================= ')

      // if (search.nomailings === true) {
      //   str += `&nomailings=${search.nomailings}`
      // }
      if (search.deceased === true) {
        str += `&deceased=${search.deceased}`
      }
      // if (search.noinfo === true) {
      //   str += `&noinfo=${search.noinfo}`
      // }
      if (search.international === true) {
        str += `&international=${search.international}`
      }
      if (search.notinternational === true) {
        str += `&notinternational=${search.notinternational}`
      }

      return this.api.findContact(str, this.mailinglist)//this.listname)
        // return this.api.findContact(ds, this.listname)
        .then((jsonRes) => {
          // inv = jsonRes.data;



          this.invdata = jsonRes.data//inv;
          this.recct = this.invdata.length;
          this.datasource.read()
        });


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
    // this.listname = 'test'
    // return this.api.findmailinglist(this.listname).then((jsonRes) => {
    let response = await this.api.findCatalogone(this.mailinglist);
    this.catalog = response.data[0]

    return this.api.findmailinglist(this.mailinglist).then((jsonRes) => {

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
