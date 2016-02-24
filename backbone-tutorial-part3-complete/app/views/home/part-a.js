'use strict';

/**
 * Home View Part A
 * The default home view for the Product Manager Application.
 * This is the first view that will be displayed.
 * File: app/views/home/part-a.js
 * Author: Brandon Sherette
 * @class HomeViewPartA
 * @extends Backbone.View
 * @since 1.0.0
 */
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  // Create the home view class template
  var HomeViewPartA = Backbone.View.extend({
    el: '#view-content',
    template: '<p>My First View Content!</p>',
    initialize: function(){
      // since this view doesn't require any data fetched, render can be called right away
      this.render();
    },
    render: function(){
      // apply template
      this.$el.html(this.template);
      
      // return this for chaining
      return this;
    }
  });
      
  // return the created home view class template
  return HomeViewPartA;
});