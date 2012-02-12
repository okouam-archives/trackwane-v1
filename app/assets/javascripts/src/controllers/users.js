Ext.define('Gowane.controllers.Users', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Users', 'Gowane.stores.Accounts'],

  init: function() {
    this.control({
      'account_list': {
        selectionchange: this.onAccountSelect,
        beforeitemcontextmenu: this.onAccountItemContextMenu,
        containercontextmenu: this.onAccountContextMenu
      }
    })
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
    this.accountItemContextMenu = Ext.create('Ext.menu.Menu', {
      items: [
        {text: 'Edit Client', handler: function(item, e) {
          var window = this.createEditClientWindow(this.selected_account);
          window.showAt(e.getXY());
        }.bind(this)},
        {text: 'Delete Client', handler: function() {
          if (confirm("Are you sure you want to delete this client?")) {
            var store = this.selected_account.store;
            store.remove(this.selected_account);
            store.sync();
          }
        }.bind(this)},
        {text: 'Add Client', handler: function(item, e) {
          var window = this.createNewClientWindow();
          window.showAt(e.getXY());
        }.bind(this)}
      ]
    })
    this.accountContextMenu = Ext.create('Ext.menu.Menu', {
      items: [
        {text: 'Add Client', handler: function(item, e) {
          var window = this.createNewClientWindow();
          window.showAt(e.getXY());
        }.bind(this)}
      ]
    })
  },

  onAccountContextMenu: function(view, e) {
    e.stopEvent();
    this.accountContextMenu.showAt(e.getXY());
  },

  onAccountItemContextMenu: function(view, record, item, index, e) {
    e.stopEvent();
    view.getSelectionModel().select(index, false);
    this.accountItemContextMenu.showAt(e.getXY());
  },

  onAccountSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_account = selection[0];
      Ext.data.StoreManager.lookup('UserStore').load({
        params: {account_id: this.selected_account.data.id}
      });
    }
  },

  createNewClientWindow: function() {
    var form = Ext.create('Ext.form.Panel', {
      height: 140,  width: 299, bodyPadding: 10, defaultType: 'textfield',
      items: [
        {fieldLabel: 'Sociéte', name: 'email'},
        {fieldLabel: 'Contact', name: 'email'},
        {fieldLabel: 'Email', name: 'name'},
        {fieldLabel: 'Telephone', name: 'email'}
      ]
    });
    return new Ext.Window({
      width: 310,
      id: "new-client-window",
      title: "Add New Client",
      height: 203,
      closable: false,
      items: [form],
      fbar: [
        { text: 'Cancel',
          handler: function () {
            Ext.getCmp('new-client-window').close();
          }
        },
        { text: 'Save',
          handler: function () {
            var record = form.getRecord();
            if (form.isValid()) {
              form.updateRecord(record);
              record.save();
            }
          }
        }
      ]
    });
  }

});

