Trackwane.Collections.RealtimeEvents = Backbone.Collection.extend({

  model: Trackwane.Models.Event,

  url: "/events/realtime"

});