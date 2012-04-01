App.Views.Alarms.Listing = App.Views.Base.extend({

  events: {
    "click .speed.btn": "onCreateSpeedAlarm",
    "click .geofence.btn": "onCreateGeofenceAlarm"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.geofence_alarms_listing = new App.Views.GeofenceAlarms({el: "#alarm-listing .geofence-alarms", pubsub: this.pubsub});
    this.speed_alarms_listing = new App.Views.SpeedAlarms({el: "#alarm-listing .speed-alarms", pubsub: this.pubsub});
  },

  addGeofenceAlarm: function(alarms) {
    this.geofence_alarms_listing.render(alarms);
  },

  addSpeedAlarm: function(alarms) {
    this.speed_alarms_listing.render(alarms);
  },

  onCreateSpeedAlarm: function(evt) {
    this.pubsub.trigger("speed:creating", evt);
  },

  onCreateGeofenceAlarm: function(evt) {
    this.pubsub.trigger("geofence:creating", evt);
  }

});