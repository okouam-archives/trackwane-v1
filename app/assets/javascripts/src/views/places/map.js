App.Views.PlacesMap = App.Views.Base.extend({

  appEvents: {
    "places:received": "show",
    "place:created": "add",
    'place:selected': "center",
    "place:creation:cancel": "stopEditing",
    "place:creation:start": "allowPlaceSelection"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new App.Collections.Places();
    this.geofences = new App.Collections.Geofences();
    this.handleApplicationEvents();
  },

  allowPlaceSelection: function() {
    if (!this.place_selection_tool) this.place_selection_tool = new App.Services.PlaceSelectionTool(this.map);
    this.place_selection_tool.activate();
  },

  show: function(places) {
    this.place_layer.destroyFeatures();
    this.places = places;
    this.createFeatures();
  },

  add: function(place) {
    var lonlat = this.place_selection_tool.getCoordinates();
    place.setCoordinates(lonlat);
    place.save(null, {
      success: function(model) {
        this.places.add(model);
        this.pubsub.trigger("places:received", this.places);
        this.stopEditing();
        this.pubsub.trigger("place:creation:success");
      }.bind(this),
      error: function() {
        alert("failure");
        this.stopEditing();
      }.bind(this)
    });
  },

  stopEditing: function() {
    this.place_selection_tool.deactivate();
  },

  createFeatures: function() {
    if (!this.places || this.places.size() < 1) return;
    _.each(this.map.popups, function(popup) {
      popup.destroy();
    });
    this.places.each(function(place) {
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
        this.removePlace(id);
        this.pubsub.trigger("place:removed", this.places);
        popup.destroy();
      }
    }.bind(this));
  },

  removePlace: function(id) {
    this.places.get(id).destroy();
    var feature = this.place_layer.getFeatureById(id);
    this.place_layer.removeFeatures([feature]);
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