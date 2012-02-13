Ext.define('Gowane.Widgets.HistoricalMap', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.historical_map',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  },

  displayRoute: function(events) {
    if (!this.layer) {
      this.layer = this.createFeatureLayer("Devices");
    }
    var points = _.map(events, function(event) {
      return new OpenLayers.Geometry.Point(event.longitude, event.latitude);
    });
    var route = new OpenLayers.Geometry.LineString(points);
    var feature = new OpenLayers.Feature.Vector(route);
    this.layer.destroyFeatures();
    this.layer.addFeatures([feature]);
    this.layer.map.zoomToExtent(this.layer.getDataExtent());
  }
});