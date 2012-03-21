App.Services.GeofenceDrawingTool = function(map, pubsub) {
  this.map = map;
  var cartography = new App.Services.Cartography(map);
  this.draw_layer = cartography.createLayer("drawing_layer");
  this.map.addLayer(this.draw_layer);
  this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Polygon);
  this.drawFeature.events.on({
    featureadded: function() {
      this.drawFeature.deactivate();
      var geometry = this.draw_layer.features[0].geometry;
      var format = new OpenLayers.Format.WKT();
      pubsub.trigger("geofence:selected", format.extractGeometry(geometry));
    }.bind(this)
  });
  this.map.addControl(this.drawFeature);
};

_.extend(App.Services.GeofenceDrawingTool.prototype, {

  activate: function() {
    this.drawFeature.activate();
  },

  deactivate: function() {
    this.draw_layer.destroyFeatures();
    this.drawFeature.deactivate();
  }

});
