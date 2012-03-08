$(function() {

  Ext.define('Gowane.Widgets.AccountList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.account_list',
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
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Société', sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Contact', sortable : true, dataIndex : 'contact', flex: 1}
    ]
  });

});
