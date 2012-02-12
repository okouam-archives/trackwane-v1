Ext.define('Gowane.controllers.Groups', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Groups', 'Gowane.stores.Accounts'],

  init: function() {
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
    Ext.data.StoreManager.lookup('GroupStore').load();
  }
});

