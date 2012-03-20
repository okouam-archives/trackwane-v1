App.Views.Reports.Devices = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.devices = options.devices;
  },

  getDevices: function() {

  },

  render: function() {
    var source = $("#devices-template").html();
    var template = Handlebars.compile(source);
    var devices = $(template(this.devices)).appendTo("#canvas");
  }

});