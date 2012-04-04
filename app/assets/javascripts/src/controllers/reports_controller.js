App.Controllers.ReportsController = App.Controllers.Base.extend({

  appEvents: {
    "presentation:toggle": "onTogglePresentation",
    "export:pdf": "onExportPdf",
    "export:excel": "onExportExcel",
    "new-report:accept": "onNewReportCreated",
    "new-report:cancel": "onNewReportCancelled",
    "report:delete": "onReportDelete",
    "report:show": "onReportShow"
  },

  events: {
    "click .run": "onRunReport",
    "click .back": "onBackToParameters",
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

    this.devices = new App.Collections.Devices();
    this.devices.fetch({success: function(collection) {
      this.device_view = new App.Views.Reports.Devices({el: "#canvas .device-listing", pubsub: this.pubsub});
      this.device_view.render(collection);
    }.bind(this)});

    this.reports_view = new App.Views.Reports.Reports({el: "#canvas .report-listing", pubsub: this.pubsub});
    this.reports = new App.Collections.Reports();
  },

  onReportDelete: function(id) {
    var report = this.reports.get(id);
    report.destroy();
    this.reports.fetch({success: function(collection) {
      this.reports_view.render(collection);
    }.bind(this)});
  },

  onReportShow: function(id) {
    this.showMainScreen();
    var report = this.reports.get(id);
    alert(report);
  },

  onNewReportCancelled: function() {
    this.new_report_view.close();
  },

  onNewReportCreated: function(parameters, devices, name) {
    var device_ids = _.map(devices, function(device) {
      return device.id;
    });
    var report = new App.Models.Report({parameters: parameters, devices: device_ids, name: name});
    report.save(null, {
      success: function() {
        this.new_report_view.close();
      }.bind(this),
      error: function(response) {
        alert(response);
      }
    });
  },

  onBackToParameters: function() {
    this.showMainScreen();
  },

  showMainScreen: function() {
    this.presentation_view.render();
    this.parameters_view.render();
    this.reports_view.close();
    this.$el.find(".btn-group").show();
    this.$el.find(".back").hide();
    this.devices.fetch({success: function(collection) {
      this.device_view.render(collection);
    }.bind(this)});
  },

  onViewReports: function() {
    this.showAlternateScreen();
  },

  showAlternateScreen: function() {
    this.presentation_view.close();
    this.parameters_view.close();
    this.device_view.close();
    this.$el.find(".btn-group").hide();
    this.$el.find(".back").show();
    this.reports.fetch({success: function(collection) {
      this.reports_view.render(collection);
    }.bind(this)});
  },

  onSaveReport: function() {
    var parameters = this.getReportParameters();
    if (!parameters) return;
    this.showAlternateScreen();
    var devices = _.map(parameters[1], function(device_id) {
      return this.devices.get(device_id);
    }.bind(this));
    this.new_report_view.render(parameters[0], devices);
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
    var parameters = this.getReportParameters();
    if (!parameters) return;
    $.ajax({
      method: 'get',
      url: "/reports/" + parameters[0].type.toLowerCase(),
      data: {
        vehicles: parameters[1],
        parameters: parameters[0]
      },
      success: function(results) {
        this.presentation_view.run(parameters[0], results);
      }.bind(this)
    });
  },

  getReportParameters: function() {
    var parameters = this.parameters_view.getParameters();
    if (parameters.date == "") {
      alert("Please select a date");
      return undefined;
    }
    var vehicles = this.device_view.getDevices();
    if (vehicles.length < 1) {
      alert("Please select one or more vehicles");
      return undefined;
    }
    return [parameters, vehicles];
  }


});
