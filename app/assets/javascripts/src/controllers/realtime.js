Ext.define('Gowane.controllers.Realtime', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();
    setInterval(this.poll.bind(this), 3000);
    this.pubsub = _.extend({}, Backbone.Events);
    this.realtime_events = new App.Views.RealtimeEvents({el: "#map", pubsub: this.pubsub});
    this.map = new App.Views.RealtimeMap({el: "#map", pubsub: this.pubsub});
    this.map.render();
  },

  poll: function() {
    var events = new App.Collections.RealtimeEvents();
    events.fetch({success: function(results) {
      this.pubsub.trigger("events:received", results);
    }.bind(this)});
  }
});

