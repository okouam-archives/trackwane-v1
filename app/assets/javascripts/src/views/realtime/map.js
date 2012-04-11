App.Views.Realtime.Map = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new App.Collections.Places();
    this.geofences = new App.Collections.Geofences();
  },

  center: function(event_id) {
    var feature = this.device_layer.getFeatureById(event_id);
    this.map.panTo(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
  },

  hideGeofences: function() {
    this.geofence_layer.destroyFeatures();
  },

  showGeofences: function(geofences) {
    if (!this.geofence_layer) {
      var cartography = new App.Services.Cartography(this.map);
      this.geofence_layer = cartography.createLayer("geofences");
    }
    var mapper = new App.Services.Mapper();
    var features = mapper.toGeofenceFeatures(geofences);
    this.geofence_layer.addFeatures(features);
  },

  hidePlaces: function() {
    this.place_layer.destroyFeatures();
  },

  showPlaces: function(places) {
    if (!places || places.size() < 1) return;
    if (!this.place_layer) {
      var cartography = new App.Services.Cartography(this.map);
      this.place_layer = cartography.createLayer("places");
    }
    var mapper = new App.Services.Mapper();
    var features = mapper.toPlaceFeatures(places);
    this.place_layer.addFeatures(features);
  },

  show: function(events) {
    this.device_layer.destroyFeatures();
    this.createFeatures(events);
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    events.each(function(event) {
      this.createFeature(event);
    }.bind(this));
    if (!this.initialized) {
      this.initialized = true;
      this.map.zoomToExtent(this.device_layer.getDataExtent());
    }
  },

  createFeature: function(event) {
    var mapper = new App.Services.Mapper();
    var feature = mapper.toRealtimeFeature(event);
    this.device_layer.addFeatures([feature]);
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.device_layer = cartography.createLayer("devices");
    this.map.zoomTo(1);
  }

});