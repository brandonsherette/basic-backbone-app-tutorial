'use strict';

/**
 * Home View - Part F
 * This part will entail dealing with Backbone Collections.
 * File: app/views/home/part-f.js
 * Authors: Brandon Sherette
 * @class HomeViewPartF
 * @extends Backbone.View
 * @since 1.0.0
 */
define([
  'underscore',
  'jquery',
  'backbone',
  'collections/product',
  'models/product'
], function(_, $, Backbone, ProductCollection, ProductModel){
  var HomeViewPartF = Backbone.View.extend({
    el: '#view-content',
    // compile template using underscore template
    template: _.template($('#tplHomePartF').html()),
    model: null,
    initialize: function(){
      this.loadModel();
    },
    loadModel: function(){
      this.model = new ProductCollection([
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
      
      // since data is being set and not loaded via fetch, you can call render right away
      this.render();
    },
    render: function(){
      // apply the compiled html template to this view's jquery element
      this.$el.html(this.template({
        products: this.model
      }));
      
      // return this for chaining
      return this;
    }
  });
  
  // return the created view
  return HomeViewPartF;
});