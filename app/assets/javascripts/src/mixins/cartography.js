Ext.define('Gowane.Mixins.Cartography', {

  /**
   * Transforms a set of coordinates from WSG-84 to the Mercator projection used by Google
   * @param coordinates The coordinates to be transformed
   */
  projectForGoogleMaps: function(coordinates) {
    var sourceProjection = new OpenLayers.Projection("EPSG:4326");
    var targetProjection = new OpenLayers.Projection("EPSG:900913");
    return coordinates.transform(sourceProjection, targetProjection);
  },

  mercatorCoordinates: function(longitude, latitude) {
    return this.projectForGoogleMaps(new OpenLayers.LonLat(longitude, latitude));
  }


});
