import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import moment from 'moment';
import { DialogService } from 'aurelia-dialog';
import { Promptyn } from '../../../services/promptyn';
import { Prompt } from '../prompt';
import { bindable } from 'aurelia-framework';
@inject(ApiService, ApplicationService, DialogService)
export class Docs {
  @bindable searchdoc
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  status = false;
  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.showdocs = this.currentItem.docs
    this.dialogService = dialogService
  }

  activate(params, routeConfig) {

  }
  modalDocs() {
    this.currentItem.fieldname = 'docs'
    this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
      console.log(response.output);
    });
  }
  searchdocChanged(value) {
    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }


  promiseDialog(obj) {
    return new Promise((resolve, reject) => {
      let rec = { name: `Press OK to Overwrite or Cancel ${obj.name} ?`, type: 3 }
      this.dialogService.open({ viewModel: Promptyn, model: rec, lock: false }).whenClosed(response => {
        let out = { name: obj.name, val: obj.val, ext: obj.ext, resp: response.wasCancelled }
        // send object back with answer
        resolve(out)
      });
    });
  }


  async checkData(images, formData) {
    let promises = []
    return new Promise((resolve, reject) => {
      let i = 0;
      let docs = this.currentItem.docs
      if (docs === undefined) docs = []
      let imagelen = images.length
      for (i = 0; i < images.length; i++) {
        let ext = images[i].name.split('.').pop();
        let fname = images[i].name
        let mid = -100// not needed
        let ival = i
        mid = docs.findIndex(x => x.FILE_NAME === fname)
        if (mid > -1) {
          let obj = { name: fname, val: ival, ext: ext }
          var promise = this.promiseDialog(obj)

          promises.push(promise);
        } else {
          var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          docs.unshift(item)
          formData.append('file', images[ival]);
        }
      }
      return Promise.all(promises).then(values => {
        for (i = 0; i < values.length; i++) {
          if (!values[i].resp) {
            var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext, OVERWRITE: 'Y' }
            formData.append('file', images[values[i].val]);
          }
        }
        resolve(formData)
      })
    })
  }

  addDocs(images) {
    //images is file
    //check for dups 2/21/2018
    //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
    if (this.currentItem.docs === undefined) this.currentItem.docs = []
    let docs = this.currentItem.docs
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
      let newform = values;
      console.log('after checkdata1 ', this.status, newform);
       this.api.upload(newform, this.currentItem.InventoryCode)
        .then((jsonRes) => {
          this.showdocs = docs

          $("#file").val("");
        })
    })

    // this is not a good way to get value this.items = Promise.resolve(this.checkData(images));
    //  console.log('after checkdata1 just a promise cant pick off value ',  this.status,this.items);

    //  return Promise.all([  this.checkData(images)]).then(values => {
    //     this.items = values[0];
    //      console.log('after checkdata1 ',  this.status,this.items);
    //   }).catch(error => {
    //     console.error("Error encountered while trying to get data.", error);
    //   });

  }

}


