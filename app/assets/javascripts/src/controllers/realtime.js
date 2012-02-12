Ext.define('Gowane.controllers.Realtime', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups'],
  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport realtime_map', ref: 'map'}
  ],

  init: function() {
    this.control({
      'summary_device_list': {
        selectionchange: this.onDeviceSelect
      }
    })
  },

  onLaunch: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
    Ext.data.StoreManager.lookup('GroupStore').load();
    this.getMap().renderMap();
    setInterval(this.poll.bind(this), 3000)
  },

  poll: function() {
    if (this.current_device) {
      $.ajax({ url: "/devices/poll?id=" + this.current_device, success: function(data){
        this.getMap().showDevice(data);
      }.bind(this), dataType: "json"});
    }
  },

  onDeviceSelect: function(item, selection) {
    this.current_device = selection[0].data.id;
  }
});

