var arrayData = [
['3232', 'MITSUBISHI 5243FL01', '', '', '', ''],
['6464', 'MITSUBISHI 5243FL01', '', '', '', ''],
['3453', 'FORD ESCORT 45321401', '', '', '', ''],
['7532', 'MITSUBISHI 5243FL01', '', '', '', ''],
['3497', 'ROLLS ROYCE FD432101', '', '', '', ''],
['1232', 'MITSUBISHI 5243FL01', '', '', '', '']
];

var store = new Ext.data.ArrayStore({
  data : arrayData,
  fields : ['tracker', 'datetime', 'latitude', 'longitude', 'speed', 'address']
});

Gowane.Components.Charts.StopReport =
{
  xtype: 'chart',
  title: "Données",
  yField: 'datetime',
  xField: 'speed',
  store: store
};