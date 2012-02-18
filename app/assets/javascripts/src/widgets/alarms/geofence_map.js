$(function() {

  Ext.define('Gowane.Widgets.Alarms.GeofenceMap', {

    extend: 'Gowane.Shared.Map',

    alias: 'widget.geofence_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    createDrawingLayer: function() {
      this.clearLayers();
      var layers = this.map.getLayersByName("Drawing Layer");
      if (layers.length < 1) {
        var canvas = new OpenLayers.Layer.Vector("Drawing Layer");
        this.map.addLayer(canvas);
        this.drawingControl = new OpenLayers.Control.DrawFeature(canvas, OpenLayers.Handler.Polygon);
        this.map.addControls([this.drawingControl]);
      } else {
        canvas = layers[0];
      }
      this.drawingControl.activate();
      return canvas;
    },

    showGeofence: function(coordinates) {
      this.clearLayers();
      var layers = this.map.getLayersByName("Feature Layer");
      if (layers.length < 1) {
        var canvas = new OpenLayers.Layer.Vector("Feature Layer");
        this.map.addLayer(canvas);
      } else {
        canvas = layers[0];
      }
      var features = new OpenLayers.Format.KML().read(coordinates);
      canvas.addFeatures(features);
      return canvas;
    },

    retrieveGeofenceCoordinates: function() {
      var canvas = this.map.getLayersByName("Drawing Layer")[0];
      var area = canvas.features[0];
      return new OpenLayers.Format.KML().write(area);
    },

    deleteDrawingLayer: function() {
      var canvas = this.map.getLayersByName("Drawing Layer")[0];
      if (canvas) canvas.destroyFeatures();
      if (this.drawingControl) this.drawingControl.deactivate();
    },

    deleteFeatureLayer: function() {
      var canvas = this.map.getLayersByName("Feature Layer")[0];
      if (canvas) canvas.destroyFeatures();
    },

    clearLayers: function() {
      this.deleteFeatureLayer();
      this.deleteDrawingLayer();
    }

  });

});


