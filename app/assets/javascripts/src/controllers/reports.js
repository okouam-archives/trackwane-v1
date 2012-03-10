Ext.define('Gowane.controllers.Reports', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices'],

  mixins: {
    charting: 'Gowane.Mixins.Controllers.Charting'
  },

  refs: [
    {selector: '#dynamic', ref: 'dynamic'},
    {selector: 'date_selection', ref: 'datepicker'}
  ],

  events: {
    "report_builder": {
    },
    'date_selection #reportType': {
      select: 'changeReportType'
    },
    'date_selection #rangeType': {
      select: 'changeRangeType'
    },
    'date_selection #fromDay': {
      select: 'changeFromDay'
    },
    'date_selection #toDay': {
      select: 'changeToDay'
    },
    'selectable_device_list': {
      selectionchange: "onDeviceSelect"
    }
  },

  runSavedReport: function() {
    // Load a saved report
    // Populate report builder
    // Populate report variables
    // Show Report Builder with new values
    this.runReport();
  },

  changeReportType: function(combo, records) {
    this.report_type = records[0].get("value");
    this.runReport();
  },

  changeRangeType: function(combo, records) {
    this.range_type = records[0].get("value");
    this.runReport();
  },

  changeFromDay: function(src, date) {
    this.date_range.fromDay = date;
    this.runReport();
  },

  changeToDay: function(src, date) {
    this.date_range.toDay = date;
    this.runReport();
  },

  onDeviceSelect: function(item, selection) {
    this.selected_devices = selection;
    this.runReport();
  },

  runReport: function() {
    if (!this.validateReport()) return false;
    this.showReport();
  },

  showReport: function() {
    var reportParams = this.getReportParams();
		var store = Ext.data.StoreManager.lookup('SpeedDataPointStore');
		store.on(
			{
				'beforeload': function(store) {
					var proxy = store.getProxy();
					proxy.extraParams = reportParams;
				}.bind(this),
				'load': function(store, records) {
          var report = Ext.widget('report_chart');
          var results = Ext.widget('reports_results', {items: [report]});
          var container = this.getDynamic();
          container.removeAll();
          container.add(results);
          this.buildChart(records, reportParams, report.id);
				}.bind(this)
			}
		);
    store.load();
  },

  getReportParams: function() {
    return {};
  },

  validateReport: function() {
    return true;
  },

  init: function() {
    this.callParent(arguments);
    this.createStores();
  },

  onAccountChange: function() {
    Ext.data.StoreManager.lookup('DeviceStore').load();
  },

  createStores: function() {
    Ext.create('Ext.data.ArrayStore', {fields: ['type', 'name'], storeId: "ReportTypeStore", data: [
      ["distance", "Distance Report"], ["speed", "Speed Report"], ["stop", "Stop Report"], ["alarm", "Alarm Report"]
    ]});
    Ext.create('Ext.data.ArrayStore', {fields: ['type', 'name'], storeId: "ReportRangeStore", data: [
      ["distance", "Today"], ["speed", "Yesterday"], ["stop", "Last Week"], ["alarm", "Last Month"]
    ]});
    Ext.create('Gowane.stores.SpeedDataPoints', {storeId: "SpeedDataPointStore"});
    Ext.create('Gowane.stores.Devices', {storeId: "DeviceStore"});
  },

  onLaunch: function() {
    this.callParent();
    Ext.data.StoreManager.lookup('DeviceStore').load();
    var datepicker = this.getDatepicker();
    var fromDay = new Date();
    fromDay.setDate(fromDay.getDate() - 7);
    this.date_range = {
      fromDay: fromDay,
      toDay: new Date()
    };
    datepicker.getForm().setValues(this.date_range);
  }

});
