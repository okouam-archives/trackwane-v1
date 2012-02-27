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
      if (!this.layer) this.layer = this.createFeatureLayer("Devices");
      if (!this.device_features) {
        this.device_features = [];
      }
    },

    showDevices: function(devices) {
      this.setup();
      var device_added = _.reduce(devices, function(is_added, device) {
        return is_added || this.placeDevice(device, this.device_features);
      }.bind(this), false);
      var map_features =  _.map(this.device_features, function(item) {
        return item.clone();
      });
      this.layer.destroyFeatures();
      this.layer.addFeatures(map_features);
      if (device_added)
        this.layer.map.zoomToExtent(this.layer.getDataExtent());
    },

    placeDevice: function(device, features) {
      return this.isDeviceOnMap(device) ? this.moveDevice(device, features) : this.addDevice(device, features);
    },

    isDeviceOnMap: function(device) {
      return this.device_features.length > 0 && _.any(this.device_features, function(item) {
        var outcome = item.attributes.imei_number == device.imei_number
        return outcome;
      });
    },

    moveDevice: function(device, features) {
      var feature = _.find(features, function(item) {
        return item.attributes.imei_number == device.imei_number;
      });
      var newCoordinates = this.projectForGoogleMaps(new OpenLayers.LonLat(device.longitude, device.latitude));
      feature.move(newCoordinates);
      return false;
    },

    addDevice: function(device, features) {
      var point = this.projectForGoogleMaps(new OpenLayers.Geometry.Point(device.longitude, device.latitude));
      var feature = new OpenLayers.Feature.Vector(point, {imei_number: device.imei_number});
      features.push(feature);
      return true;
    }

  });

});