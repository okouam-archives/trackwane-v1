$(function() {

 var add_user =  Ext.create('Ext.Button', {
    text: "New User"
  });

  var delete_user = Ext.create('Ext.Button', {
    text: "Delete User"
  });

  var edit_user = Ext.create('Ext.Button', {
    text: "Edit User"
  });

  var pager = {
    xtype: 'pagingtoolbar', store: "UserStore", dock: 'bottom', displayInfo: true
  };

  var toolbar = {xtype: 'toolbar', items:[add_user, delete_user, edit_user]};

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