var arrayData = [
['3232', 'MITSUBISHI 5243FL01', '', '', '', ''],
['6464', 'MITSUBISHI 5243FL01', '', '', '', ''],
['3453', 'FORD ESCORT 45321401', '', '', '', ''],
['7532', 'MITSUBISHI 5243FL01', '', '', '', ''],
['3497', 'ROLLS ROYCE FD432101'],
['1232', 'MITSUBISHI 5243FL01']
];

var store = new Ext.data.ArrayStore({
  data : arrayData,
  fields : ['tracker', 'datetime', 'latitude', 'longitude', 'speed', 'address']
});

var colModel = new Ext.grid.ColumnModel([
  {header : 'Tracker', sortable : true, dataIndex : 'tracker'},
  {header : 'Datetime', sortable : true, dataIndex : 'datetime'},
  {header : 'Latitude', sortable : true, dataIndex : 'latitude'},
  {header : 'Latitude', sortable : true, dataIndex : 'longitude'},
  {header : 'Speed', sortable : true, dataIndex : 'speed'},
  {header : 'Address', sortable : true, dataIndex : 'address'}
]);

var gridView = new Ext.grid.GridView({
  forceFit: true
});

var selModel = new Ext.grid.RowSelectionModel({
  singleSelect : true
});

Gowane.Components.Lists.StopReport =
{
  xtype: 'grid',
  flex: 1,
  autoExpandColumn: 5,
  collapsible: false,
  stripeRows: true,
  title: "Données",
  selModel: selModel,
  colModel: colModel,
  store: store,
  view: gridView
};