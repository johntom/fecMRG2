// import {DialogController} from '../dialog-controller';
  import {DialogController} from 'aurelia-dialog';
export class Promptyn {
  static inject = [DialogController];

  constructor(controller) {
    this.controller = controller;
    this.answer = null;

    controller.settings.lock = false;
  }
 
  activate(question) {
    if ( question.type === undefined || question.type === 1)  {

     (question.name===undefined) ? this.question= qustion : this.question =  question.name; // question
     this.questiontype = 1
    } else {
      if ( question.type === 2) {
          this.questiontype = 1
      this.question =  question.name 
      this.questiontype = question.type 
      }
    }
    console.log('question ',question)
  }
}