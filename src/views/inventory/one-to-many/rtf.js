
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';
import { Aurelia } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from '../../../services/prompt';
import { RtfService } from '../../../services/rtf-service';
import {EventAggregator} from 'aurelia-event-aggregator';


//https://wesbos.com/template-strings-html/
@inject(ApiService, ApplicationService, DialogService, RtfService,EventAggregator)
export class Rtf {
  tools = [
    'pdf',
    'html',
    'bold',
    'italic',
    'underline',
    // 'strikethrough',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    // 'insertUnorderedList',
    // 'insertOrderedList',
    // 'indent',
    // 'outdent',
    // 'createLink',
    // 'unlink',
     'insertImage',
    // 'insertFile',
    'subscript',
    'superscript',
    'createTable',
    'addRowAbove',
    'addRowBelow',
    'addColumnLeft',
    'addColumnRight',
    'deleteRow',
    'deleteColumn',
    'viewHtml',
    'formatting',
    'cleanFormatting',
    'fontName',
    'fontSize'
    // 'foreColor',
    // 'backColor',
    // 'print'
  ];
  // tools = [
  //   'pdf',
  //   'html',
  //   'bold',
  //   'italic',
  //   'underline',
  //   // 'strikethrough',
  //   // 'justifyLeft',
  //   // 'justifyCenter',
  //   // 'justifyRight',
  //   // 'justifyFull',
  //   // 'insertUnorderedList',
  //   // 'insertOrderedList',
  //   // 'indent',
  //   // 'outdent',
  //   // 'createLink',
  //   // 'unlink',
  //   // 'insertImage',
  //   // 'insertFile',
  //   'subscript',
  //   'superscript',
  //   // 'createTable',
  //   // 'addRowAbove',
  //   // 'addRowBelow',
  //   // 'addColumnLeft',
  //   // 'addColumnRight',
  //   // 'deleteRow',
  //   // 'deleteColumn',
  //   'viewHtml',
  //   'formatting',
  //   'cleanFormatting',
  //   'fontName',
  //   'fontSize'
  //   // 'foreColor',
  //   // 'backColor',
  //   // 'print'
  // ];
  resizable = {
    content: true,
    toolbar: true
  }
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';
  done = false;
  edit = false;
  pre = '<p>'
  post = '</p>'
  prebefore = '</p>'
  preafter = ' '
  preitalic = '<em>'
  postitalic = '</em>'
  lineBreak = '<br>'

  stylesheets = ['https://demos.telerik.com/kendo-ui/content/web/editor/pdf-export-styles.css'];
  pdf = {
    fileName: 'NewDocument.pdf',
    proxyURL: '//demos.telerik.com/kendo-ui/service/export',
    paperSize: 'letter',
    margin: {
      bottom: 20,
      left: 30,
      right: 20,
      top: 20
    }
  };
  html = {
    fileName: 'NewDocument.html',
    proxyURL: '//demos.telerik.com/kendo-ui/service/export',
    paperSize: 'letter',
    margin: {
      bottom: 20,
      left: 20,
      right: 20,
      top: 20
    }
  };
  searchsold = [
    { id: 0, name: 'normal size', factor: 1 },
    { id: 1, name: '1.5 size', factor: 1.5 },
    { id: 2, name: '2 size', factor: 2 },
    { id: 3, name: '3 size', factor: 3 },
    { id: 4, name: '.5 size', factor: .5 },
    { id: 5, name: '.3 size', factor: .3 },
  ];
  selectedimagesize = 0;
 formattypes = [
    { id: 0, name: 'landscape' },
    { id: 1, name: 'portrait' },
  
  ];
  selectedtype = 0;

  constructor(api, appService, dialogService, rtfService,eventAggregator) {
    
    this.api = api;
    this.appService = appService;
    this.provenance = '';
    this.currentItem = this.appService.currentItem//testrec;
    this.mode = 0;
    this.editrec = '';
    this.isDisableEdit = true
    this.currentprovenance = '';
    this.dialogService = dialogService
    this.rtfService = rtfService
    this.eventAggregator = eventAggregator;
   
  }

 attached(){
//1=port 0 land
   if (this.currentItem.clientHeightRatio>=this.currentItem.clientWidthRatio) {
     this.selectedtype=1
   } else this.selectedtype=0
   this.subscriber = this.eventAggregator.subscribe('rtfpayload', payload => {
         console.log('rtfpayload',payload);
        //  this.createRTF(1,selectedtype)
             this.createRTF(1,this.selectedtype)
      });

 }

  created(owningView, myView) {
    // Invoked once the component is created...
    //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
  }
  bind(bindingContext, overrideContext) {
    // Invoked once the databinding is activated...
    //  if (this.currentItem.rtf1 !== undefined)      this.editor.value(this.currentItem.rtf1);
  }

  setInitialValue(edt) {
    if (this.currentItem.rtf1 !== undefined) edt.value(this.currentItem.rtf1);
  }
  setInitialValueLabel(edt) {
    if (this.currentItem.rtf2 !== undefined) edt.value(this.currentItem.rtf2);
  }
  async createRTF(createoptval) {
    // alert('in create')
     this.rtfService.currentItem = this.currentItem
     let createopt = 1; // 1 MEANS UI DISPLAYS HTML 2; // 1 is from tab
     let rr = await this.rtfService.createRTF(createopt,this.selectedtype)
     this.editor.value( this.currentItem.rtf1 );
     this.editorlabel.value(this.currentItem.rtf2 ); 
    // if (createopt === 1) {
    //   // caled from rtf tab
    //   this.editor.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment1 + '</span>');
    //   this.currentItem.rtf1 = this.editor.value()// factsheet
    //   this.editorlabel.value('<span style="font-family:Calibri, Geneva, sans-serif;font-size:11.0pt">' + this.segment2 + '</span>');
    //   this.currentItem.rtf2 = this.editorlabel.value()// label
    // }
  }

  roundNumber(num, scale) {
    if (Math.round(num) != num) {
      if (Math.pow(0.1, scale) > num) {
        return 0;
      }
      var sign = Math.sign(num);
      var arr = ("" + Math.abs(num)).split(".");
      if (arr.length > 1) {
        if (arr[1].length > scale) {
          var integ = +arr[0] * Math.pow(10, scale);
          var dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
          var proc = +arr[1].slice(scale, scale + 1)
          if (proc >= 5) {
            dec = dec + 1;
          }
          dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
          return dec;
        }
      }
    }
    return num;
  }

  onChange(e) {
    // this.logger.log('value change');
    this.currentItem.rtf1 = this.editor.value()
  }
  onChangelabel(e) {
    this.currentItem.rtf2 = this.editorlabel.value()
  }

  saveChanges() {
    this.currentItem.rtf1 = this.editor.value()
  }
  saveChangesDetail() {
    this.currentItem.rtf2 = this.editorlabel.value()
  }

  // let img1 = `https://artbased.com/api/v1/getonePdf/inv/${this.currentItem.InventoryCode}.jpg" `
  // EXIF.getData(img1, function () {
  //   var make = EXIF.getTag(this, "Make");
  //   var model = EXIF.getTag(this, "Model");
  //   var makeAndModel = document.getElementById("makeAndModel");
  //   this.makeAndModel = `${make} ${model}`;
  // });
  remove(item, index) {
    //alert('you are about to delete ' + item.Notes + ' ' + index)
    this.mode = 0
    this.dialogService.open({ viewModel: Prompt, model: 'Delete or Cancel?', lock: false }).whenClosed(response => {
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
