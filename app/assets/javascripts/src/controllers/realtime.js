Ext.define('Gowane.controllers.Realtime', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices'],

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport realtime_map', ref: 'map'}
  ],

  events: {
    'selectable_device_list': {
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

  populateDeviceStore: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  createStores: function() {
    Ext.create('Ext.data.ArrayStore', {
      fields: ['name', 'date', 'speed', 'heading', 'address', 'status'], storeId: "RealtimeEventStore"
    });
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
  },

  onLaunch: function() {
    this.populateDeviceStore();
    this.getMap().renderMap();
    setInterval(this.poll.bind(this), 3000);
  },

  poll: function() {
    var store = Ext.getStore("RealtimeEventStore");
    if (this.selected_devices && this.selected_devices.length > 0) {
      var ids = _.map(this.selected_devices, function(device) {
        return device.get("id");
      });
      $.ajax({ url: "/devices/poll?ids=" + ids.join(","), success: function(data){
        var events = _.filter(data, function(event) {
          return event;
        });
        if (events.length > 0) {
          store.loadData(events, false);
          this.getMap().showDevices(events);
        }
      }.bind(this), dataType: "json"});
    } else {
      store.removeAll();
      this.getMap().clearDevices();
    }
  },

  onDeviceSelect: function(item, selection) {
    this.selected_devices = selection;
  }

});

