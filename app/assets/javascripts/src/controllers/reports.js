Ext.define('Gowane.controllers.Reports', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices'],

  events: {
    'viewport #save': {
      'click': "saveReport"
    },
    "viewport #run": {
      'click': "runReport"
    },
    'selectable_device_list': {
      selectionchange: "onDeviceSelect"
    }
  },

  onDeviceSelect: function(item, selection) {
    this.selected_devices = selection;
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  fetchReportCriteria: function() {

  },

  saveReport: function() {
    var criteria = this.fetchReportCriteria();
    if (criteria.valid())
    {

    }
  },

  runReport: function() {
    var criteria = this.fetchReportCriteria();
    if (criteria.valid())
    {

    }
  },

  onAccountChange: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  createStores: function() {
    Ext.create('Ext.data.ArrayStore', {fields: ['type', 'name'], storeId: "ReportTypeStore", data: [
      ["distance", "Distance Report"], ["speed", "Speed Report"], ["stop", "Stop Report"], ["alarm", "Alarm Report"]
    ]});
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
  },

  onLaunch: function() {
    this.callParent();
    Ext.data.StoreManager.lookup('DeviceStore').load();
  }

});
