Ext.define('Gowane.Widgets.FullDeviceList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.full_device_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'DeviceStore',
  title: "Vehicules",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Devices",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', flex: 1},
    {header : 'Display Name', sortable : true, dataIndex : 'display_name', flex: 1},
    {header : 'IMEI Number', sortable : true, dataIndex : 'imei_number', flex: 1}
  ]
});