$(function() {

  var add_button =  Ext.create('Ext.Button', {
    text: "New Device"
  });

  var delete_button = Ext.create('Ext.Button', {
    text: "Delete Device"
  });

  var edit_button = Ext.create('Ext.Button', {
    text: "Edit Device"
  });

  var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
    groupHeaderTpl: '{name}'
  });

  var pager = {
    xtype: 'pagingtoolbar', store: "DeviceStore", dock: 'bottom', displayInfo: true
  };

  var toolbar = {xtype: 'toolbar', items:[add_button, edit_button, delete_button]};

  Ext.define('Gowane.Widgets.FullDeviceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_device_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'DeviceStore',
    title: "Vehicules",
    features: [groupingFeature],
    dockedItems: [pager, toolbar],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 30},
      {header : 'Display Name', sortable : true, dataIndex : 'display_name', flex: 1},
      {header : 'IMEI Number', sortable : true, dataIndex : 'imei_number', flex: 1}
    ]
  });

});


