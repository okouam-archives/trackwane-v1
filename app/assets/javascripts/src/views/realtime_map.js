App.Views.RealtimeMap = Backbone.View.extend({

  events: {
    "click .geofences.switcher": "toggleGeofences",
    "click .places.switcher": "togglePlaces"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new App.Collections.Places();
    this.geofences = new App.Collections.Geofences();
    this.setElement(options.el);
    this.pubsub.on("events:received", this.show.bind(this));
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
  },

  firstShow: true,

  arePlacesVisible: false,

  areGeofencesVisible: false,

  hidePanels: function() {
    if (this.action_panel) {
      this.$el.find(".action.panel").remove();
      this.action_panel.destroy();
    }
  },

  showFollowPanel: function() {
    this.hidePanels();
    var panel = $("<div class='action panel'></div>").appendTo(this.$el);
    this.action_panel = new App.Views.FollowActionPanel({el: panel});
    this.action_panel.render();
  },

  showCommandPanel: function() {
    this.hidePanels();
    var panel = $("<div class='action panel'></div>").appendTo(this.$el);
    this.action_panel = new App.Views.SendCommandActionPanel({el: panel});
    this.action_panel.render();
  },

  toggleGeofences: function() {
    if (this.arePlacesVisible) {
      this.hidePlaces();
    }
    if (this.areGeofencesVisible) {
      this.hideGeofences();
    } else {
      this.showGeofences();
    }
  },

  togglePlaces: function() {
    if (this.areGeofencesVisible) {
      this.hideGeofences();
    }
    if (this.arePlacesVisible) {
      this.hidePlaces();
    } else {
      this.showPlaces();
    }
  },

  hideGeofences: function() {
    this.areGeofencesVisible = false;
    this.geofence_layer.destroyFeatures();
  },

  showGeofences: function() {
    if (!this.geofence_layer) this.geofence_layer = this.createLayer("geofences");
    this.areGeofencesVisible = true;
    this.geofences.fetch({success: function(results) {
      var mapper = new App.Services.Mapper();
      var features = mapper.featuresFromGeofences(results, cartography);
      this.geofence_layer.addFeatures(features);
      }.bind(this)
    });
  },

  hidePlaces: function() {
    this.arePlacesVisible = false;
    this.place_layer.destroyFeatures();
  },

  showPlaces: function() {
    if (!this.place_layer) this.place_layer = this.createLayer("places");
    this.arePlacesVisible = true;
    this.places.fetch({success: function(results) {
      var mapper = new App.Services.Mapper();
      var features = mapper.featuresFromPlaces(results, cartography);
      this.place_layer.addFeatures(features);
      }.bind(this)
    });
  },

  show: function(events) {
    this.device_layer.destroyFeatures();
    this.createFeatures(events);
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    _.each(this.map.popups, function(popup) {
      popup.destroy();
    });
    events.each(function(event) {
      this.createFeature(event);
    }.bind(this));
    if (this.firstShow) {
      this.firstShow = false;
      this.map.zoomToExtent(this.device_layer.getDataExtent());
    }
  },

  createFeature: function(event) {
    var mapper = new  App.Services.Mapper();
    var cartography = new App.Services.Cartography();
    var feature = mapper.featureFromEvent(event, cartography);
    feature.style = {pointRadius: 6, fillColor: "#333", fillOpacity: 1, graphicName: "x", strokeColor: "#333"};
    var lonlat = cartography.projectForGoogleMaps(new OpenLayers.LonLat(event.get("longitude"), event.get("latitude")));
    this.createPopup(event, lonlat);
    this.device_layer.addFeatures([feature]);
  },

  createPopup: function(device, lonlat) {
    var template = Handlebars.compile($("#popup-template").html());
    var popup = new OpenLayers.Popup(device.get("name"), lonlat, new OpenLayers.Size(10,10), template(device.attributes), true);
    popup.autoSize = true;
    popup.backgroundColor = 'transparent';
    popup.events.register('mouseover', null, function(evt) {
      $(evt.currentTarget).find(".realtime-actions").show();
    }.bind(this));
    popup.events.register('mouseout', null, function(evt) {
      $(evt.currentTarget).find(".realtime-actions").hide();
    }.bind(this));
    popup.events.register('click', null, function(evt) {
      var event = device.attributes;
      var src = $(evt.explicitOriginalTarget);
      if (src.text() == "Send Command") {
        this.showCommandPanel(event);
      } else if (src.text() == "Follow") {
        this.showFollowPanel(event);
      }
    }.bind(this));
    this.map.addPopup(popup);
  },

  createLayer: function(name) {
    var layer = new OpenLayers.Layer.Vector(name);
    this.map.addLayer(layer);
    return layer;
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.device_layer = this.createLayer("devices");
    this.map.zoomTo(1);
    this.renderPlacesButton();
    this.renderGeofencesButton();
  },

  renderPlacesButton: function() {
    $(this.el).append("<div class='places switcher'><a><img style='height: 20px' src='/assets/103-map.png'>Places</a></div>")
  },

  renderGeofencesButton: function() {
    $(this.el).append("<div class='geofences switcher'><a><img style='height: 20px' src='/assets/103-map.png'>Geofences</a></div>")
  }

});