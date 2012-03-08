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
      theme: null, controls: []
    });
    var gmap = new OpenLayers.Layer.Google("Streets");
    this.map.addLayer(gmap);
    this.addCommonControls();
    this.map.zoomTo(5);
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

  createLayer: function(name) {
    var layer = new OpenLayers.Layer.Vector(name);
    this.map.addLayer(layer);
    return layer;
  },

  createFeatureLayer: function(name) {
    var layer = new OpenLayers.Layer.Vector(name);
    this.map.addLayer(layer);
    return layer;
  }
});


