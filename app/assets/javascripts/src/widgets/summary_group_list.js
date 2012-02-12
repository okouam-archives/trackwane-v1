Ext.define('Gowane.Widgets.SummaryGroupList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.summary_group_list',
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
    {header : 'Nom', sortable : true, dataIndex : 'name', flex: 1},
    {header : '# de Véhicules', sortable : true, dataIndex : 'device_count', flex: 1}
  ]
});