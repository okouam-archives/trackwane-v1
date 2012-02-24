Ext.define('Gowane.Widgets.Places.Map', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.placesmap',

  initComponent: function() {
    this.layout = 'fit';
    var store = Ext.data.StoreManager.lookup('PlaceStore');
    store.addListener('datachanged', this.addFeatures.bind(this));
    this.callParent(arguments);
  },

  addFeatures: function(store) {
    var layer = this.createFeatureLayer("Places");
    var proj = new OpenLayers.Projection("EPSG:4326");
    if (store.data.items.length > 0 ) {
      var features = _.map(store.data.items, function(item) {
        var point = new OpenLayers.Geometry.Point(item.get("longitude"), item.get("latitude"));
        point.transform(proj, layer.map.getProjectionObject());
        return new OpenLayers.Feature.Vector(point, {name: item.get("name")});
      });
      layer.addFeatures(features);
      layer.map.zoomToExtent(layer.getDataExtent());
    }
  },

  highlightFeature: function(poi) {
    console.debug(this.map);
    console.debug(poi);
  }

});