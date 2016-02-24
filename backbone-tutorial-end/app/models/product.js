'use strict';

/**
 * Defines the product model.
 * File: app/models/product.js
 * Authors: Brandon Sherette
 * @class ProductModel
 * @extends Backbone.Model
 * @since 1.0.0
 */
define([
  'backbone',
  'localstorage'
], function(Backbone){
  // create model, extending Backbone's Model Class
  var ProductModel = Backbone.Model.extend({
    defaults: {
      name: '',
      category: '',
      description: ''
    },
    localStorage: new Backbone.LocalStorage('products')
  });
  
  // return created model
  return ProductModel;
});