import {autoinject, bindable, bindingMode, customAttribute} from "aurelia-framework";

@customAttribute("select2")
@autoinject()
export class Select2Attribute {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) allowClear = false;
    select;
    @bindable( {  defaultBindingMode: bindingMode.twoWay}) value;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) allowClear = false;

    constructor(element) { }
    attached() {
      let clear = ((this.allowClear) === "true");
      if (this.select) {
          return;
      }
      this.select = $(this.element)
          .select2({ allowClear: clear, placeholder: "Select an option..." });
      this.select.on("change", (event, options) => {
          if (event.originalEvent) {
              return;
          }
          if (this.value != (event.target).value) {
              this.value = (event.target).value;
          }
      });
    }
    valueChanged(newVal, oldVal) {
        if (this.select)
            this.select.trigger("change");
    }    
    detached() {
        if (this.select) {
            this.select.off("change");
            this.select.select2("destroy");
        }
        this.select = null;
    }
}