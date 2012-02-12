Ext.define('Gowane.controllers.Historical', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups'],
  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport historical_map', ref: 'map'}
  ],

  init: function() {
    this.control({
      'summary_device_list': {
        selectionchange: this.onDeviceSelect
      }
    })
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('DeviceStore').load();
    Ext.data.StoreManager.lookup('GroupStore').load();
  },

  onDeviceSelect: function(item, selection) {
    var device_id = selection[0].data.id;
    $.get("/devices/" + device_id + "/events", function(data) {
      this.getMap().displayRoute(data);
    }.bind(this))
  }
});

