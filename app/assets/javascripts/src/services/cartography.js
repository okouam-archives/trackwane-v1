App.Services.Cartography = function(map) {
  this.map = map;
};

_.extend(App.Services.Cartography.prototype, {

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
  },

  createMap: function(el) {
    this.map = new OpenLayers.Map(el, {theme: null, controls: [], minZoomLevel: 5, maxZoomLevel: 12});
    var gmap = new OpenLayers.Layer.Google("Streets");
    this.map.addLayer(gmap);
    this.addCommonControls();
    return this.map;
  },

  addCommonControls: function() {
    var panZoom = new OpenLayers.Control.PanZoomBar();
    panZoom.zoomWorldIcon = false;
    var controls = [
      new OpenLayers.Control.ScaleLine(),
      new OpenLayers.Control.DragPan(),
      new OpenLayers.Control.Navigation(),
      panZoom
    ];
    this.map.addControls(controls);
    $.each(controls, function (index, item) {
      item.activate();
    });
  },

  createLayer: function(name) {
    if (!this.map)
      throw "A layer cannot be created by the Cartography Service unless it has been assigned a map.";
    var layer = new OpenLayers.Layer.Vector(name);
    this.map.addLayer(layer);
    return layer;
  }

});