
import { inject } from 'aurelia-dependency-injection';
import { ApiService } from '../../../utils/servicesApi';
import { ApplicationService } from '../../../services/application-service';

@inject(ApiService, ApplicationService)
export class Editions {
  heading = 'DataForm HEADER...';
  footer = 'DataForm FOOTER...';
  recordId = '';

  constructor(api, appService) {
    this.api = api;
    this.appService = appService;
    this.inv = '';
    //  this.currentItem = this.appService.testrec;
    this.currentItem = this.appService.currentItem;
  }

  activate(params, routeConfig) {

  }

  buildEdition() {
    this.currentItem.EditionText = this.currentItem.Edition + '\n' + this.currentItem.EditionComment+ '\n'
    this.currentItem.EditionText += this.currentItem.Chop+ '\n'
    this.currentItem.EditionText += this.currentItem.Publisher + ', ' + this.currentItem.PublisherLocation+ '\n'
    this.currentItem.EditionText += this.currentItem.Printer + ', ' + this.currentItem.PrinterLocation+ '\n'

    // [Edition]
    // [Note]
    // [Chop]
    // [Publisher], [Publisher Location]
    // [Printer], [Printer Location]
    // <div class="Rtable-cell-30 Rtable-cell--highlight">
    // 		<strong> Edition Text</strong>
    // 	</div>


  }



}
