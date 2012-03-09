$(function() {

  var add_alarm =  Ext.create('Ext.Button', {text: "New Alarm", id: "btn_create_geofence_alarm"});

  var delete_alarm = Ext.create('Ext.Button', {text: "Delete Alarm", id: "btn_delete_geofence_alarm"});

  Ext.define('Gowane.Widgets.Alarms.GeofenceAlarmList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.geofence_alarm_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'GeofenceAlarmStore',
    title: "Geofence Alarms",
    dockedItems: [
      {xtype: 'toolbar', items:[add_alarm, delete_alarm]},
      {xtype: 'pagingtoolbar', store: "GeofenceAlarmStore", dock: 'bottom', displayInfo: true}
    ],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Type', sortable : true, dataIndex : 'category', flex: 1},
      {header : 'Geofence', sortable : true, dataIndex : 'geofence', flex: 1}
    ]
  });

});