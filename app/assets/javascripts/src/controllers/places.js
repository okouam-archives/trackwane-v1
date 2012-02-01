Ext.define('Gowane.controllers.Places', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Places'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
    this.control({
      'availableplaces': {
        selectionchange: this.onPlaceSelect
      }
    })
  },

  onLaunch: function() {
    var store = this.getGowaneStoresPlacesStore();
    store.load(function() {
      this.showPlacesOnMap();
    }.bind(this));
  },

  onPlaceSelect: function(item, selected) {
    var sidecolumn = this.getSideColumn();
    this.showEditorFor(selected[0], sidecolumn);
    this.highlightPlaceOnMap(selected[0]);
  },

  highlightPlaceOnMap: function(selected) {
    console.debug("highlight place on map");
  },

  showPlacesOnMap: function() {
    console.debug("show places on map");
  },

  showEditorFor: function(place, sidecolumn) {
    if (sidecolumn.items.length > 2)
      sidecolumn.remove(sidecolumn.items.items[2]);
    sidecolumn.add({xtype: 'placeeditor', title: place.data.name});
  }
});

