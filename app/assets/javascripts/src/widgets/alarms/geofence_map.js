$(function() {

  Ext.define('Gowane.Widgets.Alarms.GeofenceMap', {

    extend: 'Gowane.Shared.Map',

    alias: 'widget.geofence_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    createDrawingLayer: function() {

    },

    retrieveGeofenceCoordinates: function() {

    }

  });

});


