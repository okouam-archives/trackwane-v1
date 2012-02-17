Ext.define('Gowane.controllers.Alarms', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Geofences', 'Gowane.stores.Alarms'],
  refs: [
    {selector: 'viewport geofences_map', ref: 'map'}
  ],

  init: function() {
    this.control({
      'full_alarm_list button[text="New Alarm"]': {
        click: this.createAlarm
      },
      'full_alarm_list button[text="Delete Alarm"]': {
        click: this.deleteAlarm
      },
      'full_alarm_list button[text="Edit Alarm"]': {
        click: this.editAlarm
      },
      'full_geofence_list button[text="New Geofence"]': {
        click: this.createGeofence
      },
      'full_geofence_list button[text="Delete Geofence"]': {
        click: this.deleteGeofence
      }
    })
  },

  createGeofence: function(e) {
    var window = this.createFloatingWindow();
    window.showAt(e.getXY());
  },

  deleteGeofence: function() {
    if (confirm("Are you sure you want to delete this geofence?")) {
      var store = this.selected_geofence.store;
      store.remove(this.selected_geofence);
      store.sync();
    }
  },

  createAlarm: function(e) {
    var window = this.createFloatingWindow();
    window.showAt(e.getXY());
  },

  editAlarm: function(e) {
    var window = this.createFloatingWindow();
    window.showAt(e.getXY());
  },

  deleteAlarm: function() {
    if (confirm("Are you sure you want to delete this alarm?")) {
      var store = this.selected_alarm.store;
      store.remove(this.selected_alarm);
      store.sync();
    }
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('GeofenceStore').load();
    Ext.data.StoreManager.lookup('AlarmStore').load();
  }
});

