Ext.define('Gowane.Mixins.Maps.DeviceVisualization', {

  ensureDeviceLayerIsAvailable: function() {
    if (!this.device_layer) this.device_layer = this.createLayer("devices");
  },

  clearDeviceFeatures: function() {
    if (this.device_layer) this.device_layer.destroyAllFeatures();
  },

  createDeviceFeatures: function(devices) {
    if (!devices || devices.length < 1) return;
    _.each(devices, function(device) {
        this.createDeviceFeature(device);
     }.bind(this));
  },

  findDevicesWithoutFeature: function(devices) {
    this.ensureDeviceLayerIsAvailable();
    var new_devices = [];
    _.each(devices, function(device) {
      var isFeature = false;
      if (this.device_layer.features.length > 0) {
        isFeature = _.any(this.device_layer.features, function(feature) {
          return feature.attributes["device_id"] == device.device_id;
        });
      }
      if (!isFeature) new_devices.push(device);
    }.bind(this));
    console.log(new_devices.length + " new devices are being added do the device visualization map.");
    return new_devices;
  },

  showDevicesFeatures: function() {
    this.device_layer.map.zoomToExtent(this.device_layer.getDataExtent());
  },

  createDevicePopup: function(device, lonlat) {
    this.ensureDeviceLayerIsAvailable();
    var template = Handlebars.compile($("#popup-template").html());
    var popup = new OpenLayers.Popup(device.device_id, lonlat, new OpenLayers.Size(10,10), template(), true);
    popup.autoSize = true;
    popup.backgroundColor = 'transparent';
    popup.events.register('click', null, function(evt) {
      var el = $(evt.currentTarget);
      var details = el.find(".popup-details");
      details.toggle();
      popup.updateSize();
    });
    this.map.addPopup(popup);
  },

  createDeviceFeature: function(device) {
    this.ensureDeviceLayerIsAvailable();
    var lonlat = this.mercatorCoordinates(device.longitude, device.latitude);
    var style = new OpenLayers.Style({"default": {pointRadius: "6", fillColor: "#666666"}});
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new OpenLayers.Feature.Vector(point, device);
    this.device_layer.addFeatures([feature]);
    this.createDevicePopup(device, lonlat);
  },

  positionDeviceFeatures: function(devices) {
    this.ensureDeviceLayerIsAvailable();
    //_.each(this.device_popups, function(popup) {
    //  this.map.addPopup(popup);
    //}.bind(this));
  },


    moveDevice: function(device, features) {
      this.ensureDeviceLayerIsAvailable();
      var feature = _.find(features, function(item) {
        return item.attributes.imei_number == device.imei_number;
      });
      var newCoordinates = this.projectForGoogleMaps(new OpenLayers.LonLat(device.longitude, device.latitude));
      feature.move(newCoordinates);
      return false;
    }

});
