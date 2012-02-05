Ext.define('Gowane.Widgets.Devices.Map', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.devicesmap',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  }
});