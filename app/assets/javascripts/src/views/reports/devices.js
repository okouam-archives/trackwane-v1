App.Views.Reports.Devices = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.devices = options.devices;
    var source = $("#devices-template").html();
    this.template = Handlebars.compile(source);
    $(window).resize(this.onResize.bind(this));
  },

  onResize: function() {
    this.render();
  },

  resize: function() {
    var window_height = $(window).height();
    this.$el.height(window_height - 392);
    $('.lionbars').lionbars();
  },

  close: function() {
    this.$el.hide();
  },

  getDevices: function() {
    var devices = [];
    $("input.device:checked").each(function(i, item) {
      devices.push($(item).val());
    });
    return devices;
  },

  render: function() {
    this.$el.html(this.template(this.devices));
    this.resize();
  }

});