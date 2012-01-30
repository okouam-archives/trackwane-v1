Ext.define('Gowane.controllers.Places', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Places'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
    this.control({
      'availabledevices': {
        selectionchange: this.onPlaceSelect
      }
    })
  },

  onLaunch: function() {
    var store = this.getGowaneStoresPlacesStore();
    store.load();
  },

  onPlaceSelect: function(item, selected) {
    var sidecolumn = this.getSideColumn();
    if (!this.isShowingEditors(sidecolumn))
      this.createEditorContainer(sidecolumn);
    this.showEditorFor(selected[0]);
  },

  showEditorFor: function(device) {
    this.tabs.add({xtype: 'placeeditor', title: device.data.display_name});
  },

  createEditorContainer: function(column) {
    return column.items.items.length > 1;
  },

  createDeviceUpdatesContainer: function(column) {
    this.tabs = Ext.create('Ext.tab.Panel', {
      width: '100%',
      height: 400,
      closable: true
    });
    column.add(this.tabs);
  }
});

