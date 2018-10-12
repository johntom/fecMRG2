
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

  activate(currentitem) {
    this.currentItem = currentitem;
    // this.fieldname = currentitem.fieldname;
  }

}