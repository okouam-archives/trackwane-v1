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
			var warning_html = "";
			if (feature.speed_warnings && feature.speed_warnings.length > 0) {
					warning_html += "<h3>Speed Warnings</h3><ul>";
				_.each(feature.speed_warnings, function(warning) {
					warning_html += "<li>" + warning["alarm_name"] + "</li>";
				});
				warning_html += "</ul>";
			}
			if (feature.geofence_warnings && feature.geofence_warnings.length > 0) {
					warning_html += "<h3>Geofence Warnings</h3><ul>";
				_.each(feature.geofence_warnings, function(warning) {
					warning_html += "<li>" + warning["alarm_name"] + "</li>";
				});
				warning_html += "</ul>";
			}
      return "<div style='text-align: left; line-height: 20px'><b>Date:</b> " + feature.date
              + "<br/><b>Address: </b>" + feature.address
              + "<br/><b>Speed: </b>" + feature.speed + "<br/>" + warning_html + "<span><i>Cliquer pour fermer</i></span></div>";
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
      var features = [];
      if (events.length > 0) {
				for(var i = 1; i < events.length; i++) {
					features.push(this.createFeatureFromEvent(events[i-1], i));
				}
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
			var defaultContext = {
				getBackgroundGraphic: function(feature) {
			 		if (feature.attributes["warning"]) return "/assets/marker-black-red.png";
					else return "/assets/marker-black-green.png";
				}
			};
			var selectContext = {
				getBackgroundGraphic: function(feature) {
			 		if (feature.attributes["warning"]) return "/assets/marker-white-red.png";
					else return "/assets/marker-white-green.png";
				}
			};
			var commonProps = {
				fontSize: 9,
				fontFamily: 'Verdana',
				fontWeight: 'bold',
				backgroundGraphic: "${getBackgroundGraphic}",
				backgroundGraphicZIndex: 99999999,
				backgroundHeight: 14,
				backgroundWidth: 31,
				backgroundXOffset: -3,
				label: "${display_id}",
				fill: false,
				stroke: false,
				labelYOffset: 1,
				labelXOffset: 17,
				labelSelect: true,
				cursor: 'pointer'
			};
			var defaultProps = OpenLayers.Util.applyDefaults({fontColor: 'white'}, commonProps);
			var selectProps = OpenLayers.Util.applyDefaults({fontColor: 'black'}, commonProps);
			layer.styleMap = new OpenLayers.StyleMap({
				'default': new OpenLayers.Style(defaultProps, {context: defaultContext}),
				'select': new OpenLayers.Style(selectProps, {context: selectContext})
			});
      this.select_control = this.createPopupControl(layer);
      this.map.addControls([this.select_control]);
      this.select_control.activate();
      return layer;
    },

    createFeatureFromEvent: function(event, display_id) {
      var longitude = event.get("longitude");
      var latitude = event.get("latitude");
      var point = this.projectForGoogleMaps(new OpenLayers.Geometry.Point(longitude, latitude));
      var feature = new OpenLayers.Feature.Vector(point);
			var warnings = event.get("warnings");
			var warning_count = warnings.speed.length + warnings.geofence.length;
			feature.attributes["speed_warnings"] = warnings.speed;
			feature.attributes["geofence_warnings"] = warnings.geofence;
			feature.attributes["warning"] = warning_count > 0;
			feature.attributes["display_id"] = display_id;
      feature.attributes["event_id"] = event.get("id");
      feature.attributes["speed"] = event.get("speed");
      feature.attributes["date"] = event.get("date");
      feature.attributes["address"] = event.get("address");
      return feature;
    }

  });

});