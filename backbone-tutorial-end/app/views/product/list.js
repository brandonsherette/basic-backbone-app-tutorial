'use strict';

/**
 * Product List View
 * Shows all the products in a list type format.
 * File: app/views/product/list.js
 * Authors: Brandon Sherette
 * @class ProductListView
 * @extends Backbone.View
 * @since 1.0.0
 */
define([
  'underscore',
  'jquery',
  'backbone',
  'services/product',
  'views/product/item'
], function(_, $, Backbone, ProductService, ProductItemView){
  var ProductListView = Backbone.View.extend({
    /**
     * The element to attach to this view.
     * @property el
     * @type String
     * @since 1.0.0
     */
    el: '#view-content',
    
    /**
     * The template to use for this view. Contains the html to use.
     * @property template
     * @since 1.0.0
     */
    template: _.template($('#tplProductList').html()),
    
    /**
     * The model attached to this view.
     * @property model
     * @type ProductCollection
     * @default null
     * @since 1.0.0
     */
    model: null,
    
    /**
     * Initializes this view. This is called when the view is created.
     * @method initialize
     * @since 1.0.0
     */
    initialize: function(){
      this.loadModel();
    },
    
    /**
     * The events attached to this view.
     * @property events
     * @type PlainObject
     * @since 1.0.0
     */
    events: {
      'click .delete-product': 'onDeleteProductClick'
    },
    
    /**
     * Loads the model for this view (fetches the data).
     * Calls this view's render once the data has been fetched.
     * @method loadModel
     * @since 1.0.0
     */
    loadModel: function(){
      var that = this;
      
      ProductService.fetch().then(function(){
        that.model = ProductService.data;
        // data has been found, render the view
        that.render();
      }, function(response){
        alert('Server Error - ' + response.msg);
      });
    },
    
    /**
     * The event that the delete product button has been clicked.
     * Deletes the product that the button is associated to from data-model attribute.
     * @method onDeleteProductClick
     * @param {Event} event the event that was triggered.
     * @since 1.0.0
     */
    onDeleteProductClick: function(event){
      var $target = $(event.currentTarget),
          id = $target.data('id'),
          product = ProductService.getModel(id),
          that = this;
      
      if(window.confirm('Are you sure you want to delete ' + product.get('name') + '?')){
        ProductService.destroy(id).then(function(){
          // re-render to update the changes
          that.render();
          alert('Product Deleted');
        }, function(response){
          alert('Failed to delete product. ' + response.msg);
        });
      }
    },
    
    /**
     * Closes the view.
     * Unbinds any events, empties the contents of the view, and stops listening to any other events.
     * @method close
     * @chainable
     * @since 1.0.0
     */
    close: function(){
      this.$el.unbind();
      this.$el.empty();
      this.stopListening();
    },
    
    /**
     * Renders the view to the page.
     * @method render
     * @chainable
     * @since 1.0.0
     */
    render: function(){
      var $productList;
      
      // apply the compiled html template to this view's jquery element, sending in the data the view will apply
      this.$el.html(this.template({
        productsMsg: (this.model.length === 0) ? 'No Products Found' : ''
      }));
      
      // capture product list element to apply data to
      $productList = this.$el.find('.product-list');
      
      // add to the product list portion of this view
      this.model.each(function(product){
        var mProductItemView = new ProductItemView({
          model: product
        });
        
        $productList.append(mProductItemView.render().el);
      });
      
      // return this for chaining
      return this;
    }
  });
  
  // return the created view
  return ProductListView;
});