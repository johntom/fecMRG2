
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
  calcdims(){
     let imgh, imgw
        let imageHeight, imageWidth

        if (this.mainimage.clientHeight === undefined) {
          // no image
          imageWidth = 1
          imageHeight = 1
        } else {
          imgw = this.mainimage.clientWidth
          imgh = this.mainimage.clientHeight
          if (imgh === imgw) {
            imageHeight = 1
            imageWidth = 1
          } else if (imgh > imgw) {
            imageHeight = 1
            imageWidth = (imgw / imgh).toPrecision(2)  //Math.round(imgw / imgh)
          } if (imgw > imgh) {
            imageWidth = 1
            imageHeight = (imgh / imgw).toPrecision(2) //Math.round(imgh / imgw)
          }
        }

         this.currentItem.clientHeight = imgh
        this.currentItem.clientWidth = imgw
  
        this.currentItem.clientHeightRatio = imageHeight
        this.currentItem.clientWidthRatio = imageWidth
  }
  activate(currentitem) {
    this.currentItem = currentitem;
    //this.iwidth="width=600px"
    // this.fieldname = currentitem.fieldname;
  }

}