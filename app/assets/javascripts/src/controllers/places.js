Ext.define('Gowane.controllers.Places', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Places'],
  refs: [
    { selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    { selector: 'viewport placesmap', ref: 'map'}
  ],

  init: function() {
    this.control({
      'availableplaces': {
        selectionchange: this.onPlaceSelect
      }
    })
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('PlaceStore').load();
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

