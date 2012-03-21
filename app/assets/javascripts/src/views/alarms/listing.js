App.Views.Alarms.Listing = App.Views.Base.extend({

  appEvents: {
    "speed_alarms:received": "renderSpeedAlarms",
    "geofence_alarms:received": "renderGeofenceAlarms",
    "geofence-alarm:created": "addGeofenceAlarm",
    "speed-alarm:created": "addSpeedAlarm"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.handleApplicationEvents();
    this.geofence_alarms_listing = new App.Views.GeofenceAlarms({el: "#alarm-listing .geofence-alarms", pubsub: this.pubsub});
    this.speed_alarms_listing = new App.Views.SpeedAlarms({el: "#alarm-listing .speed-alarms", pubsub: this.pubsub});
    this.geofence_alarms = new App.Collections.GeofenceAlarms();
    this.speed_alarms = new App.Collections.SpeedAlarms();
    this.speed_alarms.fetch({success: function(results) {
      this.pubsub.trigger("speed_alarms:received", results);
    }.bind(this)});
    this.geofence_alarms.fetch({success: function(results) {
      this.pubsub.trigger("geofence_alarms:received", results);
    }.bind(this)});
  },

  addGeofenceAlarm: function(alarm) {
    this.geofence_alarms.add(alarm);
    this.renderGeofenceAlarms(this.geofence_alarms);
  },

  addSpeedAlarm: function(alarm) {
    this.speed_alarms.add(alarm);
    this.renderSpeedAlarms(this.speed_alarms);
  },

  renderGeofenceAlarms: function(models) {
    this.geofence_alarms_listing.render(models);
  },

  renderSpeedAlarms: function(models) {
    this.speed_alarms_listing.render(models);
  }


});