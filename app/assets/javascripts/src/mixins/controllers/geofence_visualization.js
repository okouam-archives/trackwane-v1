Ext.define('Gowane.Mixins.Controllers.GeofenceVisualization', {

  toggleGeofences: function(action, map) {
    if (action == 'hide') this.hideGeofences(map);
    else this.showGeofences(map);
  },

  hideGeofences: function(map) {
    map.hideGeofences();
  },

  showGeofences: function(map) {
    var geofences = new $.App.Collections.Geofence();
    geofences.fetch(function(collection) {
      map.showGeofences(collection);
    });
  }

});