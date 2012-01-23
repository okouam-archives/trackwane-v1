var arrayData = [
['3232', '116 Security','', ''],
['6464', '225 Discothek','', ''],
['3453', '225 Factoring','', ''],
['7532', '24/24','', ''],
['3497', '24h Chrono','', ''],
['1232', '2A2I','', '']
];

var store = new Ext.data.ArrayStore({
  data : arrayData,
  fields : ['id', 'description']
});

var colModel = new Ext.grid.ColumnModel([
  {header : 'ID', sortable : true, dataIndex : 'id'},
  {header : 'Name', dataIndex : 'description'},
  {header : 'Category', dataIndex : 'description'},
  {header : 'Street', dataIndex : 'description'}
]);

var gridView = new Ext.grid.GridView();
var selModel = new Ext.grid.RowSelectionModel({
  singleSelect : true
});

Gowane.Components.Grids.Pois =
{
  xtype: 'grid',
  flex: 1,
  collapsible: true,
  stripeRows: true,
  title: "Points of Interest",
  selModel: selModel,
  colModel: colModel,
  store: store,
  view: gridView
};