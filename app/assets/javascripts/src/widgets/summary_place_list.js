Ext.define('Gowane.Widgets.SummaryPlaceList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.summary_place_list',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  store: 'PlaceStore',
  title: "Points of Interest",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Places",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    { header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
    { header : 'Category', sortable : true, dataIndex : 'category', flex: 1}
  ]
});