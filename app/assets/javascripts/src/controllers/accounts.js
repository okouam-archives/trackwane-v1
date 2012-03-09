Ext.define('Gowane.controllers.Accounts', {

  extend: 'Gowane.controllers.AbstractController',

  mixins: {
    account_management: 'Gowane.Mixins.Controllers.AccountManagement',
    sidebar_editor: 'Gowane.Mixins.Controllers.SidebarEditor'
  },

  stores: ['Gowane.stores.Accounts'],

  refs: [
    {selector: '#dynamic', ref: 'dynamic'}
  ],

  events: {
    'account_list': {
      selectionchange: 'onAccountSelect'
    },
    '#btn_create_account': {
      click: 'onCreateAccount'
    },
    '#btn_delete_account': {
      click: 'onDeleteAccount'
    },
    '#btn_accept_changes': {
      click: 'onAcceptChanges'
    },
    '#btn_cancel_changes': {
      click: 'onCancelChanges'
    }
  },

  onAccountSelect: function(item, selection) {
    this.selected_account = selection[0];
    this.loadEditor(this.selected_account, 'account_form');
  },

  onDeleteAccount: function() {
    if (!this.selected_account) {
      alert($.t("select_account_to_remove"));
    } else {
      if (confirm($.t("confirm_account_deletion"))) {
        this.deleteAccount(this.selected_account);
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    this.saveAccount(form, Ext.getStore('Accounts'));
    this.showHelpSidebar("#introduction-template")
  },

  onCreateAccount: function() {
    this.showEditor(Ext.widget('account_form'), "New Device");
  },

  refreshListing: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
  }

});

