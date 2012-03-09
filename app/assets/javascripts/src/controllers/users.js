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
    this.saveUser(form, Ext.getStore('Users'), this.selected_account);
    this.showHelpSidebar("#introduction-template")
  },

  onUserSelect: function(item, selection) {
    this.selected_user = selection[0];
    this.loadEditor(this.selected_user, 'user_form');
  },

  onDeleteUser: function() {
    if (!this.selected_user) {
      alert($.t("select_user_to_remove"));
    } else {
      if (confirm($.t("confirm_user_deletion"))) {
        this.deleteUser(this.selected_user);
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

