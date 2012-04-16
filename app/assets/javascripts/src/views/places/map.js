Trackwane.Views.PlacesMap = Trackwane.Views.Base.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  allowPlaceSelection: function() {
    if (!this.place_selection_tool) this.place_selection_tool = new Trackwane.Services.PlaceSelectionTool(this.map);
    this.place_selection_tool.activate();
  },

  show: function(places) {
    this.place_layer.destroyFeatures();
    this.createFeatures(places);
  },

  stopEditing: function() {
    if (this.place_selection_tool) this.place_selection_tool.deactivate();
  },

  createFeatures: function(places) {
    if (!places || places.size() < 1) return;
    places.each(function(place) {
      this.createFeature(place);
    }.bind(this));
    if (!this.firstShow) {
      this.firstShow = true;
      this.map.zoomToExtent(this.place_layer.getDataExtent());
    }
  },

  createFeature: function(place) {
    var mapper = new Trackwane.Services.Mapper();
    var feature = mapper.toPlaceFeature(place);
    this.place_layer.addFeatures([feature]);
  },

  center: function(id) {
    var feature = this.place_layer.getFeatureById(id);
    this.map.panTo(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
  },

  render: function() {
    this.$el.empty();
    var cartography = new Trackwane.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.place_layer = cartography.createLayer("places");
    this.map.zoomTo(1);
  }

});