Ext.define('Gowane.controllers.Realtime', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups'],

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport realtime_map', ref: 'map'}
  ],

  events: {
    'summary_device_list': {
      selectionchange: this.onDeviceSelect
    }
  },

  init: function() {
    this.callParent(arguments);
    this.createDeviceStore();
  },

  onAccountChange: function() {
    this.populateDeviceStore();
  },

  populateDeviceStore: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
    Ext.data.StoreManager.lookup('GroupStore').load();
  },

  createDeviceStore: function() {
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
    Ext.create('Gowane.stores.Groups', {storeId: "GroupStore"});
  },

  onLaunch: function() {
    this.populateDeviceStore();
    this.getMap().renderMap();
    setInterval(this.poll.bind(this), 3000)
  },

  poll: function() {
    if (this.current_device) {
      $.ajax({ url: "/devices/poll?id=" + this.current_device, success: function(data){
        this.getMap().showDevice(data);
      }.bind(this), dataType: "json"});
    }
  },

  onDeviceSelect: function(item, selection) {
    this.current_device = selection[0].data.id;
  }

});

