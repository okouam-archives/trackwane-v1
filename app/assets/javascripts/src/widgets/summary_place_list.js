$(function() {

  Ext.define('Gowane.Widgets.SummaryPlaceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.summary_place_list',
    flex: 1,
    width: 250,
    collapsible: false,
    stripeRows: true,
    store: 'PlaceStore',
    title: "Points of Interest",
    dockedItems: [
      { xtype: 'pagingtoolbar',
        store: 'PlaceStore',
        dock: 'bottom',
        displayInfo: true
      },
      { xtype: 'toolbar',
        items: [
          {text: 'Filtrer:', xtype: 'label'},
          {xtype: 'textfield', width: '100', id: 'search_term'},
          {xtype: 'label', text: 'Choose a group:'},
          { xtype: 'combo',
            typeAhead: true,
            triggerAction: 'all',
            queryMode: 'local',
            store: 'CategoryStore',
            valueField: 'category',
            displayField: 'category'
          }
        ]
      }
    ],
    columns: [
      { header: 'Name', sortable: true, dataIndex: 'name', flex: 1},
      { header: 'Category', sortable: true, dataIndex: 'category', flex: 1}
    ]
  });

});
 