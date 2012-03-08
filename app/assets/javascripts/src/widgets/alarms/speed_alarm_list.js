$(function() {

  var add_speed_alarm =  Ext.create('Ext.Button', {text: "New Alarm", id: "btn_create_speed_alarm"});

  var delete_alarm = Ext.create('Ext.Button', {text: "Delete Alarm", id: "btn_delete_speed_alarm"});

  Ext.define('Gowane.Widgets.Alarms.SpeedAlarmList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.speed_alarm_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'SpeedAlarmStore',
    title: "Speed Alarms",
    dockedItems: [
      {xtype: 'toolbar', items:[add_speed_alarm, delete_alarm]},
      {xtype: 'pagingtoolbar', store: "SpeedAlarmStore", dock: 'bottom', displayInfo: true}
    ],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
      {header : 'Speed', sortable : true, dataIndex : 'rule', flex: 1},
      {header : 'Medium', sortable : true, dataIndex : 'medium', flex: 1},
      {header : 'Recipient', sortable : true, dataIndex : 'recipient', flex: 1}
    ]
  });

});