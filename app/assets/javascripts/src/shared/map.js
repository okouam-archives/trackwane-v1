Ext.define('Gowane.Shared.Map', {

  extend: 'Ext.panel.Panel',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  },

  renderMap: function() {
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    this.map = new OpenLayers.Map(this.body.dom, {
      theme: null,
      maxResolution: 0.02197265625,
      numZoomLevels: 14,
      restrictedExtent:  new OpenLayers.Bounds(-18.598705491875, -0.72081361875, 5.065845289375, 26.4046746625),
      maxExtent: new OpenLayers.Bounds(-62.6428949, -11.4905018, 49.85710501, 35.844773),
      controls: []
    });
    var urls = [
      "http://a.maps.geocms.co/tilecache.py?",
      "http://b.maps.geocms.co/tilecache.py?",
      "http://c.maps.geocms.co/tilecache.py?"
    ];
    this.map.addLayer(new OpenLayers.Layer.WMS("base", urls, {layers: "data01", format: "image/png"}));
    this.addCommonControls();
    this.map.zoomToMaxExtent();
  },

  addCommonControls: function() {
    var panZoom = new OpenLayers.Control.PanZoomBar();
    panZoom.zoomWorldIcon = false;
    var controls = [
      new OpenLayers.Control.ScaleLine(),
      new OpenLayers.Control.DragPan(),
      new OpenLayers.Control.Navigation(),
      panZoom
    ];
    this.map.addControls(controls);
    $.each(controls, function (index, item) {
      item.activate();
    });
  },

  createFeatureLayer: function(name) {
    var layer = new OpenLayers.Layer.Vector(name);
    this.map.addLayer(layer);
    return layer;
  }
});