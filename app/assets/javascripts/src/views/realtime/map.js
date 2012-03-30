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
    this.removePopups("place");
  },

  showPlaces: function(places) {
    if (!this.place_layer) {
      var cartography = new App.Services.Cartography(this.map);
      this.place_layer = cartography.createLayer("places");
    }
    var mapper = new App.Services.Mapper();
    var features = mapper.toPlaceFeatures(places);
    this.place_layer.addFeatures(features);
    if (!places || places.size() < 1) return;
    this.removePopups("place");
    places.each(function(place) {
      this.createPlacePopup(place.attributes, place.getCoordinates());
    }.bind(this));
  },

 createPlacePopup: function(place, lonlat) {
    var popup_creator = new App.Services.PopupActionsCreator(this.map, "#place-popup-template");
    var popup = popup_creator.build(place, lonlat, "place");
  },

  show: function(events) {
    this.device_layer.destroyFeatures();
    this.createFeatures(events);
  },

  removePopups: function(tag) {
    _.each(this.map.popups, function(popup) {
      if (popup.tag && popup.tag == tag) {
        popup.destroy();
      }
    }.bind(this));
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    this.removePopups("event");
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
    var feature = mapper.toFeature(event);
    this.createPopup(event, event.getCoordinates());
    this.device_layer.addFeatures([feature]);
  },

  createPopup: function(device, lonlat) {
    var popup_creator = new App.Services.PopupActionsCreator(this.map, "#popup-template");
    var attributes = {name: device.attributes.name};
    var popup = popup_creator.build(attributes, lonlat, "event");
    popup.events.register('click', null, function(evt) {
      var event = device.attributes;
      var src = $(evt.explicitOriginalTarget);
      if (src.text() == "Send Command") {
        this.pubsub.trigger("action:send-command", event);
      } else if (src.text() == "Follow") {
        this.pubsub.trigger("action:follow", event);
      }
    }.bind(this));
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.device_layer = cartography.createLayer("devices");
    this.map.zoomTo(1);
  }

});