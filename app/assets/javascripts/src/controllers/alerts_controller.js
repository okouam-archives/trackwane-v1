App.Controllers.AlertsController = App.Controllers.Base.extend({

  appEvents: {
    "alerts:fetched": "onAlertsFetched",
    "editor:closed": "onEditorClosed",
    "alert:selected": "onAlertSelected",
    "alert:created": "onAlertCreated",
    "alert:saved": "onAlertSaved",
    "alert:deleted": "onAlertDeleted"
  },

  events: {
    "click .new-alert": "onNewAlert"
  },

  initialize: function(options) {
    this.init(options);
    this.alarms = this.getAvailableAlarms(options.geofence_alarms, options.speed_alarms);
    this.listing = new App.Views.Alerts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Alerts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new App.Views.Alerts.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    this.listing.render(new App.Collections.Alerts(options.alerts));
  },

  getAvailableAlarms: function(geofence_alarms, speed_alarms) {
    var attributes = this.parseAlarms(new App.Collections.GeofenceAlarms(geofence_alarms), "GeofenceAlarm");
    var alarms = _.union([], attributes);
    attributes = this.parseAlarms(new App.Collections.SpeedAlarms(speed_alarms), "SpeedAlarm");
    return _.union(alarms, attributes);
  },

  parseAlarms: function(alarms, type) {
    alarms.map(function(alarm) {
      return {id: alarm.id, name: alarm.get("name"), type: type};
    });
  },

  onNewAlert: function() {
    this.editor.render({alarms: this.alarms});
  },

  onAlertsFetched: function(alerts) {
    this.alerts = alerts;
    this.listing.render(alerts);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onAlertSelected: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.editor.render({alert: alert, alarms: this.alarms});
  },

  onAlertCreated: function(attributes) {
    var alert = new App.Models.Alert(attributes);
    alert.save(null, {success: function(model) {
        this.alerts.add(model);
        this.listing.render(this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertSaved: function(attributes) {
    var alert = this.alerts.get(attributes.id);
    alert.save(attributes, {success: function() {
        this.listing.render(this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertDeleted: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.alerts.remove(device);
    alert.destroy();
    this.editor.close();
    this.listing.render(this.alerts);
  }

});
