$(function() {

  var place_store = Ext.create('Gowane.stores.Places', {
    storeId: "PlaceStore"
  });

  var category_store = Ext.create('Gowane.stores.Places', {
    storeId: "CategoryStore", groupField :'category'
  });

  var group_selection_cbo = new Ext.form.ComboBox({
    typeAhead: true,
    triggerAction: 'all',
    lazyRender: true,
    mode: 'local',
    store:'CategoryStore',
    valueField: 'category',
    displayField: 'category'
  });

  var search_box_field = new Ext.form.field.Text({
    width: 100
  });

  search_box_field.on('change', function() {
    place_store.clearFilter();
    place_store.filter([{property: 'name', value: search_box_field.getValue()}]);
  });

  group_selection_cbo.on('select', function() {
    place_store.clearFilter();
    place_store.filter([{property: 'category', value: group_selection_cbo.getValue()}]);
  });

  var b;
  var tab = new Array();

  category_store.filter([
    {
      property: 'category',
      value: '',
      anyMatch: false,
      caseSensitive: false,
      fn: function(record) {
        var exist = 0;
        for (k in tab){
          if (tab[k] == record.get('category')) exist = 1;
        }
        if (b != record.get('category') && exist == 0) {
          b = record.get('category');
          tab.push(b);
          return record.get('category') ;
        }
      },
      scope: this
    }
  ]);

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
          search_box_field,
          {xtype: 'label', text: 'Choose a group:'},
          group_selection_cbo
        ]
      }
    ],
    columns: [
      { header: 'Name', sortable: true, dataIndex: 'name', flex: 1},
      { header: 'Category', sortable: true, dataIndex: 'category', flex: 1}
    ]
  });

});
 