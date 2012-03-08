Ext.define('Gowane.Mixins.Maps.GeofenceVisualization', {

    mixins: {
      cartography: 'Gowane.Mixins.Cartography'
    },

  hideGeofences: function() {
    if (this.geofence_layer) this.geofence_layer.destroyFeatures();
  },

  showGeofences: function(geofences) {
    this.ensureGeofenceLayerAvailable();
    _.each(geofences, function(geofence) {
      var feature = new OpenLayers.Format.WKT().read(geofence);
      this.geofence_layer.addFeatures([feature]);
    }.bind(this));
    this.map.zoomToExtent(this.geofence_layer.getDataExtent());
   },

  ensureGeofenceLayerAvailable: function() {
    if (!this.geofence_layer) this.geofence_layer = new OpenLayers.Layer.Vector("geofences");
  },

  retrieveGeofenceCoordinates: function() {
    var canvas = this.map.getLayersByName("drawing")[0];
    var area = canvas.features[0];
    var coordinates = new OpenLayers.Format.WKT().write(area);
    return coordinates;
  }

});