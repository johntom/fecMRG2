export default {
  debug: true,
  testing: true,
  baseUri: 'http://localhost:9000/',
  root: '/',
  baseServiceUrl: 'https://quoteone-production.appspot.com/',
  baseDotUrl: '`https://vpic.nhtsa.dot.gov/api/vehicles/`',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '1',
  database: 'quoteone-stage',
  mongoConfig: {
    apiKey: '1',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-stage'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCq-dIuzuZv5TdsYVN-52RjmLOWhaScLdE",
    authDomain: "quoteone-dev.firebaseapp.com",
    databaseURL: "https://quoteone-dev.firebaseio.com",
    projectId: "quoteone-dev",
    storageBucket: "quoteone-dev.appspot.com",
    messagingSenderId: "1",
    serverKey: "1"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: '1',
    audience: 'https://quote1ins.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  },
  puppeteerUrl: 'http://3.31.44.7/',
  payments: {
    url: 'https://test.simply-easier-payments.com/PaymentApp/Provider/insurance/fp/Payment.faces',
    username: '1',
    password: '1'
  }
};
