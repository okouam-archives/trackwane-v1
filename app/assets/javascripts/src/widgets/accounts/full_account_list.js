$(function() {

  Ext.define('Gowane.Widgets.FullAccountList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_account_list',
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
      {header : 'Contact', sortable : true, dataIndex : 'contact', flex: 1},
      {header : 'Téléphone', sortable : true, dataIndex : 'telephone', flex: 1},
      {header : 'Messagerie Electronique', sortable : true, dataIndex : 'email', flex: 1},
      {header : 'Vehicules', sortable : true, dataIndex : 'devices_count', flex: 1},
      {header : 'Utilisateurs', sortable : true, dataIndex : 'users_count', flex: 1},
      {header : "Points d'interets", sortable : true, dataIndex : 'places_count', flex: 1},
      {header : 'Alarmes', sortable : true, dataIndex : 'alarms_count', flex: 1}
    ]
  });

});
