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
    $(template(this.devices)).appendTo(this.$el);
  }

});