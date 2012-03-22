App.Controllers.AlarmsController = App.Controllers.Base.extend({

  initialize: function() {
    this.pubsub = _.extend({}, Backbone.Events);
    this.map = new App.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.new_speed_alarm_panel = new App.Views.Alarms.SpeedPanel({el: "#canvas .speed-alarm-panel", pubsub: this.pubsub});
    this.new_geofence_alarm_panel = new App.Views.Alarms.GeofencePanel({el: "#canvas .geofence-alarm-panel", pubsub: this.pubsub});
    this.alarm_listing = new App.Views.Alarms.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.toolbar = new App.Views.Alarms.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.map.render();
  }

});

