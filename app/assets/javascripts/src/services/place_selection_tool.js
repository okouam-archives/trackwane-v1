App.Services.PlaceSelectionTool = function(map) {
  this.map = map;
  this.cartography = new App.Services.Cartography(this.map);
  this.draw_layer = this.cartography.createLayer("drawing_layer");
  this.map.addLayer(this.draw_layer);
  this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Point);
  this.drawFeature.events.on({
    featureadded: function() {
      this.drawFeature.deactivate();
      this.point = this.draw_layer.features[0].geometry;
    }.bind(this)
  });
  this.map.addControl(this.drawFeature);
};

_.extend(App.Services.PlaceSelectionTool.prototype, {

  activate: function() {
    this.drawFeature.activate();
  },

  getCoordinates: function() {
    return this.cartography.degreeCoordinates(this.point.x, this.point.y);
  },

  deactivate: function() {
    this.draw_layer.destroyFeatures();
    this.drawFeature.deactivate();
  }

});
