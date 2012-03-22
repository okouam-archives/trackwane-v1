App.Views.HistoricalMap = Backbone.View.extend({

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

  show: function() {

  },

  hidePanels: function() {
    if (this.new_place_panel) {
      this.$el.find(".action.panel").remove();
      this.new_place_panel.destroy();
    }
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

    render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.event_layer = cartography.createLayer("events");
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