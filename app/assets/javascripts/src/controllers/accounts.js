Ext.define('Gowane.controllers.Accounts', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Accounts'],

  init: function() {
    this.control({
      'full_account_list': {
        selectionchange: this.onAccountSelect
      },
      'full_account_list button[text="New Account"]': {
        click: this.createAccount
      },
      'full_account_list button[text="Delete Account"]': {
        click: this.deleteAccount
      },
      'full_account_list button[text="Edit Account"]': {
        click: this.editAccount
      }
    })
  },

  deleteAccount: function() {
    if (!this.selected_account) {
      alert("Please select an account to remove.");
    } else {
      if (confirm("Are you sure you want to delete this account?")) {
        var store = this.selected_account.store;
        store.remove(this.selected_account);
        store.sync();
      }
    }
  },

  editAccount: function() {
    if (!this.selected_account) {
      alert("Please select an account to edit.")
    } else {
      var form = this.createAccountForm();
      form.loadRecord(this.selected_account);
      var window = this.createFloatingWindow("Edit Account", [form]);
      window.show();
    }
  },

  createAccount: function() {
    var form = this.createAccountForm();
    var window = this.createFloatingWindow("New Account", [form]);
    window.show();
  },

  createAccountForm: function() {
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'ID', name: 'id', width: 30, anchor: '-4'},
        {fieldLabel: 'Societe', name: 'name', width: 110, anchor: '-4'},
        {fieldLabel: 'Contact', name: 'contact', width: 110, anchor: '-4'},
        {fieldLabel: 'Telephone', name: 'telephone', width: 110, anchor: '-4'},
        {fieldLabel: 'Messagerie Electronique', name: 'email', width: 110, anchor: '-4'}
      ]
    });
  },

  createFloatingWindow: function(title, contents) {
    return new Ext.Window({
      width: 310,
      id: "account_editor",
      title: title,
      height: 203,
      closable: false,
      items: contents,
      fbar: [
        {text: 'Cancel', handler: this.closeAccountEditor.bind(this)},
        {text: 'Save', handler: this.saveAccount.bind(this)}
      ]
    });
  },

  saveAccount: function() {
    var component = Ext.getCmp("account_ditor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      var store = Ext.getStore('AccountStore');
      if (!record) {
        record = store.add(form.getFieldValues())[0];
      } else {
        form.updateRecord(record);
      }
      record.save({callback: function() {
        record.commit();
        component.close();
      }});
    }
  },

  closeAccountEditor: function() {
    var component = Ext.getCmp("account_editor");
    component.close();
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
  },

  onAccountSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_account = selection[0];
    }
  }
});

