Ext.define('Gowane.controllers.Reports', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();

    this.pubsub = _.extend({}, Backbone.Events);

    this.presentation_view = new App.Views.Reports.Presentation({el: "#canvas", pubsub: this.pubsub});
    this.parameters_view = new App.Views.Reports.Parameters({el: "#canvas", pubsub: this.pubsub});

    this.presentation_view.render();
    this.parameters_view.render();

    var devices = new App.Collections.Devices();
    devices.fetch({success: function(collection) {
      this.device_view = new App.Views.Reports.Devices({el: "#canvas", devices: collection, pubsub: this.pubsub});
      this.device_view.render();
    }.bind(this)});

    this.pubsub.on('report:run', function() {
      var parameters = this.parameters_view.getParameters();
      var vehicles = this.device_view.getDevices();
      this.presentation_view.runReport(parameters, vehicles);
    }.bind(this));

    this.renderExportPdfButton();
    this.renderExportExcelButton();
    this.renderShowTableButton();
  },

  renderExportPdfButton: function() {
    $("#canvas").append("<div class='places switcher' style='left: 160px'><a><img style='height: 20px' src='/assets/103-map.png'>Export PDF</a></div>")
  },

  renderExportExcelButton: function() {
    $("#canvas").append("<div class='places switcher'><a><img style='height: 20px' src='/assets/103-map.png'>Export Excel</a></div>")
  },

  renderShowTableButton: function() {
    $("#canvas").append("<div class='geofences switcher' style='left: 293px'><a><img style='height: 20px' src='/assets/103-map.png'>Show Data</a></div>")
  }

});
