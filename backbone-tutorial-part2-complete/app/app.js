'use strict';

/**
 * The main entry point for the actual app code.
 * File: app/app.js
 */
define([
  'views/home/part-c'
], function(HomeView){
  var App = {
    /**
     * The current view the application is using.
     * @property _curView
     * @type Backbone.View
     * @default null
     */
    _curView: null,
    
    initialize: function(){
      // start the application with the HomeView
      this._curView = new HomeView();
    }
  };
  
  return App;
});