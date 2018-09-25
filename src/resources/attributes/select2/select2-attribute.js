import {autoinject, bindable, bindingMode, customAttribute} from "aurelia-framework";

@customAttribute("select2")
@autoinject()
export class Select2Attribute {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value: any;
    @bindable({ defaultBindingMode: bindingMode.oneTime }) allowClear: boolean = false;

    // private select: any;

select: any;
	//{
  @bindable( {  defaultBindingMode: bindingMode.twoWay})
value: any;
	
      @bindable({ defaultBindingMode: bindingMode.oneTime })
 allowClear: boolean = false;



    constructor(private element: Element) { }

    attached() {
        let clear = ((this.allowClear as any) === "true");
        if (this.select) {
            return;
        }
        this.select = $(this.element)
            .select2({ allowClear: clear, placeholder: "Select an option..." });
        this.select.on("change", (event: JQueryEventObject, options: any) => {
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