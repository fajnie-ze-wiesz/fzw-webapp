'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let devLocalEnv = {};
try {
  devLocalEnv = require('./dev.local.env');
  console.log('dev.local.env.js was found');
} catch (e) {
  console.log('No dev.local.env.js found');
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_ANALYTICS_TRACKER_ID: 'null',
  APP_HOST: '"localhost:8080"',
  APP_HTTP_SCHEME: '"http"',
}, devLocalEnv)
