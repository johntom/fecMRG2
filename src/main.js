
// import moment from 'moment';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

import 'jquery';
import 'bootstrap';

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    
    .plugin('aurelia-bootstrap-select');
//  .plugin('aurelia-bootstrap-tagsinput');
  await aurelia.start();
  await aurelia.setRoot('views/shell/shell');
  // await aurelia.setRoot('app');
  
 //aurelia.start().then(a => a.setRoot('views/shell/shell'));


}




// import 'babel-polyfill';
// import * as Bluebird from 'bluebird';

// import 'jquery';
// import 'bootstrap';

// export async function configure(aurelia) {
//   aurelia.use
//     .standardConfiguration()
//     .developmentLogging()
    
//     .plugin('aurelia-bootstrap-select')
//     .plugin('aurelia-dialog')
//     .plugin('aurelia-kendoui-bridge');


// //  .plugin('aurelia-bootstrap-tagsinput');
//   // await aurelia.start();
//   // await aurelia.setRoot('app');
//   aurelia.start().then(a => a.setRoot('views/shell/shell'));
//     // aurelia.start().then(a => a.setRoot('src/views/shell/shell'));
// }

