
// import {DialogController} from '../dialog-controller';
  import {DialogController} from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
export class DialogImage {
  static inject = [DialogController,ApplicationService];

  constructor(controller,appService) {
    this.controller = controller;
    this.answer = null;

   this.appService = appService;
 
    // this.currentItem = this.appService.currentItem;
    controller.settings.lock = false;
  }
  attached() {
this.iwidth="600px"
  }
  activate(currentitem) {
    this.currentItem = currentitem;
    //this.iwidth="width=600px"
    // this.fieldname = currentitem.fieldname;
  }

}