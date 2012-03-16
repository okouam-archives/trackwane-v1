Ext.define('Gowane.controllers.Realtime', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();
    setInterval(this.poll.bind(this), 3000);
    this.pubsub = _.extend({}, Backbone.Events);
    this.realtime_events = new App.Views.RealtimeEvents({el: "#realtime_map", pubsub: this.pubsub});
    this.realtime_map = new App.Views.RealtimeMap({el: "#realtime_map", pubsub: this.pubsub});
    this.realtime_map.render();
  },

  poll: function() {
    var events = new App.Collections.RealtimeEvents();
    events.fetch({success: function(results) {
      this.pubsub.trigger("events:received", results);
    }.bind(this)});
  }
});

