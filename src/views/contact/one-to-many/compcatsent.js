import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { Promptcontact } from '../prompt';



@inject(ApiService, ApplicationService, DialogService)
export class Compcatsent {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  // provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    
    this.currentItem = this.appService.currentContactItem;

    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
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
  // remove(item) {
  //   alert('you are about to delete ' + item.ProvMemo)
  // }
  saveitem(item, index) {
    item.edit = !item.edit

  }
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0


    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let catalogsent = this.currentItem.catalogsent
        catalogsent.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
  addit() {
    //alert('in addit prov')
  }
  // tr repeat.for="catalogsent of currentItem.catalogsent " with.bind="catalogsent"

  addItem() {
    let catalogsent = this.currentItem.catalogsent
    let flag = false
    let item
    // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (catalogsent === undefined) {
      flag = true
      catalogsent = []
    }
    let cDate = moment().format('YYYY-MM-DD')

    item = {}// ConsignmentNotes: '', CreatedDate: cDate, edit: true }
    catalogsent.unshift(item)
    if (flag) this.currentItem.catalogsent = catalogsent
  }
 showModal(fieldname, CatalogID,index) {
    this.currentItem.fieldname = 'Catalog'//fieldname
 // perhaps this should come from catalogcontactsent and not as an embedded array
    this.currentItem.catalog = this.currentItem.catalogsent[index]//.artists
    if (this.currentItem.catalog.CatalogTitle === undefined || this.currentItem.catalog.CatalogTitle === '') this.currentItem.catalog.CatalogTitle = '';

    this.dialogService.open({ viewModel: Promptcontact, model: this.currentItem, lock: true }).whenClosed(response => {
      if (response.wasCancelled) {
        console.log('cancel');
      } else {
        this.currentItem.catalogsent[index].id = this.currentItem.catalog.id
        this.currentItem.catalogsent[index].CatalogTitle = this.currentItem.catalog.CatalogTitle
        let catalogrec = {}
        catalogrec.id = this.currentItem.catalog.id;
        catalogrec.CatalogTitle = this.currentItem.catalog.CatalogTitle;
        this.currentItem.catalogsent[index] = catalogrec;
        this.currentItem.catalog = catalogrec
        this.catname = catalogrec
      }
      console.log(response.output);
    });
  }
}
