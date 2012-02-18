$(function() {

  Ext.define('Gowane.Widgets.Alarms.FullGpsEventList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.full_gps_event_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'GpsEventStore',
    title: "Store",
    columns: [
      {header : 'Date', sortable : true, dataIndex : 'date', width: 100},
      {header : 'Speed', sortable : true, dataIndex : 'speed', flex: 1},
      {header : 'Heading', sortable : true, dataIndex : 'heading', flex: 1},
      {header : 'Address', sortable : true, dataIndex : 'address', flex: 1},
      {header : 'Status', sortable : true, dataIndex : 'status', flex: 1}
    ]
  });

});