Ext.define('Gowane.controllers.Realtime', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices'],
  refs: [{
    selector: 'viewport sharedsidecolumn',
    ref: 'sideColumn'
  }],

  init: function() {
    this.control({
      'availabledevices': {
        selectionchange: this.onDeviceSelect
      }
    })
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
    setInterval(this.poll.bind(this), 3000)
  },

  poll: function() {
    if (this.current_device) {
      $.ajax({ url: "/devices/poll?imei=" + this.current_device, success: function(data){
          //do something
      }, dataType: "json"});
    }
  },

  onDeviceSelect: function(item, selection) {
    this.current_device = selection[0].data.imei_number;
  }
});

