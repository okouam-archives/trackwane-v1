App.Models.GeofenceAlarm = Backbone.Model.extend({

  urlRoot: "/geofence_alarms",

  validate: function(attrs) {
    var errors = [];
    if (!attrs.name) errors.push("No name has been provided for the geofence alarm");
    if (errors) return errors;
  }

});