Ext.define('Gowane.views.realtime.AvailableDevices', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.availabledevices',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  title: "Devices",
  align: 'stretchmax',
  store: "Gowane.stores.Devices",
  columns: [
    {header : 'Display Name', sortable : true, dataIndex : 'display_name', flex: 1},
    {header : 'IMEI Number', sortable : true, dataIndex : 'imei_number', flex: 1}
  ]
});