$(function() {

  var add_geofence =  Ext.create('Ext.Button', {text: "New Geofence"});

  var delete_geofence = Ext.create('Ext.Button', {text: "Delete Geofence"});

  var pager = {xtype: 'pagingtoolbar', store: "GeofenceStore", dock: 'bottom', displayInfo: true};

  var toolbar = {xtype: 'toolbar', items:[add_geofence, delete_geofence]};

  Ext.define('Gowane.Widgets.Alarms.FullGeofenceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_geofence_list',
    collapsible: false,
    stripeRows: true,
    store: 'GeofenceStore',
    title: "Geofences",
    dockedItems: [pager, toolbar],
    columns: [{header : 'Name', sortable : true, dataIndex : 'name', flex: 1}]
  });

});
