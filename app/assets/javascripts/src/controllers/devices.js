Ext.define('Gowane.controllers.Devices', {

  extend: 'Gowane.controllers.ControllerBase',

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Accounts'],

  init: function() {
    this.control({
      'account_list': {
        selectionchange: this.onAccountSelect
      },
      'full_device_list': {
        selectionchange: this.onDeviceSelect
      },
      'full_device_list button[text="New Device"]': {
        click: this.createDevice
      },
      'full_device_list button[text="Delete Device"]': {
        click: this.deleteDevice
      },
      'full_device_list button[text="Edit Device"]': {
        click: this.editDevice
      }
    })
  },

  onDeviceSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_device = selection[0];
    }
  },

  deleteDevice: function() {
    if (!this.selected_device) {
      alert("Please select a device to remove.");
    } else {
      if (confirm("Are you sure you want to delete this device?")) {
        var store = this.selected_device.store;
        store.remove(this.selected_device);
        store.sync();
      }
    }
  },

  editDevice: function() {
    if (!this.selected_device) {
      alert("Please select a device to edit.")
    } else {
      var form = this.createDeviceForm();
      form.loadRecord(this.selected_device);
      var window = this.createFloatingWindow("Edit Device", [form]);
      window.show();
    }
  },

  createDevice: function() {
    if (!this.selected_account) {
      alert("Please select a client before adding a new device.")
    } else {
      var form = this.createDeviceForm();
      var window = this.createFloatingWindow("New Device", [form]);
      window.show();
    }
  },

  findAvailableDeviceGroups: function() {
    return _.map(Ext.getStore('DeviceStore').getGroups(), function(item) {
      return item.name;
    });
  },

  createDeviceForm: function() {
    return Ext.create('Ext.form.Panel', {
      collapsible: false,
      closable: false,
      bodyStyle: 'padding: 5px',
      flex: 1,
      align: 'stretchmax',
      width: '100%',
      defaultType: 'textfield',
      items: [
        {fieldLabel: 'Display Name', name: 'display_name', width: 110, anchor: '-4'},
        {fieldLabel: 'IMEI Number', name: 'imei_number', width: 110, anchor: '-4'},
        {fieldLabel: 'Group', store: this.findAvailableDeviceGroups(), width: 110, queryMode: 'local', anchor: '-4',
          valueField: 'id', name: 'group_name', displayField: 'name', xtype: 'combobox'}
      ]
    });
  },

  createFloatingWindow: function(title, contents) {
    return new Ext.Window({
      width: 310,
      id: "device_editor",
      title: title,
      height: 203,
      closable: false,
      items: contents,
      fbar: [{text: 'Cancel', handler: this.closeDeviceEditor.bind(this)}, {text: 'Save', handler: this.saveDevice.bind(this)}]
    });
  },

  saveDevice: function() {
    var component = Ext.getCmp("device_editor");
    var form = component.query('form')[0].form;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = Ext.getStore('DeviceStore').add(form.getFieldValues())[0];
        record.set("account_id", this.selected_account.get("id"));
      } else {
        form.updateRecord(record);
      }
      record.save();
      component.close();
    }
  },

  closeDeviceEditor: function() {
    var component = Ext.getCmp("device_editor");
    component.close();
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('AccountStore').load();
  },

  onAccountSelect: function(item, selection) {
    if (selection.length > 0) {
      this.selected_account = selection[0];
      Ext.data.StoreManager.lookup('DeviceStore').load({
        params: {account_id: this.selected_account.data.id}
      });
    }
  }
});

