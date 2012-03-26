App.Views.Alarms.Toolbar = App.Views.Base.extend({

  events: {
    "click .new-speed-alarm.button": "onCreateSpeedAlarm",
    "click .new-geofence-alarm.button": "onCreateGeofenceAlarm"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreateSpeedAlarm: function() {
    this.pubsub.trigger("speed:creating:start");
  },

  onCreateGeofenceAlarm: function() {
    this.pubsub.trigger("geofence:creating:start")
  }

});