$(function() {

 var add_user =  Ext.create('Ext.Button', {id: "btn_create_user", text: "New User"    });

  var delete_user = Ext.create('Ext.Button', {id: "btn_delete_user", text: "Delete User"     });

  var pager = {    xtype: 'pagingtoolbar', store: "UserStore", dock: 'bottom', displayInfo: true    };

  var toolbar = {xtype: 'toolbar', items:[add_user, delete_user]};

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
      {header : 'Addresse Electronique', sortable : true, dataIndex : 'email', flex: 1}
    ]
  });

});