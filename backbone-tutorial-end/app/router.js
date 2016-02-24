'use strict';

/**
 * The Router for the application.
 * This is used to saved page state and figure out which views are being requested.
 * File: app/router.js
 * Authors: Brandon Sherette
 * @class AppRouter
 * @extends Backbone.Router
 * @since 1.0.0
 */
define([
  'backbone'
], function(Backbone){
  // create class
  var AppRouter = Backbone.Router.extend({
    routes: {
      'product/add': 'addProduct',
      'product/edit/:id': 'editProduct',
      '*actions': 'home'
    }
  });
  
  // return created class
  return AppRouter;
});