Ext.define('Gowane.Widgets.RealtimeMap', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.realtime_map',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  },

  showDevice: function(device) {
    if (!this.layer) {
      this.layer = this.createFeatureLayer("Devices");
    }

    if (!this.device_features)
      this.device_features = [];

    if (this.isDeviceOnMap(device))
      this.moveDevice(device);
    else
      this.addDevice(device);
  },

  isDeviceOnMap: function(device) {
    return this.device_features.length > 0 && _.any(this.device_features, function(item) {
      return item.data.imei_number == device.imei_number;
    });
  },

  moveDevice: function(device) {
    var feature = _.find(this.device_features, function(item) {
      return item.data.imei_number == device.imei_number;
    });
    console.debug("Moving a device on map.", device);
    feature.move(new OpenLayers.LonLat(device.longitude, device.latitude));
  },

  addDevice: function(device) {
    console.debug("Adding a new device on map.", device);
    this.device_features = [];
    this.layer.destroyFeatures();
    var point = new OpenLayers.Geometry.Point(device.longitude, device.latitude);
    var feature = new OpenLayers.Feature.Vector(point, {imei_number: device.imei_number});
    console.debug(feature);
    this.device_features.push(feature);
    this.layer.addFeatures([feature]);
    this.layer.map.zoomToExtent(this.layer.getDataExtent());
  }

});