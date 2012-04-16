Trackwane.Services.Cartography = function(map) {
  this.map = map;
};

_.extend(Trackwane.Services.Cartography.prototype, {

  projectForGoogleMaps: function(coordinates) {
    var sourceProjection = new OpenLayers.Projection("EPSG:4326");
    var targetProjection = new OpenLayers.Projection("EPSG:900913");
    return coordinates.transform(sourceProjection, targetProjection);
  },

  mercatorCoordinates: function(longitude, latitude) {
    return this.projectForGoogleMaps(new OpenLayers.LonLat(longitude, latitude));
  },

  degreeCoordinates: function(longitude, latitude) {
    var coordinates = new OpenLayers.LonLat(longitude, latitude);
    var sourceProjection = new OpenLayers.Projection("EPSG:900913");
    var targetProjection = new OpenLayers.Projection("EPSG:4326");
    return coordinates.transform(sourceProjection, targetProjection);
  },

  createMap: function(el) {
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
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

  createLayer: function(name, useClustering) {
    if (!this.map)
      throw "A layer cannot be created by the Cartography Service unless it has been assigned a map.";
    var layer;
    if (useClustering)  {
      layer = new OpenLayers.Layer.Vector(name, {strategies: [new OpenLayers.Strategy.Cluster()]});
    } else {
      layer = new OpenLayers.Layer.Vector(name);
    }
    this.map.addLayer(layer);
    return layer;
  }

});