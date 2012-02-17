Ext.define('Gowane.controllers.Alarms', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Geofences', 'Gowane.stores.Alarms', 'Gowane.stores.Users'],
  refs: [
    {selector: 'viewport geofence_map', ref: 'map'}
  ],

  init: function() {
    this.control({
      'full_geofence_list': {
        selectionchange: this.onGeofenceSelect
      },
      'full_alarm_list': {
        selectionchange: this.onAlarmSelect
      },
      'full_alarm_list button[text="New Speed Alarm"]': {
        click: this.createSpeedAlarm
      },
      'full_alarm_list button[text="New Geofence Alarm"]': {
        click: this.createGeofenceAlarm
      },
      'full_alarm_list button[text="Delete Alarm"]': {
        click: this.deleteAlarm
      },
      'full_geofence_list button[text="New Geofence"]': {
        click: this.createGeofence
      },
      'full_geofence_list button[text="Delete Geofence"]': {
        click: this.deleteGeofence
      }
    })
  },

  onAlarmSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_alarm = selection[0];
    }
  },

  onGeofenceSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_geofence = selection[0];
    }
  },

  createGeofence: function() {
    this.getMap().createDrawingLayer();
    var form = this.createGeofenceForm();
    var window = this.createFloatingWindow("New Geofence", [form],
      this.closeGeofenceEditor.bind(this), this.saveGeofence.bind(this));
    window.show();
  },

  saveGeofence: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = Ext.getStore('GeofenceStore').add(form.getFieldValues())[0];
        record.set("coordinates", this.getMap().retrieveGeofenceCoordinates());
      } else {
        form.updateRecord(record);
      }
      record.save();
    }
    this.closeGeofenceEditor();
  },

  deleteGeofence: function() {
    if (!this.selected_geofence) {
      alert("Please select a geofence to delete.");
    } else {
      if (confirm("Are you sure you want to delete this geofence?")) {
        var store = this.selected_geofence.store;
        store.remove(this.selected_geofence);
        store.sync();
      }
    }
  },

  createSpeedAlarm: function() {
    var form = this.createSpeedAlarmForm();
    var window = this.createFloatingWindow("New Speed Alarm", [form],
      this.closeEditor.bind(this), this.saveSpeedAlarm.bind(this));
    window.show();
  },

  createGeofenceAlarm: function() {
    var form = this.createGeofenceAlarmForm();
    var window = this.createFloatingWindow("New Geofence Alarm", [form],
      this.closeEditor.bind(this), this.saveGeofenceAlarm.bind(this));
    window.show();
  },

  saveGeofenceAlarm: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = Ext.getStore('AlarmStore').add(form.getFieldValues())[0];
      } else {
        form.updateRecord(record);
      }
      record.save();
    }
    this.closeEditor();
  },

  saveSpeedAlarm: function() {
    var component = Ext.getCmp("editor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = Ext.getStore('AlarmStore').add(form.getFieldValues())[0];
      } else {
        form.updateRecord(record);
      }
      record.save();
    }
    this.closeEditor();
  },

  closeEditor: function() {
    var component = Ext.getCmp("editor");
    component.close();
  },

  deleteAlarm: function() {
    if (!this.selected_alarm) {
      alert("Please select an alarm to delete.");
    } else {
      if (confirm("Are you sure you want to delete this alarm?")) {
        var store = this.selected_alarm.store;
        store.remove(this.selected_alarm);
        store.sync();
      }
    }
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('GeofenceStore').load();
    Ext.data.StoreManager.lookup('AlarmStore').load();
  },

  closeGeofenceEditor: function() {
    this.closeEditor();
    this.getMap().deleteDrawingLayer();
  },

  createSpeedAlarmForm: function() {
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
        {fieldLabel: 'Maximum Speed', name: 'rule', width: 110, anchor: '-4'},
        {fieldLabel: 'Action', name: 'action', width: 110, anchor: '-4'},
        {fieldLabel: 'Recipient', name: 'recipient', width: 110, anchor: '-4'}
      ]
    });
  },

  createGeofenceAlarmForm: function() {
    var actions = [{id: "email", name: "Email"}, {id: "sms", name: "SMS"}];
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
        {fieldLabel: 'Geofence', store: Ext.getStore('GeofenceStore'), width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'rule', displayField: 'name', xtype: 'combobox'},
        {fieldLabel: 'Action', store: actions, width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'action', displayField: 'name', xtype: 'combobox'},
        {fieldLabel: 'Action', store: Ext.getStore('DeviceStore'), width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'action', displayField: 'name', xtype: 'combobox'}
      ]
    });
  },

  createGeofenceForm: function() {
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'}
      ]
    });
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

