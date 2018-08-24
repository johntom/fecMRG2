
// import {DialogController} from '../dialog-controller';
  import {DialogController} from 'aurelia-dialog';
import { ApplicationService } from '../../services/application-service';
export class DialogImage {
  static inject = [DialogController,ApplicationService];

  constructor(controller,appService) {
    this.controller = controller;
    this.answer = null;

   this.appService = appService;
  //  this.inv = '';
    this.currentItem = this.appService.testrec;
    controller.settings.lock = false;
  }

  // activate(question) {
  //   this.question = question;
  // }
}