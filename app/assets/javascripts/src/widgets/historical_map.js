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

    selectEvent: function() {

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

    hidePopup: function() {
      this.hideTipsy();
      $("body").css("cursor", "auto");
    },

    showPopup: function(feature) {
      this.showTipsy(feature);
      $("body").css("cursor", "pointer");
    },

    createPopup: function(attributes) {
      return "<div style='text-align:left'>" + attributes["date"] + "<br/>" +
              "Speed: " + attributes["speed"] + "km/h <br/>" +"Boulevard Francois Mitterand" + "</div>";
    },

    displayRoute: function(events) {
      if (!this.layer)
        this.layer = this.createLayerForEvents();
      var features = [];
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
      feature.attributes["speed"] = event.get("speed");
      feature.attributes["date"] = event.get("date");
      feature.attributes["address"] = event.get("address");
      return feature;
    }

  });

});