App.Views.PlacesMap = App.Views.Base.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  allowPlaceSelection: function() {
    if (!this.place_selection_tool) this.place_selection_tool = new App.Services.PlaceSelectionTool(this.map);
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
    _.each(this.map.popups, function(popup) {
      popup.destroy();
    });
    places.each(function(place) {
      this.createFeature(place);
    }.bind(this));
    if (!this.firstShow) {
      this.firstShow = true;
      this.map.zoomToExtent(this.place_layer.getDataExtent());
    }
  },

  createFeature: function(place) {
    var mapper = new App.Services.Mapper();
    var feature = mapper.toFeature(place);
    this.createPopup(place, place.getCoordinates());
    this.place_layer.addFeatures([feature]);
  },

  createPopup: function(place, lonlat) {
    var popup_creator = new App.Services.PopupActionsCreator(this.map, "#place-popup-template");
    var popup = popup_creator.build(place.attributes, lonlat);
    popup.events.register('click', null, function(evt) {
      var id = place.id;
      var src = $(evt.explicitOriginalTarget);
      if (src.text() == "Remove") {
        this.pubsub.trigger("place:removed", id);
        popup.destroy();
      }
    }.bind(this));
  },

  center: function(id) {
    var feature = this.place_layer.getFeatureById(id);
    this.map.panTo(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.place_layer = cartography.createLayer("places");
    this.map.zoomTo(1);
  }

});