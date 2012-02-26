$(function() {

  Ext.define('Gowane.Widgets.RealtimeMap', {

    mixins: {
      geolocater: 'Gowane.Mixins.Geolocater',
      tipsy: 'Gowane.Mixins.Tipsy'
    },

    extend: 'Gowane.Shared.Map',

    alias: 'widget.realtime_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    clearDevices: function() {
      this.setup();
      this.layer.destroyFeatures();
      this.device_features.length = 0;
    },

    setup: function() {
      if (!this.layer)
        this.layer = this.createFeatureLayer("Devices");
      if (!this.device_features)
        this.device_features = [];
    },

    showDevices: function(devices) {
      this.setup();
      var device_added = _.reduce(devices, function(is_added, device) {
        return is_added || this.placeDevice(device);
      }.bind(this), false);
      this.layer.destroyFeatures();
      this.layer.addFeatures(this.device_features);
      if (device_added)
        this.layer.map.zoomToExtent(this.layer.getDataExtent());
    },

    placeDevice: function(device) {
      return this.isDeviceOnMap(device) ? this.moveDevice(device) : this.addDevice(device);
    },

    isDeviceOnMap: function(device) {
      return this.device_features.length > 0 && _.any(this.device_features, function(item) {
        return item.data.imei_number == device.imei_number;
      });
    },

    moveDevice: function(device) {
      var feature = _.find(this.device_features, function(item) {
        return item.attributes["imei_number"] == device.imei_number;
      });
      feature.move(this.projectForGoogleMaps(new OpenLayers.LonLat(device.longitude, device.latitude)));
      return false;
    },

    addDevice: function(device) {
      var point = this.projectForGoogleMaps(new OpenLayers.Geometry.Point(device.longitude, device.latitude));
      var feature = new OpenLayers.Feature.Vector(point, {imei_number: device.imei_number});
      this.device_features.push(feature);
      return true;
    }

  });

});