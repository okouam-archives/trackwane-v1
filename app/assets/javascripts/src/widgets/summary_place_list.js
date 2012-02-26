$(function() {

  /* Create button toolbar */

  var add_button = {xtype: 'button', text: "Nouveau POI"};
  var delete_button = {xtype: 'button', text: "Supprimer POI"};
  var edit_button = {xtype: 'button', text: "Modifier POI"};
  var button_toolbar = {xtype: 'toolbar', items:[add_button, edit_button, delete_button]};

  /* Create search toolbar */

  var name_search_label = {text: 'Filtrer:', xtype: 'label', floating: false};
  var name_search = {xtype: 'textfield', width: '100', id: 'search_term'};
  var dropdown_label =  {xtype: 'label', text: 'Choose a group:'};
  var dropdown = {xtype: 'combo', typeAhead: true, queryMode: 'local', store: 'CategoryStore',
    valueField: 'category', displayField: 'category'};
  var search_toolbar =  {xtype: 'toolbar', items: [name_search_label, name_search, dropdown_label, dropdown]};

  /* Create view definition */

  var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: '{name}', enableNoGroups: false});

  Ext.define('Gowane.Widgets.SummaryPlaceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.summary_place_list',
    flex: 1,
    features: [groupingFeature],
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
      button_toolbar,
      search_toolbar
    ],
    columns: [
      { header: 'Name', sortable: true, dataIndex: 'name', flex: 1}
    ]
  });

});
 