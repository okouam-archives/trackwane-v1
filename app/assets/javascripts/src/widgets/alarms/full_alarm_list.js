$(function() {

  var add_speed_alarm =  Ext.create('Ext.Button', {
    text: "New Speed Alarm", handler: function() {

    }
  });

  var add_geofence_alarm =  Ext.create('Ext.Button', {
    text: "New Geofence Alarm", handler: function() {

    }
  });

  var delete_alarm = Ext.create('Ext.Button', {
    text: "Delete Alarm", handler: function() {

    }
  });

  var edit_alarm =  Ext.create('Ext.Button', {
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
      {xtype: 'toolbar', items:[add_speed_alarm, add_geofence_alarm, delete_alarm, edit_alarm]},
      {xtype: 'pagingtoolbar', store: "AlarmStore", dock: 'bottom', displayInfo: true}
    ],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Category', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Rule', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Action', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Recipient', sortable : true, dataIndex : 'category', flex: 1}
    ]
  });

});