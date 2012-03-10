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
    if (selection.length == 1) {
      this.selected_accounts = [selection[0]];
      this.loadEditor(selection[0], 'account_form');
    } else if (selection.length > 1) {
      this.selected_accounts = selection;
      this.showHelpSidebar("#introduction-template");
    }
  },

  onDeleteUser: function() {
    if (this.selected_accounts.length < 1) {
      alert($.t("select_accounts_to_remove"));
    } else {
      var msg = this.selected_accounts.length > 1 ? $.t("confirm_accounts_deletion") : $.t("confirm_account_deletion");
      if (confirm(msg)) {
        _.each(this.selected_accounts, function(account) {
          this.deleteAccount(account);
        }.bind(this));
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    var store = Ext.data.StoreManager.lookup('AccountStore');
    this.saveAccount(form, store);
    this.showHelpSidebar("#introduction-template")
  },

  onCreateAccount: function() {
    this.showEditor(Ext.widget('account_form'), "New Device");
  },

  refreshListing: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
  }

});

