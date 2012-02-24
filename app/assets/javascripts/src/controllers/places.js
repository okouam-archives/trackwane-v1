Ext.define('Gowane.controllers.Places', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Places'],

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport placesmap', ref: 'map'},
    {ref: 'categories', selector: 'sharedsidecolumn combo'},
    {ref: 'search', selector: 'sharedsidecolumn #search_term'}
  ],

  events: {
    'availableplaces': {
      selectionchange: "onPlaceSelect"
    },
    'sharedsidecolumn combo': {
      'select': "filterByCategory"
    },
    'sharedsidecolumn textfield': {
      'change': "filterByName"
    }
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAccountChange: function() {
    this.populateStores();
  },

  onLaunch: function() {
    this.populateStores();
    this.getMap().renderMap();
  },

  filterByName: function() {
    var places = this.getStore("PlaceStore");
    var search_term = this.getSearch().getValue();
    places.clearFilter();
    if (search_term != "")
      places.filter([{property: 'name', value: search_term}]);
  },

  filterByCategory: function() {
    var places = this.getStore("PlaceStore");
    places.clearFilter();
    var filter_term = this.getCategories().getValue();
    if (filter_term != "")
      places.filter([{property: 'category', value: filter_term}]);
  },

  createStores: function() {
    Ext.create('Ext.data.ArrayStore', {fields: ['category', 'category'], storeId: "CategoryStore"});
    var places = Ext.create('Gowane.stores.Places', {storeId: "PlaceStore"});
    places.addListener('datachanged', this.updateCategoryStore.bind(this));
  },

  updateCategoryStore: function(store, records) {
    var filter_term = this.getCategories().getValue();
    var search_term = this.getSearch().getValue();
    if (search_term || filter_term) return;
    var categories = _.map(records, function(category) {
      return category.get("category");
    });
    var uniques = _.uniq(categories);
    Ext.getStore("CategoryStore").loadData(_.zip(uniques, uniques), false);
  },

  populateStores: function() {
    Ext.getStore('PlaceStore').load();
  },

  onPlaceSelect: function(item, selection) {
    var sidebar = this.getSidebar();
    var poi = selection[0];
    this.showEditorFor(poi, sidebar);
    this.getMap().highlightFeature(poi);
  },

  showEditorFor: function(poi, sidebar) {
    if (sidebar.items.length > 2)
      sidebar.remove(sidebar.items.items[2]);
    sidebar.add({xtype: 'placeeditor', title: poi.data.name});
  }
});

