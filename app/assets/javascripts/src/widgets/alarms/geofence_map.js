$(function() {

  Ext.define('Gowane.Widgets.Alarms.GeofenceMap', {

    extend: 'Gowane.Shared.Map',

    alias: 'widget.geofence_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    createDrawingLayer: function() {
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

    retrieveGeofenceCoordinates: function() {
      var canvas = this.map.getLayersByName("Drawing Layer")[0];
      var area = canvas.features[0].geometry;
      return area.bounds.toBBOX();
    },

    deleteDrawingLayer: function() {
      var canvas = this.map.getLayersByName("Drawing Layer")[0];
      canvas.destroyFeatures();
      this.drawingControl.deactivate();
    }

  });

});


