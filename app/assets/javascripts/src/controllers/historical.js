Ext.define('Gowane.controllers.Historical', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups', 'Gowane.stores.GpsEvents'],

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport historical_map', ref: 'map'},
    {selector: 'date_selection', ref: 'datepicker'},
    {selector: 'viewport menu', ref: 'menu'}
  ],

  events: {
    'summary_device_list': {
      selectionchange: "onDeviceSelect"
    }
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAccountChange: function() {
    this.populateDeviceStore();
  },

  createStores: function() {
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
    Ext.create('Gowane.stores.Groups', {storeId: "GroupStore"});
    Ext.create('Gowane.stores.GpsEvents', {storeId: "GpsEventStore"});
  },

  populateDeviceStore: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  onLaunch: function() {
    this.callParent();
    this.getMap().renderMap();
    this.populateDeviceStore();
    var datepicker = this.getDatepicker();
    var fromDay = new Date();
    fromDay.setDate(fromDay.getDate() - 7);
    datepicker.getForm().setValues({
      fromDay: fromDay,
      toDay: new Date()
    });
  },

  onDeviceSelect: function(item, selection) {
    var device_id = selection[0].data.id;
    Ext.data.StoreManager.lookup('GpsEventStore').load({
      params: {device_id: device_id, type: 'gps'}, callback: function(data) {
        this.getMap().displayRoute(data);
      }.bind(this)
    });
  }
});

