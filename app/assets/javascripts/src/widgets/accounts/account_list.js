$(function() {

  var add_user =  Ext.create('Ext.Button', {id: "btn_create_account", text: $.t("new_account")});

  var delete_user = Ext.create('Ext.Button', {id: "btn_delete_account", text: $.t("delete_accounts")});

  var toolbar = {xtype: 'toolbar', items:[add_user, delete_user]};

  var pager = {xtype: 'pagingtoolbar', store: "AccountStore", dock: 'bottom', displayInfo: true};

  Ext.define('Gowane.Widgets.AccountList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.account_list',
    collapsible: false,
    stripeRows: true,
    multiSelect: true,
    store: 'AccountStore',
    title: $.t("accounts"),
    dockedItems: [pager, toolbar],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : $.t("company"), sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Contact', sortable : true, dataIndex : 'contact', flex: 1},
      {header : $.t("phone"), sortable : true, dataIndex : 'telephone', flex: 1},
      {header : 'Email', sortable : true, dataIndex : 'email', flex: 1}
    ]
  });

});
