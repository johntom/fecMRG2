import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { Promptcontact } from '../prompt';
// import { bindable } from 'aurelia-framework';



// @inject()
// @inject(Router, UtilService, ApplicationService, MyDataService,DialogService)

@inject(ApiService, ApplicationService, DialogService)
export class Artists {
  // @bindable searchdoc
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  //   provenance: Provenance[] = []
  done = false;
  edit = false;
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      // read: (options) => {
      //   //   this.currentItem.reproduction
      //   this.loadData()
      //     .then((repro) => {
      //       console.log(' repro datasource ', repro[0]);
      //       options.success(repro);
      //     });
      // },   this.datasource.read()z
      read: (options) => {
        options.success(this.currentItem.artists);
        this.currentItem.artists = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        //updatedItem.offerdate = this.offerdate
        //console.log('   updatedItem ', updatedItem)
        options.success(updatedItem)
      },
      destroy: (options) => {
        let updatedItem = options.data;
        options.success(updatedItem)
      }
    },
    schema: {
      model: {
        id: "id", // Must assign id for update to work
        fields: {
          ArtistName: { type: "string", editable: true }, // scan template
        }
      }
    },
    // pageSize: 12,
  })


  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentContactItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
    //this.epoch = moment().unix();
 //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.artists === undefined) this.currentItem.artists = []
    //////////////////////////////////////////////////////////////////////////////

  }

  activate(params, routeConfig) {
  }
  // <input click.delegate="showModal('PhotographerID',$index)" type="text" id="PhotographerID" class="form-control input-sm" value.bind="photographername">
  attached() {
    // console.log(this.htmltable);
      // this.datasource.read()
  }
  addItem() {
    let artists = this.currentItem.artists
    let flag = false
    let item
    if (artists === undefined) {
      flag = true
      artists = []
    }
    item = {
      ArtistName: ''
    }
    artists.unshift(item)
    if (flag) this.currentItem.artists = artists
    this.newartists = '';
    this.showModal('Artist', 0)

  }
  // artists[{"id" : ObjectId("5c15812fd1ce1404366cd075"),             "ArtistName" : "Alston, Charles",             "yearofBirth" : NumberInt(1907),             "died" : NumberInt(1977)
  showModal(fieldname, index) {
    // make this work just on inventory and change prompt to maybe point to it
    this.currentItem.fieldname = 'Artist'//fieldname
    this.currentItem.artist = this.currentItem.artists[index]//.artists
    if (this.currentItem.artist.ArtistName === undefined) this.currentItem.artist.ArtistName = '';
    this.dialogService.open({ viewModel: Promptcontact, model: this.currentItem, lock: true }).whenClosed(response => {
      if (response.wasCancelled) {
        console.log('cancel');
      } else {
        let artist = response.output.artist
        let artistrec = {}
        artistrec.id = artist.id;
        artistrec.ArtistName = artist.ArtistName;
        artistrec.yearofBirth = artist.YearofBirth;
        artistrec.died = artist.Died;
        this.currentItem.artists[index] = artistrec;
        this.datasource.read()
        // get it to refresh
        // let holdarray = this.currentItem.artists
        // this.artname = artistrec
        // this.artist = artistrec
        // // this.currentItem.artists = ''//[]
        //  this.currentItem.artists = holdarray
        //    this.currentItem.note='test'
        // this.appService.currentContactItem = this.currentItem
        //  this.htmltable.refresh();
      }
      // console.log(response.output);
    });
  }

 

  detailsEdit(e) {
    let grid = this.grid; 
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    let currentModel = {}
    // currentModel.currentItem = this.currentItem
    // currentModel.item = dataItem
let artistarray =this.currentItem.artists
let artistname  =dataItem.ArtistName
// let aid = artistarray.findIndex(x => x.ArtistName === artistname)
// //   console.log('aid',aid)
//      let aid = artistarray.findIndex(x => {
//        console.log( x.ArtistName , x.ArtistName === artistname)
//      }
//     //   x.ArtistName === artistname}
//        )

   let aid =_.findIndex(artistarray, {ArtistName:artistname}); // 2
    console.log('aid ',aid)
    this.showModal('Artist',aid)// aid)
    // this.dialogService.open({ viewModel: Promptarist, model: currentModel, lock: true }).whenClosed(response => {
    //   if (!response.wasCancelled) {
    //     console.log('dataItem', dataItem);
    //     // not needed this.currentItem.reproduction[0]=dataItem
    //      this.datasource.read()

    //   } else {
    //     console.log('cancel');
    //   }

    // this.currentItem.reproduction = this.datasource._data 
    // console.log(response)//.output);
    // });
  }

  remove(item, index) {
    this.mode = 0
    //artist of currentItem.artists

    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let artists = this.currentItem.artists
        artists.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
}

