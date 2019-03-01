// import 'babel-polyfill';
// need next 2 lines for aurelia-bootstrap-select
// import 'jquery';
// import 'bootstrap';
//https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge/tree/master/sample/src
export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    //  .plugin('aurelia-kendoui-bridge')
     .plugin('aurelia-kendoui-bridge', (kendo) => kendo.detect().notifyBindingBehavior())
 
      // .plugin('aurelia-kendoui-bridge', (kendo) => kendo.pro())
   
    // .plugin('aurelia-bootstrap-select')
    
    // pkg
    //   "aurelia-slickgrid": "^2.6.0",
// .plugin('aurelia-slickgrid', config => {
//     // change any of the default global options
//     config.options.gridMenu.iconCssClass = 'fa fa-bars';
//   })


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

// import 'babel-polyfill';
// import * as Bluebird from 'bluebird';

// import 'jquery';
// import 'bootstrap';

// export async function configure(aurelia) {
//   aurelia.use
//     .standardConfiguration()
//     .developmentLogging()
//     // .feature('src/resources')
//     // .plugin('aurelia-dialog')
//     .plugin('aurelia-bootstrap-select')
//     .plugin('aurelia-dialog', config => {
//       config.useDefaults();
//       config.settings.lock = true;
//       config.settings.centerHorizontalOnly = false;
//       config.settings.startingZIndex = 5;
//       config.settings.keyboard = true;
//     })
//     //   .plugin('aurelia-bootstrap', config => {
//     //   config.options.accordionCloseOthers = true;
//     //   config.options.accordionGroupPanelClass = 'panel-default';
//     //   config.options.btnLoadingText = 'Loading...';
//     //   config.options.dropdownAutoClose = 'always';
//     //   config.options.paginationBoundaryLinks = false;
//     //   config.options.paginationDirectionLinks = true;
//     //   config.options.paginationFirstText = 'First';
//     //   config.options.paginationHideSinglePage = true;
//     //   config.options.paginationLastText = 'Last';
//     //   config.options.paginationNextText = '>';
//     //   config.options.paginationPreviousText = '<';
//     //   config.options.popoverPosition = 'top';
//     //   config.options.popoverTrigger = 'mouseover';
//     //   config.options.tabsetType = 'tabs';
//     //   config.options.tabsetVertical = false;
//     //   config.options.tooltipClass = 'tooltip';
//     //   config.options.tooltipPosition = 'top';
//     //   config.options.tooltipTrigger = 'mouseover';
//     //   })
//     // .plugin('aurelia-validation');


//   await aurelia.start();
//   await aurelia.setRoot('app');
//   //// aurelia.start().then(a => a.setRoot('src/views/shell/shell'));
//   //or

//   // await aurelia.setRoot('views/shell/shell');

// }
/** .plugin('aurelia-bootstrap', config => {
      config.options.accordionCloseOthers = true;
      config.options.accordionGroupPanelClass = 'panel-default';
      config.options.btnLoadingText = 'Loading...';
      config.options.dropdownAutoClose = 'always';
      config.options.paginationBoundaryLinks = false;
      config.options.paginationDirectionLinks = true;
      config.options.paginationFirstText = 'First';
      config.options.paginationHideSinglePage = true;
      config.options.paginationLastText = 'Last';
      config.options.paginationNextText = '>';
      config.options.paginationPreviousText = '<';
      config.options.popoverPosition = 'top';
      config.options.popoverTrigger = 'mouseover';
      config.options.tabsetType = 'tabs';
      config.options.tabsetVertical = false;
      config.options.tooltipClass = 'tooltip';
      config.options.tooltipPosition = 'top';
      config.options.tooltipTrigger = 'mouseover'; 
      
      
      
      */

