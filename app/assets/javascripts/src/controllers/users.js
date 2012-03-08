Ext.define('Gowane.controllers.Users', {

  extend: 'Gowane.controllers.AbstractController',

  mixins: {
    user_management: 'Gowane.Mixins.Controllers.UserManagement'
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

  onCancelChanges: function() {
    this.showHelpSidebar("#introduction-template")
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    this.saveUser(form, Ext.getStore('Users'), this.selected_account);
    this.showHelpSidebar("#introduction-template")
  },

  onUserSelect: function(item, selection) {
    this.selected_user = selection[0];
    var form = Ext.widget('user_form');
    form.loadRecord(this.selected_user);
    this.showEditor(form, "Edit");
  },

  onAccountChange: function() {
    this.refreshUsers();
  },

  onDeleteUser: function() {
    if (!this.selected_user) {
      alert("Please select a user to remove.");
    } else {
      if (confirm("Are you sure you want to delete this user?")) {
        this.deleteUser(this.selected_user);
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onLaunch: function() {
    this.refreshUsers();
  },

  onCreateUser: function() {
    this.showEditor(Ext.widget('user_form'), "New User");
  },

  /* Private Methods. */

  showEditor: function(form, title) {
    var container = this.getDynamic();
    container.removeAll();
    container.add(Ext.widget('editor', {items: [form], title: title}));
  },

  showHelpSidebar: function(template) {
    var helpSidebar = Ext.widget('template_panel', {template: template});
    var container = this.getDynamic();
    container.removeAll();
    container.add(helpSidebar);
  },

  refreshUsers: function() {
    Ext.data.StoreManager.lookup('UserStore').load();
  }

});

