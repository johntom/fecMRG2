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
export class Photo {
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
        options.success(this.currentItem.photo);
        this.currentItem.photo = this.datasource._data // sync to our model
      },
      update: (options) => {
        let updatedItem = options.data;
        // updatedItem.offerdate = this.offerdate
        // console.log('   updatedItem ', updatedItem)
        options.success(updatedItem)
      },

      destroy: (options) => {
        let updatedItem = options.data;
        // alert('in destroy'+updatedItem)

        options.success(updatedItem)
      }
    },


    // Photogpraher: { type: "string", editable: true },
    // Format: { type: "string", editable: true },
    // Photogpraher: { defaultValue: { id: '5d5009f5ee1af1dc544c2558', Description: 'Ryan Sobotka' } },
    // Format: { defaultValue: { id: '5d5009edee1af1dc544c11da', Description: '8 x 10' } },

    schema: {
      model: {
        id: "id",
        fields: {
          Date: { type: "date", editable: true },
          Note: { type: "string", editable: true },
          Precons: { type: "boolean" },
          PhotoTaken: { defaultValue: 1, type: "number" },
          Photogpraher: { defaultValue: 'Ryan Sobotka' },
          Format: { defaultValue: 'professional high-rez digital tiff' },
          FILE_NAME: { type: "string" },
          FILE_EXT: { type: "string" },

          command: [
            { name: "edit", text: { edit: " ", update: " ", cancel: " " } },
            { name: "destroy", text: " " }
          ]
        }
      },
    },
  })

  // 	<!-- <th class="header">Photogpraher </th>
  // 						<th class="header">Format </th>
  // 						<th class="header">Date </th>
  //          		<th class="header">Note </th>
  // 					photo


  // Date Note -->


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
    if (this.currentItem.photo === undefined) this.currentItem.photo = []
    //////////////////////////////////////////////////////////////////////////////
    this.epoch = moment().unix();
    //   id:this.epoch,
  }

  activate(params, routeConfig) {

  }
  // <input click.delegate="showModal('PhotographerID',$index)" type="text" id="PhotographerID" class="form-control input-sm" value.bind="photographername">
  cbTemplate = '${Precons ? Precons : ""}';

  checkboxEditor(container, options) {
    $(`<input type="checkbox" #= ${options.field} ? 'checked="checked"':"" # disabled="disabled"  />`).appendTo(container);
  }

  modalDocs() {
//
    this.dialogService.open({ viewModel: Prompt, model: 'docs', lock: false }).whenClosed(response => {
      console.log(response.output);
    });
  }
  searchdocChanged(value) {

    this.showdocs = this.currentItem.docs.filter((item) => {
      if (item['FILE_NAME'].toLowerCase().search(value.toLowerCase()) != -1) return true
    });
    return
  }

  textAreaEditor(container, options) {
    $('<textarea class="k-textbox" name="' + options.field + '" style="width:100%;height:100%;" />').appendTo(container);
  }

  formatTemplate = '${Format ? Format.Description" : ""}';
  formatDropDownEditor(container, options) {
    $('<input data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesPhotoFormat,
        dataTextField: "Description",
        dataValueField: "Description"
      });
  }
  photograherTemplate = '${Photogpraher ? Photogpraher.Description" : ""}';
  photograherDropDownEditor(container, options) {
    $('<input data-text-field="Description" data-value-field="Description" data-bind="value:' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        autoBind: false,
        type: 'json',
        dataSource: this.appService.codesPhotographers,
        dataTextField: "Description",
        dataValueField: "Description"
      });
  }


  // 					<select id="PhotographerID" class="form-control  input-sm" value.bind="PhotographerID"> 
  //                 <option model.bind="null">Choose...</option> 
  //                 <option repeat.for="opt of appService.codesPhotographers " model.bind="opt.ID">
  //                 ${opt.Description} 
  //                 </option> 
  //                 </select>

  // 							<select id="PhotoFormatID" class="form-control  input-sm" value.bind="PhotoFormatID"> 
  //                 <option model.bind="null">...</option> 
  //                 <option repeat.for="opt of appService.codesPhotoFormat " model.bind="opt.ID">
  //                 ${opt.Description} 
  //                 </option> 
  //                 </select>



  // orgTemplate = '${loantoname ? loantoname.OrgName : ""}';
  // orgDropDownEditor(container, options) {
  //   $('<input data-text-field="OrgName" data-value-field="_id" data-bind="value:' + options.field + '"/>')
  //     .appendTo(container)
  //     .kendoDropDownList({
  //       autoBind: false,
  //       type: 'json',
  //       dataSource: this.appService.orgsList,
  //       dataTextField: "OrgName",
  //       dataValueField: "_id"
  //     });
  // }

  showModal(fieldname, index) {
    this.currentItem.PhotographerID = this.currentItem.photo[index].PhotographerID
    this.currentItem.photographername = this.currentItem.photo[index].photographername

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

  addPhoto() {
    let photo = this.currentItem.photo
    let flag = false
    let item
    let dd = moment().format('YYYY-MM-DD')

    if (photo === undefined) {
      flag = true
      photo = []
    }
    // Photogpraher: { defaultValue:'Ryan Sobotka' },
    // Format: { defaultValue:'8 x 10' },
    item = { id: this.epoch, PhotoTaken: 1, Date: dd, Note: '', Photogpraher: 'Ryan Sobotka', Format: 'professional high-rez digital tiff', Precons: false }
    photo.unshift(item)
    if (flag) this.currentItem.photo = photo
  }
  saveitem(item, index) {
    item.edit = !item.edit


  }
 showModalImg(e) {
    this.grid.clearSelection(true);
    let grid = this.grid;
    let targetRow = $(e.target).closest("tr"); 
    grid.select(targetRow);
    let selectedRow = grid.select();
    let dataItem = grid.dataItem(selectedRow);
   
    dataItem.InventoryCode=this.currentItem.InventoryCode
    this.dialogService.open({ viewModel: DialogImagedetail, model: dataItem, lock: true }).whenClosed(response => {
      if (!response.wasCancelled) {
         
      } else {
        console.log('cancel');  
      }
     
      console.log(response.output);
    });
    // // delete dataItem.InventoryCode
    // grid.select(false);
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
          this.upmess = jsonRes.data
          $("#file").val("");
          formData=''
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

  async checkData(images, formData) {
    let promises = []
    let flag = true
    return new Promise((resolve, reject) => {
      let i = 0;
      let dd = moment().format('YYYY-MM-DD')

      let photo = this.currentItem.photo
      if (photo === undefined) {
        photo = []
        flag = true
      }
      let imagelen = images.length
      for (i = 0; i < images.length; i++) {
        let ext = images[i].name.split('.').pop();
        let fname = images[i].name
        let mid = -100// not needed
        let ival = i
        if(!flag ) {
        mid = photo.findIndex(x => x.FILE_NAME === fname)
        }
        if (mid > -1) {
          let obj = { name: fname, val: ival, ext: ext }
          var promise = this.promiseDialog(obj)

          promises.push(promise);
        } else {
          // var item = { FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          var item = { id: this.epoch, PhotoTaken: 1, Date: dd, Note: '', Photogpraher: 'Ryan Sobotka', Format: 'professional high-rez digital tiff', Precons: false, FILE_NAME: fname, FILE_EXT: '.' + ext, OVERWRITE: 'N' }
          photo.unshift(item)
          formData.append('file', images[ival]);
          if (flag) this.currentItem.photo = photo
          //



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

