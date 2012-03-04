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
      var feature =_.find(this.layer.features, function(item) {
        return item.attributes["event_id"] == event.get("id");
      });
      var newCenter = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
			var selected = this.layer.selectedFeatures;
			if (selected.length > 0)
				this.select_control.unselect(selected[0]);
      this.select_control.select(feature);
      if (!feature.onScreen())
				this.layer.map.panTo(newCenter);
    },

    createPopupControl: function(layer) {
      return new OpenLayers.Control.SelectFeature(layer, {
        hover: false,
        multiple: false,
				clickout: true,
				scope: this,
        highlightOnly: false,
       	onSelect: this.showPopup.bind(this),
				onUnselect: function() {
					$("#historical-popup").remove();
					this.is_popup_showing = false;
				}
      });
    },

    createPopup: function(feature) {
      return "<div style='text-align: left; line-height: 20px'><b>Date:</b> " + feature.date
              + "<br/><b>Address: </b>" + feature.address
              + "<br/><b>Speed: </b>" + feature.speed + "<br/><span>Cliquer pour fermer</span></div>";
    },

    showPopup: function(feature) {
			if (!this.is_popup_showing) {
				$("#historical-map").on('click', "#historical-popup", function(el) {
					this.select_control.unselect(feature);
				}.bind(this));
				$("#historical-map").prepend("<div id='historical-popup'>" + this.createPopup(feature.attributes) + "</div>");
				this.is_popup_showing = true;
			} else {
				$("#historical-popup").html(this.createPopup(feature.attributes));
			}
    },

    displayRoute: function(events) {
    	this.hideLabels();
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
			this.layer.map.events.register('moveend', this, function() {
				this.showLabels(features);
				this.layer.map.events.remove('moveend');
			}.bind(this));
      layer.map.zoomToExtent(layer.getDataExtent());
    },

    createLayerForEvents: function() {
      var layer = this.createFeatureLayer("Devices");
      this.select_control = this.createPopupControl(layer);
      this.map.addControls([this.select_control]);
      this.select_control.activate();
      return layer;
    },

    createFeatureFromEvent: function(event) {
      var longitude = event.get("longitude");
      var latitude = event.get("latitude");
      var point = this.projectForGoogleMaps(new OpenLayers.Geometry.Point(longitude, latitude));
      var feature = new OpenLayers.Feature.Vector(point);
			var warnings = event.get("warnings");
			var warning_count = warnings.speed.length + warnings.geofence.length;
			feature.attributes["warning"] = warning_count > 0;
      feature.attributes["event_id"] = event.get("id");
      feature.attributes["speed"] = event.get("speed");
      feature.attributes["date"] = event.get("date");
      feature.attributes["address"] = event.get("address");
      return feature;
    }

  });

});