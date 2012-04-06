App.Collections.HistoricalEvents = Backbone.Collection.extend({

  model: App.Models.Event,

  url: "/events"

});