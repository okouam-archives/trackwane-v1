Ext.define('Gowane.views.places.AvailablePlaces', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.availableplaces',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  title: "Points of Interest",
  align: 'stretchmax',
  store: "Gowane.stores.Places",
  columns: [
    {header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
    {header : 'Category', sortable : true, dataIndex : 'category', flex: 1}
  ]
});