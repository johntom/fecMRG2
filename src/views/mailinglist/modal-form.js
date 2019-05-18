// export class ModalForm {

//   constructor() {

//   }
// }
import { bindable } from 'aurelia-framework';

export class ModalFormCustomElement {

	@bindable title;
	@bindable record_id;
	@bindable error;

	saveRecord() {
	  window.alert("SAVE: How do I call a function in the parent container?");
	}

	deleteRecord() {
	  window.alert("DELETE: How do I call a function in the parent container?");
	}

	closeModal() {
		$(".modal").modal('hide');
	}

}
