Ext.define('Gowane.controllers.Users', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Users', 'Gowane.stores.Accounts'],

  events: {
    'user_list': {
      selectionchange: this.onUserSelect
    },
    'user_list button[text="New User"]': {
      click: this.createUser
    },
    'user_list button[text="Delete User"]': {
      click: this.deleteUser
    },
    'device_list button[text="Edit User"]': {
      click: this.editUser
    }
  },

  onUserSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_user = selection[0];
    }
  },

  saveUser: function() {
    var component = Ext.getCmp("user_editor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = Ext.getStore('Users').add(form.getFieldValues())[0];
        record.set("account_id", this.selected_account.get("id"));
      } else {
        form.updateRecord(record);
      }
      record.save();
      component.close();
    }
  },

  closeUserEditor: function() {
    var component = Ext.getCmp("user_editor");
    component.close();
  },

  onLaunch: function() {
    this.refreshUsers();
  },

  refreshUsers: function() {
    Ext.data.StoreManager.lookup('UserStore').load();
  },

  onAccountChange: function() {
    this.refreshUsers();
  },

  deleteUser: function() {
    if (!this.selected_user) {
      alert("Please select a user to remove.");
    } else {
      if (confirm("Are you sure you want to delete this user?")) {
        var store = this.selected_user.store;
        store.remove(this.selected_user);
        store.sync();
      }
    }
  },

  editUser: function() {
    if (!this.selected_user) {
      alert("Please select a user to edit.")
    } else {
      var form = this.createUserForm();
      form.loadRecord(this.selected_user);
      var window = this.createFloatingWindow("Edit User", [form]);
      window.show();
    }
  },

  createUser: function() {
    if (!this.selected_account) {
      alert("Please select a client before adding a new user.")
    } else {
      var form = this.createUserForm();
      var window = this.createFloatingWindow("New User", [form]);
      window.show();
    }
  },

  createUserForm: function() {
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'Nom', name: 'login'},
        {fieldLabel: 'Role', name: 'role'},
        {fieldLabel: 'Adresse Electronique', name: 'email'},
        {fieldLabel: 'Mot de Passe', name: 'password'},
        {fieldLabel: 'Status', name: 'status'}
      ]
    });
  },

  createFloatingWindow: function(title, contents) {
    return new Ext.Window({
      width: 310,
      id: "user_editor",
      title: title,
      height: 203,
      closable: false,
      items: contents,
      fbar: [{text: 'Cancel', handler: this.closeUserEditor.bind(this)}, {text: 'Save', handler: this.saveUser.bind(this)}]
    });
  }
});

