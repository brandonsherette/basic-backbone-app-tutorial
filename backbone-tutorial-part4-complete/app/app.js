'use strict';

/**
 * The main entry point for the actual app code.
 * File: app/app.js
 * Authors: Brandon Sherette
 * @class App
 * @since 1.0.0
 */
define([
  'backbone',
  'router',
  'views/product/list',
  'views/product/edit'
], function(Backbone, AppRouter, ProductListView, ProductEditView){  
  var App = {
    /**
     * The current view the application is displaying.
     * @property _curView
     * @type Backbone.View
     * @default null
     * @private
     * @since 1.0.0
     */
    _curView: null,
    
    /**
     * Initializes the application.
     * @method initialize
     * @since 1.0.0
     */
    initialize: function(){ 
      this.configureRouter();
    },
    
    /**
     * Configures the router's route handlers and start the navigation process.
     * @method configureRouter.
     * @chainable
     * @since 1.0.0
     */
    configureRouter: function(){
      // configure AppRouter actions
      var router = new AppRouter(),
          that   = this;
      
      router.on('route:home', function(){
        that.openView(ProductListView);
      });
      
      router.on('route:addProduct', function(){
        that.openView(ProductEditView, {modelId: 0});
      });
      
      router.on('route:editProduct', function(productId){
        that.openView(ProductEditView, {modelId: productId});
      });
      
      this.configureAppEvents(router);
      
      // start router
      Backbone.history.start();
      
      // return this for chaining
      return this;
    },
    
    /**
     * Configures any app wide events.
     * @param {Backbone.Router} router the app router.
     * @chainable
     * @since 1.0.0
     */
    configureAppEvents: function(router){      
      Backbone.on('onSaveCompleted:product', function(){
        router.navigate('', {
          trigger: true
        });
      });
      Backbone.on('cancel:product', function(){
        router.navigate('', {
          trigger: true
        });
      });
      
      // return this for chaining
      return this;
    },
    
    /**
     * Opens the view based on the specified view class and sends in the view options 
     * to the view when it's created.
     * @param {Backbone.View} ViewClass the View Class to create an instance from.
     * @param {PlainObject} viewOptions the options to pass to the view class instance.
     * @chainable
     * @since 1.0.0
     */
    openView: function(ViewClass, viewOptions){
      if(this._curView){
        // close current view before opening new one
        this._curView.close();
      }
      
      this._curView = new ViewClass(viewOptions);
      
      // return this for chaining
      return this;
    }
  };
  
  return App;
});