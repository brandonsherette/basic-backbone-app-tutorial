'use strict';

/**
 * Configures RequireJS and executes the required files to get the app running.
 * File: app/require-config.js
 * Authors: Brandon Sherette
 * @since 1.0.0
 */
require.config({
  // configure baseUrl that require will search files for
  baseUrl: 'app',
  
  // configure paths to js components
  paths: {
    backbone     : 'vendor/backbone/backbone-min',
    bootstrap    : 'vendor/bootstrap/js/bootstrap.min',
    jquery       : 'vendor/jquery/jquery.min',
    underscore   : 'vendor/underscore/underscore-min',
    localstorage : 'vendor/backbone-localstorage/backbone.localstorage-min'
  },
  
  shim: {
    // bootstrap requires jquery
    bootstrap: {
      deps: ['jquery']
    } 
  },
  
  // require the app dependency files to start with
  deps: [
    'bootstrap',
    'exe'
  ]
});