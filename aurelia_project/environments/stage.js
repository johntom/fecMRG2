export default {
  debug: true,
  testing: false,
  baseUri: 'https://quoteone-staging.appspot.com/',
  root: '/',
  baseServiceUrl: 'https://quoteone-staging.appspot.com/',
  baseDotUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/',
  baseDatabaseUrl: 'https://api.mlab.com/api/1/',
  baseDatabaseKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
  database: 'quoteone-stage',
  mongoConfig: {
    apiKey: '50klcLiRACv_V_SSI_FuvzcNauAR4IKB',
    databaseUrl: 'https://api.mlab.com/api/1/',
    database: 'quoteone-stage'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyAPMt2hjpIkxfWcsJLcymt5lOhDGjotXrk',
    authDomain: 'quote-one-staging.firebaseapp.com',
    databaseURL: 'https://quote-one-staging.firebaseio.com',
    projectId: "quote-one-staging",
    storageBucket: "quote-one-staging.appspot.com",
    messagingSenderId: "391918322795",
    serverKey: "AAAAW0AnBGs:APA91bHLQ-lGghUTfFJTJW5v7-6DgMOOgjEuRBFajbwAd6fg0zLc0qdzl4mxqFI3Ef981GYNlJeV--ovpdcQ6UHRbADpr0x-cIREddL3CvFk8vV1vJ1Fs1bzKgnMYBvVbtNZ_9OYcg_NLNo4kM9N4LHXhJxPvDkesw"
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
