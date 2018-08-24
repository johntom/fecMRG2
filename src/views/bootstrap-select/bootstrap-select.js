import 'bootstrap-select/css/bootstrap-select.min.css';
// import jQuery from 'jquery';
// import { inject } from 'aurelia-framework';
// import { bindable } from 'aurelia-framework';
import { bindable, inject } from 'aurelia-framework';
@inject()
export class BootstrapSelect {

  @bindable picker;
  @bindable selectCamping;
  @bindable selectCondiment;
  @bindable selectStyledCondiment;
  @bindable selectPicnic;

  // @bindable condimentItem;
  // @bindable condimentValue;
  //  condimentItemChanged(newItem) {
  //   // output --> { id: 2, option: 'Mustard', company: 'French\'s' }
  //   console.log('Item changed:', newItem);
  // }

  // condimentValueChanged(newValue) {
  //   // output --> 2
  //   console.log('Value changed:', newValue)
  // }
  selectOptions = {
    liveSearch: true,
    showSubtext: true,
    showTick: true,
    selectedTextFormat: 'count > 3',
    actionsBox: true
  };
  //  };
  allCondimentsbase = [
    { id: 1, option: 'Ketchup', group: 'Condiments' },
    { id: 2, option: 'Mustard', group: 'Condiments' },
    { id: 10, option: 'Steam', group: 'Breads' },
    { id: 12, option: 'Toasted', group: 'Breads' },
  ];


  isEditing = false;
  isOptgroupBreadDisabled = false;
  selectMappingStructure = {
    subtext: 'company'
  };
  allCampingStuff = ['Tent', 'Flashlight', 'Sleeping Bag'];
  allSelectionWithGroups = [
    { id: 1, option: 'Relish', company: 'Sweet', group: 'Condiments' },
    { id: 12, option: 'Steam', group: 'Breads' },
    { id: 11, option: 'Plain', disabled: false, group: 'Breads' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', group: 'Condiments' },
    { id: 3, option: 'Ketchup', company: 'Heinz', group: 'Condiments' },
    { id: 2, option: 'Mustard', company: 'French\'s', group: 'Condiments' },
    { id: 13, option: 'Toasted', group: 'Breads', disabled: true }
  ];
  allCondiments = [
    { id: 1, option: 'Ketchup', company: 'Heinz' },
    { id: 2, option: 'Mustard', company: 'French\'s', divider: true },
    { id: 3, option: 'Relish', company: 'Sweet', style: 'background: #5cb85c; color: #fff;', title: 'Alternate Title' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', icon: 'glyphicon-heart' }
  ];
  allStyledCondiments = [
    { id: 1, option: 'Mustard', company: 'French\'s', content: '<span class="label label-warning">Mustard</span>' },
    { id: 2, option: 'Ketchup', company: 'Heinz', content: '<span class="label label-danger">Ketchup</span>' },
    { id: 3, option: 'Relish', company: 'Sweet', content: '<span class="label label-success">Relish</span>' },
    { id: 4, option: 'Mayonnaise', company: 'Miracle Whip', disabled: true, content: '<span class="label label-info">Mayonnaise</span>' }
  ];



  constructor() {

  }

  // activate() {
  //   $(document).ready(function () {
  //     $('.selectpicker').selectpicker({
  //       liveSearch: true,
  //       showSubtext: true
  //     });
  //   });
  // }
}
