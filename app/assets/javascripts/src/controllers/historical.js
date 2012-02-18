Ext.define('Gowane.controllers.Historical', {
  extend: 'Ext.app.Controller',
  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups', 'Gowane.stores.GpsEvents'],
  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport historical_map', ref: 'map'},
    {selector: 'date_selection', ref: 'datepicker'}
  ],

  init: function() {
    this.control({
      'summary_device_list': {
        selectionchange: this.onDeviceSelect
      }
    })
  },

  onLaunch: function() {
    this.getMap().renderMap();
    Ext.data.StoreManager.lookup('DeviceStore').load();
    var datepicker = this.getDatepicker();
    var fromDay = new Date();
    fromDay.setDate(fromDay.getDate() - 7);
    datepicker.getForm().setValues({
      fromDay: fromDay,
      toDay: new Date()
    });
  },

  onDeviceSelect: function(item, selection) {
    var device_id = selection[0].data.id;
    Ext.data.StoreManager.lookup('GpsEventStore').load({
      params: {device_id: device_id, type: 'gps'}, success: function(data) {
        this.getMap().displayRoute(data);
      }
    });
  }
});

