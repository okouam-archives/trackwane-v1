App.Views.Reports.Devices = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.devices = options.devices;
  },

  getDevices: function() {
    var devices = [];
    $("input.device:checked").each(function(i, item) {
      devices.push($(item).val());
    });
    return devices;
  },

  render: function() {
    var source = $("#devices-template").html();
    var template = Handlebars.compile(source);
    $(template(this.devices)).appendTo(this.$el);
  }

});