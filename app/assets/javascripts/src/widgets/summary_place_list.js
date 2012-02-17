var Group_SelectionCBO = new Ext.form.ComboBox({
    typeAhead: true,
    triggerAction: 'all',
    lazyRender:true,
    mode: 'local',
    width:180,
    store: new Ext.data.ArrayStore({
        id: 0,
        fields: [
            'myId',
            'displayText'
        ],
        data: [[1, 'item1'], [2, 'item2']]
    }),
    valueField: 'myId',
    displayField: 'displayText'
});

var Label_Cbo=Ext.form.Label({
	text:'Choose a group'
});

Ext.define('Gowane.Widgets.SummaryPlaceList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.summary_place_list',
  flex: 1,
  width:250,
  collapsible: false,
  stripeRows: true,
  store: 'PlaceStore',
  title: "Points of Interest",
  dockedItems: [
    {xtype: 'pagingtoolbar',
      store: 'PlaceStore',
      dock: 'bottom',
      displayInfo: true
    },
    { xtype: 'toolbar', items:[Label_Cbo,Group_SelectionCBO]}
  ],
  columns: [
    { header : 'Name', sortable : true, dataIndex : 'name', flex: 1},
    { header : 'Category', sortable : true, dataIndex : 'category', flex: 1}
  ]
});

