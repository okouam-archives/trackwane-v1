Ext.define('Gowane.controllers.Historical', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices', 'Gowane.stores.Groups', 'Gowane.stores.Events'],

  mixins: {
    geofence_visualization: 'Gowane.Mixins.Controllers.GeofenceVisualization',
    place_visualization: 'Gowane.Mixins.Controllers.PlaceVisualization'
  },

  refs: [
    {selector: 'viewport sharedsidecolumn', ref: 'sidebar'},
    {selector: 'viewport historical_map', ref: 'map'},
    {selector: 'date_selection', ref: 'datepicker'},
    {selector: 'viewport menu', ref: 'menu'},
    {selector: 'viewport full_gps_event_list', ref: 'events'}
  ],

  events: {
    '#btn_toggle_geofences': {
      toggle: 'onToggleGeofences'
    },
    '#btn_toggle_places': {
      toggle: 'onTogglePlaces'
    },
    'date_selection #fromDay': {
      select: 'changeFromDay'
    },
    'date_selection #toDay': {
      select: 'changeToDay'
    },
    'summary_device_list': {
      selectionchange: "onDeviceSelect"
    },
    'full_gps_event_list': {
      selectionchange: "onEventSelect"
    }
  },

  /* Event Handlers. */

  onToggleGeofences: function() {
    var map = this.getMap();
    this.toggleGeofences(map);
  },

  onTogglePlaces: function() {
    var map = this.getMap();
    this.togglePlaces(map);
  },

  changeFromDay: function(src, date) {
    this.date_range.fromDay = date;
    if (this.selected_device) this.showDeviceHistory();
  },

  changeToDay: function(src, date) {
    this.date_range.toDay = date;
    if (this.selected_device) this.showDeviceHistory();
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAccountChange: function() {
    this.populateDeviceStore();
  },

  createStores: function() {
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
    Ext.create('Gowane.stores.Groups', {storeId: "GroupStore"});
    Ext.create('Gowane.stores.Events', {storeId: "EventStore"});
  },

  populateDeviceStore: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  onEventSelect: function(item, selection) {
    var event = selection[0];
    this.getMap().selectEvent(event);
    this.updateTimeline(event);
  },

  onLaunch: function() {
    this.callParent();
    this.getMap().renderMap();
    this.populateDeviceStore();
    var datepicker = this.getDatepicker();
    var fromDay = new Date();
    fromDay.setDate(fromDay.getDate() - 7);
    this.date_range = {
      fromDay: fromDay,
      toDay: new Date()
    };
    datepicker.getForm().setValues(this.date_range);
		var store = Ext.data.StoreManager.lookup('EventStore');
		store.on(
			{
				'beforeload': function(store) {
					var proxy = store.getProxy();
					proxy.extraParams = {
						device_id: this.selected_device.get("id"),
						type: 'gps',
						from: this.formatDate(this.date_range.fromDay),
						to: this.formatDate(this.date_range.toDay)
					};
				}.bind(this),
				'load': function(store, records) {
        	this.getMap().displayRoute(records);
        	this.resetTimeline(records);
				}.bind(this)
			}
		);
  },

  onDeviceSelect: function(item, selection) {
    this.selected_device = selection[0];
    this.showDeviceHistory()
  },

  showDeviceHistory: function() {
    Ext.data.StoreManager.lookup('EventStore').load({
      params: {start: 0, limit: 25},
      callback: function() {
        this.getEvents().setTitle(this.selected_device.get("display_name") + " (" + this.selected_device.get("group_name") + ")");
      }.bind(this)
    });

  },

  formatDate: function(date) {
    var pad = function(n) {
      return n < 10 ? '0' + n : n;
    };
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  },

  updateTimeline: function(event) {

  },

  resetTimeline: function() {

  },

  playTimeline: function() {

  }
});

