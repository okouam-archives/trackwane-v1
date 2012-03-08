Ext.define('Gowane.controllers.Devices', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Accounts'],

  refs: [
    {selector: '#dynamic', ref: 'dynamic'}
  ],

  events: {
    'user_list': {
      selectionchange: 'onDeviceSelect'
    },
    '#btn_create_user': {
      click: 'onCreateDevice'
    },
    '#btn_delete_user': {
      click: 'onDeleteDevice'
    },
    '#btn_accept_changes': {
      click: 'onAcceptChanges'
    },
    '#btn_cancel_changes': {
      click: 'onCancelChanges'
    }
  },

  /* Event Handlers. */

  onDeviceSelect: function(item, selection) {
    this.selected_device = selection[0];
    var form = Ext.widget('device_form');
    form.loadRecord(this.selected_device);
    this.showEditor(form, "Edit");
  },

  onCreateDevice: function() {
    this.showEditor(Ext.widget('device_form'), "New Device");
  },

  onDeleteDevice: function() {
    if (!this.selected_device) {
      alert("Please select a device to remove.");
    } else {
      if (confirm("Are you sure you want to delete this device?")) {
        this.deleteDevice(this.selected_device);
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onCancelChanges: function() {
    this.showHelpSidebar("#introduction-template")
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    this.saveDevice(form, Ext.getStore('Devices'), this.selected_account);
    this.showHelpSidebar("#introduction-template")
  },

  onLaunch: function() {
    this.callParent();
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  /* Private Methods. */

  findAvailableDeviceGroups: function() {
    return _.map(Ext.getStore('DeviceStore').getGroups(), function(item) {
      return item.name;
    });
  }

});

