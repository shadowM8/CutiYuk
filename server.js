const express = require('express')
const enrouten = require('express-enrouten'); // for easy route configuration
// const config = require('./config'); //load config
const RouteNotFoundError = require('./errors/route-not-found.js'); // load error class

//initialize app
const app = express()

/**
 * Preflight Middleware
 */
// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

// parse JSON in the body of requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Routes
 */
app.use('/', enrouten({ directory: 'routes' }));

/**
 * Postflight Middleware
 */
// handle 404's
app.use((req, res, next) => {
  next(new RouteNotFoundError(`You have tried to access an API endpoint (${req.url}) that does not exist.`));
});

// export for testing
module.exports = app;