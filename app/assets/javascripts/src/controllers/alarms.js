Ext.define('Gowane.controllers.Alarms', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Geofences', 'Gowane.stores.Alarms'],
  refs: [
    {selector: 'viewport geofences_map', ref: 'map'}
  ],

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('GeofenceStore').load();
    Ext.data.StoreManager.lookup('AlarmStore').load();
  }
});

