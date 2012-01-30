Ext.define('Gowane.controllers.Realtime', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
    this.control({
      'availabledevices': {
        selectionchange: this.onDeviceSelect
      }
    })
  },

  onLaunch: function() {
    var store = this.getGowaneStoresDevicesStore();
    store.load();
  },

  onDeviceSelect: function(item, selected) {
    var sidecolumn = this.getSideColumn();
    if (!this.hasDeviceUpdates(sidecolumn))
      this.createDeviceUpdatesContainer(sidecolumn);
    this.showDeviceUpdatesFor(selected[0]);
  },

  showDeviceUpdatesFor: function(device) {
    this.tabs.add({xtype: 'realtimedeviceupdate', title: device.data.display_name});
  },

  hasDeviceUpdates: function(column) {
    return column.items.items.length > 1;
  },

  createDeviceUpdatesContainer: function(column) {
    this.tabs = Ext.create('Ext.tab.Panel', {
      width: '100%',
      height: 400,
      closable: true
    });
    column.add(this.tabs);
  }
});

