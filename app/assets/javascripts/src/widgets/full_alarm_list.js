Ext.define('Gowane.Widgets.FullAlarmList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.full_alarm_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'AlarmStore',
  title: "Alarmes",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Alarms",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', flex: 1},
    {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
    {header : 'Category', sortable : true, dataIndex : 'category', flex: 1},
    {header : 'Rule', sortable : true, dataIndex : 'category', flex: 1},
    {header : 'Action', sortable : true, dataIndex : 'category', flex: 1},
    {header : 'Recipient', sortable : true, dataIndex : 'category', flex: 1}
  ]
});