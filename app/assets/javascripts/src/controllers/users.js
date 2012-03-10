Ext.define('Gowane.controllers.Users', {

  extend: 'Gowane.controllers.AbstractController',

  mixins: {
    user_management: 'Gowane.Mixins.Controllers.UserManagement',
    sidebar_editor: 'Gowane.Mixins.Controllers.SidebarEditor'
  },

  stores: ['Gowane.stores.Users', 'Gowane.stores.Accounts'],

  refs: [
    {selector: '#dynamic', ref: 'dynamic'}
  ],

  events: {
    'user_list': {
      selectionchange: 'onUserSelect'
    },
    '#btn_create_user': {
      click: 'onCreateUser'
    },
    '#btn_delete_user': {
      click: 'onDeleteUser'
    },
    '#btn_accept_changes': {
      click: 'onAcceptChanges'
    },
    '#btn_cancel_changes': {
      click: 'onCancelChanges'
    }
  },

  /* Event Handlers. */

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    var store = Ext.data.StoreManager.lookup('UserStore');
    this.saveUser(form, store, $.App.account_id);
    this.showHelpSidebar("#introduction-template")
  },

  onUserSelect: function(item, selection) {
    if (selection.length == 1) {
      this.selected_users = [selection[0]];
      this.loadEditor(selection[0], 'user_form');
    } else if (selection.length > 1) {
      this.selected_users = selection;
      this.showHelpSidebar("#introduction-template");
    }
  },

  onDeleteUser: function() {
    if (this.selected_users.length < 1) {
      alert($.t("select_users_to_remove"));
    } else {
      var msg = this.selected_users.length > 1 ? $.t("confirm_users_deletion") : $.t("confirm_user_deletion");
      if (confirm(msg)) {
        _.each(this.selected_users, function(user) {
          this.deleteUser(user);
        }.bind(this));
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onLaunch: function() {
    this.callParent(arguments);
    this.refreshListing();
  },

  onCreateUser: function() {
    this.showEditor(Ext.widget('user_form'), "New User");
  },

  /* Private Methods. */

  refreshListing: function() {
    Ext.data.StoreManager.lookup('UserStore').load();
  }

});

