Ext.define('Gowane.controllers.AbstractController', {

  extend: 'Ext.app.Controller',

  commonRefs: [
    {selector: 'viewport menu', ref: 'menu'},
    {selector: 'menu combo', ref: 'accountSelector'}
  ],

  commonEvents: {
    'menu combo': {
      select: "changeAccount"
    }
  },

  constructor: function() {
    this.refs = this.refs ? Ext.Array.merge(this.refs, this.commonRefs) : this.commonRefs;
    this.events = this.events ? _.defaults(this.commonEvents, this.events) : this.commonEvents;
    this.bindEvents();
    this.callParent(arguments);
  },

  init: function() {
    Ext.create('Gowane.stores.Accounts', {storeId: "AccountStore"});
    this.control(this.events);
    this.callParent(arguments);
  },

  onLaunch: function() {
    this.callParent(arguments);
    Ext.data.StoreManager.lookup('AccountStore').load();
    this.getAccountSelector().setValue($.App.account_id);
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