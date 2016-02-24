'use strict';

/**
 * The starting point for the app, where it initializes and executes the application.
 * File: app/exe.js
 * Authors: Brandon Sherette
 * @since 1.0.0
 */
define([
  'jquery',
  'app/app.js'
], function($, App){
  $(document).ready(function(){
    App.initialize();
  });
});