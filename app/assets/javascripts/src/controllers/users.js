Ext.define('Gowane.controllers.Users', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Users', 'Gowane.stores.Accounts'],

  init: function() {
    this.control({
      'account_list': {
        selectionchange: this.onAccountSelect
      },
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
    })
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
        record = Ext.getStore('UserStore').add(form.getFieldValues())[0];
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
    Ext.data.StoreManager.lookup('AccountStore').load();
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

  onAccountSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_account = selection[0];
      Ext.data.StoreManager.lookup('UserStore').load({
        params: {account_id: this.selected_account.data.id}
      });
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

