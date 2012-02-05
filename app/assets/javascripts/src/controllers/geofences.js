Ext.define('Gowane.controllers.Geofences', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Geofences'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('GeofenceStore').load();
  }
});

