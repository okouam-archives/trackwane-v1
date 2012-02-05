Ext.define('Gowane.Widgets.Geofences.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.availablegeofences',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'GeofenceStore',
  title: "Geofences",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Geofences",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    { header : 'Name', sortable : true, dataIndex : 'name', flex: 1}
  ]
});