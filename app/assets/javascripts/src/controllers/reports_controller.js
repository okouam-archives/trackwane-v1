App.Controllers.ReportsController = App.Controllers.Base.extend({

  appEvents: {
    "data:table": "onShowTable",
    "data:chart": "onShowChart",
    "export:pdf": "onExportPdf",
    "export:excel": "onExportExcel"
  },

  events: {
    "click .run": "onRunReport"
  },

  initialize: function(options) {
    this.init(options);

    this.presentation_view = new App.Views.Reports.Presentation({el: "#canvas .presentation", pubsub: this.pubsub});
    this.parameters_view = new App.Views.Reports.Parameters({el: "#canvas .parameters", pubsub: this.pubsub});
    this.toolbar_view = new App.Views.Reports.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});

    this.presentation_view.render();
    this.parameters_view.render();
    this.toolbar_view.render();

    var devices = new App.Collections.Devices();
    devices.fetch({success: function(collection) {
      this.device_view = new App.Views.Reports.Devices({el: "#canvas .listing", devices: collection, pubsub: this.pubsub});
      this.device_view.render();
    }.bind(this)});

    $(".datepicker").datepicker();
  },

  onShowTable: function() {
    this.presentation_view.showTable();
  },

  onShowChart: function() {
    this.presentation_view.showChart();
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
