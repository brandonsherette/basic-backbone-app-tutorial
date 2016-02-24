'use strict';

/**
 * The service for dealing with products.
 * File: app/services/product.js
 * Authors: Brandon Sherette
 * @class ProductService
 * @since 1.0.0
 */
define([
  'underscore',
  'jquery',
  'collections/product',
  'models/product'
], function(_, $, ProductCollection, ProductModel){
  var ProductService = {
    /**
     * The data stored for this service.
     * @property data
     * @type ProductCollection
     * @default null
     * @since 1.0.0
     */
    data: null,
    
    /**
     * Whether or not data has already been loaded from the server/localstorage.
     * Used to help prevent more calls to server than nessessary.
     * @property dataLoaded
     * @type Boolean
     * @default false
     * @since 1.0.0
     */
    dataLoaded: false,
    
    /**
     * Builds a service model with the specified properties.
     * @method buildModel
     * @param {PlainObject} properties the plain object of properties to apply to the newly built model.
     * @return {ProductModel} the newly created model.
     * @since 1.0.0
     */
    buildModel: function(properties){
      return new ProductModel(properties);
    },
    
    /**
     * Builds a model collection based on the options provided.
     * If an array of objects is sent, all objects will be created into the model for this service and added to that model's collection.
     * If options is an object, that single object will be created is the service's model and will be the single entity to the returned collection.
     * If no options are provided, then an empty collection will be returned.
     * @method buildModelCollection
     * @param {Array|Object} options an array of objects to create a collection from or a single object to add to an empty collection.
     * @return {ProductCollection} the built model collection.
     * @since 1.0.0
     */
    buildModelCollection: function(options){
      var collection = new ProductCollection();
      
      if(Array.isArray(options)){
        _.each(options, function(properties){
          collection.add(this.buildModel(properties));
        });
      }else if(typeof options === 'object'){
        collection.add(this.buildModel(options));
      }
      
      return collection;
    },
    
    /**
     * Fetches data from the server/localstorage.
     * @param {Boolean} [forceRefresh=false] force the data to be refreshed from the server if set to true, false to use data already loaded.
     * @param {Boolean} [useDummyData=false] whether or not to use dummy data while fetching data (used for testing).
     * @return {promise} the deferred promise that the data has been fetched from the server/localstorage.
     * @since 1.0.0
     */
    fetch: function(forceRefresh, useDummyData){
      var that = this,
          products = new ProductCollection(),
          deferred = $.Deferred();
      
      // don't load if data has already been loaded and forceRefresh wasn't requested
      // prevent unessessary server calls if forceRefresh isn't called
      if(this.dataLoaded && !forceRefresh){
        deferred.resolve({
          msg: 'Get Completed'
        });
        
        // prevent further execution since data has already been loaded previously
        return deferred.promise();
      }
      
      // Dummy Data Process
      if(useDummyData){
        return this.fetchDummyData();
      }
      
      // Fetch Actual Data Process
      return products.fetch().then(function(){
        that.dataLoaded = true;
        that.data = products;
      });
    },
    
    /**
     * Fetches dummy data for this service.
     * @method fetchDummyData
     * @return {promise} the deferred promise that the dummy data has been fetched.
     * @since 1.0.0
     */
    fetchDummyData: function(){
      var deferred = $.Deferred(),
          that = this;
      
      // simulate waiting for server response
      window.setTimeout(function(){
        that.data = that.getDummyData();
        that.dataLoaded = true;
        deferred.resolve({
          msg: 'Get Completed'
        });
      }, 1000);
        
      return deferred.promise();
    },
    
    /**
     * Gets dummy service data. 
     * This is used to test and simulate data from the server. 
     * Used by fetch if useDummyData option is set to true.
     * @method getDummyData
     * @return {ProductCollection} the collection of products.
     * @since 1.0.0
     */
    getDummyData: function(){
      var productCollection = new ProductCollection([
        new ProductModel({
          name: 'Pencil',
          category: 'Office Supplies',
          description: 'A basic #2 Pencil, useful for writing notes.'
        }),
        new ProductModel({
          name: 'Notebook',
          category: 'Office Supplies',
          description: 'A book for writing down your thoughts.'
        }),
        new ProductModel({
          name: 'CD Player',
          category: 'Electronics',
          description: 'Plays your music cds.'
        })
      ]);
      
      return productCollection;
    },
    
    /**
     * Saves the specified model to the server/localstorage. 
     * Adds/updates that specified model to the services model collection.
     * @method save
     * @param {Backbone.Model} model the model to save.
     * @return {promise} the deferred promise that the model will be saved.
     * @since 1.0.0
     */
    save: function(model){
      var updateModel = this.getModel(model),
          deferred = $.Deferred(),
          that = this;
      
      if(updateModel){
        // update the found model with the model to saves attributes
        updateModel.set(model.attributes);
      }else{
        updateModel = model;
      }
      
      return updateModel.save().then(function(){
        if(!that.data){
          that.data = new ProductCollection([
            model
          ]);
        }else{
          that.data.set(model, {
            remove: false
          });
        }
        
        deferred.resolve({
          msg: 'Save Successful'
        });
      });
      
      return deferred.promise();
    },
    
    /**
     * Removes the specified model from the product collection and from storage.
     * @method destroy
     * @param {Backbone.Model|String} model the backbone model or id for the model to destroy.
     * @returns {promise} the deferred promise that the model will be destroyed.
     * @since 1.0.0
     */
    destroy: function(model){
      var deferred = $.Deferred();
      
      // id can be used, if string assume id
      if(typeof model === 'string'){
        model = this.getModel(model);
      }
      
      if(model){
        return model.destroy();
      }else{
        deferred.reject({
          msg: 'Product Not Found'
        });
      }
      
      return deferred.promise();
    },
    
    /**
     * Gets the specified model from the service collection.
     * @method getModel
     * @param {Backbone.Model|String} model the backbone model, or id, or cid of the model to find in the service.
     * @return {Backbone.Model|null} returns the found model in the service, returns null if no match was found.
     * @since 1.0.0
     */
    getModel: function(model){
      if(this.data){
        return this.data.get(model);
      }
      
      return null;
    }
  };
  
  return ProductService;
});