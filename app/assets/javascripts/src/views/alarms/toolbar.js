App.Views.Alarms.Toolbar = App.Views.Base.extend({

  events: {
    "click .speed.button": "onToggleSpeedAlarms",
    "click .geofence.button": "onToggleGeofenceAlarms",
    "click .clear.button": "clearAlarms"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  clearAlarms: function() {
    this.pubsub.trigger("alarms:clear");
  },

  onToggleSpeedAlarms: function() {
    this.pubsub.trigger("speed-alarms:show");
  },

  onToggleGeofenceAlarms: function() {
    this.pubsub.trigger("geofence-alarms:show")
  }

});