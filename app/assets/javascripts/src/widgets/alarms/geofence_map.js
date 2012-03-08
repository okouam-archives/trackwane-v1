$(function() {

  Ext.define('Gowane.Widgets.Alarms.GeofenceMap', {

    extend: 'Gowane.Shared.Map',

    mixins: {
      geofence_visualization: 'Gowane.Mixins.Maps.GeofenceVisualization'
    },

    alias: 'widget.geofence_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    createDrawingLayer: function() {
      this.hideGeofences();
      var layers = this.map.getLayersByName("drawing");
      if (layers.length < 1) {
        var canvas = new OpenLayers.Layer.Vector("drawing");
        this.map.addLayer(canvas);
        this.drawingControl = new OpenLayers.Control.DrawFeature(canvas, OpenLayers.Handler.Polygon);
        this.map.addControls([this.drawingControl]);
      } else {
        canvas = layers[0];
        canvas.destroyFeatures();
      }
      this.drawingControl.activate();
      return canvas;
    }

  });

});


