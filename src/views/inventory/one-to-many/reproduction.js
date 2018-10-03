import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Reproduction {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
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

    // this.newNoteWorkDate = '';
    // this.newNoteNote = '';

  }




  remove(item) {
    alert('you are about to delete ' + item.ProvMemo)
  }
}
