'use strict';

/**
 * View for editing products.
 * File: app/views/product/edit.js
 * Authors: Brandon Sherette
 * @class ProductEditView
 * @extends Backbone.View
 * @since 1.0.0
 */
define([
  'underscore',
  'jquery',
  'backbone',
  'services/product'
], function(_, $, Backbone, ProductService){
  var ProductEditView = Backbone.View.extend({
    /**
     * The element that this view will be attached to.
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
    template: _.template($('#tplProductEdit').html()),
    
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
    initialize: function(options){
      options = options || {};
      
      this.loadModel(options.modelId);
    },
    
    /**
     * The events attached to this view.
     * @property events
     * @type PlainObject
     * @since 1.0.0
     */
    events: {
      'keyup .form-control': 'onKeyUp',
      'click .btn-save': 'onSaveClick',
      'click .btn-cancel': 'onCancelClick'
    },
    
    /**
     * Loads the model for this view (fetches the data).
     * Calls this view's render once the data has been fetched.
     * @method loadModel
     * @since 1.0.0
     */
    loadModel: function(modelId){
      var that = this,
          model;
      
      ProductService.fetch().then(function(){
        model = ProductService.getModel(modelId);
        if(!model){
          model = ProductService.buildModel();
        }else{
          // use clone, so not to override data until save is pressed
          model = model.clone();
        }

        that.model = model;
        that.render();
      }, function(response){
        alert('Failed to load data. ' + response.msg);
      });
    },
    
    /**
     * The event that the button on the keyboard has been released (key up).
     * Bind model properties or form validation in this section for instant feedback.
     * @method onKeyUp
     * @param {Event} event the event that was triggered.
     * @since 1.0.0
     */
    onKeyUp: function(event){
      var $target = $(event.currentTarget),
          validExp = /^[\.\#\,a-zA-Z0-9\- ]+$/,
          modelProperty = $target.data('model'),
          value = $target.val();
        
      // only update if value is correct  
      if(validExp.test(value)){
        // update model property
        this.model.set(modelProperty, value);
        $target.removeClass('invalid');
      }else{
        $target.addClass('invalid');
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
      
      return this;
    },
    
    /**
     * The event that the save button has been clicked.
     * Saves the model's data.
     * @method onSaveClick
     * @param {Event} event the event that was triggered.
     * @since 1.0.0
     */
    onSaveClick: function(event){
      // prevent default action
      if(event){
        event.preventDefault();
      }
      
      // check if form is invalid
      if($('.form-control').hasClass('invalid') || this.model.get('name').length < 1){
        alert('Form Invalid');
      }else{
        // all good
        ProductService.save(this.model).then(function(){
          Backbone.trigger('onSaveCompleted:product');
        }, function(response){
          alert('Failed to save product: ' + response.msg);
        });
      }
    },
    
    /**
     * The event that the cancel button was clicked.
     * @method onCancelClick
     * @since 1.0.0
     */
    onCancelClick: function(){
      Backbone.trigger('cancel:product');
    },
    
    /**
     * Renders the view to the page.
     * @method render
     * @chainable
     * @since 1.0.0
     */
    render: function(){
      this.$el.html(this.template({
        product: this.model.toJSON()
      }));
      
      // return this for chaining
      return this;
    }
  });
  
  return ProductEditView;
});