'use strict';

/**
 * Product Item View
 * Shows the product and description type details, shows pretty much everything for the item to the user.
 * File: app/views/product/item.js
 * Authors: Brandon Sherette
 * @class ProductItemView
 * @extends Backbone.View
 * @version 1.0.0
 */
define([
  'underscore',
  'jquery',
  'backbone',
  'models/product'
], function(_, $, Backbone, ProductModel){
  var ProductItemView = Backbone.View.extend({
    /**
     * The tag name to use to render the view into.
     * @property div
     * @type String
     * @since 1.0.0
     */
    tagName: 'div',
    
    /**
     * The name of the css class to apply to the view's tag.
     * @property className
     * @type String
     * @since 1.0.0
     */
    className: 'product-item',
    
    /**
     * The template to use for this view. Contains the html to use.
     * @property template
     * @since 1.0.0
     */
    template: _.template($('#tplProductItem').html()),
    
    /**
     * The model attached to this view.
     * @property model
     * @type ProductModel
     * @default null
     * @since 1.0.0
     */
    model: null,
    
    /**
     * Initializes this view. This is called when the view is created.
     * @method initialize
     * @since 1.0.0
     */
    initialize: function(options){
      this.loadModel(options);
    },
    
    /**
     * Loads the model for this view (fetches the data).
     * Calls this view's render once the data has been fetched.
     * @method loadModel
     * @since 1.0.0
     */
    loadModel: function(options){
      options = options || {};
      
      if(options.hasOwnProperty('model')){
        this.model = options.model;
      }else{
        // no model found
        this.model = new ProductModel();
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
      // apply the compiled html template to this view's jquery element, sending in the data the view will apply
      this.$el.html(this.template({
        product: this.model.toJSON()
      }));
      
      // return this for chaining
      return this;
    }
  });
  
  // return the created view
  return ProductItemView;
});