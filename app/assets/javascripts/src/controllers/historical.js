Ext.define('Gowane.controllers.Historical', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();
    this.pubsub = _.extend({}, Backbone.Events);
    this.devices = new App.Views.Devices({el: "#map", pubsub: this.pubsub});
    this.map = new App.Views.HistoricalMap({el: "#map", pubsub: this.pubsub});
    this.map.render();
  }

});

