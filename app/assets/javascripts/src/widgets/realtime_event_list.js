$(function() {
  Ext.define('Gowane.Widgets.Alarms.RealtimeEventList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.realtime_event_list',
    flex: 1,
    collapsible: false,
    stripeRows: true,
    store: 'RealtimeEventStore',
    title: "Store",
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