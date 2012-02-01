Ext.define('Gowane.views.places.AvailablePlaces', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.availableplaces',
  flex: 1,
  collapsible: false,
  stripeRows: true,
  title: "Points of Interest",
  store: "Gowane.stores.Places",
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: "Gowane.stores.Places",
    dock: 'bottom',
    displayInfo: true
  }],
  columns: [
    { header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
    { header : 'Category', sortable : true, dataIndex : 'category', flex: 1},
    { xtype: 'actioncolumn', width: 30, align: 'center',
      items: [{
        icon: '/assets/delete.gif',
        tooltip: 'Delete POI',
        handler: function(grid, rowIndex, colIndex) {
          alert("hello");
        }
      }]
    }
  ]
});