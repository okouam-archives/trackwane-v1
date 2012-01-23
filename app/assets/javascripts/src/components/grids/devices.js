var arrayData = [
['3232', 'MITSUBISHI 5243FL01'],
['6464', 'MITSUBISHI 5243FL01'],
['3453', 'FORD ESCORT 45321401'],
['7532', 'MITSUBISHI 5243FL01'],
['3497', 'ROLLS ROYCE FD432101'],
['1232', 'MITSUBISHI 5243FL01']
];

var store = new Ext.data.ArrayStore({
  data : arrayData,
  fields : ['id', 'description']
});

var colModel = new Ext.grid.ColumnModel([
  {header : 'ID', sortable : true, dataIndex : 'id'},
  {header : 'Description', dataIndex : 'description'}
]);

var gridView = new Ext.grid.GridView();
var selModel = new Ext.grid.RowSelectionModel({
  singleSelect : true
});

Gowane.Components.Grids.Devices =
{
  xtype: 'grid',
  flex: 1,
  collapsible: true,
  stripeRows: true,
  title: "Véhicules",
  selModel: selModel,
  colModel: colModel,
  store: store,
  view: gridView
};