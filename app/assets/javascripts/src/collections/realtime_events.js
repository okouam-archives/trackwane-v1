App.Collections.RealtimeEvents = Backbone.Collection.extend({

  model: App.Models.RealtimeEvent,

  url: "/devices/poll"

});