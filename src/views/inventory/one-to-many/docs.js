import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { ynPrompt } from '../../../services/prompt';
import { Prompt } from '../prompt';
import { bindable } from 'aurelia-framework';

// import { DialogImage } from '../dialogImage'
import { DialogImagedetail } from '../dialogImagedetail'

@inject(ApiService, ApplicationService, DialogService)
export class Docs {
  @bindable searchdoc
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  done = false;
  edit = false;
  scrollable = { virtual: true };
  datasource = new kendo.data.DataSource({
    transport: {
      read: (options) => {
        options.success(this.currentItem.docs);
        this.currentItem.docs = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        options.success(updatedItem)
      },

      destroy: (options) => {
        let updatedItem = options.data;

        options.success(updatedItem)
      }
    },


    schema: {
      model: {
        id: "id",
        fields: {
          Date: { type: "date", editable: true },

          FILE_NAME: { type: "string" },
          FILE_EXT: { type: "string" },

        }
      },
    },
  })




  constructor(api, appService, dialogService) {
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
    //////////////////////////////////////////////////////////////////////////////
    if (this.currentItem.docs === undefined) this.currentItem.docs = []
    //////////////////////////////////////////////////////////////////////////////
    this.epoch = moment().unix();
    //   id:this.epoch,
  }

  activate(params, routeConfig) {

  }

  // https://artbased.com/api/v1/downloadonedetail/DOVEAR0014/26492.pdf

  //     		<!-- div class='customer-photo-sq' style="background-image: url(https://artbased.com/api/v1/getimagedetail/${currentItem.InventoryCode}/${FILE_NAME});"-->

  //    	<ak-col k-field="FILE_NAME" k-title="download" k-width="140px" ></ak-col>

  // <a size='100' class="form-control  input-sm" href="https://artbased.com/api/v1/downloadonedetail/${currentItem.InventoryCode}/${currentItem.FILE_NAME};">
  detailsdownload(e) {
    let grid = this.grid;

    var targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    // let rt2 = 'http://jif.bergenrisk.com:8080/api/v1/downloadonepdf/' + dataItem.template + '/' + dataItem.filename + '.pdf'
    let rtdown = `https://artbased.com/api/v1/downloadonedetail/${this.currentItem.InventoryCode}/${dataItem.FILE_NAME}`// + '.pdf'

    //  alert('rt2 '+rt2)
    window.open(rtdown);
  }
  // https://artbased.com/api/v1/downloadonedetail/${currentItem.InventoryCode}/${currentItem.FILE_NAME}


  searchdocChanged(value) {

    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }



  // addPhoto() {
  //   let docs = this.currentItem.docs
  //   let flag = false
  //   let item
  //   let dd = moment().format('YYYY-MM-DD')

  //   if (docs === undefined) {
  //     flag = true
  //     docs = []
  //   }
  //   // Photogpraher: { defaultValue:'Ryan Sobotka' },
  //   // Format: { defaultValue:'8 x 10' },
  //   item = { id: this.epoch, PhotoTaken: 1, Date: dd, Note: '', Photogpraher: 'Ryan Sobotka', Format: 'professional high-rez digital tiff', Precons: true }
  //   docs.unshift(item)
  //   if (flag) this.currentItem.docs = docs
  // }
  saveitem(item, index) {
    item.edit = !item.edit


  }
  showModalImg(e) {
    // this.grid.clearSelection(true);
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr");
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
    dataItem.InventoryCode = this.currentItem.InventoryCode
    this.dialogService.open({ viewModel: DialogImagedetail, model: dataItem, lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
      } else {
        console.log('cancel');
      }
      console.log(response.output);
    });

  }

  addDocs(images) {
    //images is file
    //check for dups 2/21/2018
    //https://stackoverflow.com/questions/32736599/html-file-upload-and-action-on-single-button
    let docs = this.currentItem.docs
    let formData = new FormData()
    let newDate = moment().format('YYYY-MM-DD')
    let flag = false
    let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
      let newform = values;
      console.log('after checkdata1 ', this.status, newform);
      // this.api.upload(formData, this.currentItem.CLAIM_NO)
      this.api.uploadinvphotodetail(newform, this.currentItem.InventoryCode)
        .then((jsonRes) => {
          this.upmess = jsonRes.message
          $("#file").val("");
        })
    })
  }

  async checkData(images, formData) {
    let promises = []
    let flag = true
    return new Promise((resolve, reject) => {
      let i = 0;
      let dd = moment().format('YYYY-MM-DD')

      let docs = this.currentItem.docs
      if (docs === undefined) {
        docs = []
        flag = true
      }
      let imagelen = images.length
      for (i = 0; i < images.length; i++) {
        let ext = images[i].name.split('.').pop();
        let fname = images[i].name
        let mid = -100// not needed
        let ival = i
        if (!flag) {
          mid = docs.findIndex(x => x.FILE_NAME === fname)
        }
        if (mid > -1) {
          let obj = { name: fname, val: ival, ext: ext }
          var promise = this.promiseDialog(obj)

          promises.push(promise);
        } else {
          // var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          var item = { id: this.epoch, Date: dd, FILE_NAME: fname, FILE_EXT: '.' + ext }
          docs.unshift(item)
          formData.append('file', images[ival]);
          if (flag) this.currentItem.docs = docs

        }
      }
      return Promise.all(promises).then(values => {
        for (i = 0; i < values.length; i++) {
          if (!values[i].resp) {
            var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext }
            formData.append('file', images[values[i].val]);
          }
        }
        resolve(formData)
      })
    })
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
  attached() {

  }
}





//////////////////old
// import { inject } from 'aurelia-dependency-injection';
// import { ApiService } from '../../../utils/servicesApi';
// import { ApplicationService } from '../../../services/application-service';
// import moment from 'moment';
// import { DialogService } from 'aurelia-dialog';
// import { Promptyn } from '../../../services/promptyn';
// import { Prompt } from '../prompt';
// import { bindable } from 'aurelia-framework';
// @inject(ApiService, ApplicationService, DialogService)
// export class Docs {
//   @bindable searchdoc
//   heading = 'DataForm HEADER...';
//   footer = 'DataForm FOOTER...';
//   recordId = '';
//   done = false;
//   edit = false;
//   status = false;
//   constructor(api, appService, dialogService) {
//     this.api = api;
//     this.appService = appService;
//     this.inv = '';
//     this.currentItem = this.appService.currentItem//testrec;
//     this.showdocs = this.currentItem.docs
//     this.dialogService = dialogService
//   }

//   activate(params, routeConfig) {

//   }
//   modalDocs() {
//     this.currentItem.fieldname = 'docs'
//     this.dialogService.open({ viewModel: Promptyn, model: 'Delete or Cancel?', lock: true }).whenClosed(response => {
//       console.log(response.output);
//     });
//   }
//   searchdocChanged(value) {
//     this.showdocs = this.currentItem.docs.filter((item) => {
//       if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
//     });
//     return
//   }


//   promiseDialog(obj) {
//     return new Promise((resolve, reject) => {
//       let rec = { name: `Press OK to Overwrite or Cancel ${obj.name} ?`, type: 3 }
//       this.dialogService.open({ viewModel: Promptyn, model: rec, lock: false }).whenClosed(response => {
//         let out = { name: obj.name, val: obj.val, ext: obj.ext, resp: response.wasCancelled }
//         // send object back with answer
//         resolve(out)
//       });
//     });
//   }

//   async checkData(images, formData) {
//     let promises = []
//     return new Promise((resolve, reject) => {
//       let i = 0;
//       let docs = this.currentItem.docs
//       if (docs === undefined) docs = []
//       let imagelen = images.length
//       for (i = 0; i < images.length; i++) {
//         let ext = images[i].name.split('.').pop();
//         let fname = images[i].name
//         let mid = -100// not needed
//         let ival = i
//         mid = docs.findIndex(x => x.FILE_NAME === fname)
//         if (mid > -1) {
//           let obj = { name: fname, val: ival, ext: ext }
//           var promise = this.promiseDialog(obj)

//           promises.push(promise);
//         } else {
//           var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
//           docs.unshift(item)
//           formData.append('file', images[ival]);
//         }
//       }
//       return Promise.all(promises).then(values => {
//         for (i = 0; i < values.length; i++) {
//           if (!values[i].resp) {
//             var item = { FILE_NAME: values[i].name, FILE_EXT: values[i].ext, OVERWRITE: 'Y' }
//             formData.append('file', images[values[i].val]);
//           }
//         }
//         resolve(formData)
//       })
//     })
//   }

//   addDocs(images) {
//       if (this.currentItem.docs === undefined) this.currentItem.docs = []
//     let docs = this.currentItem.docs
//     let formData = new FormData()
//     let newDate = moment().format('YYYY-MM-DD')
//     let flag = false
//     let prom = Promise.resolve(this.checkData(images, formData)).then(values => {
//       let newform = values;
//       console.log('after checkdata1 ', this.status, newform);
//        this.api.upload(newform, this.currentItem.InventoryCode)
//         .then((jsonRes) => {
//           this.showdocs = docs

//           $("#file").val("");
//         })
//     })

//   }

// }


