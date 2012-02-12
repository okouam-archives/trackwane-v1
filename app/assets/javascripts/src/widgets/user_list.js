Ext.define('Gowane.Widgets.UserList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.user_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'UserStore',
  title: "Utilisateurs",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Users",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', flex: 1},
    {header : 'Nom', sortable : true, dataIndex : 'login', flex: 1},
    {header : 'Addresse Electronique', sortable : true, dataIndex : 'email', flex: 1},
    {header : 'Dernier login', sortable : true, dataIndex : 'last_login_at', flex: 1},
    {header : 'Actif?', sortable : true, dataIndex : 'is_active', flex: 1}
  ]
});