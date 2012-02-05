Ext.define('Gowane.Widgets.Geofences.Map', {

  extend: 'Gowane.Shared.Map',

  alias: 'widget.geofencesmap',

  initComponent: function() {
    this.layout = 'fit';
    this.callParent(arguments);
  }
});