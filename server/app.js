'use strict';

require('@google-cloud/debug-agent').start({ allowExpressions: true });
require('dotenv').load();

const bunyan = require('bunyan');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const app = express();

const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

// Creates a Bunyan Stackdriver Logging client
const loggingBunyan = new LoggingBunyan();
// Create a Bunyan logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
  name: 'MRG',
  streams: [
    // Log to the console at 'info' and above
    {stream: process.stdout, level: 'info'},
    // And log to Stackdriver Logging, logging at 'info' and above
    loggingBunyan.stream('info'),
  ],
});

app.use(cors());
app.use(bodyParser.json({ type: 'application/json'}));

// Use the built-in express middleware for serving static files from './www'
// app.use('/www', express.static(path.join(__dirname + 'www')));
// app.use('/', express.static('www'));
app.use('/scripts', express.static('www/scripts'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

// This handles PushState to support Aurelia Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/www/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
  // console.log('Press Ctrl+C to quit.');
  logger.info(`App listening on port ${PORT}`);
  logger.info('Press Ctrl+C to quit.');
});
