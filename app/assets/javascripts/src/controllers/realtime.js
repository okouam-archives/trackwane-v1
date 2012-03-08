Ext.define('Gowane.controllers.Realtime', {

  extend: 'Gowane.controllers.AbstractController',

  mixins: {
    geofence_visualization: 'Gowane.Mixins.Controllers.GeofenceVisualization',
    place_visualization: 'Gowane.Mixins.Controllers.PlaceVisualization'
  },

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Places', 'Gowane.stores.Geofences'],

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport realtime_map', ref: 'map'}
  ],

  events: {
    '#btn_toggle_geofences': {
      toggle: 'onToggleGeofences'
    },
    '#btn_toggle_places': {
      toggle: 'onTogglePlaces'
    },
    'selectable_device_list': {
      selectionchange: "onDeviceSelect"
    }
  },

  /* Event Handlers. */

  onToggleGeofences: function() {
    var map = this.getMap();
    this.toggleGeofences(map);
  },

  onTogglePlaces: function() {
    var map = this.getMap();
    this.togglePlaces(map);
  },

  onAccountChange: function() {
    this.changeCurrentAccount();
  },

  onLaunch: function() {
    this.callParent();
    this.launchController();
  },

  onDeviceSelect: function(item, selection) {
    this.selectDevice(selection);
  },

  /* Private Methods. */

  launchController: function() {
    this.populateDeviceStore();
    this.getMap().renderMap();
    setInterval(this.poll.bind(this), 3000);
  },

  selectDevice: function(selection) {
    this.selected_devices = selection;
  },

  changeCurrentAccount: function() {
    this.populateDeviceStore();
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
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
      this.getMap().clearDeviceFeatures();
    }
  }

});

