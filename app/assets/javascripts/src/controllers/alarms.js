Ext.define('Gowane.controllers.Alarms', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();
    this.pubsub = _.extend({}, Backbone.Events);
    this.map = new App.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.geofence_alarms = new App.Views.GeofenceAlarms({el: "#map", pubsub: this.pubsub});
    this.speed_alarms = new App.Views.SpeedAlarms({el: "#map", pubsub: this.pubsub});
    var geofence_alarms = new App.Collections.GeofenceAlarms();
    var speed_alarms = new App.Collections.SpeedAlarms();
    this.map.render();
    speed_alarms.fetch({success: function(results) {
      this.pubsub.trigger("speed_alarms:received", results);
    }.bind(this)});
    geofence_alarms.fetch({success: function(results) {
      this.pubsub.trigger("geofence_alarms:received", results);
    }.bind(this)});
  }

});

