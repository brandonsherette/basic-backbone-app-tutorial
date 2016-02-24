'use strict';

/**
 * Home View Part B
 * The main view that will be shown when the page is in the home state.
 * File: app/views/home/part-b.js
 * Authors: Brandon Sherette
 * @class HomeViewPartB
 * @extends Backbone.View
 * @since 1.0.0
 */
define([
  'underscore',
  'jquery',
  'backbone'
], function(_, $, Backbone){
  var HomeViewPartB = Backbone.View.extend({
    el: '#view-content',
    
    // compile template using underscore template
    template: _.template('<p><%= msg %></p>'),
    
    initialize: function(){
      // since this view doesn't require any data fetched, render can be called right away
      this.render();
    },
    
    render: function(){      
      // apply the compiled html template to this view's jquery element
      this.$el.html(this.template({
        msg: 'Message from the msg property!'
      }));
      
      // return this for chaining
      return this;
    }
  });
  
  // return the created view
  return HomeViewPartB;
});