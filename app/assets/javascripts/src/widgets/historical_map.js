$(function() {

  Ext.define('Gowane.Widgets.HistoricalMap', {

    extend: 'Gowane.Shared.Map',

    mixins: {
      geolocater: 'Gowane.Mixins.Geolocater',
      tipsy: 'Gowane.Mixins.Tipsy'
    },

    alias: 'widget.historical_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    selectEvent: function(event) {
      this.hidePopup(true);
      var feature =_.find(this.layer.features, function(item) {
        return item.attributes["event_id"] == event.get("id");
      });
      var center = this.layer.map.getCenter();
      var newCenter = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y)
      var diff_lon = Math.abs(center.lon - newCenter.lon);
      var diff_lat = Math.abs(center.lat - newCenter.lat);
      if (diff_lon < 1 && diff_lat < 1) {
        this.showPopup(feature);
      } else {
        this.layer.map.panTo(newCenter);
        this.layer.map.events.register('moveend', this, function() {
          this.showPopup(feature);
          this.layer.map.events.remove('moveend');
        });
      }
    },

    createPopupControl: function(layer) {
      return new OpenLayers.Control.SelectFeature(layer, {
        hover: true,
        multiple: false,
        highlightOnly: true,
        overFeature: this.showPopup.bind(this),
        outFeature: this.hidePopup.bind(this)
      });
    },

    hidePopup: function(immediate) {
      this.hideTipsy(immediate);
      $("body").css("cursor", "auto");
    },

    renderInfo: function(feature) {
      return "<div style='text-align: left; line-height: 20px'><b>Date:</b> " + feature.date
              + "<br/><b>Address: </b>" + feature.address
              + "<br/><b>Speed: </b>" + feature.speed + "</div>";
    },

    showPopup: function(feature) {
      this.showTipsy(feature, this.renderInfo);
      $("body").css("cursor", "pointer");
    },

    createPopup: function(attributes) {
      return "<div style='text-align:left'>" + attributes["date"] + "<br/>" +
              "Speed: " + attributes["speed"] + "km/h <br/>" +"Boulevard Francois Mitterand" + "</div>";
    },

    displayRoute: function(events) {
      if (!this.layer)
        this.layer = this.createLayerForEvents();
      features = [];
      if (events.length > 0) {
        features = _.map(events, function(event) {
          return this.createFeatureFromEvent(event);
        }.bind(this));
      }
      this.layer.destroyFeatures();
      if (features.length > 0)
        this.showEvents(this.layer, features)
    },

    showEvents: function(layer, features) {
      layer.addFeatures(features);
      layer.map.zoomToExtent(layer.getDataExtent());
    },

    createLayerForEvents: function() {
      var layer = this.createFeatureLayer("Devices");
      var tooltip = this.createPopupControl(layer);
      this.map.addControls([tooltip]);
      tooltip.activate();
      return layer;
    },

    createFeatureFromEvent: function(event) {
      var longitude = event.get("longitude");
      var latitude = event.get("latitude");
      var point = this.projectForGoogleMaps(new OpenLayers.Geometry.Point(longitude, latitude));
      var feature = new OpenLayers.Feature.Vector(point);
      feature.attributes["event_id"] = event.get("id");
      feature.attributes["speed"] = event.get("speed");
      feature.attributes["date"] = event.get("date");
      feature.attributes["address"] = event.get("address");
      return feature;
    }

  });

});