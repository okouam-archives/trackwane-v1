Ext.define('Gowane.controllers.Geofences', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Geofences'],
  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport geofences_map', ref: 'map'}
  ],

  init: function() {
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('GeofenceStore').load();
  }
});

