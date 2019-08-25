export default {
  debug: true,
  testing: true,
  baseUri: 'https://mattduffield.github.io/q1-ams/',
  root: '/q1-ams/',
  baseServiceUrl: 'https://quoteone-staging.appspot.com/',
  baseDotUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '1',
  database: 'quoteone-stage',
  mongoConfig: {
    apiKey: 'x',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-stage'
  },
  firebaseConfig: {
    apiKey: "x",
    authDomain: "quoteone-dev.firebaseapp.com",
    databaseURL: "https://quoteone-dev.firebaseio.com",
    projectId: "quoteone-dev",
    storageBucket: "quoteone-dev.appspot.com",
    messagingSenderId: "1",
    serverKey: "1"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: 'x',
    audience: 'https://quote1ins.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  },
  puppeteerUrl: 'http://10.1.1.27/',
  payments: {
    url: 'https://test.simply-easier-payments.com/PaymentApp/Provider/insurance/fp/Payment.faces',
    username: 'x',
    password: 'x'
  }
};
