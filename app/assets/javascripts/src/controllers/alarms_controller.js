Trackwane.Controllers.AlarmsController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "geofence:creating": "onCreatingGeofenceAlarm",
    "speed:creating": "onCreatingSpeedAlarm",
    "geofence:created": "onGeofenceAlarmCreated",
    "speed:created": "onSpeedAlarmCreated",
    "speed:closing": "onClose",
    "geofence:closing": "onClose",
    "geofence-alarm:deleted": "onGeofenceAlarmDeleted",
    "geofence-alarm:selected": "onGeofenceAlarmSelected",
    "speed-alarm:deleted": "onSpeedAlarmDeleted",
    "speed-alarm:selected": "onSpeedAlarmSelected",
    "alarms:clear": "onClearAlarms",
    "speed-alarms:show": "onShowSpeedAlarms",
    "geofence-alarms:show": "onShowGeofenceAlarms"
  },

  initialize: function(options) {
    this.init(options);
    this.map = new Trackwane.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.new_speed_alarm_panel = new Trackwane.Views.Alarms.SpeedPanel({el: "#canvas #new-speed-alarm-panel", pubsub: this.pubsub});
    this.new_geofence_alarm_panel = new Trackwane.Views.Alarms.GeofencePanel({el: "#canvas #new-geofence-alarm-panel", pubsub: this.pubsub});
    this.alarm_listing = new Trackwane.Views.Alarms.Listing({el: "#canvas #alarm-listing", pubsub: this.pubsub});
    this.toolbar = new Trackwane.Views.Alarms.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.map.render(options.extent);
    this.fetchAlarms();
  },

  onShowGeofenceAlarms: function() {
    this.map.clear();
    new Trackwane.Collections.GeofenceAlarms().fetch({success: function(results) {
      this.map.showAlarms(results);
    }.bind(this)});
  },

  onShowSpeedAlarms: function() {
    this.map.clear();
    new Trackwane.Collections.SpeedAlarms().fetch({success: function(results) {
      this.map.showAlarms(results);
    }.bind(this)});
  },

  onClearAlarms: function() {
    this.map.clear();
  },

  onGeofenceAlarmSelected: function(id) {
    var model = new Trackwane.Models.GeofenceAlarm({id: id});
    model.fetch({success: function(model) {
        this.map.clear();
        this.map.show(model.get("name"), model.get("coordinates"));
      }.bind(this)
    });
  },

  onSpeedAlarmDeleted: function(id) {
    var model = new Trackwane.Models.SpeedAlarm({id: id});
    model.destroy();
    new Trackwane.Collections.SpeedAlarms().fetch({success: function(results) {
      this.alarm_listing.addSpeedAlarm(results);
    }.bind(this)});
  },

  onGeofenceAlarmDeleted: function(id) {
    var model = new Trackwane.Models.GeofenceAlarm({id: id});
    model.destroy();
    new Trackwane.Collections.GeofenceAlarms().fetch({success: function(results) {
      this.alarm_listing.addGeofenceAlarm(results);
    }.bind(this)});
  },

  onSpeedAlarmSelected: function(id) {
    var model = new Trackwane.Models.SpeedAlarm({id: id});
    model.fetch({success: function(model) {
      this.map.clear();
        this.map.show(model.get("name"), model.get("coordinates"));
      }.bind(this)
    });
  },

  fetchAlarms: function() {
    this.geofence_alarms = new Trackwane.Collections.GeofenceAlarms();
    this.speed_alarms = new Trackwane.Collections.SpeedAlarms();
    this.speed_alarms.fetch({success: function(results) {
      this.alarm_listing.addSpeedAlarm(results);
    }.bind(this)});
    this.geofence_alarms.fetch({success: function(results) {
      this.alarm_listing.addGeofenceAlarm(results);
    }.bind(this)});
  },

  close: function() {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.close();
    this.map.stopEditing();
  },

  onClose: function() {
    this.close();
  },

  onSpeedAlarmCreated: function(alarm) {
    var coordinates = this.map.getCoordinates();
    console.debug(coordinates);
    if (coordinates) {
      alarm.set({coordinates: coordinates});
      alarm.save(null, {
        success: function() {
          this.new_speed_alarm_panel.close();
          this.close();
          this.speed_alarms.add(alarm);
          this.alarm_listing.addSpeedAlarm(this.speed_alarms);
        }.bind(this),
        error: function() {
          this.close();
        }.bind(this)
      });      
    }
    else {
      alert("You must drawn on the map before saving");
    }
  },

  onGeofenceAlarmCreated: function(alarm) {
    if (this.map.getCoordinates()) {
      var coordinates = this.map.getCoordinates();
      alarm.set({coordinates: coordinates});
      alarm.save(null, {
        success: function() {
          this.new_geofence_alarm_panel.close();
          this.close();
          this.geofence_alarms.add(alarm);
          this.alarm_listing.addGeofenceAlarm(this.geofence_alarms);
        }.bind(this),
        error: function() {
          this.close();
        }.bind(this)
      });
    }
    else{
      alert("You must drawn on the map before saving");
    } 
  },

  onCreatingSpeedAlarm: function(evt) {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.render(evt.screenY);
    this.map.startEditing();
  },

  onCreatingGeofenceAlarm: function(evt) {
    this.new_speed_alarm_panel.close();
    this.new_geofence_alarm_panel.render(evt.screenY);
    this.map.startEditing();
  }

});

