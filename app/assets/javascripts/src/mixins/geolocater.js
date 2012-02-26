Ext.define('Gowane.Mixins.Geolocater', {

  projectForGoogleMaps: function(coordinates) {
    var sourceProjection = new OpenLayers.Projection("EPSG:4326");
    var targetProjection = new OpenLayers.Projection("EPSG:900913");
    return coordinates.transform(sourceProjection, targetProjection);
  }

});
