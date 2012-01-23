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

var colModel = new Ext.grid.ColumnModel({
  columns: [
    {header : 'ID', sortable : true, dataIndex : 'id', width: 45},
    {header : 'Description', dataIndex : 'description'}
  ],
  defaults: {
    sortable: true
  }
});

var gridView = new Ext.grid.GridView({
  forceFit: true
});

var selModel = new Ext.grid.CheckboxSelectionModel({
  singleSelect : true
});

Gowane.Components.Grids.Accounts = new Ext.grid.EditorGridPanel({
  xtype: 'grid',
  autoExpandColumn: 1,
  clicksToEdit: 1,
  flex: 1,
  collapsible: false,
  stripeRows: true,
  title: "Accounts",
  selModel: selModel,
  colModel: colModel,
  store: store,
  view: gridView,
  tbar: [
    {text: 'Add account'},
    {text: 'Remove account'}
  ]
});