Trackwane.Views.Historical.Devices = Backbone.View.extend({

  events: {
    "click a": "onDeviceSelect"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#devices-template").html();
    this.template = Handlebars.compile(source);
  },

  onDeviceSelect: function(evt) {
    this.pubsub.trigger("device:selected", $(evt.currentTarget).data("id"));
  },

  render: function(devices) {
    this.devices = devices;
    this.$el.html(this.template(devices));
    this.$el.lionbars();
  }

});