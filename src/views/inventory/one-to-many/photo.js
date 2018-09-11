
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { ynPrompt } from '../../../services/prompt';
import { Prompt } from '../prompt';
@inject(ApiService, ApplicationService, DialogService)
export class Photo {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
   recordId = '';
 //   provenance: Provenance[] = []
  done = false;
  edit = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {
  
  }
 	// <input click.delegate="showModal('PhotographerID',$index)" type="text" id="PhotographerID" class="form-control input-sm" value.bind="photographername">
		
showModal(fieldname,index) {
   this.currentItem.PhotographerID=   this.currentItem.photo[index].PhotographerID  
  this.currentItem.photographername=  this.currentItem.photo[index].photographername

    this.dialogService.open({ viewModel: Prompt, model: fieldname, lock: false }).whenClosed(response => {
      this.currentItem.photo[index].PhotographerID = this.currentItem.PhotographerID
      this.currentItem.photo[index].photographername = this.currentItem.photographername
      if (!response.wasCancelled) {
        
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
	
 addDetail() {
 let photo = this.currentItem.photo
    let flag = false
    let item
   // let newNoteWorkDate = moment().format('YYYY-MM-DD')
    if (photo === undefined) {
      flag = true
      photo = []
    }
    item = {  PhotoMemo: '', edit: true }
    photo.unshift(item)
    if (flag) this.currentItem.photo = photo
  }
 saveitem(item,index) {
    item.edit = !item.edit
   

  }
  remove(item, index) {
     this.mode = 0


    this.dialogService.open({ viewModel: ynPrompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('Delete')
        let provenance = this.currentItem.provenance
        provenance.splice(index, 1)
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });
  }
}

