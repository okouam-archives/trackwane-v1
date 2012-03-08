$(function() {

  Ext.define('Gowane.Widgets.RealtimeMap', {

    mixins: {
      cartography: 'Gowane.Mixins.Cartography',
      device_visualization: 'Gowane.Mixins.Maps.DeviceVisualization',
      tipsy: 'Gowane.Mixins.Tipsy'
    },

    extend: 'Gowane.Shared.Map',

    alias: 'widget.realtime_map',

    initComponent: function() {
      this.layout = 'fit';
      this.callParent(arguments);
    },

    showDevices: function(devices) {
      var new_devices = this.findDevicesWithoutFeature(devices);
      this.createDeviceFeatures(new_devices);
      this.positionDeviceFeatures(devices);
      if (new_devices.length > 0) this.showDevicesFeatures();
    }

  });

});