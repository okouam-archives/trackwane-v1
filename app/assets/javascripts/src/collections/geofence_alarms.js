App.Collections.GeofenceAlarms = Backbone.Collection.extend({

  model: App.Models.GeofenceAlarm,

  url: "/geofence_alarms",

  parse: function(response) {
    return response.results;
  }

});