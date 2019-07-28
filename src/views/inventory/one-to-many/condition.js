import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { Promptyn } from '../../../services/promptyn';
import jsRapTable from '../../../../jslib/jsRapTable';
 
@inject(ApiService, ApplicationService, DialogService)
export class Condition {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  // todos: Todo[] = [];
 
 // condition: Condition[] = []; ASK Matt
 
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;//testrec;
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
  activate(params, routeConfig) {

  }
   saveitem(item,index) {
    item.edit = !item.edit
  
  }

  remove(item, index) {
    // alert('you are about to delete ' + item.Notes + ' ' + index)
    // this.mode = 0

    // let notes = this.currentItem.notes
    // notes.splice(index, 1)// start, deleteCount)
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let condition = this.currentItem.condition
        condition.splice(index, 1)// start, deleteCount)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  // click.delegate="addDetail()">	<span show.bind="!condition.edit">${ConditionDate}</span>

  addDetail() {
    let condition = this.currentItem.condition
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (condition === undefined) {
      flag = true
      condition = []
    }
    item = { Condition: '', edit: true }
    condition.unshift(item)
    if (flag) this.currentItem.condition = condition
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