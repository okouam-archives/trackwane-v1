$(function() {

 var add_button =  Ext.create('Ext.Button', {
    text: "New User"
  });

  var delete_button = Ext.create('Ext.Button', {
    text: "Delete User"
  });

  var edit_button = Ext.create('Ext.Button', {
    text: "Edit User"
  });

  var pager = {
    xtype: 'pagingtoolbar', store: "UserStore", dock: 'bottom', displayInfo: true
  };

  var toolbar = {xtype: 'toolbar', items:[add_button, delete_button, edit_button]};

  Ext.define('Gowane.Widgets.UserList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.user_list',
    collapsible: false,
    stripeRows: true,
    store: 'UserStore',
    title: "Utilisateurs",
    dockedItems: [pager, toolbar],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Nom', sortable : true, dataIndex : 'login', flex: 1},
      {header : 'Addresse Electronique', sortable : true, dataIndex : 'email', flex: 1},
      {header : 'Actif?', sortable : true, dataIndex : 'is_active', flex: 1}
    ]
  });

});