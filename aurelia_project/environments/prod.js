export default {
  debug: false,
  testing: false,
  baseUri: 'https://quoteone-production.appspot.com/',
  root: '/',
  baseServiceUrl: 'https://quoteone-production.appspot.com/',
  baseDotUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
  database: 'quoteone-prod',
  mongoConfig: {
    apiKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-prod'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyDEkTD8tTzr44BV7SU5TLisxLYpnHoikR0',
    authDomain: 'quote-one.firebaseapp.com',
    databaseURL: 'https://quote-one.firebaseio.com',
    projectId: "quote-one",
    storageBucket: "quote-one.appspot.com",
    messagingSenderId: "99622332915",
    serverKey: "AAAAFzH0KfM:APA91bF_b8qEGb62QqWGVbTsx441wLZkvNLbIBJPMAxVbRinii1rj0UItXTJxthX_9bEkiQUtwQPZwbUAlX1gFsd-u8OXdA0Aupwd6L3uRsDk2c798QySf-7Bq6uzjQMTeOPHBq11Qgf"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: 'hy9l2I2xghH3f5_eiwGJqiVKEVdhGdce',
    audience: 'https://quote1ins.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  },
  puppeteerUrl: 'http://35.185.1.52/',
  payments: {
    url: 'https://www.simply-easier-payments.com/PaymentApp/Provider/insurance/fp/Payment.faces',
    username: 'MMDEVB42PI',
    password: 'fN6HR!RU'
  }
};
