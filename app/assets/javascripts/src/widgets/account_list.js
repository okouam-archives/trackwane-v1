Ext.define('Gowane.Widgets.AccountList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.account_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'AccountStore',
  title: "Clients",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Accounts",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', width: 40},
    {header : 'Société', sortable : true, dataIndex : 'name', flex: 1},
    {header : 'Contact', sortable : true, dataIndex : 'contact', flex: 1},
    {header : 'Addresse Electronique', sortable : true, dataIndex : 'email', flex: 1},
    {header : 'Téléphone', sortable : true, dataIndex : 'telephone', flex: 1}
  ]
});