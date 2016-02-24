'use strict';

/**
 * The collection for product models.
 * File: app/collections/product
 * Authors: Brandon Sherette
 * @class ProductCollection
 * @extends Backbone.Collection
 * @since 1.0.0
 */
define([
  'backbone',
  'models/product'
], function(Backbone, ProductModel){
  // create class
  var ProductCollection = Backbone.Collection.extend({
    model: ProductModel,
    localStorage: new Backbone.LocalStorage('products')
  });
  
  // return created class
  return ProductCollection;
});