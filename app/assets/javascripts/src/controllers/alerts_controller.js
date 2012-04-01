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
    this.alarms = [];
    var geofence_alarms = new App.Collections.GeofenceAlarms();
    geofence_alarms.fetch({success: function() {
      var attributes = geofence_alarms.map(function(alarm) {
        return {id: alarm.id, name: alarm.get("name"), type: "GeofenceAlarm"};
      });
      this.alarms = _.union(this.alarms, attributes);
    }.bind(this)});
    var speed_alarms = new App.Collections.SpeedAlarms();
    speed_alarms.fetch({success: function() {
      var attributes = speed_alarms.map(function(alarm) {
        return {id: alarm.id, name: alarm.get("name"), type: "SpeedAlarm"};
      });
      this.alarms = _.union(this.alarms, attributes);
    }.bind(this)});
    this.listing = new App.Views.Alerts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Alerts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new App.Views.Alerts.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    this.alerts = new App.Collections.Alerts();
    this.alerts.fetch({success: function(results) {
        this.listing.render(results);
      }.bind(this)
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
