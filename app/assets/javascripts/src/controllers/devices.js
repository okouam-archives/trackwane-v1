Ext.define('Gowane.controllers.Devices', {

  extend: 'Gowane.controllers.AbstractController',

  mixins: {
    user_management: 'Gowane.Mixins.Controllers.DeviceManagement',
    sidebar_editor: 'Gowane.Mixins.Controllers.SidebarEditor'
  },

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Accounts'],

  refs: [
    {selector: '#dynamic', ref: 'dynamic'}
  ],

  events: {
    'full_device_list': {
      selectionchange: 'onDeviceSelect'
    },
    '#btn_create_device': {
      click: 'onCreateDevice'
    },
    '#btn_delete_device': {
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
    if (selection.length == 1) {
      this.selected_devices = [selection[0]];
      this.loadEditor(selection[0], 'device_form');
    } else if (selection.length > 1) {
      this.selected_devices = selection;
      this.showHelpSidebar("#introduction-template");
    }
  },

  onCreateDevice: function() {
    this.showEditor(Ext.widget('device_form'), "New Device");
  },

  onDeleteDevice: function() {
    if (this.selected_devices.length < 1) {
      alert($.t("select_devices_to_remove"));
    } else {
      var msg = this.selected_devices.length > 1 ? $.t("confirm_devices_deletion") : $.t("confirm_device_deletion");
      if (confirm(msg)) {
        _.each(this.selected_devices, function(device) {
          this.deleteDevice(device);
        }.bind(this));
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    var store = Ext.data.StoreManager.lookup('DeviceStore');
    this.saveDevice(form, store, $.App.account_id);
    this.showHelpSidebar("#introduction-template")
  },

  onLaunch: function() {
    this.callParent(arguments);
    this.refreshListing();
  },

  /* Private Methods. */

  refreshListing: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  findAvailableDeviceGroups: function() {
    return _.map(Ext.getStore('DeviceStore').getGroups(), function(item) {
      return item.name;
    });
  }

});

