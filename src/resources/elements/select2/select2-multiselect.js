import {bindable, inject, customElement} from 'aurelia-framework';
import $ from 'jquery';
import 'select2';
import './select2.css!'
import _ from 'lodash'

@customElement('select2m')
@inject(Element)
export class Select2CustomMultiselect {
  @bindable name = null;    // name/id of custom select
  @bindable selected = [];  // default selected values
  @bindable options = {};   // array of options with id/name properties
  @bindable placeholder = "";
  @bindable allow_clear = false;
  @bindable tags="";//true";
 // @bindable  tokenSeparators= [',', ' ']
  constructor(element) {
    this.element = element;
  }
// (".js-example-tokenizer").select2({
//     tags: true,
//     tokenSeparators: [',', ' ']
// })
  attached() {
    var el = $(this.element).find('select');
    var sel = el.select2();

    // preload selected values
    sel.val(this.selected).trigger('change');

    // on any change, propagate it to underlying select to trigger two-way bind
    sel.on('change', (event) => {
      // don't propagate endlessly
      // see: http://stackoverflow.com/a/34121891/4354884
      if (event.originalEvent) { return; }
      // dispatch to raw select within the custom element
      // bubble it up to allow change handler on custom element
      var notice = new Event('change', {bubbles: true});
      $(el)[0].dispatchEvent(notice);
    });

    console.log("select2 attached");
  }

  detached() {
    $(this.element).find('select').select2('destroy');
    console.log("select2 detached");
  }
}