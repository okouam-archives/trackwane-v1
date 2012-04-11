App.Views.Realtime.Map = Backbone.View.extend({

  destination_list: [],

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new App.Collections.Places();
    this.geofences = new App.Collections.Geofences();
    this.animator = new App.Services.Animator();
    this.mapper = new App.Services.Mapper();
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

  removeDestinations: function() {
    if (console) console.debug("[realtime map] Removing " + this.destination_list.length + " destination features.");
    this.device_layer.destroyFeatures(this.destination_list);
    this.destination_list = [];
  },

  show: function(events) {
    if (this.initialized) {
      this.moveFeatures(events);
    } else {
      this.createFeatures(events);
      this.map.zoomToExtent(this.device_layer.getDataExtent());
      this.initialized = true;
    }
  },

  moveFeatureAlongPath: function(device_id, cursor, paths) {
    var feature = this.device_layer.getFeatureBy("device_id", device_id);
    var path = paths[device_id];
    var next_coordinates = path[cursor];
    feature.move(new OpenLayers.LonLat(next_coordinates.x, next_coordinates.y));
  },

  moveFeatures: function(events) {
    var numPoints = 23;
    var animationDelta = 500;
    var paths = {};
    events.each(function(event) {
      var trajectory = this.moveFeature(event, numPoints);
      if (trajectory) paths[event.get("device_id")] = trajectory;
      else {
        if (console) console.debug("[realtime map] Device " + event.get("device_id") + " has not moved.");
      }
    }.bind(this));
    var devices = _.keys(paths);
    var cursor = 0;
    var animate = function() {
      _.each(devices, function(device_id) {
        this.moveFeatureAlongPath(device_id, cursor, paths);
      }.bind(this));
      cursor = cursor + 1;
      if (cursor < numPoints) {
        setTimeout(animate, animationDelta);
      }
      else {
        this.removeDestinations();
        if (console) console.debug("[animation] Finished animating devices");
      }
    }.bind(this);
    setTimeout(animate, animationDelta);
  },

  moveFeature: function(event, numPoints) {
    var feature = this.device_layer.getFeatureBy("device_id", event.get("device_id"));
    var target = this.mapper.toDestinationFeature(event);
    var trajectory = this.animator.interpolate(feature.geometry, target.geometry, numPoints);
    if (trajectory) {
      this.destination_list.push(target);
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
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.device_layer = cartography.createLayer("devices");
    this.geofence_layer = cartography.createLayer("geofences");
    this.place_layer = cartography.createLayer("places");
    this.map.zoomTo(1);
  }

});