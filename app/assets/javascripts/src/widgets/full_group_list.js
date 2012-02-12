Ext.define('Gowane.Widgets.FullGroupList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.full_group_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'GroupStore',
  title: "Groupes",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Groups",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', flex: 1},
    {header : 'Display Name', sortable : true, dataIndex : 'name', flex: 1}
  ]
});