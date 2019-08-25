export default {
  debug: true,
  testing: false,
  baseUri: 'https://quoteone-staging.appspot.com/',
  root: '/',
  baseServiceUrl: 'https://quoteone-staging.appspot.com/',
  baseDotUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '1',
  database: 'quoteone-stage',
  mongoConfig: {
    apiKey: '1',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-stage'
  },
  firebaseConfig: {
    apiKey: '1',
    authDomain: 'quote-one-staging.firebaseapp.com',
    databaseURL: 'https://quote-one-staging.firebaseio.com',
    projectId: "quote-one-staging",
    storageBucket: "quote-one-staging.appspot.com",
    messagingSenderId: "1",
    serverKey: "1"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: '',
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
