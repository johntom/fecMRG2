
// // import moment from 'moment';
// import 'babel-polyfill';
// import * as Bluebird from 'bluebird';

// import 'jquery';
// import 'bootstrap';

// export async function configure(aurelia) {
//   aurelia.use
//     .standardConfiguration()
//     .developmentLogging()
    
//     .plugin('aurelia-bootstrap-select');
// //  .plugin('aurelia-bootstrap-tagsinput');
//   await aurelia.start();
//   await aurelia.setRoot('app');
// }

// import moment from 'moment';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

import 'jquery';
import 'bootstrap';

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // .feature('src/resources')
    .plugin('aurelia-dialog')
    .plugin('aurelia-bootstrap-select');
  await aurelia.start();
  // await aurelia.setRoot('app');
  // aurelia.start().then(a => a.setRoot('src/views/shell/shell'));
  await aurelia.setRoot('views/shell/shell');
  
}


