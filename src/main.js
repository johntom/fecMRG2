

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
       .plugin('aurelia-kendoui-bridge', (kendo) => kendo.detect().notifyBindingBehavior())
       .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
      config.settings.keyboard = true;
    })
  await aurelia.start();
  await aurelia.setRoot('app');
 }



   // .plugin('aurelia-kendoui-bridge', (kendo) => kendo.pro())
   
    // .globalResources( "aurelia-kendoui-bridge/datepicker/datepicker" )
    // .globalResources( "aurelia-kendoui-bridge/grid/grid" )
    // .globalResources( "aurelia-kendoui-bridge/grid/col" )
    // .globalResources( "aurelia-kendoui-bridge/common/template" )
    // .globalResources( "aurelia-kendoui-bridge/common/template" )
    // .globalResources( "aurelia-kendoui-bridge/multiselect/multiselect" )

    // .globalResources( "aurelia-kendoui-bridge/editor/editor" );


    //https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge/tree/master/sample/src below
   
    // .plugin('aurelia-bootstrap-select')
    
    // pkg
    //   "aurelia-slickgrid": "^2.6.0",
// .plugin('aurelia-slickgrid', config => {
//     // change any of the default global options
//     config.options.gridMenu.iconCssClass = 'fa fa-bars';
//   })

// import 'babel-polyfill';
// need next 2 lines for aurelia-bootstrap-select
// import 'jquery';
// import 'bootstrap';
// import 'kendo/css/web/kendo.common.min.css';
// import 'kendo/css/web/kendo.default.min.css';
// import "kendo/js/kendo.datepicker.js";
// import "kendo/js/kendo.grid.js";
// import "kendo/js/kendo.editor.js";
// import "kendo/js/kendo.multiselect.js";