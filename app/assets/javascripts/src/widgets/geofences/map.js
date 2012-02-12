Ext.define('Gowane.Widgets.Geofences.Map', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.geofences_map',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  }
});