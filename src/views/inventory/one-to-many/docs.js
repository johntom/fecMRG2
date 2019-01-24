import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../../../services/prompt';
@inject(ApiService, ApplicationService,DialogService)
export class Docs {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;

  constructor(api, appService,dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem;
        this.dialogService = dialogService;
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


  addDocs(images) {
    //images is file
    //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
    let docs = this.currentItem.docs
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')

    let flag = false
    if (docs === undefined) {
      flag = true
     docs = []
    }

    for (let i = 0; i < images.length; i++) {

      let ext = images[i].name.split('.').pop();
      var item = { FILE_NAME: images[i].name, FILE_EXT: '.' + ext } //'.pdf' }

      docs.unshift(item)
      formData.append('file', images[i]);
    }
    if (flag)  this.currentItem.docs = docs
    // send file

    console.log('formData', formData)
    //this.api.upload(formData)
    console.log(this.currentItem)
    // this.api.upload(formData, this.currentItem.CLAIM_NO)
    //  this.api.uploadinvphoto(newform, this.currentItem.InventoryCode)
 this.api.uploadinvphoto(formData, this.currentItem.InventoryCode)
 
      .then((jsonRes) => {
        this.upmess = jsonRes.message

        $("#file").val("");
      })
  }
  // addDocs1(images) {
  //   //images is file
  //   //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
  //   let docs = this.currentItem.docs
  //   let newDate = moment().format('YYYY-MM-DD')
  //   let ext = images[0].name.split('.').pop();
  //   var item = { FILE_NAME: images[0].name, FILE_EXT: ext } //'.pdf' }
  //   docs.unshift(item)
  //   // send file
  //   var form = new FormData()
  //   form.append("file", images[0]); //MUST BE LAST only 1 image allowed
  //   console.log('formData', form)
  //   this.api.upload(form)

  //     .then((jsonRes) => {
  //       this.upmess = jsonRes.message

  //       $("#file").val("");
  //     })
  // }
  remove(item) {
  
    //  this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
    //     if (!response.wasCancelled) {
    //       console.log('Delete')
    //       let contacts = this.currentItem.contacts
    //       contacts.splice(index, 1)// start, deleteCount)
    //     } else {
    //       console.log('cancel');
    //     }
    //     console.log(response.output);
    //   });
  }

  save(note, index) {
    // this.mode = 0
    // console.log(' this.currentItem.notes', this.currentItem.notes)
    // this.isDisableEdit = true

    var form = new FormData()
    form.append("file", images[0]); //MUST BE LAST only 1 image allowed
    console.log('formData', form, bin)
    this.api.upload(form)

      .then((jsonRes) => {
        this.upmess = jsonRes.message

        $("#file").val("");
      })


  }

}
