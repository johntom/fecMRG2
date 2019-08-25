export default {
  debug: false,
  testing: false,
  baseUri: 'https://quoteone-production.appspot.com/',
  root: '/',
  baseServiceUrl: 'https://quoteone-production.appspot.com/',
  baseDotUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '1',
  database: 'quoteone-prod',
  mongoConfig: {
    apiKey: '1',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-prod'
  },
  firebaseConfig: {
    apiKey: '1',
    authDomain: 'quote-one.firebaseapp.com',
    databaseURL: 'https://quote-one.firebaseio.com',
    projectId: "quote-one",
    storageBucket: "quote-one.appspot.com",
    messagingSenderId: "99622332915",
    serverKey: "AAAAFzH0KfM:APA91bF_b8qEGb62QqWGVbTsx441wLZkvNLbIBJPMAxVbRinii1rj0UItXTJxthX_9bEkiQUtwQPZwbUAlX1gFsd-u8OXdA0Aupwd6L3uRsDk2c798QySf-7Bq6uzjQMTeOPHBq11Qgf"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: '1',
    audience: 'https://quote1ins.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  },
  puppeteerUrl: 'http://35.185.1.52/',
  payments: {
    url: 'https://www.simply-easier-payments.com/PaymentApp/Provider/insurance/fp/Payment.faces',
    username: '1',
    password: '1'
  }
};
