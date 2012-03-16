$(function() {

  var pager = {xtype: 'pagingtoolbar', store: "EventStore", dock: 'bottom', displayInfo: true};

  Ext.define('Gowane.Widgets.Alarms.FullGpsEventList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_gps_event_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'EventStore',
    title: "Store",
		dockedItems: [pager],
    columns: [
      {header : 'ID', sortable : true, dataIndex : 'id', width: 40},
      {header : 'Date', sortable : true, dataIndex : 'date', width: 200},
      {header : 'Speed', sortable : true, dataIndex : 'speed', flex: 1},
      {header : 'Heading', sortable : true, dataIndex : 'heading', flex: 1},
      {header : 'Address', sortable : true, dataIndex : 'address', flex: 1},
      {header : 'Status', sortable : true, dataIndex : 'status_code', flex: 1}
    ]
  });

});