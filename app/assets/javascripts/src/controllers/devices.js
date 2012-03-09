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
    this.selected_device = selection[0];
    this.loadEditor(this.selected_device, 'device_form');
  },

  onCreateDevice: function() {
    this.showEditor(Ext.widget('device_form'), "New Device");
  },

  onDeleteDevice: function() {
    if (!this.selected_device) {
      alert($.t("select_device_to_remove"));
    } else {
      if (confirm($.t("confirm_device_deletion"))) {
        this.deleteDevice(this.selected_device);
        this.showHelpSidebar("#introduction-template");
      }
    }
  },

  onAcceptChanges: function() {
    var form = this.getDynamic().query('form')[0].form;
    this.saveDevice(form, Ext.getStore('Devices'), this.selected_account);
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

