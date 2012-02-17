$(function() {

  var add_button =  Ext.create('Ext.Button', {
    text: "New Alarm", handler: function() {

    }
  });

  var delete_button = Ext.create('Ext.Button', {
    text: "Delete Alarm", handler: function() {

    }
  });

  var edit_button =  Ext.create('Ext.Button', {
    text: "Edit Alarm", handler: function() {

    }
  });

  Ext.define('Gowane.Widgets.Alarms.FullAlarmList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_alarm_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'AlarmStore',
    title: "Alarmes",
    dockedItems: [
      {xtype: 'toolbar', items:[add_button, delete_button, edit_button]},
      {xtype: 'pagingtoolbar', store: "AlarmStore", dock: 'bottom', displayInfo: true}
    ],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', flex: 1},
      {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Category', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Rule', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Action', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Recipient', sortable : true, dataIndex : 'category', flex: 1}
    ]
  });

});