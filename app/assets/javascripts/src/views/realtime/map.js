Trackwane.Views.Realtime.Map = Backbone.View.extend({

  destination_lookup: {},

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new Trackwane.Collections.Places();
    this.geofences = new Trackwane.Collections.Geofences();
    this.animator = new Trackwane.Services.Animator(this.removeDestination.bind(this));
    this.animator.start(400);
    this.mapper = new Trackwane.Services.Mapper();
  },

  center: function(event_id) {
    var feature = this.device_layer.getFeatureById(event_id);
    this.map.panTo(new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y));
  },

  hideGeofences: function() {
    this.geofence_layer.destroyFeatures();
  },

  showGeofences: function(geofences) {
    var features = this.mapper.toGeofenceFeatures(geofences);
    this.geofence_layer.addFeatures(features);
  },

  hidePlaces: function() {
    this.place_layer.destroyFeatures();
  },

  showPlaces: function(places) {
    if (!places || places.size() < 1) return;
    var features = this.mapper.toPlaceFeatures(places);
    this.place_layer.addFeatures(features);
  },

  removeDestination: function(device_id) {
    var feature = this.destination_lookup[device_id];
    if (!feature) throw new Error("Unable to locate destination feature for device " + device_id);
    this.device_layer.destroyFeatures([this.destination_lookup[device_id]]);
  },

  show: function(events) {
    this.createFeatures(events);
    this.map.zoomToExtent(this.device_layer.getDataExtent());
  },

  showEvent: function(event_data) {
    var device_id = event_data.device_id;
    var numPoints = 10;
    var path = this.moveFeature(event_data, numPoints);
    if (!path) return;
    var feature = this.device_layer.getFeatureBy("device_id", device_id);
    var animation = new Trackwane.Services.Animation(device_id, feature, path);
    this.animator.add(animation);
  },

  moveFeature: function(event_data, numPoints) {
    var feature = this.device_layer.getFeatureBy("device_id", event_data.device_id);
    var target = this.mapper.toDestinationFeature(event_data);
    var trajectory = this.animator.interpolate(feature.geometry, target.geometry, numPoints);
    if (trajectory) {
      var angle = this.animator.path_angle(feature.geometry, target.geometry) + 180;
      if (console) console.debug("Changing rotation from " + feature.style.rotation + " to " + angle);
      feature.style.rotation = angle;
      feature.layer.drawFeature(feature);
      this.destination_lookup[event_data.device_id] = target;
      this.device_layer.addFeatures([target]);
    }
    return trajectory;
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    events.each(function(event) {
      this.createFeature(event);
    }.bind(this));
  },

  createFeature: function(event) {
    var feature = this.mapper.toRealtimeFeature(event);
    this.device_layer.addFeatures([feature]);
  },

  render: function() {
    this.$el.empty();
    var cartography = new Trackwane.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.device_layer = cartography.createLayer("devices");
    this.geofence_layer = cartography.createLayer("geofences");
    this.place_layer = cartography.createLayer("places");
    this.map.zoomTo(1);
  }

});