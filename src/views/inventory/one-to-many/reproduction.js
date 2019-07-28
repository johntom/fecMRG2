import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { PromptForm } from '../promptForm';
import { Promptrepro } from '../../prompt/promptRepro';

   import jsRapTable from '../../../../jslib/jsRapTable';

// import tablesorter from  '../../../../jslib/jquery.tablesorter.min';
// import tablesorterw from '../../../../jslib/jquery.tablesorter.widgets';
// import tablesorters from '../../../../jslib/widget-scroller';


@inject(ApiService, ApplicationService, DialogService)
export class Reproduction {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {
    // if (params.id) {
    //   this.recordId = params.id; 
    //   this.heading = `DataForm for record ${this.recordId}`;

    //   console.log('this.recordId ', this.recordId);
    //   return this.api.findInventoryOne(this.recordId)
    //     .then((jsonRes) => {
    //       console.log('jsonRes ', jsonRes);          
    //       let inv = jsonRes.data;
    //       this.currentItem = inv[0];
    //       console.log('data-form:activate - currentItem', this.currentItem);
    //       this.inv = inv[0]
    //       // console.log('this.inv loadData 0 ', inv[0].InventoryCode);
    //       return inv
    //     });
    // }

  }

  // attached() {
  //   $(document).ready(function () {
  //     $('#dtVerticalScrollExample').DataTable({
  //       "scrollY": "200px",
  //       "scrollCollapse": true,
  //       "ordering": false,
  //     });
  //     // $('.dataTables_length').addClass('bs-select');
  //   });

  // }

  modal(item, index) {

    // this.currentItem.recordId = this.recordId model:this.currentItem
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item

    currentModel.currentItem.hide1 = false


    // this.dialogService.open({ viewModel: PromptForm, model: currentModel, lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptrepro, model: currentModel, lock: true }).whenClosed(response => {
      // this.dialogService.open({ viewModel: Promptrepro, model: item, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('item', item);
        item.edit = false//this.saveitem(item, index)
      } else {

        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }
  // selectChanged(ReproductionExhibit, index, opt) {
  //   let rid = ReproductionExhibit// this.currentItem.reproduction[index]._id// ReproductionTitle
  //   let mid = this.currentItem.exhibition.findIndex(x => x._id === rid)
  //   // alert(this.currentItem.reproduction[index].ReproductionTitle)
  //   this.currentItem.reproduction[index].ReproductionType = "59d282beb777d41f42a5a2c9"
  //   this.currentItem.reproduction[index].ReproductionTitle = this.currentItem.exhibition[mid].ExhibitTitle
  //   this.currentItem.reproduction[index].ReproductionExhibit = rid
  //   console.log('rep ' + this.currentItem.exhibition[mid].ExhibitTitle + ' ' + `${this.ReproductionExhibit}` + ' ' + opt)
  // }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    // let adjusters = this.currentItem.adjusters
    // adjusters.splice(index, 1)
    this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let adjusters = this.currentItem.reproduction
        reproduction.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  addRepro() {
    let reproduction = this.currentItem.reproduction
    let flag = false
    let item
    if (reproduction === undefined) {
      flag = true
      reproduction = []
    }
    item = {
      ReproductionAuthor: '', AuthorFirst: '', AuthorLast: '', ReproductionTitle: '',
      ReproductionName: '', ReproductionLocation: '',
      ReproductionDate: '', ReproductionPage: '',
      Sequence: '', ReproductionType: '', ReproductionPage: '', ColorBW: '', ReproductionSortDate: '', edit: true
    }

    reproduction.unshift(item)
    if (flag) this.currentItem.reproduction = reproduction

    this.modal(item, 0) // unshirt reproduction.length + 1)

    // this.newNoteWorkDate = '';
    // this.newNoteNote = '';

  }
  changeSelect(opt) {

    console.log('opt', opt)
  }

  remove(item, index) {

    //     alert('you are about to delete ' + item.ProvMemo)
    //     this.currentItem.reproduction[$index].
    //   }
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        // let reproduction = this.currentItem.reproduction
        this.currentItem.reproduction.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
   attached() {
    $(document).ready(function () {
       $('#raptable').jsRapTable({
      //   onSort: function (i, d) {
      //      console.log(i,'i-d',d)
      //     $('tbody').find('td').filter(function () {
      //       return $(this).index() === i;
      //     }).sortElements(function (a, b) {
      //          console.log(a,'a-b',b)
      //       if (i) {
      //        console.log('text', $.text([a]))
      //                      return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
      //       }else
      //         return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
      //     }, function () {
      //       return this.parentNode;
      //     });
      //   },
      });

     // $('table').tablesorter({
      // $('table').tablesorter({
        
      //   theme: 'default',
      //   //   headerTemplate : '{content} {icon}',
      //   // filter not working for i.e  artist.lname 
      //   widgets: [ 'scroller'],

      //   widgetOptions: {
      //     // This allows setting the number of fixed columns to add to the
      //     // scroller
      //     // scroller_fixedColumns: 1,
      //     // Set the height of the scroll window in pixels
      //     scroller_height: 400,
      //     // scroll tbody to top after sorting
      //     scroller_upAfterSort: true,
      //     // pop table header into view while scrolling up the page
      //     scroller_jumpToHeader: true,
      //     // Setting this to true will add a fixed overlay which can be used
      //     // for styling; A class name of "tablesorter-scroller-fixed-panel"
      //     // is added to the overlay.
      //     scroller_addFixedOverlay: false,
      //     // Set the width of the scroll bar in pixels; set to `null` to have
      //     // the width calculated internally as it is dependent on the browser
      //     scroll_barWidth: null,
      //     // Set this to a class name to use when hovering over a fixed column
      //     // row
      //     scroller_rowHighlight: "hover"
        
      // },
      //   initialized: function (table) {
      //     // Not an ideal solution to fix column alignment,
      //     // but it works (for now)
      //     $(table).resize();
      //   }
      // });
    
    
     })




  }

}
