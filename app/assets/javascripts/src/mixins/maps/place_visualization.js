Ext.define('Gowane.Mixins.Maps.PlaceVisualization', {

  hidePlaces: function() {
    if (this.place_layer) this.place_layer.destroyAllFeatures();
  },

  showPlaces: function(places) {
    this.ensurePlaceLayerAvailable();
    var features = this.makeFeature(places);
    this.place_layer.addFeatures(features);
  },

  makeFeatures: function(places) {
    var features = [];
    return features;
  },

  ensurePlaceLayerAvailable: function() {
    if (!this.place_layer) this.place_layer = new OpenLayers.Layer.Vector("places");
  }

});