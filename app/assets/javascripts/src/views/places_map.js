App.Views.PlacesMap = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.places = new App.Collections.Places();
    this.geofences = new App.Collections.Geofences();
    this.setElement(options.el);
    this.pubsub.on("places:received", this.show.bind(this));
    this.pubsub.on("place:created", this.add.bind(this));
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    this.pubsub.bind("place:selected", function(id) {
      this.centerOnPlace(id);
    }.bind(this))
  },

  firstShow: true,

  allowPlacePositioning: function() {
    if (!this.drawFeature) {
      var cartography = new App.Services.Cartography();
      cartography.map = this.map;
      this.draw_layer = cartography.createLayer("drawing_layer");
      this.map.addLayer(this.draw_layer);
      this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Point);
      this.drawFeature.events.on({
        featureadded: function() {
          this.drawFeature.deactivate();
          this.new_point = this.draw_layer.features[0].geometry;
        }.bind(this)
      });
      this.map.addControl(this.drawFeature);
    }
    this.drawFeature.activate();
  },

  show: function(places) {
    this.place_layer.destroyFeatures();
    this.places = places;
    this.createFeatures();
  },

  add: function(place) {
    var cartography = new App.Services.Cartography();
    var point = cartography.degreeCoordinates(this.new_point.x, this.new_point.y);
    place.set("longitude", point.lon);
    place.set("latitude", point.lat);
    place.save(null, {
      success: function(model) {
        this.places.add(model);
        this.pubsub.trigger("places:received", this.places);
        this.closePlacePanel();
      }.bind(this),
      error: function() {
        alert("failure");
        this.closePlacePanel();
      }.bind(this)
    });
  },

  closePlacePanel: function() {
    this.draw_layer.destroyFeatures();
    this.drawFeature.deactivate();
    $(".action.panel").remove();
    this.action_panel = null;
  },

  createFeatures: function() {
    if (!this.places || this.places.size() < 1) return;
    _.each(this.map.popups, function(popup) {
      popup.destroy();
    });
    this.places.each(function(place) {
      this.createFeature(place);
    }.bind(this));
    if (this.firstShow) {
      this.firstShow = false;
      this.map.zoomToExtent(this.place_layer.getDataExtent());
    }
  },

  createFeature: function(place) {
    var mapper = new  App.Services.Mapper();
    var cartography = new App.Services.Cartography();
    var feature = mapper.featureFromEvent(place, cartography);
    feature.id = place.get("id");
    feature.style = {pointRadius: 6, fillColor: "#333", fillOpacity: 1, graphicName: "x", strokeColor: "#333"};
    var lonlat = cartography.projectForGoogleMaps(new OpenLayers.LonLat(place.get("longitude"), place.get("latitude")));
    this.createPopup(place, lonlat);
    this.place_layer.addFeatures([feature]);
  },

  createPopup: function(place, lonlat) {
    var template = Handlebars.compile($("#place-popup-template").html());
    var popup = new OpenLayers.Popup(place.get("name"), lonlat, new OpenLayers.Size(10,10), template(place.attributes), true);
    popup.autoSize = true;
    popup.backgroundColor = 'transparent';
    popup.events.register('mouseover', null, function(evt) {
      $(evt.currentTarget).find(".actions").show();
    }.bind(this));
    popup.events.register('mouseout', null, function(evt) {
      $(evt.currentTarget).find(".actions").hide();
    }.bind(this));
    popup.events.register('click', null, function(evt) {
      var attrs = place.attributes;
      var src = $(evt.explicitOriginalTarget);
      if (src.text() == "Remove") {
        this.removePlace(attrs.id);
        popup.destroy();
      }
    }.bind(this));
    this.map.addPopup(popup);
  },

  removePlace: function(id) {
    this.places.get(id).destroy();
    var feature = this.place_layer.getFeatureById(id);
    this.place_layer.removeFeatures([feature]);
  },

  centerOnPlace: function(id) {
    var feature = this.place_layer.getFeatureById(id);
    this.map.panTo(feature);
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.place_layer = cartography.createLayer("devices");
    this.map.zoomTo(1);
    this.renderNewPlaceButton();
  },

  showNewPlacePanel: function() {
    var panel = $("<div class='action panel'></div>").appendTo(this.$el);
    this.action_panel = new App.Views.NewPlacePanel({el: panel, pubsub: this.pubsub});
    this.action_panel.render();
  },

  renderNewPlaceButton: function() {
    $(this.el).append("<div class='places switcher'><a><img style='height: 20px' src='/assets/103-map.png'>New Place</a></div>")
    $(".places.switcher").on('click', function() {
      this.showNewPlacePanel();
      this.allowPlacePositioning();
    }.bind(this))
  }

});