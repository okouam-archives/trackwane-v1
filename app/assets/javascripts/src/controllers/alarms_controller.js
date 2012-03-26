App.Controllers.AlarmsController = App.Controllers.Base.extend({

  appEvents: {
    "geofence:creating:start": "onCreateGeofenceAlarm",
    "speed:creating:start": "onCreateSpeedAlarm",
    "geofence:created": "onGeofenceAlarmCreated",
    "speed:created": "onSpeedAlarmCreated",
    "speed:closing": "onClose",
    "geofence:closing": "onClose"
  },

  initialize: function(options) {
    this.init(options);
    this.map = new App.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.new_speed_alarm_panel = new App.Views.Alarms.SpeedPanel({el: "#canvas #new-speed-alarm-panel", pubsub: this.pubsub});
    this.new_geofence_alarm_panel = new App.Views.Alarms.GeofencePanel({el: "#canvas #new-geofence-alarm-panel", pubsub: this.pubsub});
    this.alarm_listing = new App.Views.Alarms.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.toolbar = new App.Views.Alarms.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.map.render();
  },

  onClose: function() {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.close();
  },

  onSpeedAlarmCreated: function(alarm) {
    alarm.save(null, {
      success: function() {
        this.new_speed_alarm_panel.close();
      }.bind(this),
      error: function() {
        console.debug(error);
        this.new_speed_alarm_panel.close();
      }.bind(this)
    });
  },

  onGeofenceAlarmCreated: function(alarm) {
    alarm.set("coordinates", this.map.getCoordinates());
    alarm.save(null, {
      success: function() {
        this.new_geofence_alarm_panel.close();
        this.close();
      }.bind(this),
      error: function(error) {
        console.debug(error);
        this.new_geofence_alarm_panel.close();
      }.bind(this)
    });
  },

  onCreateSpeedAlarm: function() {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.render();
  },

  onCreateGeofenceAlarm: function() {
    this.new_speed_alarm_panel.close();
    this.new_geofence_alarm_panel.render();
  }

});

