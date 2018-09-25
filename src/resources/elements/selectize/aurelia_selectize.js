import {bindable, inject, customElement} from 'aurelia-framework';
import $ from 'jquery';
import selectize from 'selectize';
//import 'selectize/css/selectize.bootstrap3.css!';
import './selectize.bootstrap3.css!';

import _ from 'lodash'

@customElement('selectize')
@inject(Element)
export class SelectizeCustomMultiselect {
  @bindable name = null;    // name/id of custom select
  @bindable selected = [];  // default selected values
  @bindable options = {};   // array of options with id/name properties
  @bindable placeholder = "";
  sel = null;

  constructor(element) {
    this.element = element;
  }

  attached() {
    var el = $(this.element).find('select');
    this.sel = el.selectize({
      plugins: ['remove_button'],
      onChange: function() {
        // bubble it up to allow change handler on custom element, and to trigger data binding on original select element
        var notice = new Event('change', {bubbles: true});
        $(el)[0].dispatchEvent(notice);
      }
    });
    this.sel[0].selectize.setValue(this.selected);
    console.log("selectize attached");
  }

  detached() {
    this.sel[0].selectize.destroy();
    console.log("selectize detached");
  }
}