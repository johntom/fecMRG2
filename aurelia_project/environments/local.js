export default {
  debug: true,
  testing: true,
  baseUri: 'http://localhost:9000/',
  root: '/',
  baseServiceUrl: 'https://quoteone-production.appspot.com/',
  baseDotUrl: '`https://vpic.nhtsa.dot.gov/api/vehicles/`',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
  database: 'quoteone-stage',
  mongoConfig: {
    apiKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-stage'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCq-dIuzuZv5TdsYVN-52RjmLOWhaScLdE",
    authDomain: "quoteone-dev.firebaseapp.com",
    databaseURL: "https://quoteone-dev.firebaseio.com",
    projectId: "quoteone-dev",
    storageBucket: "quoteone-dev.appspot.com",
    messagingSenderId: "781248078249",
    serverKey: "AAAAteYDoak:APA91bGOdPpH14roFKUpfwhKmwGe5gLz64tT01eur4U-7NW4doutTmpoVr1Y4ChWYFVsfbnt-F-WZb_2xMa_bEzNmiJM-fCra0DPaOhEQQIFsbsKCykfTk7GbACICUIjMcbo7ftR0nLH"
  },
  auth0Config: {
    domain: 'quote1ins.auth0.com',
    clientID: 'hy9l2I2xghH3f5_eiwGJqiVKEVdhGdce',
    audience: 'https://quote1ins.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  },
  puppeteerUrl: 'http://35.231.144.97/',
  payments: {
    url: 'https://test.simply-easier-payments.com/PaymentApp/Provider/insurance/fp/Payment.faces',
    username: 'MMDEVB42PI',
    password: 'fN6HR!RU'
  }
};
