Ext.define('Gowane.controllers.Alarms', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Geofences', 'Gowane.stores.SpeedAlarms', 'Gowane.stores.GeofenceAlarms', 'Gowane.stores.Users'],

  mixins: {
    geofence_management: 'Gowane.Mixins.Controllers.GeofenceManagement',
    alarm_management: 'Gowane.Mixins.Controllers.AlarmManagement'
  },

  refs: [
    {selector: 'viewport geofence_map', ref: 'map'}
  ],

  events: {
    'geofence_list': {
      selectionchange: "onGeofenceSelect"
    },
    'geofence_alarm_list': {
      selectionchange: "onAlarmSelect"
    },
    'speed_alarm_list': {
      selectionchange: "onAlarmSelect"
    },
    '#btn_create_speed_alarm': {
      click: "onCreateSpeedAlarm"
    },
    '#btn_create_geofence_alarm': {
      click: "onCreateGeofenceAlarm"
    },
    '#btn_delete_speed_alarm': {
      click: "onDeleteAlarm"
    },
    '#btn_delete_geofence_alarm': {
      click: "onDeleteAlarm"
    },
    '#btn_create_geofence': {
      click: "onCreateGeofence"
    },
    '#btn_delete_geofence': {
      click: "onDeleteGeofence"
    }
  },

  /* Event Handlers. */

  onAccountChange: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAlarmSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selectAlarm(selection[0]);
    }
  },

  onGeofenceSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selectGeofence(selection[0], this.getMap());
    }
  },

  onDeleteGeofence: function() {
    if (!this.selected_geofence) {
      alert("Please select a geofence to delete.");
    } else {
      if (confirm("Are you sure you want to delete this geofence?")) {
        this.deleteGeofence(this.selected_geofence);
      }
    }
  },

  onDeleteAlarm: function() {
    if (!this.selected_alarm) {
      alert("Please select an alarm to delete.");
    } else {
      if (confirm("Are you sure you want to delete this alarm?")) {
        this.deleteAlarm(this.selected_alarm);
      }
    }
  },

  onCreateGeofence: function() {
    this.getMap().createDrawingLayer();
    var form = Ext.widget('geofence_form');
    var window = this.createFloatingWindow("New Geofence", [form],
      this.closeGeofenceEditor.bind(this), this.onSaveGeofence.bind(this));
    window.show();
  },

  onSaveGeofence: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    var wasSuccess = this.saveGeofence(form, Ext.getStore('GeofenceStore'), this.getMap());
    if (wasSuccess) this.closeGeofenceEditor();
  },

  onCreateSpeedAlarm: function() {
    var form = Ext.widget('speed_alarm_form');
    var window = this.createFloatingWindow("New Speed Alarm", [form],
      this.closeEditor.bind(this), this.onSaveSpeedAlarm.bind(this));
    window.show();
  },

  onCreateGeofenceAlarm: function() {
    var form = Ext.widget('geofence_alarm_form');
    var window = this.createFloatingWindow("New Geofence Alarm", [form],
      this.closeEditor.bind(this), this.onSaveGeofenceAlarm.bind(this));
    window.show();
  },

  onSaveGeofenceAlarm: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    this.saveGeofenceAlarm(form, Ext.getStore('GeofenceAlarmStore'));
    this.closeEditor();
  },

  onSaveSpeedAlarm: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    this.saveSpeedAlarm(form, Ext.getStore('SpeedAlarmStore'));
    this.closeEditor();
  },

  /* Private Methods. */

  closeEditor: function() {
    var component = Ext.getCmp("editor");
    component.close();
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('GeofenceStore').load();
    Ext.data.StoreManager.lookup('GeofenceAlarmStore').load();
    Ext.data.StoreManager.lookup('SpeedAlarmStore').load();
    Ext.data.StoreManager.lookup('UserStore').load();
    this.callParent();
    this.pubsub = _.extend({}, Backbone.Events);
    this.alarm_map = new App.Views.AlarmMap({el: "#alarm_map", pubsub: this.pubsub});
    this.alarm_map.render();
  },

  createStores: function() {
    Ext.create('Gowane.stores.Geofences', {storeId: "GeofenceStore"});
    Ext.create('Gowane.stores.GeofenceAlarms', {storeId: "GeofenceAlarmStore"});
    Ext.create('Gowane.stores.SpeedAlarms', {storeId: "SpeedAlarmStore"});
    Ext.create('Gowane.stores.Users', {storeId: "UserStore"});
  },

  closeGeofenceEditor: function() {
  },

  createFloatingWindow: function(title, contents, cancelCallback, saveCallback) {
    return new Ext.Window({
      width: 310,
      id: "editor",
      title: title,
      height: 203,
      closable: false,
      items: contents,
      fbar: [{text: 'Cancel', handler: cancelCallback}, {text: 'Save', handler: saveCallback}]
    });
  }
});

