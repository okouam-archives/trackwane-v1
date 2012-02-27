Ext.define('Gowane.controllers.Alarms', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Geofences', 'Gowane.stores.Alarms', 'Gowane.stores.Users'],

  refs: [
    {selector: 'viewport geofence_map', ref: 'map'}
  ],

  events: {
    'full_geofence_list': {
      selectionchange: "onGeofenceSelect"
    },
    'full_alarm_list': {
      selectionchange: "onAlarmSelect"
    },
    'full_alarm_list button[text="New Speed Alarm"]': {
      click: "createSpeedAlarm"
    },
    'full_alarm_list button[text="New Geofence Alarm"]': {
      click: "createGeofenceAlarm"
    },
    'full_alarm_list button[text="Delete Alarm"]': {
      click: "deleteAlarm"
    },
    'full_geofence_list button[text="New Geofence"]': {
      click: "createGeofence"
    },
    'full_geofence_list button[text="Delete Geofence"]': {
      click: "deleteGeofence"
    }
  },

  onAccountChange: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAlarmSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_alarm = selection[0];
    }
  },

  onGeofenceSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_geofence = selection[0];
      this.getMap().showGeofence(selection[0].get("coordinates"));
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
    this.callParent();
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('GeofenceStore').load();
    Ext.data.StoreManager.lookup('AlarmStore').load();
    Ext.data.StoreManager.lookup('UserStore').load();
  },

  createStores: function() {
    Ext.create('Gowane.stores.Geofences', {
      storeId: "GeofenceStore"
    });
    Ext.create('Gowane.stores.Alarms', {
      storeId: "AlarmStore"
    });
    Ext.create('Gowane.stores.Users', {
      storeId: "UserStore"
    });
  },

  closeGeofenceEditor: function() {
    this.closeEditor();
    this.getMap().deleteDrawingLayer();
  },

  createSpeedAlarmForm: function() {
    var ruleSelector = {
      fieldLabel: 'Maximum Speed',
      name: 'rule',
      width: 110,
      anchor: '-4'
    };
    return this.createAlarmForm(ruleSelector);
  },

  createGeofenceAlarmForm: function() {
    var ruleSelector =  {
      fieldLabel: 'Geofence',
      store: Ext.getStore('GeofenceStore'),
      width: 110,
      queryMode: 'local',
      anchor: '-4',
      valueField: 'id',
      name: 'rule',
      displayField: 'name',
      xtype: 'combobox',
      forceSelection: true
    };
    return this.createAlarmForm(ruleSelector);
  },

  createAlarmForm: function(ruleSelector) {
    var actions = [["email", "Email"], ["sms", "SMS"]];
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {xtype: 'hidden', name: 'category', value: 'geofence'},
        ruleSelector,
        {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
        {fieldLabel: 'Medium', store: actions, width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'medium', displayField: 'name', xtype: 'combobox', forceSelection: true},
        {fieldLabel: 'Recipient', store: Ext.getStore('UserStore'), width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'recipient', displayField: 'login', xtype: 'combobox', forceSelection: true}
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

