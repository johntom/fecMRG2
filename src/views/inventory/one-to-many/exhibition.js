import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Prompt } from '../../../services/prompt';
import { DialogService } from 'aurelia-dialog';
import { Promptexhibit } from '../../prompt/promptExhibit';
// with kendo version must load tablesorter here
// import tablesorter from  '../../../../jslib/jquery.tablesorter.min';
// import tablesorterw from '../../../../jslib/jquery.tablesorter.widgets';
// import tablesorters from '../../../../jslib/widget-scroller';

import jsRapTable from '../../../../jslib/jsRapTable';




@inject(ApiService, ApplicationService, DialogService)

export class Exhibition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;
    console.log('this.currentItem  Exhibition', this.appService.currentItem.exhibition);
    this.dialogService = dialogService
  }



  activate(params, routeConfig) {
    this.exhibition = this.appService.currentItem.exhibition   // this.currentItem.exhibition
  }
  // remove(item) {
  //   alert('you are about to delete ' + item.ProvMemo)
  // }
  saveitem(item, index) {
    item.edit = !item.edit

  }

  remove(item, index) {
    //import { Prompt } from '../../../services/prompt';

    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let exhibition = this.currentItem.exhibition
        exhibition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }


  selectChanged(reproid) {
    //  let insco = this.appService.InsurancecompanyList
    let aid = this.repro.findIndex(x => x._id === reproid)
    // let item = this.repro[aid];// { ADJUSTER_ID: 4, ADJUSTER_NAME: "Donna Luciani", edit: true }
    this.currentItem.exhibition[aid].ExhibitRepro = reproid
  }

  addExhibit() {
    // addExhibit ExhibitSponser  ExhibitLocation ExhibitRepro ExhibitDates ExhibitSortDate Traveled ExhibitMemo
    let exhibition = this.currentItem.exhibition
    let flag = false
    let item={}
    if (exhibition === undefined) {
      flag = true
      exhibition = []
      item.id=1
    } else item.id =exhibition.length+1 
    item = {
      id:item.id,
      addExhibit: '', ExhibitSponser: '', ExhibitLocation: '', ExhibitRepro: '',
      ExhibitDates: '', ExhibitSortDate: '',
      Traveled: '', ExhibitMemo: '', edit: true
    }
    exhibition.unshift(item)
    if (flag) this.currentItem.exhibition = exhibition
        this.modal(item, 0) // unshirt reproduction.length + 1)

  }

 modal(item, index) {

    // this.currentItem.recordId = this.recordId model:this.currentItem
    let currentModel = {}
    currentModel.currentItem = this.currentItem
    currentModel.item = item

    // currentModel.currentItem.hide1 = false


    // this.dialogService.open({ viewModel: PromptForm, model: currentModel, lock: false }).whenClosed(response => {
    this.dialogService.open({ viewModel: Promptexhibit, model: currentModel, lock: true }).whenClosed(response => {

      if (!response.wasCancelled) {
        console.log('item', item);
      item.edit = false//this.saveitem(item, index)
      } else {

        console.log('cancel');
      }
      console.log(response)//.output);
    });
  }


   attached() {
    $(document).ready(function () {
      $('#raptable').jsRapTable({
        onSort: function (i, d) {
          $('tbody').find('td').filter(function () {
            return $(this).index() === i;
          }).sortElements(function (a, b) {
            if (i)
              return $.text([a]).localeCompare($.text([b])) * (d ? -1 : 1);
            else
              return (parseInt($.text([a])) - parseInt($.text([b]))) * (d ? -1 : 1);
          }, function () {
            return this.parentNode;
          });
        },
      });

    })
  }


}



  // attached() {
      // $(function() {
    //   $("#myTable").tablesorter();
    // });
  //   $(document).ready(function () {
  //     $('#dtVerticalScrollExample').DataTable({
  //       "scrollY": "200px",
  //       "scrollCollapse": true,
  //       "ordering": false,
  //     });
  //     // $('.dataTables_length').addClass('bs-select');
  //   });

  // }
// attached() {
//     $(document).ready(function () {
//       // $('table').tablesorter({
//       $('table').tablesorter({
//         theme: 'default',
//          widgets: ['filter', 'scroller'],
//         widgetOptions: {
//            scroller_fixedColumns: 1,
//           scroller_height: 400,
//           scroller_upAfterSort: true,
//            scroller_jumpToHeader: true,
//             scroller_addFixedOverlay: false,
//            scroll_barWidth: null,
//            scroller_rowHighlight: "hover"
       
//       },
//         initialized: function (table) {
//           // Not an ideal solution to fix column alignment,
//           // but it works (for now)
//           $(table).resize();
//         }
//       });


//   });
// }