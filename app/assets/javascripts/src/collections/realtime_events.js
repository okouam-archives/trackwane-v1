App.Collections.RealtimeEvents = Backbone.Collection.extend({

  model: App.Models.Event,

  url: "/events/realtime"

});