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
      var has_new_devices = this.hasNewDevices(devices);
      this.clearDeviceFeatures();
      this.createDeviceFeatures(devices);
      if (has_new_devices) this.showDevicesFeatures();
    }

  });

});