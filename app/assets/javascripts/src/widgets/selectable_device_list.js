$(function() {

  var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: '{name}', enableNoGroups: false});

  var sm = Ext.create('Ext.selection.CheckboxModel',{
    checkOnly:true
  });

  Ext.define('Gowane.Widgets.SelectableDeviceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.selectable_device_list',
    flex: 1,
    features: [groupingFeature],
    collapsible: false,
    stripeRows: true,
    selModel: sm,
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