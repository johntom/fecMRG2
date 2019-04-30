import { inject } from 'aurelia-dependency-injection';
// import $ from 'jquery';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Genre {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
  // notes: Note[] = [];
  newNoteWorkDate = '';
  newNote = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentContactItem;//testrec;
    this.mode = 0;
    this.editrec = '';
    // this.inputable='disabled'
    this.isDisableEdit = true
    this.currentnote = '';
    this.dialogService = dialogService
  }
  test(index) {
    console.log('test ' + index, (index === this.editrec && this.mode > 0))
    return !(index === this.editrec && this.mode > 0)

  }

  saveitem(item, index) {
    item.edit = !item.edit
    // console.log('saveitem ', item);
    // this.currentAdjuster = item.ADJUSTER
    // this.currentClaim = item.CLAIM
    // //this.flag = 1

    // this.openCount -= 1

  }


  activate(params, routeConfig) {

  }
  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';

    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let notes = this.currentItem.notes
        notes.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }

  // <!-- "genres" : [
  //         {
  //             "_id" : ObjectId("5c26ab7b18b45eec4d910806"), 
  //             "ID" : NumberInt(5714), 
  //             "ContactID" : NumberInt(7), 
  //             "OrgID" : "", 
  //             "GenreID" : NumberInt(2268), 
  //             "GenreNotes" : "", 
  //             "createdAt" : ISODate("2018-12-28T23:02:19.744+0000"), 
  //             "updatedAt" : ISODate("2018-12-28T23:02:19.744+0000")
  //         }
  //     ],  -->
  addGenre() {

    let genres = this.currentItem.genres
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (genres === undefined) {
      flag = true
      genres = []
    }
    item = { GenreID: 0, GenreNotes: '', edit: true }
    genres.unshift(item)
    if (flag) this.currentItem.genres = genres

    this.newNoteWorkDate = '';
    this.newNoteNote = '';

  }

  // addItem() {
  //   let artists = this.currentItem.artists
  //   let flag = false
  //   let item
  //   if (artists === undefined) {
  //     flag = true
  //     artists = []
  //   }
  //   item = {
  //     ArtistName: ''
  //   }
  //   artists.unshift(item)
  //   if (flag) this.currentItem.artists = artists
  //   this.newartists = '';
  // }
  //  save(note, index) {
  //    // not used
  //     this.mode = 0
  //     console.log(' this.currentItem.notes', this.currentItem.notes)
  //     this.isDisableEdit = true
  //     document.getElementById('a' + index).disabled = true;
  //     document.getElementById('b' + index).disabled = true;
  //   }


  cancel(item, index) {
    this.mode = 0
    // alert('you are about to cancel ' + item.Notes + ' ' + index)
    let notes = this.currentItem.notes//notes
    // notes.push({WorkDate:'2017-10-30',Notes:'test'})
    if (this.mode === 1) {

      notes.splice(index, 1)
      document.getElementById('a' + index).disabled = true;
      document.getElementById('b' + index).disabled = true;
    } else {

      this.currentItem.notes[index] = this.currentnote
      console.log(' this.currentItem.notes', notes, this.currentItem.notes[index])

    }
    this.mode = 0
    this.isDisableEdit = true


  }


}
