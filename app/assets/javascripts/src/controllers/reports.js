Ext.define('Gowane.controllers.Reports', {

  extend: 'Gowane.controllers.AbstractController',

  stores: ['Gowane.stores.Devices'],

  refs: [
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

  changeReportType: function() {
    // Set the report type as an instance variable
    this.runReport();
  },

  changeRangeType: function() {
    // Set the range type as a instance variable
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
    // Make sure all the parameters for a report are set
    // If not, then show alert message indicating which fields are missing
    // Otherwise remove the template panel and replace it with the report
    // At the top of the report should be 4 buttons: Export To HTML, Export To Excel, Save Report
    // The report itself should be composed of two tabs, one showing the report as a graph and the other as a table
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
