$(function() {

  var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: '{name}', enableNoGroups: false});

  Ext.define('Gowane.Widgets.SummaryDeviceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.summary_device_list',
    flex: 1,
    features: [groupingFeature],
    collapsible: false,
    stripeRows: true,
    store: 'DeviceStore',
    title: "Véhicules",
    dockedItems: [{
      xtype: 'pagingtoolbar',
      store: "Gowane.stores.Devices",
      dock: 'bottom',
      displayInfo: true
    }],
    columns: [
      {header : 'Display Name', sortable : true, dataIndex : 'display_name', flex: 1},
      {header : 'IMEI Number', sortable : true, dataIndex : 'imei_number', flex: 1}
    ]
  });

});