App.Controllers.ReportsController = App.Controllers.Base.extend({

  appEvents: {
    "presentation:toggle": "onTogglePresentation",
    "export:pdf": "onExportPdf",
    "export:excel": "onExportExcel"
  },

  events: {
    "click .run": "onRunReport",
    "click a.save-report": "onSaveReport",
    "click a.your-reports": "onViewReports"
  },

  initialize: function(options) {
    this.init(options);

    this.presentation_view = new App.Views.Reports.Presentation({el: "#canvas .presentation", pubsub: this.pubsub});
    this.parameters_view = new App.Views.Reports.Parameters({el: "#canvas .parameters", pubsub: this.pubsub});
    this.toolbar_view = new App.Views.Reports.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.new_report_view = new App.Views.Reports.NewReport({el: "#canvas .saved-report-details", pubsub: this.pubsub});

    this.presentation_view.render();
    this.parameters_view.render();
    this.toolbar_view.render();

    var devices = new App.Collections.Devices();
    devices.fetch({success: function(collection) {
      this.device_view = new App.Views.Reports.Devices({el: "#canvas .device-listing", devices: collection, pubsub: this.pubsub});
      this.device_view.render();
    }.bind(this)});

    var reports = new App.Collections.Reports();
    reports.fetch({success: function(collection) {
      this.reports_view = new App.Views.Reports.Reports({el: "#canvas .report-listing", pubsub: this.pubsub});
      this.reports_view.render(collection);
    }.bind(this)});

    $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    $(".datepicker").datepicker('setDate', new Date());
  },

  onViewReports: function() {
    this.presentation_view.close();
    this.parameters_view.close();
    this.device_view.close();
    this.reports_view.render();
  },

  onSaveReport: function() {
    this.presentation_view.close();
    this.parameters_view.close();
    this.device_view.close();
    this.reports_view.render();
    this.new_report_view.render();
  },

  onTogglePresentation: function() {
    this.presentation_view.togglePresentation();
  },

  onExportPdf: function() {
    alert("Not yet implemented...");
  },

  onExportExcel: function() {
    alert("Not yet implemented....")
  },

  onRunReport: function() {
    this.run();
  },

  run: function() {
    var parameters = this.parameters_view.getParameters();
    if (parameters.date == "") {
      alert("Please select a date");
      return;
    }
    var vehicles = this.device_view.getDevices();
    if (vehicles.length < 1) {
      alert("Please select one or more vehicles");
      return;
    }
    $.ajax({
      method: 'get',
      url: "/reports/" + parameters.type.toLowerCase(),
      data: {
        vehicles: vehicles,
        parameters: parameters
      },
      success: function(results) {
        this.presentation_view.run(parameters, results);
      }.bind(this)
    });
  }

});
