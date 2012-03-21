App.Controllers.AlarmsController = App.Controllers.Base.extend({

  initialize: function() {
    this.pubsub = _.extend({}, Backbone.Events);
    this.map = new App.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.new_speed_alarm_panel = new App.Views.Alarms.SpeedPanel({el: "#new-speed-alarm-panel", pubsub: this.pubsub});
    this.new_geofence_alarm_panel = new App.Views.Alarms.GeofencePanel({el: "#new-geofence-alarm-panel", pubsub: this.pubsub});
    this.alarm_listing = new App.Views.Alarms.Listing({el: "#alarm-listing", pubsub: this.pubsub});
    this.map.render();
  }

});

