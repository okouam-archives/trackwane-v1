Trackwane.Views.Historical.Map = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    this.load();
  },

  render: function(events) {
    this.event_layer.destroyFeatures();
    this.createFeatures(events);
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    events.each(function(event) {
      this.createFeature(event);
    }.bind(this));
    if (!this.initialized) {
      this.initialized = true;
      this.map.zoomToExtent(this.event_layer.getDataExtent());
    }
  },

  createFeature: function(event) {
    var mapper = new Trackwane.Services.Mapper();
    var feature = mapper.toFeature(event);
    this.event_layer.addFeatures([feature]);
  },

  hidePanels: function() {
    if (this.new_place_panel) {
      this.$el.find(".action.panel").remove();
      this.new_place_panel.destroy();
    }
  },

  showGeofences: function(geofences) {
    if (!this.geofence_layer) {
      var cartography = new Trackwane.Services.Cartography(this.map);
      this.geofence_layer = cartography.createLayer("geofences");
    }
    var mapper = new Trackwane.Services.Mapper();
    var features = mapper.toGeofenceFeatures(geofences);
    this.geofence_layer.addFeatures(features);
  },

  hidePlaces: function() {
    this.place_layer.destroyFeatures();
    this.removePopups("place");
  },

  showPlaces: function(places) {
    if (!this.place_layer) {
      var cartography = new Trackwane.Services.Cartography(this.map);
      this.place_layer = cartography.createLayer("places");
    }
    var mapper = new Trackwane.Services.Mapper();
    var features = mapper.toPlaceFeatures(places);
    this.place_layer.addFeatures(features);
    if (!places || places.size() < 1) return;
    this.removePopups("place");
    places.each(function(place) {
      this.createPlacePopup(place.attributes, place.getCoordinates());
    }.bind(this));
  },

  load: function() {
    this.$el.empty();
    var cartography = new Trackwane.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.event_layer = cartography.createLayer("events");
    this.map.zoomTo(1);
  }

});