App.Controllers.ReportsController = App.Controllers.Base.extend({

  appEvents: {
    "report:run": "runReport"
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

  onRunReport: function() {
    this.pubsub.trigger("report:run");
  },

  runReport: function() {
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
    this.presentation_view.runReport(parameters, vehicles);
  }

});
