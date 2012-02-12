Ext.define('Gowane.controllers.Devices', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices'],

  init: function() {
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  }
});

