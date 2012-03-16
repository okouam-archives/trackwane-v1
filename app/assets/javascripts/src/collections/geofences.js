App.Collections.Geofences = Backbone.Collection.extend({

  model: App.Models.Geofence,

  url: "/geofences",

  parse: function(response) {
    return response.results;
  }

});