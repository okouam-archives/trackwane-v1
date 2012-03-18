Ext.define('Gowane.controllers.AbstractController', {

  extend: 'Ext.app.Controller',

  constructor: function() {
    this.bindEvents();
    this.callParent(arguments);
  },

  bindEvents: function() {
    var me = this;
    _.each(this.events, function(event) {
      var keys = _.keys(event);
      _.each(keys, function(key) {
        event[key] = me[event[key]];
      })
    });
  }

});