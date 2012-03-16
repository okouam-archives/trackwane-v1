Ext.define('Gowane.controllers.AbstractController', {

  extend: 'Ext.app.Controller',

  constructor: function() {
    this.callParent(arguments);
  },

  init: function() {
    Ext.create('Gowane.stores.Accounts', {storeId: "AccountStore"});
    this.callParent(arguments);
  },

  constructor: function() {
    this.bindEvents();
    this.callParent(arguments);
  },

  onLaunch: function() {
    this.callParent(arguments);
    Ext.data.StoreManager.lookup('AccountStore').load();
  },

  changeAccount: function(combo, records) {
    var account_id = records[0].get("id");
    $.post("/users/change_account", {account_id: account_id}, function() {
      if (this.onAccountChange) this.onAccountChange();
    }.bind(this));
  },

  bindEvents: function() {
    var me = this;
    _.each(this.events, function(event) {
      var keys = _.keys(event);
      _.each(keys, function(key) {
        event[key] = me[event[key]];
      })
    });
  }

});